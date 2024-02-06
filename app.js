// console.log("script conectado");

// Mapa de sustitución para encriptar
const mapaSustitucionEncriptar = {
    'a': 'd',
    'b': 'e',
    'c': 'f',
    'd': 'g',
    'e': 'h',
    'f': 'i',
    'g': 'j',
    'h': 'k',
    'i': 'l',
    'j': 'm',
    'k': 'n',
    'l': 'o',
    'm': 'p',
    'n': 'q',
    'o': 'r',
    'p': 's',
    'q': 't',
    'r': 'u',
    's': 'v',
    't': 'w',
    'u': 'x',
    'v': 'y',
    'w': 'z',
    'x': 'a',
    'y': 'b',
    'z': 'c',
    ' ': ' ',
};

// Mapa de sustitución para desencriptar
const mapaSustitucionDesencriptar = {
    'd': 'a',
    'e': 'b',
    'f': 'c',
    'g': 'd',
    'h': 'e',
    'i': 'f',
    'j': 'g',
    'k': 'h',
    'l': 'i',
    'm': 'j',
    'n': 'k',
    'o': 'l',
    'p': 'm',
    'q': 'n',
    'r': 'o',
    's': 'p',
    't': 'q',
    'u': 'r',
    'v': 's',
    'w': 't',
    'x': 'u',
    'y': 'v',
    'z': 'w',
    'a': 'x',
    'b': 'y',
    'c': 'z',
    ' ': ' ',
};

const textArea = document.getElementById("texto");
const mensajeEncriptado = document.getElementById("mensajeEncriptado");
const mensajeDesencriptar = document.getElementById("mensajeDesencriptar");
const mensajeAlerta = document.querySelector(".ningun-mensaje");
const imgMensaje = document.getElementById("imgMensaje");
const copiarMensaje = document.getElementById("btnCopiar");


// console.log(mensajeEncriptado)
// console.log(mensajeAlerta);

// Función para encriptar texto
const encriptar = (texto, mapa) => {

    const caracteresValidos = /^[a-z\s!?¡¿]*$/;//expresion regular 
    if (!caracteresValidos.test(texto)) {
        // Mostrar una notificación de error utilizando SweetAlert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Solo se permiten letras minúsculas y sin acentos!",
        }); 
        return; // Salir de la función si se encuentran caracteres inválidos
    }
    texto = texto.toLowerCase();

    // Inicializa una cadena para el texto encriptado
    let textoEncriptado = '';

    // Recorre cada carácter del texto y realiza la sustitución según el mapa de sustitución
    for (let i = 0; i < texto.length; i++) {
        const caracterOriginal = texto[i];
        const caracterEncriptado = mapa[caracterOriginal] || caracterOriginal; // Si el carácter no está en el mapa, se deja sin encriptar
        textoEncriptado += caracterEncriptado;
    }
    console.log(textoEncriptado);
    return textoEncriptado;
};

//Función para pintar el texto encriptado
const pintarTexto = (textoEncriptado) => {

    if (textoEncriptado.trim()) {

        mensajeAlerta.style.display = 'none';
        mensajeEncriptado.textContent = textoEncriptado;
        textArea.value = textoEncriptado;
        mensajeEncriptado.style.fontSize = '24px';
        imgMensaje.style.display = 'none';
        mensajeDesencriptar.style.justifyContent = 'space-between';
        copiarMensaje.style.display = 'block';

    } else {
        mensajeAlerta.style.display = 'block';
        mensajeEncriptado.textContent = 'Ingresa el texto que desees encriptar o desencriptar';
        mensajeEncriptado.style.fontSize = '16px';
        copiarMensaje.style.display = 'none';
        mensajeDesencriptar.style.justifyContent = 'center';


    } return;


};

// Función para desencriptar texto
const desencriptar = (texto, mapa) => {
    // Convierte el texto a minúsculas
    texto = texto.toLowerCase();

    // Inicializa una cadena para el texto desencriptado
    let textoDesencriptado = '';

    // Recorre cada carácter del texto y realiza la sustitución según el mapa de sustitución
    for (let i = 0; i < texto.length; i++) {
        const caracterOriginal = texto[i];
        const caracterDesencriptado = mapa[caracterOriginal] || caracterOriginal; // Si el carácter no está en el mapa, se deja sin desencriptar
        textoDesencriptado += caracterDesencriptado;
    }
    console.log(textoDesencriptado);
    return textoDesencriptado;
};

// Función para copiar el texto al portapapeles
const copiarTexto = (texto) => {
    // Intenta copiar el texto al portapapeles utilizando el API del navegador
    navigator.clipboard.writeText(texto)
        .then(() => {
            console.log("Texto copiado al portapapeles:", texto);
            copiarMensaje.textContent = "mensaje copiado";
            setTimeout(() => {
                copiarMensaje.textContent = "copiar mensaje";
            }, 1500); // 1500 milisegundos = 1.5 segundos
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "mensaje copiado",
                showConfirmButton: false,
                timer: 1500
              });
              return;

        })
        .catch((error) => {
            console.error("Error al copiar el texto:", error);

        });
};

addEventListener("click", (e) => {
    console.log(e.target.className);

    const contenidoTexto = textArea.value;
    const texto = mensajeEncriptado.textContent;

    if (e.target.id === "btnEncriptar") {
        // console.log("click a boton encriptar");
        // console.log({ contenidoTexto });
        const btnDesencriptar = document.getElementById("btnDesencriptar");
        const textoEncriptado = encriptar(contenidoTexto, mapaSustitucionEncriptar);
        pintarTexto(textoEncriptado);
        btnDesencriptar.disabled = false;
        e.target.disabled = true;
    }

    if (e.target.id === "btnDesencriptar") {
        console.log("click al boton de desencriptar");
        const contenidoTexto = textArea.value;
        const btnEncriptar = document.getElementById("btnEncriptar");
        const textoDesencriptado = desencriptar(contenidoTexto, mapaSustitucionDesencriptar);
        pintarTexto(textoDesencriptado);
        btnEncriptar.disabled = false;
        e.target.disabled = true;
    }

    // Copiar el texto al portapapeles
    if (e.target.id === "btnCopiar") {
        // console.log("click al boton copiar");
        copiarTexto(texto);
    }

});
