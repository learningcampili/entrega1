addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector(".btn-menu");
  const menuItems = document.querySelector(".menu-items");
  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
    menuItems.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
  }
});

const handleFormSubmit = (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  console.log(data);

  const formJSON = Object.fromEntries(data.entries());
  console.log(formJSON);

  // if (!formJSON.email || !formJSON.password) {
  //   return alert("El mail y la contraseña son obligatorios");
  // }

  alert(`Para ser enviado al backend\n\n ${JSON.stringify(formJSON, null, 2)}`);

  form.reset();
};
