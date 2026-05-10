# My Tasks — Todo App

A clean, modern todo list app built with plain HTML, CSS, and JavaScript. No frameworks, no dependencies, no setup required.

---

## Project Structure

```
project/
├── index.html    # App structure and layout
├── style.css     # All styles and design
└── script.js     # Todo logic and interactions
```

---

## How to Run

1. Download or copy all three files into the same folder
2. Double-click `index.html` to open it in your browser

That's it — no installation, no server needed.

---

## Features

- Add tasks by typing and pressing **Enter** or clicking **+**
- Mark tasks as complete with the circle checkbox
- Delete tasks (hover over a task to reveal the delete button)
- Filter tasks by **All**, **Active**, or **Done**
- Progress bar shows how many tasks are completed
- **Clear completed** button removes all done tasks
- Tasks are saved in the browser via `localStorage` — they persist across page refreshes

---

## File Overview

### `index.html`
The page structure — header with date and progress bar, input row, filter buttons, task list, and empty state.

### `style.css`
All the styling — warm off-white background, green accent colour, custom circular checkboxes, slide-in animations, and Google Fonts (DM Sans + DM Serif Display).

### `script.js`
All the logic — adding, toggling, deleting, and filtering tasks. Reads and writes to `localStorage` so your tasks are saved automatically.

---

## Usage

| Action | How |
|---|---|
| Add a task | Type in the input box → press Enter or click + |
| Complete a task | Click the circle on the left |
| Delete a task | Hover the task → click the × on the right |
| Filter tasks | Click All / Active / Done |
| Clear completed | Click "Clear completed" at the bottom |

---

## Notes

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- No internet connection required (except for loading Google Fonts)
- Data is stored in your browser's `localStorage` — clearing browser data will erase saved tasks
- No user accounts — tasks are local to the device and browser
