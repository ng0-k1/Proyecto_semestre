import Server from "./clases/server";
import fileupload from 'express-fileupload';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import usuarioRutas from "./rutas/usuario";
import contactoRutas from "./rutas/contacto";
import yoRutas from "./rutas/imagenesYo";
import sobreMiRutas from "./rutas/sobreMi";
import tecnologiasRutas from "./rutas/tecnologia";
import noticiasRutas from "./rutas/noticias";
import express from 'express';
import path from 'path';



const server = new Server();


// Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Fileupload
server.app.use(fileupload());

// Rutas
server.app.use(express.static(path.join((__dirname + '/public'))));
server.app.use('/usuario', usuarioRutas);
server.app.use('/contacto', contactoRutas);
server.app.use('/uploadYo', yoRutas);
server.app.use('/sobreMi', sobreMiRutas);
server.app.use('/tenologia', tecnologiasRutas);
server.app.use('/noticias', noticiasRutas);

// Conectar Base de Datos

let mongoDB: string;

if (process.env.NODE_ENV === 'production') {
    mongoDB = 'mongodb+srv://Rayito:PR0b4nd0@proyectosemestre.jxgha.mongodb.net/Rayito'
} else {
    mongoDB = 'mongodb://localhost:27017/Rayito'
}
mongoose.connect(
    mongoDB,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false },
    (err) => {
        if (err) throw "err";
        console.log('Base de datos ONLINE');
    }
)


// Levantar el servidor
server.start(() => {
    console.log(`Servidor RAYITO BIBLIOGRAFICO corriendo el el puerto ${server.port}`);
})
