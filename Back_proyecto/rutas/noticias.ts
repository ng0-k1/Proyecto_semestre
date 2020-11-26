import { Router, Response } from "express";
import { verificarToken } from "../middelwares/autentificacion";
import FileSystemNoticias from "../clases/fileSystemNoticias";
import { Noticias } from "../modelos/noticias";


const noticiasRutas = Router();
const fileSystemNoticias = new FileSystemNoticias();



// Crear noticia
noticiasRutas.post('/:img/:imgYo', verificarToken, (req: any, res: Response) => {

    const body = req.body;
    const img = req.params.img;
    const imgYo = req.params.imgYo;

    body.img = img;
    body.imgYo = imgYo;


    Noticias.create(body).then(noticiaDB => {
        res.json({
            ok: true,
            noticia: noticiaDB
        });

    }).catch(err => {
        res.json(err)
    });
});

// Obtener noticias paginadas
noticiasRutas.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;

    const noticias = await Noticias.find()
        .sort({ _id: -1 })
        .skip(saltar)
        .limit(8)
        .exec();

    res.json({
        ok: true,
        pagina,
        noticias
    });
});

// Subir imágenesYo
noticiasRutas.post('/upload1', verificarToken, async (req: any, res: Response) => {

    const file1 = req.files.imgYo;
    await fileSystemNoticias.guardarImgYo(file1);

    res.json({
        ok: true,
        file1: file1.name
    });
});

// Subir imágenesNoticia
noticiasRutas.post('/upload2', verificarToken, async (req: any, res: Response) => {

    const file2 = req.files.img;
    await fileSystemNoticias.guardarImg(file2);

    res.json({
        ok: true,
        file1: file2.name
    });
});

// Mostrar imgNoticia por URL
noticiasRutas.get('/imgNoticia/:img', (req: any, res: Response) => {

    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgNoticiaUrl(img);
    res.sendFile(pathImagen);

});

// Mostrar imagenYo por URL
noticiasRutas.get('/imgYo/:img', (req: any, res: Response) => {

    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgYoUrl(img)
    res.sendFile(pathImagen);

});

export default noticiasRutas;