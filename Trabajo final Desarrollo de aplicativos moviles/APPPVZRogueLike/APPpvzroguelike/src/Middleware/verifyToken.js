import jwt from "jsonwebtoken";//Importamos jwt para realizar las verificaciones de autorizacion
import dotenv from "dotenv";//Importamos dotenv para poder usar variables de entorno

dotenv.config();//Le da a entender a dotenv que la variable de entorno esta en la carpeta raiz del proyecto

//Funcion para verificar el token del usuario
export function verifyToken(req, res, next) {

  //Guarda los datos obtenidos del header
  const auth = req.headers.authorization;

  //Verifica si el token existe
  if (!auth){
    return res.status(401).json({ message: "Token faltante" });
  };
    

  const token = auth.split(" ")[1];

  //Verifica si el token es correcto
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });//En caso de que no los sea

    req.user = decoded;  //Lo guardamos dentro del usuario
    next();
  });
}