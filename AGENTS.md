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
- I contenuti editoriali in `docs/content/texts/` usano il nome
  `yyyy-mm-dd-nomedefile.md`, dove la data ISO `yyyy-mm-dd` (con anno a quattro
  cifre) corrisponde alla data di creazione del testo e il nome file è
  descrittivo e in minuscolo.
- `docs/assets/vendor/marked.esm.js` e `docs/assets/vendor/marked.esm.d.ts` sono dipendenze locali:
  non modificarle salvo una richiesta esplicita.
- `docs/content/texts/` contiene i sorgenti editoriali Markdown.
- `docs/assets/` contiene le risorse statiche del sito, come font, vendor e favicon.

## Contenuti e attribuzione

- Non riscrivere, correggere o modificare testi poetici, biografici o altri
  contenuti editoriali senza una richiesta esplicita dell’autore.
- Conservare in `docs/texts.json` la distinzione tra `Me` (`section: "Me"`)
  e `AI` (`section: "AI"`).
- Lo schema di `docs/texts.json` è il seguente:
  - ogni testo pubblicato ha i campi obbligatori `title`, `file`, `section`,
    `kind`, `createdAt`, `publishedAt` e `updatedAt`;
  - `section` vale `"Me"` oppure `"AI"`;
  - `kind` vale `"poetry"`, `"story"` oppure `"sport"`; `"sport"` identifica
    risultati e testimonianze di attività sportive;
  - `collection` è facoltativo e identifica una raccolta editoriale;
  - `mark` è obbligatorio soltanto per i testi `section: "AI"` e identifica la
    versione progressiva salvata del testo; i testi `section: "Me"` non lo
    usano;
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
  diciture approvate sono: `AI per il sito e la grafica.` per
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
- Prima di pubblicare, verificare la versione di `docs/assets/vendor/marked.esm.js` e
  confrontarla con l’ultima release stabile di Marked. Se è disponibile un
  aggiornamento compatibile, sostituire il bundle ESM locale con quello
  ufficiale e verificare il rendering di indice e testi.
- Per un nuovo testo, aggiungere in `docs/content/texts/` un file `yyyy-mm-dd-nomedefile.md` e la
  relativa voce in `docs/texts.json`, mantenendo l’ordine fisico descritto sotto.
- In `docs/texts.json`, mantenere l’ordine fisico descritto nella checklist
  tecnica obbligatoria: `content/texts/README.md` deve essere il primo elemento
  e le pubblicazioni devono seguire l’ordine previsto senza eccezioni.
- `docs/app.js` ripete lo stesso ordinamento dopo il caricamento, come protezione
  runtime: esclude `content/texts/README.md`, ordina le pubblicazioni per `createdAt` e usa
  `file` come criterio secondario. L’indice e la paginazione usano entrambi
  questo ordine; `updatedAt` e `publishedAt` non partecipano all’ordinamento.
- `docs/feed.xml` è il feed RSS statico del sito: mantenerlo manualmente, senza
  introdurre generatori o processi di build. Aggiungere un elemento per ogni
  nuova pubblicazione. Per un testo `Solo AI`, aggiungere un nuovo elemento per
  ogni versione salvata, comprese quelle che correggono soltanto refusi,
  applicando sempre la regola di incremento di `Mk` descritta sotto e verificando
  il risultato con la checklist tecnica obbligatoria.
- Nei nuovi elementi del feed usare `publishedAt` come data di pubblicazione.
  Per un nuovo testo umano destinato al feed, aggiungere questo metadato senza
  cambiare la data di creazione nel nome file. Per le revisioni dei testi AI,
  includere `Mk` nel `guid`, così ogni versione pubblicata resta identificabile.
  Applicare il limite dei 30 aggiornamenti e le regole per GUID, ordine e URL
  indicate nella checklist tecnica obbligatoria.
- Per i testi umani storici, `createdAt` deriva dalla data ISO nel nome file;
  se una pagina raccoglie più testi, `publishedAt` e `updatedAt` usano la data
  esplicita dell’ultimo testo contenuto. Se nel contenuto manca un giorno finale
  verificabile, mantenere la data del nome file. Il collegamento RSS non è
  visibile nella pagina: affidarsi all’autodiscovery dichiarato in
  `docs/index.html`. Quando una data storica è ricavata soltanto dal nome file
  o da informazioni incomplete, usare convenzionalmente le 09:00 con l’offset
  corretto di `Europe/Rome`; quando giorno e ora reali sono noti, conservarli.
  Il formato e l’offset delle date sono verificati secondo la checklist tecnica
  obbligatoria.
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
- `content/texts/README.md` segue le stesse regole dei testi non AI per `createdAt`,
  `publishedAt` e `updatedAt`, ma non genera un elemento nel feed RSS perché è
  la pagina homepage e non una pubblicazione indicizzata.
- Per ogni modifica salvata a un testo `Solo AI`, refusi compresi, incrementare
  `mark` di uno in `texts.json`: `Mk` è il numero progressivo di tutte le
  versioni salvate, anche prima della pubblicazione. Ogni versione salvata
  destinata alla pubblicazione deve essere registrata anche nel feed RSS.
  Salvare `publishedAt`, `updatedAt`
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
  senza dipendenze locali. Il bundle esterno in `docs/assets/vendor/` resta escluso.
- `eslint-recommended.js` contiene una fotografia esplicita delle regole
  `recommended` di `@eslint/js` 10.0.1, importata da `eslint.config.js`, per
  evitare `node_modules` e import di pacchetti esterni. Per aggiornare la
  fotografia, ricopiare l’intero set dalla nuova release e rieseguire
  `npm run validate`; non aggiungere o rimuovere singole regole senza una
  decisione esplicita.

## Checklist tecnica obbligatoria prima della consegna

Questa checklist è obbligatoria dopo ogni modifica a codice, metadati,
contenuti, feed o risorse del sito. Non introdurre uno script di validazione o
un nuovo processo di build per automatizzarla: verificare manualmente questi
invarianti durante il lavoro e prima della consegna. La sezione “Contenuti e
attribuzione” è la fonte normativa dello schema; questa checklist ne verifica
il rispetto prima della consegna.

- `docs/texts.json` deve contenere una sola entry homepage, con `file` uguale
  a `content/texts/README.md`, `kind: "home"` e senza `section`, `collection`
  o `mark`. Ogni pubblicazione deve avere `title`, `file`, `section`, `kind`,
  `createdAt`, `publishedAt` e `updatedAt`; `section` deve essere `Me` o `AI`,
  `kind` deve essere `poetry`, `story` o `sport`, `collection` deve essere una
  stringa non vuota quando presente, e non devono essere introdotti campi non
  previsti senza aggiornare prima queste istruzioni.
- `mark` deve essere presente soltanto per le entry `section: "AI"` e deve
  essere un intero positivo. Le entry `section: "Me"` non devono usarlo.
- `content/texts/README.md` deve essere il primo elemento dell’array. Tutte le
  pubblicazioni devono seguire in ordine decrescente di `createdAt`, usando
  `file` come criterio secondario stabile in caso di pari data. Non devono
  esserci file, entry o titoli duplicati accidentalmente.
- Ogni file indicato da una pubblicazione deve esistere sotto
  `docs/content/texts/`; non devono restare Markdown pubblicati non presenti in
  `texts.json`, né entry che puntano a file mancanti.
- Per ogni pubblicazione umana presente nella finestra dei 30 aggiornamenti
  deve esistere un solo elemento corrispondente in `docs/feed.xml`. Per ogni
  testo AI devono essere presenti gli elementi RSS delle versioni pubblicate
  ancora comprese nella stessa finestra, inclusa la versione corrente indicata
  da `mark`. Titolo, route, categoria e `pubDate` devono corrispondere
  all’indice; le pubblicazioni escluse perché più vecchie possono non comparire
  nel feed.
- Ogni GUID RSS deve essere unico. I testi umani devono mantenere un GUID
  stabile derivato dal file; i testi AI devono usare un GUID distinto per ogni
  versione, derivato da file e `mark`. Non riutilizzare un GUID per due
  versioni diverse e non cambiare il GUID stabile di un testo umano.
- Per ogni testo AI, il `mark` corrente deve essere la versione progressiva
  salvata più recente per quel file e, se destinata alla pubblicazione, deve
  comparire nel relativo GUID RSS. Le versioni
  precedenti già pubblicate devono essere conservate nel feed finché rientrano
  nel limite dei 30 aggiornamenti. Non incrementare `mark` per una sola
  redistribuzione tecnica delle righe di una storia.
- Tutti i valori `createdAt`, `publishedAt` e `updatedAt` devono essere date
  ISO 8601 complete con secondi e offset esplicito, nel formato
  `YYYY-MM-DDTHH:mm:ss+HH:MM`. Verificare che le date siano reali, che
  l’offset corrisponda a `Europe/Rome` per quell’istante e che rispettino
  l’ordine `createdAt <= publishedAt <= updatedAt`.
- Per i testi umani storici, `createdAt` deve essere coerente con la data nel
  nome file. Usare convenzionalmente le ore 09:00 e l’offset corretto di
  `Europe/Rome` soltanto quando giorno o ora reali non sono noti; per i
  contenuti nuovi o storici con dati completi, registrare i valori effettivi.
- Il feed deve rimanere XML RSS 2.0 valido, contenere al massimo 30 elementi,
  essere ordinato per `pubDate` decrescente e usare URL assoluti. Aggiornare
  `lastBuildDate` quando cambia il feed.
- Nei file con `kind: "story"`, le righe dei normali paragrafi Markdown non
  devono superare 80 caratteri. Non spezzare parole, URL o costrutti Markdown
  per soddisfare il limite; escludere dal controllo titoli, righe vuote,
  blockquote e blocchi di codice. Conservare i due spazi finali soltanto dove
  sono interruzioni Markdown intenzionali.
- Dopo la checklist, eseguire `npm run validate`, verificare l’indice e almeno
  una pagina di testo nel browser, controllare la navigazione e, se è cambiato
  `docs/feed.xml`, verificare nuovamente XML, date, GUID e URL.

## Igiene dei file

- Usare UTF-8, terminazioni LF e un solo newline finale. Non lasciare spazi
  finali, salvo i due spazi Markdown intenzionali che producono
  un’interruzione di riga.
- Nei Markdown poetici conservare le interruzioni di verso con esattamente due
  spazi finali; non usarli su titoli o righe vuote e non sostituirli con
  backslash o tag HTML.
- Per le storie e per la verifica finale del sito, applicare la checklist
  tecnica obbligatoria prima della consegna.

## Commit

- Scrivere i messaggi di commit in inglese, mantenendo nella lingua originale
  i titoli di racconti, opere e altri contenuti editoriali.
- Iniziare sempre il titolo del commit con una lettera maiuscola ASCII (`A-Z`).
- Impostare sempre Alberto Santini come autore dei commit; non usare Codex
  come autore.
