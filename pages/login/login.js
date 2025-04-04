import Helper from "../../utils/helper.js";
export function init({ navigateTo, data }) {
  console.log("Login page initialized", data);
  const $button = document.getElementById("btn-login");

  $button.addEventListener("click", (e) => {
    const nickname = "Nombre del usuario"; // Obtener el valor del input de nombre de usuario
    const pais = "Argentina"; // Obtener el valor del input de país

    const nuevadata = { nickname, pais, ...data };
    console.log(nuevadata);
    Helper.loadView("juego", nuevadata);
  });
}
