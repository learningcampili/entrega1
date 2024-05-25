window.addEventListener("load", () => {
  const form = document.querySelector("#register-form");

  // const checkbox = document.querySelector("#acepta");
  // checkbox.addEventListener("click", () => {
  //   if (checkbox.checked == true) {
  //     console.log("yes");
  //   } else {
  //     console.log("no");
  //   }
  // });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // para evitar que refresque la pagina
    //desetructuracion del objeto
    const { errors, name, apellido, email, password, fecha, pais, acepta } =
      validaCampos();
    // si no hay errores envia los datos al backend
    if (Object.values(errors).length === 0) {
      console.log({
        name,
        apellido,
        email,
        password,
        fecha,
        pais,
        acepta,
      });
      // alert(
      //   JSON.stringify({
      //     nombre,
      //     apellido,
      //     email,
      //     password,
      //     fecha,
      //     pais,
      //   })
      // );
      // limpia el formulario
      form.reset();
    }
  });

  const validaCampos = () => {
    // se crea un onjeto erros para capturar los errores
    let errors = {};
    //captura los campos para trabajar
    const nombreField = document.querySelector("#name");
    const apellidoField = document.querySelector("#apellido");
    const emailField = document.querySelector("#email");
    const passwordField = document.querySelector("#password");
    const fechaField = document.querySelector("#fecha");
    const paisField = document.querySelector("#pais");
    const aceptaField = document.querySelector("#acepta");

    // captura los valores ingresados x el usuario
    // el trim() saca espacios en blanco al inicio y al final

    const nombreValue = nombreField.value.trim();
    const apellidoValue = apellidoField.value.trim();
    const emailValue = emailField.value.trim().toLowerCase();
    const passwordValue = passwordField.value.trim();
    const fechaValue = fechaField.value.trim();
    const paisValue = paisField.value.trim();
    const aceptaValue = aceptaField.value.trim();

    // valida nombre
    if (!nombreValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.name = "El nombre es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla("name", "El nombre es requerido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.name;
      validaOk("name");
    }
    //valida apellido
    if (!apellidoValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.apellido = "El apellido es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla("apellido", "El apellido es requerido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.apellido;
      validaOk("apellido");
    }
    //validando campo email
    if (!emailValue) {
      // agrega al objeto errors la propiedad email con su valor
      errors.email = "El email es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla("email", "El email es requerido");
    } else if (!validaEmail(emailValue)) {
      // agrega al objeto errors la propiedad email con su valor
      errors.email = "El email ingresado no es valido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla("email", "El email ingresado no es valido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.email;
      validaOk("email");
    }
    //validando campo password
    if (!passwordValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.password = "La contraseña es requerida";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla("password", "La contraseña es requerida");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.password;
      validaOk("password");
    }

    // valida fecha
    if (!fechaValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.fecha = "La fecha es requerida";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla("fecha", "La fecha es requerida");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.fecha;
      validaOk("fecha");
    }
    // valida pais
    if (!paisValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.pais = "El país es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla("pais", "El país es requerido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.fecha;
      validaOk("pais");
    }

    if (aceptaField.checked == true) {
      delete errors.acepta;
      aceptaField.value = true;
      validaOk("acepta");
    } else {
      errors.acepta = "Debes aceptar los términos y condiciones";
      validaFalla("acepta", "Debes aceptar los términos y condiciones");
    }

    // retorna el objeto
    return {
      errors,
      name: nombreValue,
      apellido: apellidoValue,
      email: emailValue,
      password: passwordValue,
      fecha: fechaValue,
      pais: paisValue,
      acepta: aceptaValue,
    };
  };

  const validaFalla = (input, msg) => {
    let aviso = document.querySelector(`#${input}Error`);
    aviso.textContent = msg;
    aviso.classList.add("error");
    aviso.classList.remove("ok");
  };

  const validaOk = (input) => {
    let aviso = document.querySelector(`#${input}Error`);
    aviso.classList.remove("error");
    aviso.classList.add("ok");
  };

  const validaEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };
});
