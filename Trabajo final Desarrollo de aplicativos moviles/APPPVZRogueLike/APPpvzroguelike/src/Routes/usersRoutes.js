import express from "express";//Importamos express para poder crear el router
//Importamos las funciones de nuestro controlador
import { signUpUser, logInUser, scoreBoard, updateScore, showPerfil } from "../Controllers/userController.js";
import { verifyToken } from "../Middleware/verifyToken.js";//Importamos en middleware de verificacion de token

//Le asignamos una variable el router de express
const router = express.Router();

//Asignamos la ruta con la que va a ejecutar la funcion del controlador: sigUpUser
router.post("/registro", signUpUser);

//Asignamos la ruta con la que va a ejecutar la funcion del controlador: logInUser
router.post("/inicioSesion", logInUser);

//Asignamos la ruta con la que va a ejecutar la funcion del controlador: scoreBoard
router.get("/puntajes", scoreBoard);

//Asignamos la ruta con la que va a ejecutar la funcion del controlador: showPerfil
router.get("/perfil", verifyToken, showPerfil);

//Asignamos la ruta con la que va a ejecutar la funcion del controlador: updateScore
router.post("/actualizarPuntaje", verifyToken, updateScore)

//Exportamos el router para despues usarlo en el servidor
export default router;