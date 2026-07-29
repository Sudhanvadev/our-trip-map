# 🛕 Gujarat Darshan 2026 — AI-Powered Trip Map

An interactive, AI-powered web app for our group trip to Gujarat — **August 22–28, 2026**.  
Built with HTML, Tailwind CSS, Leaflet.js, and a custom AI Traffic Engine.

---

## 🗺️ Trip Route

| Day | Date | Stops | Night Stay |
|-----|------|-------|------------|
| Pre-Day | Aug 22 | 🚉 Udupi Railway Station | Train |
| Day 1 | Aug 23 | Sardar Sarovar Dam → Statue of Unity → Poicha Temple | Chotila |
| Day 2 | Aug 24 | Chotila Temple → Virpur Temple → Khodaldham → Jambhuvan Caves | Dwarka |
| Day 3 | Aug 25 | Dwarkadhish Temple → Nageshwar Jyotirlinga → Bet Dwarka → Shivrajpur Beach → Rukmini Devi Temple | Dwarka |
| Day 4 | Aug 26 | Somnath Temple → Bhalka Tirth → Triveni Sangam → Somnath Beach | Somnath |
| Day 5 | Aug 27 | Nishkalank Mahadev Temple → Salangpur Hanuman Temple | Salangpur |
| Day 6 | Aug 28 | Akshardham Temple → Adalaj Ni Vav → 🚂 Ahmedabad Junction (3:05 PM) | — |

---

## 🚀 How to View

1. **Download / clone** this folder to your computer.
2. **Open** `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. No internet connection required for the app logic — only the map tiles and fonts need the internet.

> ✅ Works best on Chrome or Edge with a stable internet connection for map tiles.

---

## ✨ Features

### 🗺️ Interactive Map
- **Light-themed Leaflet map** with numbered custom pins for every location
- **3 map views**: Default (OpenStreetMap), Satellite (Esri), Terrain (OpenTopo)
- **Click any route line** between stops to see the drive time, distance & traffic level
- **Animated route draw** on page load
- **Auto-pan & zoom** when you click a day or location in the sidebar

### 📋 Itinerary Sidebar
- Full scrollable timeline with all 6 days + pre-departure
- Each location shows: emoji, name, time, description, Google Maps link, and Directions link
- Clicking any location flies the map to that pin and opens its popup
- **Night stay** shown at the bottom of each day card
- **AI drive time pill** (🚗 ~Xhr) shown on each day card

### 🤖 AI Trip Assistant
- Click the **"AI Assistant"** button (top-right) to open the chat panel
- Ask things like:
  - *"Drive time Day 2?"*
  - *"Optimize Day 3 schedule"*
  - *"When to leave for Somnath?"*
  - *"August traffic tips"*
  - *"Trip budget estimate"*
- **Quick Query Bar** in the sidebar for instant answers without opening the panel

### 📊 Trip Dashboard
- Click the **📊 bar chart icon** in the header for:
  - Total trip distance (AI-calculated)
  - Total driving hours
  - Day-by-day drive time bar chart
  - August monsoon advisory

### ⏳ Live Features
- **Countdown timer** — ticking seconds countdown to August 22
- **Live clock & date** (IST / Asia/Kolkata)
- **Progress bar** — shows % of trip completed during the trip dates
- **"● NOW"** badge on the current day's card during the trip
- **Real-time tracking dot** on the map during the trip

### 🖼️ Photo Popups
- Click any map pin to see a popup with location photo, info, tips, and links
- Click the photo to open a full-size modal

### 🔗 Share Button
- **"Share"** button copies the current page URL to clipboard

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Close modals / reset map view |
| `Ctrl + A` | Open AI Assistant panel |

---

## ⚠️ Important Reminders

- 🌊 **Nishkalank Mahadev (Day 5):** Only accessible at **low tide**. Check tide timings the night before!
- 🚂 **Day 6:** Must reach **Ahmedabad Junction by 2:00 PM** for the 3:05 PM train.
- 🌧️ **August monsoon:** All AI drive times include a +30% delay factor for wet roads.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 + Vanilla JS | App structure & logic |
| Tailwind CSS v3 (CDN) | Styling |
| Leaflet.js v1.9.4 | Interactive map |
| Google Fonts (Inter, Outfit) | Typography |
| Custom `TripAI` Engine | AI traffic & time calculations |

---

*Made with ❤️ for our Gujarat Darshan group trip 🙏*
