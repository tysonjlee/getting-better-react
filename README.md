# Getting Better

Getting Better is a simple note-taking web app focused on mental health self-reflection. Created as a personal project for my own healing, it encourages you to capture negative thoughts or feelings in the moment, saving them as notes to revisit and respond to for perspective.

---

## Licenses & Credits

This project makes use of the following third-party resources. All assets are used in compliance with their respective licenses.

### Images, Graphics, & Icons

- [Line Awesome](https://icons8.com/line-awesome)

### Fonts

- [Google Fonts](https://fonts.google.com/)

---

## Tech Stack

### Framework & Tooling

- React
- Vite
- Node.js & npm
- VS Code
- Tailwind CLI
- PostCSS
- Prettier
- ESLint
- HTMLHint

### Languages

- JavaScript (ES6+)
- HTML5 (via JSX)
- CSS3

### Styling & UI

- Tailwind CSS v4
- shadcn/ui

### Version Control

- Git/GitHub

---

## Documentation

The documentation below is for my personal use :p

### v0.1 - MVP (I)

- Home page
  - Display user's saved notes (no save persistence)
  - Save a note

### v0.2 - MVP (II)

- Home page updates
  - Visual notes
- Notes Manager page
  - Visual notes
- Save persistence (locally store user's notes)

### v0.3 - MVP (III)

- Home Page updates
  - Remove note creation
- Notes Manager updates
  - Note timestamps
  - Edit a note
  - Delete a note
- Deleted Notes page
  - Recover a note
- Navigation bar
  - Create a note globally

### v0.4 - MVP (IV)

- Global styling
  - Consistent fonts
  - Color palette
  - Note cards styling
- Navigation Bar styling
  - Overall polish

### v0.5 - MVP (V)

- (Organization Refactor) - remove Deleted Notes page & centralize into Notes Manager page
- User Accounts - profile page, login, auth, etc.
- Note Modal - click on a note to open a detailed view of it
- Note Tags - tag a note with conditions/feelings such as "Depression", "Anxiety", etc.
- Pinned Notes - pin a note to your dashboard
- Search Query - search for relative notes by keywords or note content (AI implementation)
- Notes Manager Sorting & Filtering
  - Filtering:
    - By status
      - Show all notes
      - Unedited notes
      - Edited notes
      - Deleted notes
      - Only pinned notes
    - By tags (see noteTags in global.js)
  - Sorting:
    - By time
- Overall visual & UI/UX refactor (switch to React)
