2026-02
File Organizer Pro - First macOS Desktop App
Project Diary

This was my first macOS desktop app and it came from a very real problem: my files were messy across pCloud, iCloud, and other drives. I wanted a clean, button-driven way to organize everything, so I started with a simple, neat UI and built the pipeline logic behind it.

The project took about two weeks. Designing the web UI and the pipeline logic took longer than I expected, but it was worth it. The app can remove duplicate files, auto-rename, group files by metadata timeline, and transfer each target output automatically. It was fun to build because it directly improved my own file system.

While I was working on this, Claude’s “coworker” feature launched, and I incorporated it into my workflow.

After local testing, I packaged the app as a .dmg using Tauri. I chose Tauri because Electron felt too heavy. That taught me versioning and iteration cycles (v0.1.0, v0.1.1) and how Tauri stays lightweight by leaning on native OS integration and WebView rather than a bundled Chromium.

Skills gained: desktop app packaging, Tauri fundamentals, versioning discipline, pipeline design, metadata-driven file operations, and front-end/back-end integration.
