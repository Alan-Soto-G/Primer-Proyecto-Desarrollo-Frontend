export default class Helper {
    static async loadView(viewName, data = {}) {
      const html = await fetch("./pages/${viewName}/${viewName}.html").then(
        (res) => res.text()
      );
      
      console.log(html)
      const container = document.getElementById("contenedor");
      container.innerHTML = html;
  
      // ⚙ Ejecutar JS correspondiente
      const module = await import("../pages/${viewName}/${viewName}.js");
      if (typeof module.init === "function") {
        module.init({ navigateTo: this.loadView, data });
      }
    }
  }