# Veronica Tresoldi - Neuropsicomotricista

Sito statico per GitHub Pages di Veronica Tresoldi, terapista della neuro e psicomotricità dell'età evolutiva.

## Struttura del sito

```
├── index.html                    # Home page
├── chi-sono.html                 # Pagina "Chi sono"
├── servizi/
│   ├── index.html                # Pagina overview servizi
│   ├── valutazione.html          # Servizio valutazione
│   ├── trattamento.html          # Servizio trattamento
│   └── supporto-genitoriale.html # Servizio supporto genitoriale
├── contatti-e-prenotazioni.html  # Pagina contatti
├── faq.html                      # Domande frequenti
├── privacy-policy.html           # Privacy Policy (GDPR)
├── cookie-policy.html            # Cookie Policy
├── images/                       # Immagini e favicon
├── styles.css                    # Stili CSS
├── script.js                     # JavaScript per interattività
├── sitemap.xml                   # Sitemap per SEO
└── robots.txt                    # Robots.txt per crawler
```

## Design

Il sito replica lo stile del sito originale Google Sites con:

- **Font:** Arvo (titoli), Lato (navigazione), Merriweather (testo)
- **Colore primario:** Verde `#477560`
- **Colori accent:** Rosa `#f2dede` e `#e8b5b5`

## Funzionalità

### SEO
- ✅ Meta tag ottimizzati per ogni pagina
- ✅ Open Graph e Twitter Cards
- ✅ Schema.org structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt

### Accessibilità
- ✅ ARIA labels
- ✅ Focus styles per navigazione da tastiera
- ✅ Breadcrumb strutturati (JSON-LD)

### Conversioni
- ✅ Pulsante WhatsApp fluttuante (aggiorna il numero in `393XXXXXXXXX`)
- ✅ Sezione testimonianze
- ✅ CTA chiari su ogni pagina

### Legale
- ✅ Privacy Policy conforme GDPR
- ✅ Cookie Policy

## Personalizzazione

### Numero WhatsApp
Aggiorna il numero WhatsApp in tutti i file HTML cercando:
```html
href="https://wa.me/393XXXXXXXXX?text=..."
```
Sostituisci `393XXXXXXXXX` con il numero reale (formato: 39 + numero senza spazi).

### Testimonianze
Le testimonianze nella home page sono esempi. Sostituiscile con recensioni reali dei genitori.

### Immagini
Le immagini attuali sono placeholder SVG. Per sostituirle con foto reali:

1. Aggiungi le immagini nella cartella `images/`
2. Aggiorna i riferimenti nei file HTML

Formati consigliati:
- Hero backgrounds: JPG/WebP, 1600x600px
- Foto profilo: JPG/WebP, 400x500px  
- Immagini servizi: JPG/WebP, 400x300px

## Sviluppo locale

Per visualizzare il sito in locale:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (se installato npx)
npx serve
```

Poi apri http://localhost:8000 nel browser.

## Deploy su GitHub Pages

1. Vai su Settings > Pages nel repository
2. Seleziona la branch `main` come source
3. Il sito sarà disponibile su `https://[username].github.io/veronicatresoldi-site/`

## Note importanti

- **Privacy Policy e Cookie Policy** sono template base. Rivedili con un avvocato prima della pubblicazione.
- Il numero WhatsApp va aggiornato in tutti i file HTML.
- Le testimonianze sono esempi - sostituiscile con recensioni reali.
