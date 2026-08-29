# Naturist Yoga & Body Acceptance Workshop

A premium React/Vite landing page designed for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub, go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. The included workflow at `.github/workflows/deploy.yml` installs dependencies, builds the site, and deploys it automatically. The workflow uses `npm install`, so a `package-lock.json` is not required.

## Google Sheets integration

The frontend supports a Google Apps Script Web App endpoint through the Vite environment variable:

```text
VITE_GOOGLE_SHEETS_ENDPOINT
```

For GitHub Actions, add it as a **repository variable**:

**Settings → Secrets and variables → Actions → Variables → New repository variable**

Name:

```text
VITE_GOOGLE_SHEETS_ENDPOINT
```

Value:

```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Do not put private API keys or service credentials in the frontend.

The app currently falls back to demo mode when the endpoint is not configured.

## Form fields recorded

Registration:
- Timestamp
- Name
- Age
- Phone
- Email
- Country
- Preferred Session
- Payment Status
- Telegram Status
- Registration Status

Questions:
- Timestamp
- Name
- Email / Phone
- Question

## Customize the workshop

Edit `src/main.jsx` and change the `CONFIG` object:

- `price`
- `date`
- `sessions`
- `googleSheetsEndpoint`

The visual design and content are intentionally componentized so sections can be edited independently.

## Notes

The legal pages included under `public/` are starter templates and should be replaced with finalized legal copy before production launch.
