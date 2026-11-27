# BTC Analytics Dashboard

Statistical dashboard of Bitcoin price behaviour: sessions, seasonality, liquidity sweeps, volatility regimes and simple spot-buying tools.

**Live:** https://kennnyz.github.io/btc-analytics-dashboard/

## Sections

| Group | Sections |
|-------|----------|
| Market | Overview, Session Playbook, Seasonality, Hourly, FOMC, Macro Events |
| Liquidity | Liquidity Levels |
| Patterns | Volatility, Trends, Volume, Return Distribution, Bull vs Bear, Post-Squeeze Direction |
| Advanced | Big Moves, Asian Range AMD, CME Gap, Halving Cycle, Weekly Range |
| Trading Tools | Time in Profit, Drawdown Recovery, DCA Optimizer, Buy After Red Streak, Buy the Dip, ATH Distance |

## How it works

The site is static. All numbers are precomputed and shipped as `public/data/analytics.json`; the app fetches it on load and renders charts with Recharts. To refresh the stats, replace that file and redeploy.

## Stack

React 19, TypeScript, Vite, Recharts.

## Development

```bash
npm ci
npm run dev      # local dev server
npm run build    # type-check and build into dist/
npm run lint
```

## Deploy

Every push to `main` builds the app and publishes `dist/` to GitHub Pages (`.github/workflows/deploy.yml`).
