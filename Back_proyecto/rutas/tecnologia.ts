import { Router, Response } from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { Tecnologias } from '../modelos/tecnologias';


const tecnologiasRutas = Router();


// Crear tecnología
tecnologiasRutas.post('/', verificarToken, (req: any, res: Response) => {

    const body = req.body;

    Tecnologias.create(body).then(tecnologiaDB => {
        res.json({
            ok: true,
            sobreMi: tecnologiaDB
        });
    }).catch(err => {
        res.json(err)
    });
});


// Obtener tecnología
tecnologiasRutas.get('/', async (req: any, res: Response) => {

    const tecnologias = await Tecnologias.find()
        .exec();

    res.json({
        ok: true,
        tecnologias
    });
});

// Actualizar tecnología
tecnologiasRutas.post('/update/:id', verificarToken, (req: any, res: Response) => {

    const id = req.params.id;

    const tecnologia = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia,
    }

    Tecnologias.findByIdAndUpdate(id, tecnologia, { new: true }, (err, tecnologiaDB) => {

        if (err) throw err;
        if (!tecnologiaDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true,
            tecnologia
        });
    });

});
export default tecnologiasRutas;