---
id: project-overview
title: Crypto Price Tracker Overview
---

# Crypto Price Tracker Documentation

## 1. Project Setup Guide

### Web App (Next.js)
- Navigate to the `/web-app` folder.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the development server at [http://localhost:3000](http://localhost:3000).

### Documentation (Docusaurus)
- Navigate to the `/docs` folder.
- Run `npm install` and then `npm run start` to view the documentation site locally.

Additionally, read the README files in both /web-app and /docs for more details.

## 2. API Integration Details

We use the [CoinGecko API](https://www.coingecko.com/en/api) to fetch live cryptocurrency prices. Our integration is handled by the custom hook `useCryptoPrices` in the Next.js project:

```jsx
import { useQuery } from "@tanstack/react-query";

const fetchCryptoPrices = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,solana&vs_currencies=usd"
    );

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    
    return res.json();
  } catch (error) {
    throw new Error('Fetching crypto prices failed');
  }
};

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    refetchOnWindowFocus: false,
  });
};
```

## 3. State management explanation
Opted for React Query for state management for the following reasons:

- Automatic Caching & Refetching
- Built-In Loading & Error Handling
- Optimized Refetching

## 4. Challenges & Solutions
#### Initial Approach
- Initially, the Context API was used to create a provider and wrap the application via _app.tsx for sharing API-fetched data. However, given the need to handle live data with efficient caching and staleness management, this approach proved insufficient.

#### Pivot to React Query
- React Query was chosen as it directly addresses the needs of caching, refetching, loading, and error handling.

#### Managing Loading and Error States

Another challenge was accurately managing loading states, especially during rapid consecutive API calls. It required fine-tuning the usage of `isLoading` and `isFetching` to ensure:

- A clear loading indicator is presented during data refreshes.
- Proper error handling is maintained, even when multiple refresh attempts occur in quick succession.
- Through iterative testing and refinements, achieved a solution that provides a smooth and responsive user experience.