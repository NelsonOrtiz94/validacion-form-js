// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAh5J1c_WYyNAEefWVq2FjiOIlD6CpAruU",
    authDomain: "datos-formulario-9154a.firebaseapp.com",
    projectId: "datos-formulario-9154a",
    storageBucket: "datos-formulario-9154a.appspot.com",
    messagingSenderId: "748097557492",
    appId: "1:748097557492:web:c007ac3aac83bc37ffdfa1",
    measurementId: "G-B889QNJJ4M"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Inicializar Cloud Firestore y obtener una referencia al servicio
  const db = firebase.firestore();
  
  document.getElementById("formulario").addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Validar campo nombre
    let entradaNombre = document.getElementById("name");
    let errorNombre = document.getElementById("nameError");
  
    if (entradaNombre.value.trim() === "") {
      errorNombre.textContent = "Introducir nombre";
      errorNombre.classList.add("error-message");
    } else {
      errorNombre.textContent = "";
      errorNombre.classList.remove("error-message");
    }
  
    // Validar correo electrónico
    let emailEntrada = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if (!emailPattern.test(emailEntrada.value)) {
      emailError.textContent = "Introducir Email valido";
      emailError.classList.add("error-message");
    } else {
      emailError.textContent = "";
      emailError.classList.remove("error-message");
    }
  
    // Validar la contraseña
    let contrasenaEntrada = document.getElementById("password");
    let contrasenaError = document.getElementById("passwordError");
    let contrasenaPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
  
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
      contrasenaError.textContent =
        "La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales";
      contrasenaError.classList.add("error-message");
    } else {
      contrasenaError.textContent = "";
      contrasenaError.classList.remove("error-message");
    }
  
    // Si son válidos, enviar formulario
    if (
      !errorNombre.textContent &&
      !emailError.textContent &&
      !contrasenaError.textContent
    ) {
      // Backend que reciba la información
  
      db.collection("users").add({
          nombre: entradaNombre.value,
          mail: emailEntrada.value,
          password: contrasenaEntrada.value
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
  
      alert("El formulario ha sido enviado con éxito");
      document.getElementById("formulario").reset();
    }
  });
  