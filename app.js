(function () {
    "use strict";

    var HOME_FILE = "README.md";
    var SITE_TITLE = "Alberto Santini";
    var SECTION_LABELS = {
        "Solo Io": "Scritti da me",
        "Solo AI": "Esperimenti con AI"
    };
    var entries = [];
    var currentFile = HOME_FILE;

    var content = document.getElementById("content");
    var pager = document.querySelector(".pager");
    var previousLink = document.getElementById("previousLink");
    var nextLink = document.getElementById("nextLink");
    var previousText = document.getElementById("previousText");
    var nextText = document.getElementById("nextText");
    var siteFooter = document.getElementById("siteFooter");

    marked.setOptions({
        gfm: true,
        breaks: false
    });

    initEvents();
    boot();

    function initEvents() {
        window.addEventListener("hashchange", renderRoute);

        document.addEventListener("click", function (event) {
            var link = event.target.closest("a");

            if (!link) {
                return;
            }

            var href = link.getAttribute("href");
            if (href && href.endsWith(".md")) {
                event.preventDefault();
                location.hash = routeForFile(href);
            }
        });
    }

    function boot() {
        content.innerHTML = '<p class="loading">Caricamento...</p>';

        fetchJson("texts.json")
            .then(function (items) {
                entries = items;
                renderRoute();
            })
            .catch(function () {
                showError("Non riesco a caricare l'indice dei testi.");
            });
    }

    function renderRoute() {
        var file = fileFromHash(location.hash);
        var known = entries.some(function (entry) {
            return entry.file === file;
        });

        currentFile = known ? file : HOME_FILE;
        content.classList.toggle("is-home", currentFile === HOME_FILE);
        content.classList.toggle("is-solo-ai", entries.some(function (entry) {
            return entry.file === currentFile && entry.section === "Solo AI";
        }));
        updateFooter();
        setPager();

        content.innerHTML = '<p class="loading">Caricamento...</p>';

        fetchText(currentFile)
            .then(function (markdown) {
                var html = marked.parse(markdown);

                if (currentFile === HOME_FILE) {
                    html += renderHomeIndex();
                } else {
                    html = renderPageHeader(currentFile) + html;
                }

                content.innerHTML = html;
                rewriteMarkdownLinks();
                document.title = pageTitle(currentFile) + " | " + SITE_TITLE;
                window.scrollTo({ top: 0, behavior: "auto" });
            })
            .catch(function () {
                showError("Non riesco a caricare " + currentFile + ".");
            });
    }

    function fetchText(path) {
        return fetch(path).then(function (response) {
            if (!response.ok) {
                throw new Error("Cannot load " + path);
            }

            return response.text();
        });
    }

    function fetchJson(path) {
        return fetch(path).then(function (response) {
            if (!response.ok) {
                throw new Error("Cannot load " + path);
            }

            return response.json();
        });
    }

    function fileFromHash(hash) {
        var value = decodeURIComponent((hash || "").replace(/^#\/?/, ""));

        if (!value || value === "/") {
            return HOME_FILE;
        }

        return value.endsWith(".md") ? value : value + ".md";
    }

    function routeForFile(file) {
        if (file === HOME_FILE) {
            return "#/";
        }

        return "#/" + encodeURIComponent(file.replace(/\.md$/, ""));
    }

    function setPager() {
        pager.hidden = currentFile === HOME_FILE;

        var current = entries.find(function (entry) {
            return entry.file === currentFile;
        });
        var sectionEntries = current && current.file !== HOME_FILE ? entries.filter(function (entry) {
            return entry.file !== HOME_FILE && (entry.section || "Solo Io") === (current.section || "Solo Io");
        }) : [];
        var index = sectionEntries.indexOf(current);
        var newer = index > 0 ? sectionEntries[index - 1] : null;
        var older = index >= 0 && index < sectionEntries.length - 1 ? sectionEntries[index + 1] : null;

        updatePagerLink(previousLink, previousText, newer);
        updatePagerLink(nextLink, nextText, older);
    }

    function updateFooter() {
        var entry = entries.find(function (item) {
            return item.file === currentFile;
        });
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
        var entry = entries.find(function (item) {
            return item.file === file;
        });

        return entry ? entry.title : SITE_TITLE;
    }

    function renderPageHeader(file) {
        var entry = entries.find(function (item) {
            return item.file === file;
        });
        var publication = entry && entry.section === "Solo AI" ? entry : null;
        var formattedPublishedAt = publication ? formatDate(publication.publishedAt) : "";
        var formattedCreatedAt = publication ? formatDate(publication.createdAt) : "";

        return (
            '<header class="page-header">' +
            '<div><h1>' +
            escapeHtml(pageTitle(file)) +
            "</h1>" +
            (formattedPublishedAt ? '<p class="page-updated"><time datetime="' + escapeHtml(publication.publishedAt) + '">Ultima pubblicazione: ' + escapeHtml(formattedPublishedAt) + '</time> / Mk ' + escapeHtml(publication.mark) + ' / <time datetime="' + escapeHtml(publication.createdAt) + '">Creazione: ' + escapeHtml(formattedCreatedAt) + "</time></p>" : "") +
            "</div>" +
            '<a class="page-home-link" href="#/" aria-label="Torna all&#39;indice dei testi">Alberto Santini</a>' +
            "</header>"
        );
    }

    function renderHomeIndex() {
        var sections = {};

        entries.forEach(function (entry) {
            if (entry.file === HOME_FILE) {
                return;
            }

            var section = entry.section || "Solo Io";
            sections[section] = sections[section] || [];
            sections[section].push(entry);
        });

        var sectionOrder = ["Solo Io", "Solo AI"].filter(function (section) {
            return sections[section];
        });

        var renderedSections = sectionOrder.map(function (section) {
            var sectionLabel = SECTION_LABELS[section] || section;
            var items = sections[section]
            .filter(function (entry) {
                return entry.file !== HOME_FILE;
            })
            .map(function (entry) {
                var year = (entry.file.match(/^(\d{4})/) || ["", ""])[1];
                return (
                    "<li><a href=\"" +
                    routeForFile(entry.file) +
                    '"><span class="home-index-title">' +
                    escapeHtml(entry.title) +
                    '</span><span class="home-index-rule" aria-hidden="true"></span><span class="home-index-year">' +
                    escapeHtml(year) +
                    "</span></a></li>"
                );
            })
            .join("");

            return (
                '<section class="home-index-column' + (section === "Solo AI" ? " home-index-ai" : "") + '" aria-label="' + escapeHtml(sectionLabel) + '">' +
            "<h2>" + escapeHtml(sectionLabel) + "</h2>" +
            '<ul class="home-index-list">' +
            items +
            "</ul>" +
            "</section>"
        );
        }).join("");

        return '<section class="home-index" aria-label="Testi"><div class="home-index-columns">' + renderedSections + "</div></section>";
    }

    function rewriteMarkdownLinks() {
        Array.prototype.forEach.call(content.querySelectorAll('a[href$=".md"]'), function (link) {
            link.href = routeForFile(link.getAttribute("href"));
        });
    }

    function formatDate(value) {
        var match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
        var months = [
            "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
            "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
        ];

        if (!match) {
            return value;
        }

        var formatted = match[1] + ", " + Number(match[3]) + " " + months[Number(match[2]) - 1];

        if (match[4] && match[5]) {
            formatted += ", " + match[4] + ":" + match[5];
        }

        return formatted;
    }

    function showError(message) {
        content.innerHTML = '<p class="error">' + escapeHtml(message) + "</p>";
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
})();
