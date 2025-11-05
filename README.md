# FinnDuel Sportsbook - MLB The Show Betting Demo

A React-based betting interface mockup for MLB The Show match content.

## Features

- **FinnDuel Sportsbook Branding**: Gold and dark blue professional design
- **Video Player**: Embedded video player for MLB The Show matches
- **Three Key Markets**:
  - Moneyline (inc. OT)
  - Run Total (inc. OT)
  - Run Spread (inc. OT)
- **Dynamic Market Status**: Markets visually suspend and open based on video timestamps
- **Smooth Animations**: Powered by Framer Motion

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your video file:
   - Place your MLB The Show video in the `public` folder
   - Name it `mlb-the-show-match.mp4` (or update the source path in `FinnDuelSportsbook.js`)

3. Configure timestamps:
   - Open `src/FinnDuelSportsbook.js`
   - Update the `timeStamps` array (around line 13) with your specific times:
     ```javascript
     const timeStamps = [
       { start: 10, end: 25, status: 'suspended' },
       { start: 40, end: 55, status: 'suspended' },
       // Add more timestamps as needed
     ];
     ```

4. Customize team names and odds:
   - Update the `markets` array (around line 313) with your specific matchup details

## Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

## Project Structure

```
mlb-show-betting-demo/
├── public/
│   ├── index.html
│   └── [your-video-file.mp4]
├── src/
│   ├── App.js
│   ├── FinnDuelSportsbook.js  (main component)
│   ├── index.js
│   └── index.css
└── package.json
```

## Customization

- **Colors**: Update the gradient and gold color in the `styles` object
- **Market Types**: Modify the `markets` array to add/remove betting options
- **Layout**: Adjust flex properties in the `styles` object for different screen sizes
