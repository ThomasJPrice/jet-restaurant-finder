# JET Restaurant Finder

A web interface for finding restaurants near you using the Just Eat Takeaway.com API. Built as part of the Just Eat Takeaway.com Early Careers Software Engineering Programme.

**[Live Demo](https://jet-restaurant-finder.vercel.app/)**

---

## Overview

Enter a UK postcode to retrieve and display the 10 nearest restaurants, showing 4 data points - the name, cuisines, rating and address.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/ThomasJPrice/jet-restaurant-finder
cd jet-restaurant-finder
npm install
```

### Environment variables

Create a `.env.local` file in the root of the project:

```
JET_BASE_URL=https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode
```

### Running locally

```bash
npm run dev
```

Open http://localhost:3000 and enter a UK postcode - e.g. `CT1 2EH`.

---

## Architecture and design decisions

- **searchParams over useState** - search state lives in the URL, making results shareable and bookmarkable.
- **Suspense boudnary around results only** - the form stays visible during loading, keys force the fallback to reshow on every new search.
- **Typed error results** - `fetchRestaurants` returns `{ ok: true, data }` or `{ ok: false, error }` rather than throwing, making error handling explicit
- **Data transformation at the boundary** -  raw API data is mapped to a clean `Restaurant` type in `mapRestaurant`, decoupling components from the API shape to make it easier for development with no knowledge of the API.
- **Client and server validation** - postcode is validated client-side for instant feedback, and again server-side as a defensive measure

---

## Assumptions

- The API returns results in a `restaurants` array on the response object. This array includes non-restaurant places like supermarkets (e.g. Morrisons), as these are classified as restaurants within the API. The application displays these without filtering by type.
- Cuisines are defined in the API. Some values like 'Deals', 'Collect stamps' and 'Freebies' appear as cuisines in the API response and are displayed as such.

---

## Improvements I would make

- **Cuisine filtering** - filter restaurants by cuisine type via an additional searchParam (e.g. `?postcode=CT12EH&cuisine=italian), so filtered views would also be shareable. 
- **Sorting** - sort the top 10 returned restaurants by rating client side. This sort would operate on the results already returned by the API rather than re-querying.
- **Postcode autocomplete** - a suggestion list as the user types, using the postcodes.io API, reducing input errors.
- **Pagination or load more** - the API returns way more than 10 results. A load more button could show additional restaurants without overwhelming the initial view.

---

## Tech stack

- Next.JS 16 - App router, server components, suspense
- Typescript
- Tailwind CSS
- Jest - unit testing
- Vercel - deployment