interface Reserva{
    numeroReserva: string,
    nombreHuesped: string,
    tipoDeHabitacion: string,
    fechaDeIngreso: string
    fechaSalida: string,
    temporada: string,
    tipoDeHuesped: string,
    serviciosAdicionales: string[]
}

interface ReporteReserva{
    numeroReseva: string,
    nombreHuesped: string,
    tipoDeHabitacion: string,
    estadia: number,
    costoBase: number,
    costoServicios: number,
    descuento: number,
    costoTotal: number
}

const reservas: Reserva[] =[
    {
        numeroReserva: "1",
        nombreHuesped: "Ana Garcia",
        tipoDeHabitacion: "Suite",
        fechaDeIngreso: "2025-07-15",
        fechaSalida: "2025-07-18",
        temporada: "Alta",
        tipoDeHuesped: "VIP",
        serviciosAdicionales: ["Desayuno", "WIFI", "Estacionamiento"]
    },
    {
        numeroReserva: "2",
        nombreHuesped: "Carlos Lopez",
        tipoDeHabitacion: "Doble",
        fechaDeIngreso: "2025-08-20",
        fechaSalida: "2025-08-22",
        temporada: "Baja",
        tipoDeHuesped: "Corporativo",
        serviciosAdicionales: ["Desayuno", "WIFI", "Estacionamiento"]
    },
    {
        numeroReserva: "3",
        nombreHuesped: "Maria Rodrigez",
        tipoDeHabitacion: "Simple",
        fechaDeIngreso: "2025-09-10",
        fechaSalida: "2025-09-13",
        temporada: "Alta",
        tipoDeHuesped: "Regular",
        serviciosAdicionales: [ "WIFI"]
    },
    {
        numeroReserva: "4",
        nombreHuesped: "Juan Perez",
        tipoDeHabitacion: "Doble",
        fechaDeIngreso: "2025-06-01",
        fechaSalida: "2025-06-07",
        temporada: "Baja",
        tipoDeHuesped: "VIP",
        serviciosAdicionales: ["Desayuno", "WIFI","Lavanderia", "Estacionamiento"]
    }
] 

function calcularDiasEstadia(fechaDeIngreso: string, fechaSalida: string): number{
    let fechaDeIngresoMilisegundos = new Date(fechaDeIngreso).getTime();
    let fechaSalidaMilisegundo = new Date(fechaSalida).getTime();
    let milisegundoDiferencia = fechaSalidaMilisegundo - fechaDeIngresoMilisegundos;

    let diaEstadia = milisegundoDiferencia / (24 * 60 * 60 * 1000);



    return diaEstadia
}

function calcularCostoBase(tipoDeHabitacion: string, temporada: string, diaEstadia: number): number{
    let costoBase: number = 0;
    if(temporada === "Alta"){
        if(tipoDeHabitacion === "Simple"){
            costoBase = (costoBase + 120) * diaEstadia;
        }else if(tipoDeHabitacion === "Doble"){
            costoBase = (costoBase + 180) * diaEstadia;
        }else{
            costoBase = (costoBase + 350) * diaEstadia;
        }
    }else{
        if(tipoDeHabitacion === "Simple"){
            costoBase = (costoBase + 80) * diaEstadia;
        }else if(tipoDeHabitacion === "Doble"){
            costoBase = (costoBase + 120) * diaEstadia;
        }else{
            costoBase = (costoBase + 250) * diaEstadia;
        }
    }
    return costoBase;
}

function calcularCosotoServicio(serviciosAdicionales: string[], diaEstadia: number,): number{
    let resultadoCostoServicio:number = 0;
    serviciosAdicionales.forEach((serviciosAdicionales, i) =>{
        if(serviciosAdicionales === "Desayuno"){
            for(let i = 0;i < diaEstadia; i++){
                resultadoCostoServicio += 25;
            }
        }else if(serviciosAdicionales === "WIFI"){
            for(let i = 0;i < diaEstadia; i++){
                resultadoCostoServicio += 10;
            }
        }else if(serviciosAdicionales === "Spa"){
            for(let i = 0;i < diaEstadia; i++){
                resultadoCostoServicio += 50;
            }
        }else if(serviciosAdicionales === "Estacionamiento"){
            for(let i = 0;i < diaEstadia; i++){
                resultadoCostoServicio += 15;
            }
        }else if(serviciosAdicionales === "Lavanderia"){
            for(let i = 0;i < diaEstadia; i++){
                resultadoCostoServicio += 20;
            }
        }
    })
    return resultadoCostoServicio;
}

function calculaDescuento(costoBase:number, costoServicios: number, tipoDeHuesped: string): number{
    let costoTotal = costoBase + costoServicios;
    let costoDescuento: number = 0;
    if(tipoDeHuesped === "VIP"){
        costoDescuento = costoTotal * (15 / 100);
    }else if(tipoDeHuesped === "Corporativo"){
        costoDescuento = costoTotal * (10/ 100);
    }else{
       costoDescuento = 0;
    }
    return costoDescuento;
}

function procesarReservas(reservas: Reserva[], ){
    let reportes: ReporteReserva[] = [];
    let ingresosTotales: number = 0;
    let cantidadReservas: number = 0;

    console.log("=".repeat(50));
    console.log("  REPORTES DE RESERVAS HOTEL");
    console.log("=".repeat(50));
    reservas.forEach((reservas, i) =>{

        cantidadReservas += 1;

        let diasEstadiaFinal = calcularDiasEstadia(reservas.fechaDeIngreso, reservas.fechaSalida);
        let costoBaseFinal = calcularCostoBase(reservas.tipoDeHabitacion, reservas.temporada, diasEstadiaFinal);
        let costoServicioFinal = calcularCosotoServicio(reservas.serviciosAdicionales, diasEstadiaFinal);
        let costoDescuentoFinal = calculaDescuento(costoBaseFinal, costoServicioFinal,reservas.tipoDeHuesped);
        let costoTotalFinalDescuento = (costoBaseFinal + costoServicioFinal) - costoDescuentoFinal;
        reportes = [
            {
                numeroReseva: reservas.numeroReserva,
                nombreHuesped: reservas.nombreHuesped,
                tipoDeHabitacion: reservas.tipoDeHabitacion,
                estadia: diasEstadiaFinal,
                costoBase: costoBaseFinal,
                costoServicios: costoServicioFinal,
                descuento: costoDescuentoFinal,
                costoTotal: costoTotalFinalDescuento 
            }
        ]
            console.log(`Reserva: ${reservas.numeroReserva}`);
            console.log(`Huesped: ${reservas.nombreHuesped}`);
            console.log(`Habitacion: ${reservas.tipoDeHabitacion}`);
            reportes.forEach((reportes, i) =>{
            console.log(`Estadia: ${reportes.estadia}`)
            console.log(`Temporada: ${reservas.temporada}`);
            console.log(`Tipo: ${reservas.tipoDeHabitacion}`);
            console.log(` `);
            console.log(`Costo base: ${reportes.costoBase}`);
            console.log(`Servicios: ${reportes.costoServicios}`);
            console.log(`Descuento ${reservas.tipoDeHuesped}: ${reportes.descuento}`);
            console.log(`Total: ${reportes.costoTotal}\n`);
            ingresosTotales += reportes.costoTotal;
        });
    })
    console.log(`INGRESOS TOTALE: $${ingresosTotales}`);
    console.log(`RESERVAS PROCESADAS ${cantidadReservas}`)
    console.log("=".repeat(50));
}

procesarReservas(reservas);