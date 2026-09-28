import express from "express";
import path from "path";
import colors from "colors";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Connect to the database
export async function connectToDatabase() {
    try {   
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.white('Conexión a la base de datos exitosa'))
    } catch (err) {
        console.log(err)
        console.log(colors.bgRed.white('Hubo un error al conectar a la base de datos'))
    }
}
connectToDatabase()

const server = express();

//Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json());

server.use(morgan('dev'))

server.use('/api/products' ,router);

//Sirve imagenes estáticas (logo)
server.use('/images', express.static(path.join(__dirname, 'images')));

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;