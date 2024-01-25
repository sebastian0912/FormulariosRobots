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


document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function () {
        if (this.files.length > 0) {
            // Cambiar el color del botón asociado
            this.nextElementSibling.style.backgroundColor = '#3dbc02';
        }
    });
});


function convertirImagenABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Extraer solo la parte Base64 de la cadena
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


function obtenerValoresTextos() {
    const valores = {};
    const inputsTexto = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]');
    inputsTexto.forEach(input => {
        valores[input.id] = input.value;
    });
    return valores;
}

async function obtenerValoresArchivos() {
    const valores = {};
    const inputsArchivo = document.querySelectorAll('input[type="file"]');
    for (let input of inputsArchivo) {
        if (input.files.length > 0) {
            const archivo = input.files[0];
            valores[input.id] = await convertirImagenABase64(archivo);
        }
    }
    return valores;
}


async function recopilarInformacion() {
    const valoresTexto = obtenerValoresTextos();
    const valoresArchivo = await obtenerValoresArchivos();
    return { ...valoresTexto, ...valoresArchivo };
}

// metodo post para crear un nuevo usuario
async function crearAdres(Estado_Contraloria, Anotacion_Contraloria, PDF_Contraloria, id, tipodedocumento) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/Robots/crear4';
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    id: id,
                    tipo_documento: tipodedocumento,
                    Estado_Contraloria: Estado_Contraloria,
                    Anotacion_Contraloria: Anotacion_Contraloria,
                    PDF_Contraloria: PDF_Contraloria,

                    jwt: jwtToken
                })
        })
            .then(response => {
                if (response.ok) {
                    aviso('Se ha creado el usuario correctamente', 'success');
                    return response.json();// aca metes los datos uqe llegan del servidor si necesitas un dato en especifico me dices
                    //muchas veces mando un mensaje de sucess o algo asi para saber que todo salio bien o mal
                } else {
                    aviso('Error en la petición POST', 'error');
                    throw new Error('Error en la petición POST');

                }
            })
            .then(responseData => {
                console.log('Respuesta:', responseData);
            })
            .catch(error => {
                aviso('Error en la petición POST', 'error');
                console.error('Error:', error);
            });

    } catch (error) {
        console.error('Error en la petición HTTP POST');
        console.error(error);
    }
}

document.getElementById('botonC').addEventListener('click', async () => {
    const informacion = await recopilarInformacion();

    // Imprimir cada campo individualmente
    console.log(informacion);

    // recuperar cedula y tipo de documento
    const cedula = localStorage.getItem("Cedula");
    const tipodedocumento = localStorage.getItem("Tipo_Documento");

    // Crear el usuario
    crearAdres(informacion.Estado_Contraloria, informacion.Anotacion_Contraloria, informacion.PDF_Contraloria, cedula, tipodedocumento);


});
