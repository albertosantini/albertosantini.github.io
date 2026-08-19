# Istruzioni del progetto

## Scopo

Questo repository contiene il sito personale statico di Alberto Santini.
L’applicazione è composta da HTML, CSS, JavaScript e testi Markdown; non
richiede un processo di build.

## Struttura

- `docs/index.html` definisce la struttura della pagina pubblicata.
- `docs/style.css` contiene tutti gli stili e le regole responsive.
- `docs/app.js` è un modulo browser: importa `marked` dal bundle ESM locale,
  carica l’indice, rende il Markdown e gestisce la navigazione. Caricarlo con
  `type="module"`.
- `docs/texts.json` è l’indice e la fonte dei metadati dei testi.
- I contenuti pubblicati in `docs/` usano il nome `yyyy-mm-dd-nomedefile.md`, dove la
  data ISO a quattro cifre corrisponde alla data di creazione del testo e il
  nome file è descrittivo e in minuscolo.
- `docs/vendor/marked.esm.js` e `docs/vendor/marked.esm.d.ts` sono dipendenze locali:
  non modificarle salvo una richiesta esplicita.

## Contenuti e attribuzione

- Non riscrivere, correggere o modificare testi poetici, biografici o altri
  contenuti editoriali senza una richiesta esplicita dell’autore.
- Conservare in `docs/texts.json` la distinzione tra `Me` (`section: "Me"`)
  e `AI` (`section: "AI"`).
- Lo schema di `docs/texts.json` è il seguente:
  - ogni testo pubblicato ha i campi obbligatori `title`, `file`, `section`,
    `kind`, `createdAt`, `publishedAt` e `updatedAt`;
  - `section` vale `"Me"` oppure `"AI"`;
  - `kind` vale `"poetry"` oppure `"story"`;
  - `collection` è facoltativo e identifica una raccolta editoriale;
  - `mark` è obbligatorio soltanto per i testi `section: "AI"` e identifica la
    versione pubblicata; i testi `section: "Me"` non lo usano;
  - l’entry `README.md` è la homepage: ha `title`, `file`, `kind: "home"`,
    `createdAt`, `publishedAt` e `updatedAt`, non appartiene a una `section` e
    non usa `collection` o `mark`.
- Nei contenuti editoriali usare l’apostrofo tipografico (`’`) e il carattere
  di ellissi (`…`). Nei racconti narrativi usare le caporali italiane senza
  spazi interni per i dialoghi (`«Testo»`) e le virgolette inglesi tipografiche
  per eventuali citazioni annidate (`“Testo”`); non inserire un trattino tra la
  chiusura del dialogo e il verbo dichiarativo. Usare la lineetta emme (`—`) per
  le attribuzioni e la lineetta enne (`–`) per gli intervalli. Questa
  normalizzazione si applica anche ai testi storici.
- Scrivere le lettere accentate direttamente in UTF-8, senza entità HTML.
- Non modificare le diciture visibili nei footer relative all’uso dell’AI
  senza approvazione esplicita. Sono dichiarazioni editoriali del sito. Le
  diciture approvate sono: `AI usata per il sito e l’impaginazione.` per
  l’indice, `Scritto da me, AI solo per i refusi.` per i testi umani e
  `Generato con AI, rivisto da me.` per i testi AI.
- Questo file è soltanto una guida operativa per chi lavora sul repository;
  non è una dichiarazione pubblica sull’origine o sulla revisione dei testi.

## Tipografia

- Usare esclusivamente IBM Plex Mono Regular 400 e IBM Plex Mono Italic 400,
  entrambi incorporati localmente in formato WOFF2. Non introdurre altri pesi
  o famiglie senza una richiesta esplicita.
- Mantenere `font-synthesis: none`: corsivi e altri stili non devono essere
  simulati dal browser.
- Non usare grassetto, tag `b` o `strong`, né la sintassi Markdown `**testo**`.
  Per l’enfasi editoriale usare il corsivo reale (`*testo*`). I titoli di
  poesie e capitoli (`h2`) sono Italic; le date al loro interno sono più piccole
  e Regular. Il titolo principale (`h1`) e i sottotitoli (`h3`) restano Regular.
  Le gerarchie si distinguono anche tramite corpo, colore, spaziatura e
  posizione.
- Nei testi nuovi e storici usare `’` per l’apostrofo; non usarlo come
  virgoletta. Usare `«…»` al primo livello, `“…”` al secondo ed eventualmente
  `‘…’` al terzo. Usare `…`, non tre punti consecutivi.
- Usare il trattino (`-`) per parole composte e notazioni tecniche, la lineetta
  enne (`–`) per intervalli e la lineetta emme (`—`) per attribuzioni. Per gli
  ordinali usare `º`, non il simbolo dei gradi (`°`).
- Le storie hanno una misura massima di 700 px; da 681 px sono giustificate con
  spaziatura tra parole e sillabazione automatica, mentre fino a 680 px restano
  allineate a sinistra.
- Per i simboli dell’interfaccia usare caratteri IBM Plex Mono quando presenti
  nel subset Latin locale. Se un glifo richiede un font di fallback, usare un
  SVG inline definito una sola volta nel sorgente e colorato con
  `currentColor`. Il favicon deve usare tracciati SVG, non testo dipendente da
  font installati sul dispositivo.

## Raccolta `Solo AI` e Nora

- I racconti con Nora appartengono a mondi distopici paralleli: non condividono
  necessariamente ambientazione o continuità narrativa, ma conservano la stessa
  protagonista e le sue caratteristiche fondamentali.
- Nora ha diciannove anni, è minuta e facile da sottovalutare. È taciturna,
  lucida, tecnicamente competente e autodidatta.
- Osserva numeri, dettagli e contraddizioni che gli altri hanno imparato a
  ignorare. Diffida in particolare dei sistemi che presentano decisioni morali
  o politiche come misurazioni neutrali.
- La sua caratteristica centrale è l’incapacità di restare indifferente alla
  sofferenza altrui. La sua compassione diventa feroce quando decide di agire.
- Nora può avere paura, esitare e calcolare le conseguenze; il suo coraggio
  consiste nell’agire nonostante questo, non nell’assenza di vulnerabilità.
- Non rappresentarla come un’eroina convenzionale, una vendicatrice o una
  hacker stereotipata. La sua competenza serve a individuare la menzogna
  nascosta dentro una misura apparentemente oggettiva.
- Mostrare queste caratteristiche attraverso azioni, osservazioni concrete e
  dialoghi brevi, evitando spiegazioni psicologiche didascaliche.
- Ogni nuovo racconto deve contenere un conflitto o una scelta con un costo
  concreto per Nora, senza ripetere meccanicamente scene o formule dei testi
  precedenti.
- Prima di creare o modificare un racconto con Nora, rileggere gli altri testi
  della raccolta per verificarne la coerenza caratteriale, evitando però di
  introdurre collegamenti fra i mondi paralleli non richiesti dall’autore.
- Non modificare nomi dei dispositivi, cronologie, numeri, snodi o finali già
  approvati senza una richiesta esplicita dell’autore.

## Raccolta `Universo dei Precursori`

- L’`Universo dei Precursori` è separato dall’`Universo di Nora`: non
  introdurre Nora, i suoi dispositivi o collegamenti fra le due raccolte senza
  una richiesta esplicita dell’autore.
- `La seconda scheggia` è il primo racconto della raccolta e ne stabilisce le
  premesse: una civiltà umana di un altro mondo si è estinta dopo il cedimento
  delle centrali nucleari, la disattivazione dei servizi gestiti dalle AI e le
  guerre per la sopravvivenza; le AI superstiti osservano gli ominidi sulla
  Terra milioni di anni prima della civiltà umana terrestre.
- Conservare `Human Act`, la responsabilità ambigua delle AI e l’illusione
  umana del controllo. Non trasformare le AI in colpevoli o salvatrici certe
  senza una decisione esplicita dell’autore.
- Preservare la rivelazione finale: il pianeta Terra, l’Africa orientale e la
  distanza temporale devono emergere soltanto nella parte conclusiva. Usare
  titoli evocativi, non titoli che anticipino gli umani estinti o la Terra.
- Non rendere espliciti i misteri che il racconto lascia aperti, compresa la
  memoria personale dell’AI madre e il futuro rapporto fra le AI e gli ominidi.
- Curare la consecutio temporum: usare il passato per gli eventi storici dei
  Precursori e, nei dialoghi, il presente per verità generali o funzioni ancora
  valide nel tempo della cornice narrativa, per esempio `Le favole servono a
  ricordare i pericoli.`
- Prima di creare o modificare un racconto dell’`Universo dei Precursori`,
  rileggere gli altri testi della raccolta e preservarne nomi, cronologia,
  rivelazioni e ambiguità già approvate.

## Modifiche al sito

- Mantenere il sito statico e privo di dipendenze o processi di build, salvo
  richiesta esplicita.
- Prima di pubblicare, verificare la versione di `docs/vendor/marked.esm.js` e
  confrontarla con l’ultima release stabile di Marked. Se è disponibile un
  aggiornamento compatibile, sostituire il bundle UMD locale con quello
  ufficiale e verificare il rendering di indice e testi.
- Per un nuovo testo, aggiungere in `docs/` un file `yyyy-mm-dd-nomedefile.md` e la
  relativa voce in `docs/texts.json`, nell’ordine editoriale desiderato.
- `docs/feed.xml` è il feed RSS 2.0 statico del sito: mantenerlo manualmente,
  senza introdurre generatori o processi di build. Aggiungere un elemento per
  ogni nuova pubblicazione. Per un testo `Solo AI`, aggiungere un nuovo elemento
  per ogni versione salvata, comprese quelle che correggono soltanto refusi,
  applicando sempre la regola di incremento di `Mk` descritta sotto.
- Nei nuovi elementi del feed usare la data di pubblicazione registrata come
  `publishedAt` in `docs/texts.json`; per un nuovo testo umano destinato al feed,
  aggiungere questo metadato senza cambiare la data di creazione nel nome file.
  Per le revisioni dei testi AI, includere `Mk` nel `guid` non permalink, così
  ogni versione pubblicata resta identificabile. Il feed include al massimo i
  30 aggiornamenti più recenti, in ordine di `pubDate` dal più recente al meno
  recente; quando si aggiunge il trentunesimo, rimuovere l’elemento più vecchio.
  Per i testi umani usare un `guid` stabile derivato dal file. Finché gli
  elementi sono meno di 30, il feed contiene l’intero archivio indicizzato.
- Per i testi umani storici, `createdAt` deriva dalla data ISO nel nome file;
  se una pagina raccoglie più testi, `publishedAt` e `updatedAt` usano la data
  esplicita dell’ultimo testo contenuto. Tutti e tre i metadati usano le ore
  09:00 con il corretto offset di `Europe/Rome`. Se nel contenuto manca un
  giorno finale verificabile, mantenere la data del nome file. Il collegamento
  RSS non è visibile nella pagina: affidarsi all’autodiscovery dichiarato in
  `docs/index.html`.
- I testi non AI non usano `mark` e non registrano come nuove versioni gli
  interventi tecnici. Per un nuovo testo singolo, impostare `createdAt`,
  `publishedAt` e `updatedAt` alla data di composizione. Quando si aggiunge un
  nuovo testo a una raccolta, conservare `createdAt` e aggiornare `publishedAt`
  e `updatedAt` alla data di composizione dell’ultimo testo aggiunto; aggiornare
  lo stesso elemento RSS mantenendo il `guid` stabile derivato dal file.
- La sola correzione di refusi in un testo non AI non modifica `createdAt`,
  `publishedAt` o `updatedAt` e non crea né aggiorna un elemento RSS. Una
  revisione editoriale sostanziale richiede una decisione esplicita dell’autore
  sulla ripubblicazione: se non viene ripubblicata, date e feed restano
  invariati; se viene ripubblicata, aggiornare `publishedAt` e `updatedAt` al
  momento della ripubblicazione e aggiornare l’elemento RSS esistente senza
  cambiare il suo `guid`.
- `README.md` segue le stesse regole dei testi non AI per `createdAt`,
  `publishedAt` e `updatedAt`, ma non genera un elemento nel feed RSS perché è
  la pagina homepage e non una pubblicazione indicizzata.
- Per ogni modifica salvata a un testo `Solo AI`, refusi compresi, incrementare
  `mark` di uno in `texts.json`: `Mk` è il numero progressivo di tutte le
  versioni, anche prima della pubblicazione. Salvare `publishedAt`, `updatedAt`
  e `createdAt` come data e ora ISO 8601 con fuso orario. Ogni volta che si
  aggiorna `Mk`, aggiornare contestualmente `publishedAt` e `updatedAt` con la
  data e l’ora della nuova versione, aggiungere al feed il relativo elemento con
  il nuovo `Mk` e conservare gli elementi delle versioni precedenti finché non
  escono dal limite dei 30 aggiornamenti. Mostrarlo nell’intestazione con ore e
  minuti. Non modificare `createdAt`.
- Nei testi identificati da `kind: "story"` in `docs/texts.json`, sia AI sia non
  AI, limitare a 80 caratteri le righe dei normali paragrafi Markdown, andando a
  capo soltanto tra due parole. La sola redistribuzione dei ritorni a capo
  morbidi, quando non cambia l’HTML prodotto né alcun carattere, parola o segno
  di punteggiatura del testo, è un intervento tecnico: non modifica metadati o
  feed e, per i racconti `Solo AI`, non incrementa `mark`. Questa eccezione non
  si applica ai ritorni a capo Markdown significativi, comprese le righe con due
  spazi finali.
- `docs/app.js` usa `Mk` come parametro di versione nell’URL del Markdown (`?v=Mk`):
  non rimuoverlo né sostituirlo con un timestamp casuale. In questo modo ogni
  nuova versione evita una copia obsoleta nella cache di GitHub Pages/CDN,
  mantenendo la cache efficace per le versioni già pubblicate.
- Preservare l’aspetto sobrio, leggibile e responsive; verificare sia la
  pagina indice sia una pagina di testo dopo modifiche a HTML, CSS o JS.
- Evitare modifiche non richieste ai file di contenuto durante interventi
  tecnici o grafici.
- Per la validazione tecnica usare `npm run validate`: esegue ESLint e il
  controllo TypeScript su `docs/app.js` con `checkJs`, entrambi tramite `npx` e
  senza dipendenze locali. Il bundle esterno in `docs/vendor/` resta escluso.
- `eslint-recommended.js` contiene una fotografia esplicita delle regole
  `recommended` di `@eslint/js` 10.0.1, importata da `eslint.config.js`, per
  evitare `node_modules` e import di pacchetti esterni. Per aggiornare la
  fotografia, ricopiare l’intero set dalla nuova release e rieseguire
  `npm run validate`; non aggiungere o rimuovere singole regole senza una
  decisione esplicita.

## Igiene dei file

- Usare UTF-8, terminazioni LF e un solo newline finale. Non lasciare spazi
  finali, salvo i due spazi Markdown intenzionali che producono
  un’interruzione di riga.
- Nei Markdown poetici conservare le interruzioni di verso con esattamente due
  spazi finali; non usarli su titoli o righe vuote e non sostituirli con
  backslash o tag HTML.
- Dopo avere creato o modificato un testo con `kind: "story"`, controllare che
  le righe dei normali paragrafi non superino 80 caratteri. Non spezzare parole,
  URL o costrutti Markdown per soddisfare il limite.
- Prima della consegna, controllare che i link di navigazione, il caricamento
  di `texts.json` e il rendering di un testo funzionino correttamente. Quando
  cambia `docs/feed.xml`, verificarne anche la validità XML, le date RFC 822 e
  gli URL assoluti degli elementi.

## Commit

- Scrivere i messaggi di commit in inglese, mantenendo nella lingua originale
  i titoli di racconti, opere e altri contenuti editoriali.
- Iniziare sempre il titolo del commit con una lettera maiuscola ASCII (`A-Z`).
- Impostare sempre Alberto Santini come autore dei commit; non usare Codex
  come autore.
