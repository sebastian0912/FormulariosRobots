
import { aviso } from "../Avisos/avisos.js";
import { urlBack } from "../model/base.js";

const uid = localStorage.getItem("idUsuario");

// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

//Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;


document.getElementById('botonC').addEventListener('click', async () => {
    // Obtener los valores de los campos de texto
    let Cedula = document.getElementById('Cedula').value;
    let Tipo_Documento = document.getElementById('Tipo_Documento').value;

    // guardar valores en el local storage se parado
    localStorage.setItem('Cedula', Cedula);
    localStorage.setItem('Tipo_Documento', Tipo_Documento);


    // redireccionar a la pagina de policivo
    window.location.href = "../Adres/policivo.html";

    
});
