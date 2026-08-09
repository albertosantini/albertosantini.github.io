import { marked } from "./vendor/marked.esm.js";

const HOME_FILE = "README.md";
const SITE_TITLE = "Alberto Santini";
const SECTION_LABELS = {
    "Solo Io": "Scritti da me",
    "Solo AI": "Esperimenti con AI"
};
const DATE_FORMATTER = new Intl.DateTimeFormat("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Rome"
});
let entries = [];
let currentFile = HOME_FILE;
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
    content.innerHTML = '<p class="loading">Caricamento...</p>';

    try {
        entries = await fetchJson("texts.json");
        await renderRoute();
    } catch {
        showError("Non riesco a caricare l'indice dei testi.");
    }
}

async function renderRoute() {
    const file = fileFromHash(location.hash);
    const known = entries.some((entry) => entry.file === file);

    currentFile = known ? file : HOME_FILE;
    const requestedFile = currentFile;
    updateFooter();
    setPager();
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
        content.classList.toggle("is-solo-ai", entries.some((entry) => (
            entry.file === requestedFile && entry.section === "Solo AI"
        )));
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
    const value = decodeURIComponent((hash || "").replace(/^#\/?/, ""));

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
            && (entry.section || "Solo Io") === (current.section || "Solo Io")
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
        siteFooter.textContent = "AI usata per il sito e l’impaginazione.";
    } else if (entry && entry.section === "Solo AI") {
        siteFooter.textContent = "Esperimento di scrittura con AI, rivisto da me.";
    } else {
        siteFooter.textContent = "Testo scritto da me, rivisto con AI solo per i refusi.";
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
    const publication = entry && entry.section === "Solo AI" ? entry : null;
    const formattedPublishedAt = publication ? formatDate(publication.publishedAt) : "";
    const formattedCreatedAt = publication ? formatDate(publication.createdAt) : "";
    const publicationDetails = formattedPublishedAt
        ? `<p class="page-updated"><time datetime="${escapeHtml(publication.publishedAt)}">Ultima pubblicazione: ${escapeHtml(formattedPublishedAt)}</time> · Mk ${escapeHtml(publication.mark)} · <time datetime="${escapeHtml(publication.createdAt)}">Creazione: ${escapeHtml(formattedCreatedAt)}</time></p>`
        : "";

    return `<header class="page-header"><div><h1>${escapeHtml(pageTitle(file))}</h1>${publicationDetails}</div><a class="page-home-link" href="#/" aria-label="Torna all&#39;indice dei testi">Alberto Santini</a></header>`;
}

function renderHomeIndex() {
    const sections = {};

    entries.forEach((entry) => {
        if (entry.file === HOME_FILE) {
            return;
        }

        const section = entry.section || "Solo Io";
        sections[section] = sections[section] || [];
        sections[section].push(entry);
    });

    const sectionOrder = ["Solo Io", "Solo AI"].filter((section) => sections[section]);
    const renderedSections = sectionOrder.map((section) => {
        const sectionLabel = SECTION_LABELS[section] || section;
        const items = sections[section]
            .map((entry) => {
                const year = (entry.file.match(/^(\d{4})/) || ["", ""])[1];
                return `<li><a href="${routeForFile(entry.file)}"><span class="home-index-title">${escapeHtml(entry.title)}</span><span class="home-index-rule" aria-hidden="true"></span><span class="home-index-year">${escapeHtml(year)}</span></a></li>`;
            })
            .join("");

        const aiClass = section === "Solo AI" ? " home-index-ai" : "";
        return `<section class="home-index-column${aiClass}" aria-label="${escapeHtml(sectionLabel)}"><h2>${escapeHtml(sectionLabel)}</h2><ul class="home-index-list">${items}</ul></section>`;
    }).join("");

    return `<section class="home-index" aria-label="Testi"><div class="home-index-columns">${renderedSections}</div></section>`;
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

    const parts = Object.fromEntries(
        DATE_FORMATTER.formatToParts(date)
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value])
    );

    return `${parts.year}, ${parts.day} ${parts.month}, ${parts.hour}:${parts.minute}`;
}

function showError(message) {
    content.innerHTML = `<p class="error">${escapeHtml(message)}</p>`;
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
