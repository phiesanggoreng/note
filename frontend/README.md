# NoteApp

A simple note-taking application built with React, TypeScript, and Tailwind CSS.  
Features include dark mode, markdown editing, badges, and user context.

## Features

- Create, edit, and delete notes
- Markdown editor for notes
- Badge system for achievements
- Dark mode toggle
- User context management
- Responsive UI with Tailwind CSS

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── App.css
│   ├── vite-env.d.ts
│   ├── assets/
│   │   └── react.svg
│   ├── Components/
│   │   ├── BadgeList/
│   │   │   └── BadgeList.tsx
│   │   ├── DarkModeToggle/
│   │   │   └── DarkModeToggle.tsx
│   │   ├── MarkdownEditor/
│   │   │   └── MarkdownEditor.tsx
│   │   └── NoteCard/
│   │       └── NoteCard.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── mockData.ts
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/USERNAME/REPOSITORY.git
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [react-router-dom](https://reactrouter.com/) (if used)

