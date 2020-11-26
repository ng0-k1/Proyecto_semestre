"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const contacto_1 = __importDefault(require("./rutas/contacto"));
const imagenesYo_1 = __importDefault(require("./rutas/imagenesYo"));
const sobreMi_1 = __importDefault(require("./rutas/sobreMi"));
const tecnologia_1 = __importDefault(require("./rutas/tecnologia"));
const noticias_1 = __importDefault(require("./rutas/noticias"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server = new server_1.default();
// Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Fileupload
server.app.use(express_fileupload_1.default());
// Rutas
server.app.use(express_1.default.static(path_1.default.join((__dirname + '/public'))));
server.app.use('/usuario', usuario_1.default);
server.app.use('/contacto', contacto_1.default);
server.app.use('/uploadYo', imagenesYo_1.default);
server.app.use('/sobreMi', sobreMi_1.default);
server.app.use('/tenologia', tecnologia_1.default);
server.app.use('/noticias', noticias_1.default);
// Conectar Base de Datos
let mongoDB;
if (process.env.NODE_ENV === 'production') {
    mongoDB = 'mongodb+srv://Rayito:PR0b4nd0@proyectosemestre.jxgha.mongodb.net/Rayito';
}
else {
    mongoDB = 'mongodb://localhost:27017/Rayito';
}
mongoose_1.default.connect('mongodb+srv://Rayito:PR0b4nd0@proyectosemestre.jxgha.mongodb.net/Rayito', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err)
        throw "err";
    console.log('Base de datos ONLINE');
});
// Levantar el servidor
server.start(() => {
    console.log(`Servidor RAYITO BIBLIOGRAFICO corriendo el el puerto ${server.port}`);
});
