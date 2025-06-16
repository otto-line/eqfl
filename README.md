

# Equipment for Living – Project Archive

This is the official project archive for the **Equipment for Living** class at the School for Poetic Computation (SFPC). Inspired by Kenneth Burke’s phrase, this site collects digital projects that explore media technologies as “equipment for living”—tools for orientation, reflection, and transformation.

## Site Overview

The site is a static web archive that displays student projects in a card layout. Each card can be clicked to open a modal with detailed information and an embedded interactive project (when available).

### Live version
[https://otto-line.github.io/eqfl/](https://otto-line.github.io/eqfl/)

---

## How to Add a New Project

To add a new project to the archive, follow these steps:

### 1. Update `projects.json`

Each project is defined as an object in the `projects.json` array. Add a new entry following this structure:

```json
{
  "title": "Project Title",
  "slug": "project-title",
  "image": "img/project-title.png",
  "alt": "Project Title thumbnail",
  "embedUrl": "webgl/project-title/",
  "external": false,
  "description": "A brief description of the project.",
  "author": "Your Name",
  "quarter": "Spring 2025",
  "links": [
    {
      "name": "Personal Website",
      "url": "https://yourwebsite.com"
    }
  ]
}
```

- `title`: The display name of the project.
- `slug`: A unique identifier used for organizing files (should be lowercase and hyphenated).
- `image`: Path to the thumbnail image.
- `alt`: Alt text for the thumbnail.
- `embedUrl`: Path to the embedded project, or leave empty if not available.
- `external`: Set to `true` if the project should open in a new tab instead of a modal.
- `description`: A short explanation of the project.
- `author`: The creator(s).
- `quarter`: Which class session the project was created for.
- `links`: Optional array of external links.

### 2. Add Thumbnail Image

Place the thumbnail image in the `img/` directory and make sure the path matches the one used in `projects.json`.

Recommended format: `.png` or `.webp`  
Recommended size: ~800×600px or responsive

### 3. Add Embed (Optional)

If your project includes a WebGL build or external webpage:
- Add the contents to `webgl/your-project-slug/`
- Reference it in `embedUrl` like so: `"embedUrl": "webgl/your-project-slug/"`

---

## Development Notes

This is a static site built with:
- HTML/CSS/JS
- A JSON file to manage project data
- No build tools required

To make local changes, clone the repo and open `index.html` in your browser or use a local server (e.g. `npx serve`).

---

## File Structure Overview

```
eqfl/
├── index.html            ← Homepage with project grid
├── about.html            ← Class info
├── main.css              ← Global styles
├── main.js               ← Dynamic modal & card rendering
├── projects.json         ← All project data
├── img/                  ← Thumbnails and project images
└── webgl/                ← WebGL embedding files
```

---

## Maintainers

Kevin Cunanan Chappelle
([https://kvnchpl.com](https://kvnchpl.com))

---