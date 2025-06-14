document.addEventListener("DOMContentLoaded", () => {
    fetch("projects.json")
        .then(res => res.json())
        .then(projects => {
            const cardsContainer = document.querySelector(".cards");
            const modal = document.getElementById("project-modal");
            const titleEl = document.getElementById("modal-title");
            const embedEl = document.getElementById("modal-video");
            const descEl = document.getElementById("modal-description");
            const closeBtn = document.getElementById("modal-close");

            function openProjectModal(project) {
                modal.classList.remove("active");
                titleEl.textContent = project.title;
                // Set author
                const authorEl = document.getElementById("modal-author");
                authorEl.textContent = project.author || "";
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
                embedEl.src = "";
                if (project.embedUrl) {
                    embedEl.src = project.embedUrl;
                    embedEl.style.display = "block";
                    embedEl.onerror = null;
                    embedEl.onerror = () => {
                        embedEl.style.display = "none";
                        descEl.textContent += "\n\n This embedded project failed to load. Try viewing it on the external site instead.";
                    };
                } else if (project.link) {
                    window.location.href = project.link;
                    return;
                } else {
                    embedEl.style.display = "none";
                }
                modal.classList.remove("hidden");
                modal.classList.add("active");
                cardsContainer.style.display = "none";
                history.pushState(null, "", `?project=${project.slug}`);
            }

            function closeProjectModal() {
                modal.classList.remove("active");
                modal.classList.add("hidden");
                cardsContainer.style.display = "";
                embedEl.src = ""; // stop video
                history.pushState(null, "", "index.html");
            }

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

            closeBtn.addEventListener("click", closeProjectModal);

            // Open modal if ?project=<slug> in URL
            const params = new URLSearchParams(window.location.search);
            const slug = params.get("project");
            if (slug) {
                const match = projects.find(p => p.slug === slug);
                if (match) openProjectModal(match);
            }

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && modal.classList.contains("active")) {
                    closeProjectModal();
                }
            });
        });
});