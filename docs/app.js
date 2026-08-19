import { marked } from "./vendor/marked.esm.js";

const HOME_FILE = "README.md";
const SITE_TITLE = "Alberto Santini";
const HOME_PAGE_SIZE = 5;
const SECTION_LABELS = {
    Me: "Scritti da me",
    AI: "Esperimenti con AI"
};
const PUBLICATION_ICON = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 10V2m0 0L3 5m3-3 3 3" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CREATION_ICON = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 1.5 7.2 4.8 10.5 6 7.2 7.2 6 10.5 4.8 7.2 1.5 6 4.8 4.8Z" fill="currentColor"/></svg>';
const DATE_FORMATTER = new Intl.DateTimeFormat("it-IT", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Rome"
});
let entries = [];
let currentFile = HOME_FILE;
const homeSectionOffsets = {};
/** @type {Map<string, Promise<string>>} */
const markdownCache = new Map();

const content = document.getElementById("content");
const pager = /** @type {HTMLElement} */ (document.querySelector(".pager"));
const previousLink = document.getElementById("previousLink");
const nextLink = document.getElementById("nextLink");
const previousText = document.getElementById("previousText");
const nextText = document.getElementById("nextText");
const siteFooter = document.getElementById("siteFooter");

marked.setOptions({
    gfm: true,
    breaks: false
});

initEvents();
boot();

function initEvents() {
    window.addEventListener("hashchange", renderRoute);

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }

        const link = event.target.closest("a");

        const homeControl = /** @type {HTMLButtonElement | null} */ (
            event.target.closest("button[data-home-offset]")
        );
        if (homeControl && currentFile === HOME_FILE) {
            const section = homeControl.dataset.homeSection || "Me";
            homeSectionOffsets[section] = Number(homeControl.dataset.homeOffset);
            const homeIndex = content.querySelector(".home-index");
            if (homeIndex) {
                homeIndex.outerHTML = renderHomeIndex();
            }
            return;
        }

        if (!link) {
            return;
        }

        const href = link.getAttribute("href");
        if (href && href.endsWith(".md")) {
            event.preventDefault();
            location.hash = routeForFile(href);
        }
    });
}

async function boot() {
    content.innerHTML = '<p class="loading">Caricamento…</p>';

    try {
        entries = orderEntries(await fetchJson("texts.json"));
        await renderRoute();
    } catch {
        showError("Non riesco a caricare l’indice dei testi.");
    }
}

function orderEntries(sourceEntries) {
    const homeEntry = sourceEntries.find((entry) => entry.file === HOME_FILE);
    const contentEntries = sourceEntries
        .filter((entry) => entry.file !== HOME_FILE)
        .sort(compareEntries);

    return homeEntry ? [homeEntry, ...contentEntries] : contentEntries;
}

function compareEntries(first, second) {
    const creationDifference = new Date(second.createdAt).getTime()
        - new Date(first.createdAt).getTime();

    return creationDifference || first.file.localeCompare(second.file);
}

async function renderRoute() {
    const routeFile = fileFromHash(location.hash);
    const known = routeFile && (
        routeFile === HOME_FILE
        || entries.some((entry) => entry.file === routeFile)
    );

    if (!known) {
        window.history.replaceState(null, "", "#/");
    }

    currentFile = known ? routeFile : HOME_FILE;
    const requestedFile = currentFile;
    content.setAttribute("aria-busy", "true");

    try {
        const markdown = await loadMarkdown(requestedFile);

        if (currentFile !== requestedFile) {
            return;
        }

        let html = marked.parse(markdown);
        html = requestedFile === HOME_FILE
            ? `${html}${renderHomeIndex()}`
            : `${renderPageHeader(requestedFile)}${html}`;

        content.innerHTML = html;
        content.classList.toggle("is-home", requestedFile === HOME_FILE);
        content.classList.toggle("is-story", entries.some((entry) => (
            entry.file === requestedFile && entry.kind === "story"
        )));
        updateFooter();
        setPager();
        rewriteMarkdownLinks();
        document.title = `${pageTitle(requestedFile)} | ${SITE_TITLE}`;
        window.scrollTo({ top: 0, behavior: "auto" });
    } catch {
        if (currentFile === requestedFile) {
            showError(`Non riesco a caricare ${requestedFile}.`);
        }
    } finally {
        if (currentFile === requestedFile) {
            content.removeAttribute("aria-busy");
        }
    }
}

async function loadMarkdown(file) {
    const url = contentUrl(file);
    let markdownPromise = markdownCache.get(url);

    if (!markdownPromise) {
        markdownPromise = fetchText(url);
        markdownCache.set(url, markdownPromise);
    }

    try {
        return await markdownPromise;
    } catch (error) {
        markdownCache.delete(url);
        throw error;
    }
}

async function fetchText(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Impossibile caricare ${path}`);
    }

    return response.text();
}

function contentUrl(file) {
    const entry = entries.find((item) => item.file === file);

    return !entry || typeof entry.mark !== "number"
        ? file
        : `${file}?v=${encodeURIComponent(entry.mark)}`;
}

async function fetchJson(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Impossibile caricare ${path}`);
    }

    return response.json();
}

function fileFromHash(hash) {
    let value;

    try {
        value = decodeURIComponent((hash || "").replace(/^#\/?/, ""));
    } catch {
        return null;
    }

    if (!value || value === "/") {
        return HOME_FILE;
    }

    return value.endsWith(".md") ? value : `${value}.md`;
}

function routeForFile(file) {
    return file === HOME_FILE
        ? "#/"
        : `#/${encodeURIComponent(file.replace(/\.md$/, ""))}`;
}

function setPager() {
    pager.hidden = currentFile === HOME_FILE;

    const current = entries.find((entry) => entry.file === currentFile);
    const sectionEntries = current && current.file !== HOME_FILE
        ? entries.filter((entry) => (
            entry.file !== HOME_FILE
            && (entry.section || "Me") === (current.section || "Me")
        ))
        : [];
    const index = sectionEntries.indexOf(current);
    const newer = index > 0 ? sectionEntries[index - 1] : null;
    const older = index >= 0 && index < sectionEntries.length - 1 ? sectionEntries[index + 1] : null;

    updatePagerLink(previousLink, previousText, newer);
    updatePagerLink(nextLink, nextText, older);
}

function updateFooter() {
    const entry = entries.find((item) => item.file === currentFile);

    if (currentFile === HOME_FILE) {
        siteFooter.textContent = "AI per il sito e la grafica.";
    } else if (entry && entry.section === "AI") {
        siteFooter.textContent = "Generato con AI, rivisto da me.";
    } else {
        siteFooter.textContent = "Scritto da me, AI solo per i refusi.";
    }

    siteFooter.hidden = false;
}

function updatePagerLink(link, label, entry) {
    if (!entry) {
        link.setAttribute("aria-disabled", "true");
        link.href = "#";
        label.textContent = "";
        return;
    }

    link.removeAttribute("aria-disabled");
    link.href = routeForFile(entry.file);
    label.textContent = entry.title;
}

function pageTitle(file) {
    const entry = entries.find((item) => item.file === file);

    return entry ? entry.title : SITE_TITLE;
}

function renderPageHeader(file) {
    const entry = entries.find((item) => item.file === file);
    const publication = entry && entry.section === "AI" ? entry : null;
    const collection = renderCollection(entry, "page-collection");
    const formattedPublishedAt = publication ? formatDate(publication.publishedAt) : "";
    const formattedCreatedAt = publication ? formatDate(publication.createdAt) : "";
    const publicationDetails = formattedPublishedAt
        ? `<p class="page-updated"><span class="page-updated-group"><span class="page-updated-item page-updated-publication"><span class="page-updated-symbol" aria-hidden="true" title="Data di pubblicazione">${PUBLICATION_ICON}</span><time datetime="${escapeHtml(publication.publishedAt)}" aria-label="Data di pubblicazione: ${escapeHtml(formattedPublishedAt)}" title="Data di pubblicazione">${escapeHtml(formattedPublishedAt)}</time>, <span class="page-updated-version" aria-label="Versione ${escapeHtml(publication.mark)}" title="Versione">Mk ${escapeHtml(publication.mark)}</span></span></span><span class="page-updated-item page-updated-creation"><span class="page-updated-symbol" aria-hidden="true" title="Data di creazione">${CREATION_ICON}</span><time datetime="${escapeHtml(publication.createdAt)}" aria-label="Data di creazione: ${escapeHtml(formattedCreatedAt)}" title="Data di creazione">${escapeHtml(formattedCreatedAt)}</time></span></p>`
        : "";

    const headerClass = publication ? "page-header page-header-publication" : "page-header";

    return `<header class="${headerClass}"><div><h1>${escapeHtml(pageTitle(file))}</h1>${collection}${publicationDetails}</div><a class="page-home-link" href="#/" aria-label="Torna all&#39;indice dei testi">Alberto Santini</a></header>`;
}

function renderHomeIndex() {
    const sections = {};

    entries.forEach((entry) => {
        if (entry.file === HOME_FILE) {
            return;
        }

        const section = entry.section || "Me";
        sections[section] = sections[section] || [];
        sections[section].push(entry);
    });

    const sectionOrder = ["Me", "AI"].filter((section) => sections[section]);
    const renderedSections = sectionOrder.map((section) => {
        const sectionLabel = SECTION_LABELS[section] || section;
        const sectionOffset = homeSectionOffsets[section] || 0;
        const sectionEntries = sections[section].slice(
            sectionOffset,
            sectionOffset + HOME_PAGE_SIZE
        );
        const items = sectionEntries
            .map((entry) => {
                const year = (entry.file.match(/^(\d{4})/) || ["", ""])[1];
                const subtitle = renderCollection(entry, "home-index-subtitle");
                return `<li><a href="${routeForFile(entry.file)}"><span class="home-index-title"><span class="home-index-title-text">${escapeHtml(entry.title)}</span>${subtitle}</span><span class="home-index-rule" aria-hidden="true"></span><span class="home-index-year">${escapeHtml(year)}</span></a></li>`;
            })
            .join("");

        const aiClass = section === "AI" ? " home-index-ai" : "";
        const controls = renderHomeControls(section, sections[section].length, sectionOffset);
        return `<section class="home-index-column${aiClass}" aria-label="${escapeHtml(sectionLabel)}"><h2>${escapeHtml(sectionLabel)}</h2><ul class="home-index-list">${items}</ul>${controls}</section>`;
    }).join("");

    return `<section class="home-index" aria-label="Testi"><div class="home-index-columns">${renderedSections}</div></section>`;
}

function renderHomeControls(section, total, offset) {
    if (total <= HOME_PAGE_SIZE) {
        return "";
    }

    const start = offset + 1;
    const end = Math.min(offset + HOME_PAGE_SIZE, total);
    const previousOffset = Math.max(0, offset - HOME_PAGE_SIZE);
    const nextOffset = Math.min(
        Math.floor((total - 1) / HOME_PAGE_SIZE) * HOME_PAGE_SIZE,
        offset + HOME_PAGE_SIZE
    );
    const previousDisabled = offset === 0 ? " disabled" : "";
    const nextDisabled = offset >= nextOffset ? " disabled" : "";

    return `<nav class="home-index-pager" aria-label="Navigazione di ${escapeHtml(SECTION_LABELS[section] || section)}"><button type="button" class="home-index-control" data-home-section="${escapeHtml(section)}" data-home-offset="${previousOffset}" aria-label="Scritti più recenti"${previousDisabled}>↑</button><span aria-live="polite">${start}–${end} di ${total}</span><button type="button" class="home-index-control" data-home-section="${escapeHtml(section)}" data-home-offset="${nextOffset}" aria-label="Scritti meno recenti"${nextDisabled}>↓</button></nav>`;
}

function renderCollection(entry, className) {
    if (!entry || !entry.collection) {
        return "";
    }

    return `<span class="${className}">${escapeHtml(entry.collection)}</span>`;
}

function rewriteMarkdownLinks() {
    content.querySelectorAll('a[href$=".md"]').forEach((link) => {
        if (link instanceof HTMLAnchorElement) {
            link.href = routeForFile(link.getAttribute("href"));
        }
    });
}

function formatDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return DATE_FORMATTER.format(date);
}

function showError(message) {
    content.innerHTML = `<p class="error">${escapeHtml(message)}</p>`;
    content.classList.remove("is-home", "is-story");
    pager.hidden = true;
    siteFooter.hidden = true;
    document.title = SITE_TITLE;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
