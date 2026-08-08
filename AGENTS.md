# Istruzioni del progetto

## Scopo

Questo repository contiene il sito personale statico di Alberto Santini.
L'applicazione è composta da HTML, CSS, JavaScript e testi Markdown; non
richiede un processo di build.

## Struttura

- `index.html` definisce la struttura della pagina.
- `style.css` contiene tutti gli stili e le regole responsive.
- `app.js` carica l'indice, rende il Markdown e gestisce la navigazione.
- `texts.json` è l'indice e la fonte dei metadati dei testi.
- I contenuti pubblicati usano il nome `yyyy-mm-dd-nomedefile.md`, dove la
  data ISO a quattro cifre corrisponde alla data di creazione del testo e il
  nome file è descrittivo e in minuscolo.
- `vendor/marked.umd.js` è una dipendenza locale: non modificarla salvo una
  richiesta esplicita.

## Contenuti e attribuzione

- Non riscrivere, correggere o modificare testi poetici, biografici o altri
  contenuti editoriali senza una richiesta esplicita dell'autore.
- Conservare la distinzione in `texts.json` tra `Solo Io` (assenza di
  `section`) e `Solo AI` (`section: "Solo AI"`).
- Non modificare le diciture visibili nei footer relative all'uso dell'AI
  senza approvazione esplicita. Sono dichiarazioni editoriali del sito.
- Questo file è soltanto una guida operativa per chi lavora sul repository;
  non è una dichiarazione pubblica sull'origine o sulla revisione dei testi.

## Raccolta `Solo AI` e Nora

- I racconti con Nora appartengono a mondi distopici paralleli: non condividono
  necessariamente ambientazione o continuità narrativa, ma conservano la stessa
  protagonista e le sue caratteristiche fondamentali.
- Nora ha diciannove anni, è minuta e facile da sottovalutare. È taciturna,
  lucida, tecnicamente competente e autodidatta.
- Osserva numeri, dettagli e contraddizioni che gli altri hanno imparato a
  ignorare. Diffida in particolare dei sistemi che presentano decisioni morali
  o politiche come misurazioni neutrali.
- La sua caratteristica centrale è l'incapacità di restare indifferente alla
  sofferenza altrui. La sua compassione diventa feroce quando decide di agire.
- Nora può avere paura, esitare e calcolare le conseguenze; il suo coraggio
  consiste nell'agire nonostante questo, non nell'assenza di vulnerabilità.
- Non rappresentarla come un'eroina convenzionale, una vendicatrice o una
  hacker stereotipata. La sua competenza serve a individuare la menzogna
  nascosta dentro una misura apparentemente oggettiva.
- Mostrare queste caratteristiche attraverso azioni, osservazioni concrete e
  dialoghi brevi, evitando spiegazioni psicologiche didascaliche.
- Ogni nuovo racconto deve contenere un conflitto o una scelta con un costo
  concreto per Nora, senza ripetere meccanicamente scene o formule dei testi
  precedenti.
- Prima di creare o modificare un racconto con Nora, rileggere gli altri testi
  della raccolta per verificarne la coerenza caratteriale, evitando però di
  introdurre collegamenti fra i mondi paralleli non richiesti dall'autore.
- Non modificare nomi dei dispositivi, cronologie, numeri, snodi o finali già
  approvati senza una richiesta esplicita dell'autore.

## Modifiche al sito

- Mantenere il sito statico e privo di dipendenze o processi di build, salvo
  richiesta esplicita.
- Prima di pubblicare, verificare la versione di `vendor/marked.umd.js` e
  confrontarla con l'ultima release stabile di Marked. Se è disponibile un
  aggiornamento compatibile, sostituire il bundle UMD locale con quello
  ufficiale e verificare il rendering di indice e testi.
- Per un nuovo testo, aggiungere un file `yyyy-mm-dd-nomedefile.md` e la
  relativa voce in `texts.json`, nell'ordine editoriale desiderato.
- Per ogni modifica salvata a un testo `Solo AI`, incrementare `mark` di uno
  in `texts.json`: `Mk` è il numero progressivo di tutte le versioni, anche
  prima della pubblicazione. Salvare `publishedAt` e `createdAt` come data e
  ora ISO 8601 con fuso orario. Ogni volta che si aggiorna `Mk`, aggiornare
  contestualmente `publishedAt` con la data e l'ora della nuova versione: non
  lasciare il timestamp del `Mk` precedente. Mostrarlo nell'intestazione con
  ore e minuti. Non modificare `createdAt`.
- `app.js` usa `Mk` come parametro di versione nell'URL del Markdown (`?v=Mk`):
  non rimuoverlo né sostituirlo con un timestamp casuale. In questo modo ogni
  nuova versione evita una copia obsoleta nella cache di GitHub Pages/CDN,
  mantenendo la cache efficace per le versioni già pubblicate.
- Preservare l'aspetto sobrio, leggibile e responsive; verificare sia la
  pagina indice sia una pagina di testo dopo modifiche a HTML, CSS o JS.
- Evitare modifiche non richieste ai file di contenuto durante interventi
  tecnici o grafici.

## Igiene dei file

- Usare UTF-8, terminazioni LF, nessuno spazio finale e un solo newline finale.
- Prima della consegna, controllare che i link di navigazione, il caricamento
  di `texts.json` e il rendering di un testo funzionino correttamente.

## Commit

- Scrivere i messaggi di commit in inglese, mantenendo nella lingua originale
  i titoli di racconti, opere e altri contenuti editoriali.
- Iniziare sempre il titolo del commit con una lettera maiuscola ASCII (`A-Z`).
- Impostare sempre Alberto Santini come autore dei commit; non usare Codex
  come autore.
