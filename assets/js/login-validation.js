window.addEventListener("load", () => {
  const form = document.querySelector("#login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // para evitar que refresque la pagina
    //desetructuracion del objeto
    const { errors, email, password } = validaCampos();
    // si no hay errores envia los datos al backend
    if (Object.values(errors).length === 0) {
      console.log({ email, password });
      localStorage.setItem("user", email);
      // limpia el formulario
      form.reset();
      window.location.replace("index.html");
    }
  });

  const validaCampos = () => {
    // se crea un onjeto erros para capturar los errores
    let errors = {};
    //captura los campos para trabajar
    const emailField = document.querySelector("#email");
    const passwordField = document.querySelector("#password");
    // captura los valores ingresados x el usuario
    // el trim() saca espacios en blanco al inicio y al final
    const emailValue = emailField.value.trim().toLowerCase();
    const passwordValue = passwordField.value.trim();

    //validando campo email
    if (!emailValue) {
      // agrega al objeto errors la propiedad email con su valor
      errors.email = "El email es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla(email, "El email es requerido");
    } else if (!validaEmail(emailValue)) {
      // agrega al objeto errors la propiedad email con su valor
      errors.email = "El email ingresado no es valido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla(email, "El email ingresado no es valido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.email;
      validaOk(email);
    }
    //validando campo password
    if (!passwordValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.password = "La contraseña es requerida";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla(password, "La contraseña es requerida");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.password;
      validaOk(password);
    }

    // retorna el objeto
    return {
      errors,
      email: emailValue,
      password: passwordValue,
    };
  };

  const validaFalla = (input, msg) => {
    const formControl = input;
    const aviso = formControl.nextElementSibling;
    aviso.innerText = msg;
    aviso.classList.add("error");
  };

  const validaOk = (input) => {
    const formControl = input;
    const aviso = formControl.nextElementSibling;
    aviso.classList.remove("error");
    //aviso.classList.add("ok");
  };

  const validaEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };
});
