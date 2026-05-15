# DevFinder - GitHub Profile Intelligence

A portfolio-grade GitHub profile search app built with React, Vite, and Tailwind CSS. Search any GitHub username and inspect their public profile, repository signal, social links, profile completeness, and recent lookup history in a polished responsive interface.

## Live Demo

https://msadafk.github.io/github-user-search-app/

## Highlights

- Search GitHub users through the GitHub REST API
- Fetch profile details and recent public repositories
- Featured repository cards sorted by stars
- Profile completeness indicator based on public signals
- Recent search history persisted in local storage
- Light and dark theme with persisted preference
- Loading skeleton, API error handling, and request-limit hint
- Responsive dashboard layout for mobile, tablet, and desktop

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- GitHub REST API

## API Endpoints

```txt
https://api.github.com/users/{username}
https://api.github.com/users/{username}/repos?sort=updated&per_page=8
```

## Getting Started

```bash
git clone https://github.com/MsadafK/github-user-search-app.git
cd github-user-search-app
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## What This Project Demonstrates

- Real API integration with async state management
- Component-driven React architecture
- Responsive UI design with practical product states
- Local storage for user preferences and search history
- Accessible form controls, external links, and loading feedback

## Author

Mohd Sadaf  
Frontend Developer

- GitHub: https://github.com/MsadafK
- LinkedIn: https://www.linkedin.com/in/mohd-sadaf/
