# Weesher

Weesher is beautiful starry night wishing website with animated fireworks, a glowing candle, and background music, built with React. You can customize the text by yourself to wish birthday, mother's day, father's day, valentine's day and many more.

## Features
- Consists of 220 twinkling stars on a dark background with periodic shooting star animations every 16 seconds
- Music plays when the user click or touch with the page 
- Firework Animations to show the wish 


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

## INSTRUCTIONS TO CUSTOMIZE YOUR WISH:
- Go to  "src\components\FireworkAnimation.jsx"   and press Ctrl + F to search any of words "happy", "birthday", "to" to edit the wish.

## Project Structure

```
birthday/
├── public/
│   └── hbd.mp3          
├── src/
│   ├── components/
│   │   ├── StarryNight.jsx     
│   │   └── FireworkAnimation.jsx 
│   ├── App.jsx          
│   ├── App.css          
│   ├── index.css       
│   └── main.jsx         t
├── index.html
├── package.json
└── vite.config.js
```

## TECH STACK 

- React 18.2.0
- Vite 7.3.1
- HTML5 Canvas API
