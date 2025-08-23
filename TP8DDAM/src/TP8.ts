interface estudiantesInterface {
    id: number,
    nombre: string,
    apellido: string,
    notas: number[]
}

const estudiantes: estudiantesInterface[] = [
    {
        id: 1,
        nombre: "Mateo",
        apellido: "Noba",
        notas: [7, 7, 7, 7, 5]
    },
    {
        id: 2,
        nombre: "Tobias",
        apellido: "Noba",
        notas: [4, 4, 2, 4, 2]
    },
    {
        id: 3,
        nombre: "Lolo",
        apellido: "Lol",
        notas: [9, 8, 9, 7, 10]
    }
];

function reporteNotas(estudiantesDentroDeFuncion: estudiantesInterface[]){
    estudiantesDentroDeFuncion.forEach(e => {
        let promedio: number = 0;
        e.notas.forEach(n =>{
            promedio = promedio + n;
        });
        promedio = promedio / e.notas.length; 
        console.log(`El estudiante ${e.nombre} ${e.apellido} tiene un promedio de ${promedio}`);
        if(promedio >= 7){
                console.log(`El estudiante tiene la materia promocionada.\n`);
            }else if(promedio >= 4){
                console.log(`El estudiante tiene la materia aprobada.\n`);
            }else if(promedio < 4){
                console.log(`El estudiante tiene la materia desaprobada.\n`);
            }
    });
}

reporteNotas(estudiantes);