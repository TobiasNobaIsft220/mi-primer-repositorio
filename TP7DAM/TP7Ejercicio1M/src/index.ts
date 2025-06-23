interface Libro{
    titulo:string,
    autor:string,
    isbn:string,
    categoria: string,
    fechaPrestamo:string,
    fechaDevolucionPrevista:string,
    tipoUsuario:string
};

interface ReporteMulta{
    titulo:string,
    diasRetraso: number,
    multa:number,
    tipoUsuario:string
};

const fechaActual = "2025-6-22";
let cantidadLibros: number = 0;
let cantidaLibrosTarde: number = 0;
let cantidadLibroProfesor: number = 0;
let cantidadLibroEstudiante: number = 0;
let cantidadLibroGeneral: number = 0;
let diasRetrasoFinalTotal:number = 0;
let multaFiccion: number = 0;
let multaHistoria: number = 0;


const librosPrestados: Libro[] = [
    {
        titulo: "1984",
        autor: "George Orwell",
        isbn: "978-0-452-28423-4",
        categoria: "Ficcion",
        fechaPrestamo: "2025-5-23",
        fechaDevolucionPrevista: "2025-6-10",
        tipoUsuario:"General"
    },
    {
        titulo: "Sapiens: De animales a dioses",
        autor: "Yuval Noah Harari",
        isbn: "978-84-9181-681-6",
        categoria: "Historia",
        fechaPrestamo: "2025-5-18",
        fechaDevolucionPrevista: "2025-6-4",
        tipoUsuario:"Profesor"
    },
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        isbn: "978-0-06-088328-7",
        categoria: "Ficcion",
        fechaPrestamo: "2025-4-25",
        fechaDevolucionPrevista: "2025-5-9",
        tipoUsuario:"Estudiante"
    },
    {
        titulo: "El nombre del viento",
        autor: "Patrick Rothfuss",
        isbn: "978-84-450-7640-0",
        categoria: "Ficcion",
        fechaPrestamo: "2025-7-23",
        fechaDevolucionPrevista: "2025-8-12",
        tipoUsuario:"General"
    }
];

function calcularRetraso(fechaDevolucion: string, hoy: string): number{
    let hoyMilisegundos = new Date(hoy).getTime();
    let fechaDevolucionMilisegundo = new Date(fechaDevolucion).getTime();
    let milisegundoDiferencia = hoyMilisegundos - fechaDevolucionMilisegundo;

    let diaTarde = milisegundoDiferencia / (24 * 60 * 60 * 1000);

    return diaTarde >= 0 ? diaTarde: 0;
}

function calcularMulta(diasRetraso: number, tipoUsuario: string, categoria: string): number{
    let resultadoMulta: number = 0;
    if(categoria === "Historia"){
        if(tipoUsuario === "Estudiante"){
            cantidadLibroEstudiante += 1;
            if(diasRetraso > 0){
                for(let i = 0; i < diasRetraso; i++){
                    resultadoMulta += 50;
                }
            }
        }else if(tipoUsuario === "Profesor"){
            cantidadLibroProfesor += 1;
                if(diasRetraso > 0){
                    for(let i = 0; i < diasRetraso; i++){
                    resultadoMulta += 30;
                }
            }
        }else if(tipoUsuario === "General"){
            cantidadLibroGeneral += 1;
        if(diasRetraso > 0){
                    for(let i = 0; i < diasRetraso; i++){
                    resultadoMulta += 100;
                }
            }
        }else{
            resultadoMulta = 0;
        }
        multaHistoria += resultadoMulta;
    }else if(categoria === "Ficcion"){
        if(tipoUsuario === "Estudiante"){
            cantidadLibroEstudiante += 1;
            if(diasRetraso > 0){
                for(let i = 0; i < diasRetraso; i++){
                    resultadoMulta += 50;
                }
            }
        }else if(tipoUsuario === "Profesor"){
            cantidadLibroProfesor += 1;
                if(diasRetraso > 0){
                    for(let i = 0; i < diasRetraso; i++){
                    resultadoMulta += 30;
                }
            }
        }else if(tipoUsuario === "General"){
            cantidadLibroGeneral += 1;
        if(diasRetraso > 0){
                    for(let i = 0; i < diasRetraso; i++){
                    resultadoMulta += 100;
                }
            }
        }else{
            resultadoMulta = 0;
        }
        multaFiccion += resultadoMulta;
    }
    return resultadoMulta;
}

function renovacion(multafinal: number): number{
    multafinal = multafinal * 0.5;
    return multafinal;
}

function procesarBiblioteca(libro: Libro[], fechaActual: string){
    let diasRetrasoFinal;
    let reporteMultaFinal: ReporteMulta[] = [];
    console.log("=".repeat(50));
    console.log("   REPORTE BIBLIOTECA");
    console.log("=".repeat(50));
    console.log("\n");
    libro.forEach((libro,i) => {
        diasRetrasoFinal = calcularRetraso(libro.fechaDevolucionPrevista, fechaActual);
        let multafinal = calcularMulta(diasRetrasoFinal,libro.tipoUsuario, libro.categoria);

        if(diasRetrasoFinal > 0){
            multafinal = renovacion(multafinal);
        }

        cantidadLibros += 1;

        if(diasRetrasoFinal != 0){
            cantidaLibrosTarde += 1 ;
        }

        reporteMultaFinal = [
            {
                titulo: libro.titulo,
                diasRetraso:diasRetrasoFinal,
                multa:multafinal,
                tipoUsuario:libro.tipoUsuario
            }
        ]
        console.log(`Libro: ${libro.titulo}`);
        console.log(`Autor: ${libro.autor}`);
        console.log(`Usuario: ${libro.tipoUsuario}`);
        reporteMultaFinal.forEach((reporteMultaFinal, i) =>{
            console.log(`Dias de retraso: ${reporteMultaFinal.diasRetraso}`)
            console.log(`Multa: ${reporteMultaFinal.multa}\n`);
            diasRetrasoFinalTotal = diasRetrasoFinalTotal + reporteMultaFinal.multa;
        });
    });

    let promedioMulta = diasRetrasoFinalTotal / cantidadLibros;
    
    console.log(`TOTAL DE MULTAS: ${diasRetrasoFinalTotal}`);
    console.log(`LIBROS CON RETRASO: ${cantidaLibrosTarde} DE ${cantidadLibros}`);

    console.log(`=`.repeat(50));
    console.log(`  MODIFICACION NIVEL 1`);
    console.log(`=`.repeat(50));
    console.log(`Cantida de libros estudiante: ${cantidadLibroEstudiante}`);
    console.log(`Cantida de libros profesor: ${cantidadLibroProfesor}`);
    console.log(`Cantida de libros general: ${cantidadLibroGeneral}`);
    console.log(`Promedio de multa: ${promedioMulta}`);
    console.log(`=`.repeat(50));
    console.log(`  MODIFICACION NIVEL 2`);
    console.log(`=`.repeat(50));
    console.log(`Multa de Historia: ${multaHistoria}`);
    console.log(`Multa de Ficcion: ${multaFiccion}`);
    console.log(`=`.repeat(50));
    console.log(`  MODIFICACION NIVEL 3`);
    console.log(`=`.repeat(50));
    console.log(`PRECIO CON DESCUENTO APLICADO A LOS LIBROS QUE SE DEVOLVIERO TARDE`)
}

procesarBiblioteca(librosPrestados, fechaActual);