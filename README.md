# Scratch Card React App

An interactive scratch card experience built with React and Canvas API. Users can scratch off a green overlay to reveal a promotional offer with smooth animations and touch support.

![Scratch Card Demo](./Screenshot%202025-12-01%20at%201.58.05%20PM.png)

## Features

- 🎨 Canvas-based scratch-off interaction
- 📱 Mobile-responsive with iPhone mockup frame
- ✨ Smooth scratching with interpolated drawing
- 🎯 Auto-reveal at 30% scratch completion
- 💚 Beautiful gradient overlay design
- 📋 Copy-to-clipboard coupon functionality
- 🖱️ Mouse and touch event support

## Tech Stack

- React 18
- Vite
- HTML5 Canvas API
- CSS3 Animations

## Getting Started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ScratchCard.jsx
│   └── ScratchCard.css
├── App.jsx
├── App.css
└── main.jsx
```

## How It Works

The scratch card uses HTML5 Canvas with `destination-out` composite operation to create the scratch effect. Touch and mouse events are tracked to draw transparent areas, revealing the content underneath. The app automatically completes the reveal when a threshold is reached.

## License

MIT
