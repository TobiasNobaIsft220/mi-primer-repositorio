import mongoose from "mongoose";//Importamos mongoose para que nos permite hacer el esquema o modelo de los datos del usuario

//Creamos el esquema/modelo de los datos del usuario
const UserSchema = new mongoose.Schema({
    id: {type: Number},
    nombreDeUsuario: {type: String},
    email: {type: String},
    contraseña: {type: String},
    mejorPuntaje: {type: Number},
    ultimoPuntaje: {type: Number}
},{collection:"usuarios"});

//Lo exportamos para poder usarlo en los demás archivos
export default mongoose.model("User", UserSchema);