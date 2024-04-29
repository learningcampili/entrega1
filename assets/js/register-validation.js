window.addEventListener("load", () => {
  const form = document.querySelector("#register-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // para evitar que refresque la pagina
    //desetructuracion del objeto
    const { errors, nombre, apellido, email, password, fecha } = validaCampos();
    // si no hay errores envia los datos al backend
    if (Object.values(errors).length === 0) {
      console.log({ nombre, apellido, email, password, fecha, pais });
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
    const nombreField = document.querySelector("#nombre");
    const apellidoField = document.querySelector("#apellido");
    const emailField = document.querySelector("#email");
    const passwordField = document.querySelector("#password");
    const fechaField = document.querySelector("#fecha");
    const paisField = document.querySelector("#pais");

    // captura los valores ingresados x el usuario
    // el trim() saca espacios en blanco al inicio y al final

    const nombreValue = nombreField.value.trim();
    const apellidoValue = apellidoField.value.trim();
    const emailValue = emailField.value.trim().toLowerCase();
    const passwordValue = passwordField.value.trim();
    const fechaValue = fechaField.value.trim();
    let paisValue = "";
    paisField.onchange = function () {
      paisValue = paisField.value;
      console.log(paisvalue);
    };

    // valida nombre
    if (!nombreValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.nombre = "El nombre es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla(nombre, "El nombre es requerido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.nombre;
      validaOk(nombre);
    }
    // valida apellido
    if (!apellidoValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.apellido = "El apellido es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla(apellido, "El apellido es requerido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.apellido;
      validaOk(apellido);
    }
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

    // valida apellido
    if (!fechaValue) {
      // agrega al objeto errors la propiedad password con su valor
      errors.fecha = "El fecha es requerido";
      // ejecuta esta funcion para colocar el mensaje en el html
      validaFalla(fecha, "El fecha es requerido");
    } else {
      // si todo esta bien elimina la propiedad email del objeto errors
      delete errors.fecha;
      validaOk(fecha);
    }

    // retorna el objeto
    return {
      errors,
      nombre: nombreValue,
      apellido: apellidoValue,
      email: emailValue,
      password: passwordValue,
      fecha: fechaValue,
      pais: paisValue,
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
