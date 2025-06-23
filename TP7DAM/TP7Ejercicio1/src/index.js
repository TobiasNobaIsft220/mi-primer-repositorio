"use strict";
;
;
const fechaActual = "2025-6-22";
let cantidadLibros = 0;
let cantidaLibrosTarde = 0;
const librosPrestados = [
    {
        titulo: "1984",
        autor: "George Orwell",
        isbn: "978-0-452-28423-4",
        fechaPrestamo: "2025-5-23",
        fechaDevolucionPrevista: "2025-6-10",
        tipoUsuario: "Profesor"
    },
    {
        titulo: "Sapiens: De animales a dioses",
        autor: "Yuval Noah Harari",
        isbn: "978-84-9181-681-6",
        fechaPrestamo: "2025-5-18",
        fechaDevolucionPrevista: "2025-6-4",
        tipoUsuario: "Profesor"
    },
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        isbn: "978-0-06-088328-7",
        fechaPrestamo: "2025-4-25",
        fechaDevolucionPrevista: "2025-5-9",
        tipoUsuario: "Profesor"
    },
    {
        titulo: "El nombre del viento",
        autor: "Patrick Rothfuss",
        isbn: "978-84-450-7640-0",
        fechaPrestamo: "2025-7-23",
        fechaDevolucionPrevista: "2025-8-12",
        tipoUsuario: "Estudiante"
    }
];
function calcularRetraso(fechaDevolucion, hoy) {
    let hoyMilisegundos = new Date(hoy).getTime();
    let fechaDevolucionMilisegundo = new Date(fechaDevolucion).getTime();
    let milisegundoDiferencia = hoyMilisegundos - fechaDevolucionMilisegundo;
    let diaTarde = milisegundoDiferencia / (24 * 60 * 60 * 1000);
    return diaTarde >= 0 ? diaTarde : 0;
}
function calcularMulta(diasRetraso, tipoUsuario) {
    let resultadoMulta = 0;
    if (tipoUsuario === "Estudiante" && diasRetraso > 0) {
        for (let i = 0; i < diasRetraso; i++) {
            resultadoMulta += 50;
        }
    }
    else if (tipoUsuario === "Profesor" && diasRetraso > 0) {
        for (let i = 0; i < diasRetraso; i++) {
            resultadoMulta += 30;
        }
    }
    else if (tipoUsuario === "General" && diasRetraso > 0) {
        for (let i = 0; i < diasRetraso; i++) {
            resultadoMulta += 100;
        }
    }
    else {
        resultadoMulta = 0;
    }
    return resultadoMulta;
}
function procesarBiblioteca(libro, fechaActual) {
    let diasRetrasoFinalTotal = 0;
    let diasRetrasoFinal;
    let reporteMultaFinal = [];
    console.log("=".repeat(50));
    console.log("   REPORTE BIBLIOTECA");
    console.log("=".repeat(50));
    console.log("\n");
    libro.forEach((libro, i) => {
        diasRetrasoFinal = calcularRetraso(libro.fechaDevolucionPrevista, fechaActual);
        let multafinal = calcularMulta(diasRetrasoFinal, libro.tipoUsuario);
        cantidadLibros += 1;
        if (diasRetrasoFinal != 0) {
            cantidaLibrosTarde += 1;
        }
        reporteMultaFinal = [
            {
                titulo: libro.titulo,
                diasRetraso: diasRetrasoFinal,
                multa: multafinal,
                tipoUsuario: libro.tipoUsuario
            }
        ];
        console.log(`Libro: ${libro.titulo}`);
        console.log(`Autor: ${libro.autor}`);
        console.log(`Usuario: ${libro.tipoUsuario}`);
        reporteMultaFinal.forEach((reporteMultaFinal, i) => {
            console.log(`Dias de retraso: ${reporteMultaFinal.diasRetraso}`);
            console.log(`Multa: ${reporteMultaFinal.multa}\n`);
            diasRetrasoFinalTotal = diasRetrasoFinalTotal + reporteMultaFinal.multa;
        });
    });
    console.log(`TOTAL DE MULTAS: ${diasRetrasoFinalTotal}`);
    console.log(`LIBROS CON RETRASO: ${cantidaLibrosTarde} DE ${cantidadLibros}`);
}
procesarBiblioteca(librosPrestados, fechaActual);
