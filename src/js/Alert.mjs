export default class Alert {
    constructor() {
        this.loadAlerts();
    }

    async loadAlerts() {
        try {
            const response = await fetch("/json/alerts.json");
            const data = await response.json();

            if (data.length > 0) { 
                if (!document.querySelector(".alert-list")) {
                    const section = document.createElement("section");
                    section.className = "alert-list";

                    data.forEach(alert => {
                        const p = document.createElement("p");
                        p.textContent = alert.message;
                        p.style.background = alert.background;
                        p.style.color = alert.color;
                        p.style.textAlign = "center";
                        section.appendChild(p);
                    });

                    const main = document.querySelector("main");
                    if (main) {
                        main.prepend(section);
                    }
                }

            }
        } catch (error) {
            console.error("Failed to load alerts:", error);
        }
    }
}