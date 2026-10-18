# StudySpace

Group study rooms with a shared whiteboard, built-in calculator, chat, mic/camera buttons and raise hand.

## Folder structure
```
index.html              main page
404.html                not-found page
manifest.json           app info
css/base.css            colours, buttons, inputs
css/home.css            landing page
css/room.css            study room, whiteboard, chat
css/calculator.css      calculator
js/core/                config, presence, rooms, permissions
js/features/            whiteboard, chat, media, calculator
js/main.js              app start
pages/help.html         how it works
assets/                 icons
```

## Put it live on GitHub Pages
1. Create a new repository on github.com (public).
2. Upload ALL files and folders from this zip (drag and drop), keeping the structure. `index.html` must be at the top level.
3. Open **Settings > Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. Wait 1 to 2 minutes. Your site opens at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

## Important: current limits (demo mode)
- Rooms, chat and whiteboard sync only between tabs of the **same browser**. Test by opening the site in two tabs.
- Mic and camera show only your own preview. Other people do not receive them yet.
- For real multi-user rooms you need Firebase (rooms, chat, board sync) and PeerJS or LiveKit (voice/video). See `js/core/config.js` and `js/core/presence.js` where the storage and broadcast layer lives.
