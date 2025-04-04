export default class Helper {
  static async loadView(viewName, data = {}) {
    const html = await fetch(`../pages/${viewName}/${viewName}.html`).then(
      (res) => res.text()
    );

    console.log(html);
    const container = document.getElementById("contenedor");
    container.innerHTML = html;

    const js = await import(`../pages/${viewName}/${viewName}.js`);
    if (typeof js.init === "function") {
      js.init({ data });
    }
  }
}
