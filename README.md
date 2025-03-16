# Fake Crypto Manager

Built using React and NextJS

## How to run locally

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
npm run dev:worker
```

Manage all your clients' money and invest it in crypto with your advanced knowledge. Watch the money grow over time.

## Basic features:
- Manage enabled coins to limit which coins you see in your portfolios
- Add coins to your portfolio and see real-time value

## Libraries used:
- JStack: for a starter template and good set of base libraries
- Tailwind CSS: for quick adjustments to styling
- DaisyUI: for basic Tailwind components that are easy to customize
- Wrangler: for deploying cloudflare workers and testing locally
- Tanstack/react-query: for better queries in general
  - Simple to use
  - Prefetching data
  - Query caching
  - Refetching for up-to-date data
  - Better error handling and retrying requests
  - Infinite scrolling + paginated fetching
  - Easy to manage loading states
- Zod: for validation and allows the frontend to know what the backend wants
- Zustand: for client-side state

## TODOS:
- Add client list to allow the user to have multiple portfolios
- Enable buy/sell per portfolio
- Graphics for showing value per portfolio or for all clientele
- Add database or some long-term storage for crypto prices over time
- Sort the UI to make it more obvious what is going on
- Fix some input issues