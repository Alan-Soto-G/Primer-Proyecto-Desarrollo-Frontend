document.addEventListener("DOMContentLoaded", async function () {
    const selectBox = document.querySelector(".select-selected");
    const dropdown = document.querySelector(".select-items");

    async function LoadList() {
        try {
            const response = await fetch('http://127.0.0.1:5000/countries');
            const data = await response.json();

            data.forEach(country => {
                const code = Object.keys(country)[0];
                const name = country[code];
                const flagUrl = `https://flagsapi.com/${code.toLocaleUpperCase()}/shiny/64.png`;
                const fallbackFlag = "https://images.vexels.com/media/users/3/143536/isolated/lists/417c26e535aeb963a6e0a23d1f92df1d-signo-de-interrogacion-3d-degradado-gris.png"; // Imagen de respaldo

                const option = document.createElement("div");
                option.innerHTML = `<img src="${flagUrl}" alt="${name}" onerror="this.onerror=null; this.src='${fallbackFlag}';"> ${name}`;
                option.dataset.value = code;
                option.addEventListener("click", function () {
                    selectBox.innerHTML = `<img src = "${flagUrl}" alt="${name}" onerror="this.onerror=null; this.src='${fallbackFlag}';"> ${name}`;
                    dropdown.style.display = "none";
                });

                dropdown.appendChild(option);
            });

            selectBox.addEventListener("click", function () {
                dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            });

            document.addEventListener("click", function (e) {
                if (!selectBox.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.style.display = "none";
                }
            });

        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    }

    LoadList();
});