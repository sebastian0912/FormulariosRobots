
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


document.addEventListener('DOMContentLoaded', function () {
    fetchEstadosRobots();
    const titulo = document.querySelector('#username');
    const perfil = document.querySelector('#perfil');
    const perfilLocal = localStorage.getItem("perfil");
    const usernameLocal = localStorage.getItem("username");
    titulo.innerHTML = usernameLocal;
    perfil.innerHTML = perfilLocal;
});

document.getElementById('botonC').addEventListener('click', () => {
    let Cedula = document.getElementById('Cedula').value;
    let Tipo_Documento = document.getElementById('Tipo_Documento').value;
    localStorage.setItem('Cedula', Cedula);
    localStorage.setItem('Tipo_Documento', Tipo_Documento);
    window.location.href = "../Adres/policivo.html";
});

function fetchEstadosRobots() {
    fetch('http://10.10.10.60:4545/EstadosRobots/sin_consultar')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching data:', error));
}

function populateTable(data) {
    const tableBody = document.querySelector('#estadoRobotsTable tbody');
    tableBody.innerHTML = ''; // Limpiar el contenido de la tabla antes de agregar nuevos datos
    data.forEach(estado => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${estado.id}</td>
            <td>${estado.cedula}</td>
            <td>${estado.tipo}</td>
            <td>${estado.Adres}</td>
            <td>${estado.Ofac}</td>
            <td>${estado.contraloria}</td>
            <td>${estado.Sisben}</td>
            <td>${estado.Producaduria}</td>
            <td>${estado.Fondopension}</td>
            <td>${estado.Union}</td>
            <td>${estado.fecha}</td>
        `;
        tableBody.appendChild(row);
    });
}


