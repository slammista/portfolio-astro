# matteo-portfolio-astro

Versione alternativa del portfolio di Matteo Aslam, riscritta con **Astro** + **Svelte** per eliminare l'"AI-slop look".

## Stack

| Tecnologia | Ruolo |
|------------|-------|
| **Astro** | Framework statico, HTML-first, Islands Architecture |
| **Svelte** | Isola interattiva per il chatbot AI |
| **Anthropic SDK** | API route server-side per Claude |
| **CSS custom** | Design system editoriale/brutalist, zero Tailwind |

## Perché Astro

- **Zero JS sul caricamento iniziale**: la pagina è puramente HTML/CSS. Solo il chatbot viene idratato come isola.
- **SEO nativo**: nessun problema di hydration o meta tag mancanti.
- **Velocità**: il 90% del sito è statico, nessun runtime React nel bundle.
- **Libertà visiva**: senza il "look imposto" dei component library React.

## Setup

```bash
npm install
cp .env.example .env.local
# Aggiungi ANTHROPIC_API_KEY
npm run dev
```

## Deploy

```bash
npm run build
```

Oppure connetti la repo a Vercel — rileva Astro automaticamente.

## Struttura

```
src/
  layouts/Layout.astro   # Shell HTML
  pages/
    index.astro          # Single page
    api/chat.ts          # Proxy Anthropic (serverless)
  components/
    Hero.astro
    About.astro
    Experience.astro
    Skills.astro
    Contact.astro
    Footer.astro
    ChatBot.svelte       # Unica isola interattiva
  styles/global.css      # Design system anti-AI-slop
```

## Design choices

- **Tipografia**: monospace per titoli (stile editoriale/tech), sans-serif per body.
- **Palette**: bianco sporco, nero, rosso accento. Niente gradienti, niente shadow, niente card arrotondate.
- **Spazio negativo**: generoso, ritmo editoriale.
- **Motion**: nessun fade-in a ripetizione. Il movimento, se aggiunto, deve comunicare qualcosa.
