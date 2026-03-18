<!-- # LAB | React Weather Dashboard :partly_sunny: -->

## Introduction :book:

In this lab, you will build a **React weather dashboard** where users can search for a city and display its weather information.

The goal is to practice:

- controlled forms in React
- API requests with `fetch`
- conditional rendering
- loading and error states
- reusable components
- state management with `useState` and `useEffect`

For the API, this lab uses **Open-Meteo** because it provides a **geocoding API** to search by city name and a **weather forecast API** to retrieve forecast data by latitude/longitude. Their documentation also states that the weather API is free to use and the geocoding endpoint accepts a search term and returns matching locations.  [open-meteo.com](https://open-meteo.com/en/docs/geocoding-api?utm_source=chatgpt.com)

<br>

---

## Learning Objectives :notebook:

By the end of this lab, you will be able to:

1. Build a search interface in React using a controlled input.
2. Fetch geocoding data from an external API based on a city name.
3. Fetch weather data using coordinates returned by the geocoding API.
4. Manage multiple UI states: idle, loading, success, and error.
5. Display weather information using reusable React components.
6. Improve the user experience with validation and conditional rendering.

<br>

---

## Recommended Difficulty

This is a **slightly advanced React lab**.

Students should already be comfortable with:

- components
- props
- `useState`
- `useEffect`
- basic TypeScript or JavaScript
- basic `fetch`

<br>

---

## Project Brief :computer:

Build a weather application where the user can:

1. Enter a **city name**
2. Submit the form
3. See:
   - city name
   - country
   - current temperature
   - wind speed
   - weather condition
4. Handle:
   - invalid city names
   - loading state
   - request errors

<br>

---

## Suggested Tech Stack :hammer_and_wrench:

- React
- Vite
- CSS modules, plain CSS, or Tailwind
- Fetch API

<br>

---

## API Flow :satellite:

### Step 1 — Search the city

Use the Open-Meteo **Geocoding API** to convert the city name into coordinates.

Example:

```text
https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=1&language=en&format=json
```

The geocoding API accepts a search term and returns matching locations.  [open-meteo.com](https://open-meteo.com/en/docs/geocoding-api?utm_source=chatgpt.com)

### Step 2 — Fetch the weather

Use the latitude and longitude returned by the geocoding API to call the Open-Meteo **Forecast API**.

Example:

```text
https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto
```

The forecast API allows weather retrieval by geographic coordinates and supports current weather variables.  [open-meteo.com](https://open-meteo.com/en/docs?utm_source=chatgpt.com)

<br>

---

# Instructions :rocket:

## Level 1 — Project Setup :seedling:

TypeScript Project:

```bash
npm create vite@latest react-weather-lab -- --template react-ts
cd react-weather-lab
npm install
npm run dev
```

<br>

---

## Level 2 — Create the Basic UI :art:

Create a page with:

- an application title
- a short description
- an input for the city name
- a search button

Example structure:

```jsx
<h1>Weather Dashboard</h1>
<p>Search the weather by city name</p>

<form >
  <input type="text" placeholder="Enter a city" />
  <button  type="submit">Search</button>
</form>
```

### Requirements

- Use a **controlled input**
- Prevent empty submissions
- Store the city name in state

<br>

---

## Level 3 — Search for a City :mag:

When the user submits the form:

1. Call the geocoding API
2. Take the first matching result
3. Save:
   - city name
   - country
   - latitude
   - longitude

### Example fetch

```js
const response = await fetch(
  `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
);
const data = await response.json();
```

### Requirements

- If no result is found, display:
  - `City not found`
- Show a loading state while the request is in progress
- Handle fetch errors

<br>

---

## Level 4 — Fetch the Weather :cloud:

Once you have the coordinates, make a second request to the weather API.

### Example fetch

```js
const response = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`
);
const data = await response.json();
```

### Display

Show at least:

- city name
- country
- temperature
- wind speed
- weather code

<br>

---

## Level 5 — Display the Result in a Reusable Component :building_construction:

Create a component called:

```text
WeatherCard
```

Suggested props:

```js
{
  city,
  country,
  temperature,
  windSpeed,
  weatherCode
}
```

Example usage:

```jsx
<WeatherCard
  city="Paris"
  country="France"
  temperature={22}
  windSpeed={15}
  weatherCode={1}
/>
```

### Goal

Separate:

- search logic
- API logic
- display logic

<br>

---

## Level 6 — Improve the UX :sparkles:

Add the following states:

### Loading State

Display a message such as:

```text
Loading weather...
```

### Error State

Display a message such as:

```text
Something went wrong. Please try again.
```

### Empty State

Before any search, show:

```text
Search for a city to see the weather.
```


<br>

---

# Suggested Folder Structure :open_file_folder:


TypeScript version:

```text
src/
├── components/
│   └── WeatherCard.tsx
├── utils/
│   └── weatherCode.ts
├── App.tsx
├── main.tsx
└── index.css
```

<br>

---
