# Weesher
A simple, calming wishing website built with React. The page shows a quiet night sky, a small glowing candle, and gentle motion elements to create a peaceful atmosphere.

The name is inspired by the word greeter, meaning the person who welcomes people at the door or gate as soon as they arrive at big hotels. Similarly, Weesher is a website to wish someone as soon as they open it. The greeter is always welcoming, kind and gentle which also inspired to make Weesher gentle and peaceful.

It is designed to send wishes for occasions like Mother’s Day, Father’s Day, Valentine’s Day, birthdays, anniversaries, and more.

## Features

- Dark starry night background with slowly twinkling stars
- A single shooting star that crosses the screen every 15 seconds in a smooth diagonal path
- A glowing candle placed at the bottom center, animated using only CSS
- Background birthday music that plays when the page loads
- Works on all screen sizes
- Background music plays automatically when possible, and waits for user interaction if the browser blocks autoplay.

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Project

Start the development server:
```bash
npm run dev
```

## Build for Production

To create a production build:
```bash
npm run build
```

## Project Structure

```
birthday/
├── public/
│   └── hbd.mp3          # Background music
├── src/
│   ├── components/
│   │   └── StarryNight.jsx  # Starry night background component
│   ├── App.jsx          # Main app component
│   ├── App.css          # App styles (candle animations)
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

