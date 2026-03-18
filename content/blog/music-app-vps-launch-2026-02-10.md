2026-01-21
Music App - First VPS Launch
Project Diary

This was my first full VPS deployment and one of my biggest achievements since I started studying on 2024-07-04.

I shipped a real production stack: frontend on GitHub Pages, backend plus Postgres metadata on the VPS, and assets on Cloudflare R2 object storage. It took about a week and a lot of troubleshooting.

That process forced me to understand Linux and macOS file tree structure for real deployment work: /var/www, /opt, /usr/bin, /etc, and how Nginx serves the app. I also learned how SSH deployment workflows connect a VPS with GitHub.

At the start I had no music assets, so I scraped audio from a public source. I began with Playwright plus custom headers, then moved to a headless background workflow for better efficiency.

For this project, I used Antigravity overall and leaned heavily on ChatGPT and Google AI Studio to build the app, but I did the deployment wiring and debugging myself. This project gave me my first real foundation in VPS deployment and clarified the difference between personal cloud storage and object storage like R2.

Before this project, I mostly worked on GitHub and GitHub Pages. I rarely use Render or Vercel because I prefer to invest my time in coding, architecture, and core concepts rather than abstracted deployment platforms.

Skills gained: VPS deployment, Linux file structure, Nginx basics, SSH workflows, backend-frontend integration, and practical use of Antigravity for end-to-end builds.
