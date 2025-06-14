document.addEventListener("DOMContentLoaded", () => {
    // Fetch project data from JSON file and initialize UI once loaded
    fetch("projects.json")
        .then(res => res.json())
        .then(projects => {
            const cardsContainer = document.querySelector(".cards");
            const modal = document.getElementById("project-modal");
            const titleEl = document.getElementById("modal-title");
            const embedEl = document.getElementById("modal-embed");
            const descEl = document.getElementById("modal-description");
            const closeBtn = document.getElementById("modal-close");

            /**
             * Displays the modal for a given project.
             * Populates title, author, description, links, and either embed or image fallback.
             */
            function openProjectModal(project) {
                // Set modal title and author
                modal.classList.remove("active");
                titleEl.textContent = project.title;

                // Set author
                const authorEl = document.getElementById("modal-author");
                authorEl.textContent = project.author || "";

                // Set modal description and external links
                descEl.textContent = project.description || "";

                // Set links
                const linksEl = document.getElementById("modal-links");
                linksEl.innerHTML = "";
                if (project.links && Array.isArray(project.links)) {
                    project.links.forEach(link => {
                        const a = document.createElement("a");
                        a.href = link.url;
                        a.textContent = link.name;
                        a.target = "_blank";
                        a.rel = "noopener noreferrer";
                        linksEl.appendChild(a);
                        linksEl.appendChild(document.createElement("br"));
                    });
                }

                // Clear and hide any existing embed
                embedEl.src = "";
                embedEl.style.display = "none";

                // Display embed if available, otherwise show fallback image
                const embedFallback = document.getElementById("modal-embed-fallback");
                embedFallback.innerHTML = "";

                if (project.embedUrl) {
                    embedEl.src = project.embedUrl;
                    embedEl.style.display = "block";
                    embedEl.onerror = null;
                    embedEl.onerror = () => {
                        embedEl.style.display = "none";
                        descEl.textContent += "\n\n This embedded project failed to load. Try viewing it on the external site instead.";
                    };
                } else if (project.image) {
                    const img = document.createElement("img");
                    img.src = project.image;
                    img.alt = project.alt || project.title;
                    img.classList.add("fallback-image");
                    embedFallback.appendChild(img);
                }
                // Activate the modal and hide the card grid
                modal.classList.add("active");
                cardsContainer.style.display = "none";
                history.pushState(null, "", `?project=${project.slug}`);
            }

            // Closes the project modal and restores the main card grid
            function closeProjectModal() {
                modal.classList.remove("active");
                cardsContainer.style.display = "";
                embedEl.src = ""; // stop video
                history.pushState(null, "", "index.html");
            }

            // Create a visual card for each project with image and link
            projects.forEach(project => {
                const card = document.createElement("div");
                card.className = "card";

                const img = document.createElement("img");
                img.src = project.image;
                img.alt = project.alt || project.title;
                img.width = 120;
                img.height = 90;

                const link = document.createElement("a");
                link.href = `?project=${project.slug}`;
                link.textContent = project.title;
                link.addEventListener("click", (e) => {
                    e.preventDefault();

                    // If project is marked as external, open in new tab instead of modal
                    if (project.external && project.embedUrl) {
                        const newWindow = window.open(project.embedUrl, "_blank", "noopener,noreferrer");
                        if (newWindow) newWindow.opener = null;
                        return;
                    }

                    openProjectModal(project);
                });

                card.appendChild(img);
                card.appendChild(link);
                cardsContainer.appendChild(card);
            });

            // Bind modal close button to closing behavior
            closeBtn.addEventListener("click", closeProjectModal);

            // If a project slug is present in the URL, open its modal directly
            const params = new URLSearchParams(window.location.search);
            const slug = params.get("project");
            if (slug) {
                const match = projects.find(p => p.slug === slug);
                if (match) openProjectModal(match);
            }

            // Allow closing modal with Escape key
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && modal.classList.contains("active")) {
                    closeProjectModal();
                }
            });
        });
});