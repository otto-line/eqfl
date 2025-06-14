document.addEventListener("DOMContentLoaded", () => {
    fetch("projects.json")
        .then((res) => res.json())
        .then((projects) => {
            const cardsContainer = document.querySelector(".cards");
            cardsContainer.innerHTML = "";

            projects.forEach((project) => {
                const card = document.createElement("div");
                card.className = "card";

                const img = document.createElement("img");
                img.src = project.image;
                img.alt = project.alt || project.title;
                img.width = 120;
                img.height = 90;

                const link = document.createElement("a");
                link.href = project.link;
                link.textContent = project.title;

                card.appendChild(img);
                card.appendChild(link);
                cardsContainer.appendChild(card);
            });
        })
        .catch((err) => {
            console.error("Error loading project data:", err);
        });
});