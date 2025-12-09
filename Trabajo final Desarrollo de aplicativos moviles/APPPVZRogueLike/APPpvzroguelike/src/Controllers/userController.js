//Importacion del modelo User
import User from "../Models/User.js";

//Importacion de Json Web Token
import jwt from "jsonwebtoken";

//Importacion de dotenv
import dotenv from "dotenv";

//Le da a entender a dotenv que la variable de entorno esta en la carpeta raiz del proyecto
dotenv.config();

//Exportamos el controlador que sirve para crear una cuenta/registrar usuarios
export const signUpUser = async (req, res) => {
    //Try para que trate de realizar el codigo de adentro, pero si no lo logra va al catch y tira error
    try{

        //Recupera los datos del body de la request y los guarda en la variable
        const {nombreDeUsuario, email, contraseña, repContraseña} = req.body;

        //Verifica que hayan ingresado todos los datos
        if(!nombreDeUsuario || !email || !contraseña || !repContraseña){
            return res.status(400).json({message: "Faltan datos"});
        }

        //Variable para verificar el mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //Verificación para saber si el mail ingresado tiene @ o .
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "El email no es válido" });
        }

        //Verifica que las contraseñas coincidan
        if(contraseña !== repContraseña){
            return res.status(400).json({message: "Las contraseñas no coinciden"});
        }

        //Verifica si ya existe una cuenta con ese mail
        const emailExistente = await User.findOne({ email});
        if(emailExistente){
            return res.status(400).json({message: "Ya existe una cuenta con ese mail"})
        }

        //Le asigna la id verificando cual fue la ultima
        const ultimo = await User.findOne().sort({id: -1});
        const nuevoId = ultimo ? ultimo.id + 1 : 1;

        //Crea un nuevo usuario con le modelo de User
        const nuevoUsuario = new User({
            id: nuevoId,
            nombreDeUsuario,
            email,
            contraseña,
            mejorPuntaje: 0,
            ultimoPuntaje: 0
        });

        //Guarda al nuevo usuario
        await nuevoUsuario.save();

        //Le asigna un token al inciar sesión
        const token = jwt.sign(
            {id: nuevoUsuario.id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        //Manda una respuesta en caso de que sea exitoso
        res.json({
            message: "Registro exitoso",
            token,
            usuario: {
                id: nuevoUsuario.id,
                nombreDeUsuario: nuevoUsuario.nombreDeUsuario,
                email: nuevoUsuario.email
            }
        });
    }catch (error) {//En caso de que el servidor falle
        console.log(error);
        res.status(500).json({ message: "Error del servidor", error});
    }
};

//Exportamos el controlador que sirve para iniciar sesion con una cuenta/logear usuarios
export const logInUser = async (req, res) => {
    try{
        //Recupera los datos del body y los guarda en la variable
        const {email, contraseña} = req.body;

        //Verifica si existe un usuario con ese mail y trae los datos de ese usuario
        const usuario = await User.findOne({email});
        
        //Si no encontro ningun mail igual al ingresado
        if(!usuario){
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        //Verifica si la contraseña ingresada coincide con la de la base de datos
        if(usuario.contraseña !== contraseña){
            return res.status(400).json({message: "Contraseña incorrecta"});
        }

        //Le asigna un token al inciar sesión
        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //Manda una respuesta en caso de que sea exitoso
        res.json({
            message: "Sesión iniciada",
            token,
            usuario: {
                id: usuario.id,
                nombreDeUsuario: usuario.nombreDeUsuario,
                email: usuario.email
            }
        });
    }catch (error){//Catch en caso de no se pueda conectar al servidor o algo falle
        res.status(500).json({message: "Error del servidor"});
    }
};

//Exportamos el controlador que sirve para mostrar los datos de un usuario
export const showPerfil = async (req, res) => {
    try{
        //Busca el usuario por la id y lo guarda en la variable usuario
        const usuario = await User.findOne({ id: req.user.id });
      
        //Devuelve los valores obtenidos de la base de datos
        res.json({ usuario });

    }catch (error){//En caso de que falle
        res.status(500).json({message: "Error al obtener perfil"})
    }
};

//Exportamos el controlador que sirve para mostrar la informacion de todos los usuarios ordenados por el mejor puntaje
export const scoreBoard = async (req, res) =>{
    try{
        //Busca todos los usuario los ordena de mayor a menor por puntaje y muestra su nombreDeUsuario, mejorPuntaje y ultimoPuntaje
        const ranking = await User.find()
        .sort({mejorPuntaje: -1})
        .select("nombreDeUsuario mejorPuntaje ultimoPuntaje");

        //Devuelve los valores obtenidos de la base de datos
        res.json(ranking);
    }catch (error){//En caso de no pueda obtener los datos
        res.status(500).json({message: "Error al obtener el score board"})
    }
}

//Exportamos el controlador que sirve para actualizar el puntaje del usuario que este iniciado sesion en el juego
export const updateScore = async (req, res) => {
    try {
        //recupera los datos del body de la request
        const { puntaje } = req.body;

        //Busca el usuario por su id
        const usuario = await User.findOne({ id: req.user.id });
        //Si no encuentra un usuario con esa id
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        //Actualiza el ultimo puntaje del usuario con el obtenido del juego
        usuario.ultimoPuntaje = puntaje;

        //Verifica si el ultimo puntaje obtenido es mejor que el mejor puntaje del usuario
        if (puntaje > usuario.mejorPuntaje) {
            usuario.mejorPuntaje = puntaje;
        }
        //Guarda los datos de usuario actualizados
        await usuario.save();

        //Manda una respuesta en caso de ser exitoso
        res.json({
            message: "Puntaje actualizado",
            mejorPuntaje: usuario.mejorPuntaje,
            ultimoPuntaje: usuario.ultimoPuntaje
        });
        
    } catch (error) {//En caso de que todo lo anterior falle
        res.status(500).json({ message: "Error al actualizar puntaje" });
    }
};