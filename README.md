# Weesher


A beautiful starry night wishing website with a glowing candle and wishing animation, built with React.

## Features

- ✨ **Starry Night Background** - Dark night sky with twinkling stars (inspired by After Dark screensaver)
- 🌠 **Shooting Star** - Animated shooting star that appears every 15 seconds, moving from left to right in an upward diagonal path
- 🕯️ **Glowing Candle** - Animated CSS candle with flickering flame at the bottom center
- 🎵 **Background Music** - Auto-playing birthday music (hbd.mp3)

- 🌙 **Pure CSS Animations** - Smooth, lightweight animations without heavy 3D libraries
- 📱 **Responsive Design** - Works on all screen sizes

## How It Works

- **StarryNight Component**: Uses HTML5 Canvas to render twinkling stars on a dark background with periodic shooting star animations
- **Candle**: Pure CSS animation with flame effects, positioned at the bottom center
- **Background Music**: Auto-plays when the page loads (with fallback for user interaction if autoplay is blocked)

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

The built files will be in the `dist` folder.

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Canvas API** - For starry night background animation

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

Enjoy the birthday celebration! 🎉
