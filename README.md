# 🎧 Spotify Clone (Web Music Player)

## 📌 Introduction
This is a **Spotify-inspired web music player** built as a learning project using **HTML, CSS, and JavaScript**. It loads playlists (folders) from the local directory, shows them as album cards, and lets you play `.mp3` files in the browser.

**Project Type:** Static frontend web app (runs in the browser) + local media assets

> **Note:** This project is not affiliated with, endorsed by, or connected to Spotify in any official capacity. It does not utilize Spotify accounts, services, or APIs.  
> This project has been developed solely for educational purposes.

## ✨ Project Features
- Spotify-like layout (sidebar, playlists, playbar)
- Auto-displays album/playlist cards from local folders
- Loads song list for a selected playlist
- Play / Pause, Next / Previous controls
- Seekbar for jumping to a specific position in the song
- Volume control + mute/unmute
- Responsive sidebar with hamburger menu (mobile-friendly)

## 🛠️ Technologies Used
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **Web Audio (HTML `<audio>` / `Audio()` API)**
- **Google Fonts (Roboto)** (loaded via CSS `@import`)
- **Node.js (optional)**: used only for the helper script `js/generateAlbums.js`

## 📁 Project Structure
```text
Spotify Clone/
├─ index.html
├─ favicon.ico
├─ css/
│  ├─ style.css
│  └─ utilities.css
├─ js/
│  ├─ script.js            # main player logic
│  └─ generateAlbums.js    # optional helper to create/update info.json
├─ images_and_icons/
│  ├─ logo.svg
│  ├─ play.svg
│  ├─ pause.svg
│  ├─ nextSong.svg
│  ├─ prevSong.svg
│  └─ ...
└─ songs/
   └─ audio/
      ├─ No Copyright Songs/
      │  ├─ info.json
      │  ├─ cover.jpg
      │  └─ *.mp3
      └─ ... (more playlists)
```

## 🚀 Installation / How to Run Locally
Because the app uses `fetch()` to read folders like `songs/audio/`, it should be run using a **local web server** (opening `index.html` directly may not work).

### Option A: VS Code Live Server (easiest)
1. Open the `Spotify Clone/` folder in VS Code.
2. Install the extension **Live Server** (by Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**.

### Option B: Python local server
1. Open a terminal in `Spotify Clone/`.
2. Run:
   - `python -m http.server 5500`
3. Open:
   - `http://localhost:5500/`

### Option C: Node.js simple server
1. Open a terminal in `Spotify Clone/`.
2. Run:
   - `npx http-server -p 5500`
3. Open:
   - `http://localhost:5500/`

## ▶️ Usage Instructions
1. Start the project using one of the local server options above.
2. On the home page, you’ll see **playlist/album cards**.
3. Click any card to load its songs.
4. Click a song in the list to play it.
5. Use the bottom playbar to:
   - Play/Pause
   - Go Previous/Next
   - Drag/click the seekbar
   - Adjust volume or mute

## 🌐 Live Demo  
- **Demo Link:** `Will be published upon completion of backend integration and resolution of outstanding issues.`

## 🎓 Academic / Learning Purpose

This project is intended for educational purposes and provides hands-on experience in:

- Developing user interface layouts using HTML and CSS  
- Implementing DOM manipulation and event handling with JavaScript  
- Managing browser-based audio playback functionality  
- Structuring and organizing project assets (icons, playlists, and JSON metadata)

## 🤝 Credits / Acknowledgements
This project was built while following **Tutorial 84** from *Sigma Web Development Course* by **Code with Harry**. The tutorial guided the core structure and player behavior — credit to the author for the walkthrough and teaching style.

For reference, this project is based on guidance from the tutorial by CodeWithHarry.  
GitHub: [CodeWithHarry](https://github.com/CodeWithHarry)   

## 👨‍💻 Developer Information
- **Name:** Nandan K S 
- **Course:** B.E Computer Science Engineering  
- **College:** MIT Kundapura  
- **Year:** 2025  

---

## 📝 License & Usage  

This repository is made available for educational and academic use.  
Its contents may be utilized for study, practice, and skill development purposes.

---

If you find this project helpful, please consider starring the repository and connecting with @nandank-s on GitHub. For any issues or suggestions, feel free to open an issue. Your support is greatly appreciated.

