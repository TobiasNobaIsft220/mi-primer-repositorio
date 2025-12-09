import express from "express"; //Importamos express para poder usar los metodos http
import mongoose from "mongoose"; //Importamos mongoose para conectarnos a la base de datos
import cors from "cors";
import dotenv from "dotenv"; //Importamos dotenv para poder usar variables de entorno
import usersRoutes from "./Routes/usersRoutes.js"; //Importamos el archivo donde van a esta nuetras rutas

dotenv.config(); //Le da a entender a dotenv que la variable de entorno esta en la carpeta raiz del proyecto

//Declaramos la variable de express
const app = express();
app.use(cors());//Le decimos a express que use cors para compatir recursos de otros dominios
app.use(express.json());//Le decimos a express que use express.json para que siempre tranforma las respuestas y peticiones en json

//Conexion a la base de datos
mongoose.connect(process.env.MONGO_URI + "?retryWrites=true&w=majority&tls=true")//URL de conxion
.then(() => console.log("Mongo conetado"))//Mensaje en caso de conexion exitosa
.catch(err => console.log(err));//Mensaje en caso de conexion fallida

//Verificacion de a que base de datos y coleccion se conecto
mongoose.connection.on("connected", () => {
    console.log("Conectado a:", mongoose.connection.name);
    console.log("Colecciones:", Object.keys(mongoose.connection.collections));
});

//Le decimos a express que use las rutas de nuestro archivo de rutas y que a cada api le agrega /api adelante
app.use("/api", usersRoutes);

//Verificación de si funciona la api
app.get("/", (req, res) => {
    res.send("api funciona");
});

//Creamos el servidor y le asignamos nuestras variables de entorno
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Servidor en puerto " + process.env.PORT);
})