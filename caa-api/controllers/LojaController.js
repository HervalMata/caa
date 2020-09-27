const mongoose = require("mongoose");
const Loja = mongoose.model("Loja");

class LojaController {

    // GET /
    index(req, res, next) {
        Loja.find({ }).select("_id nome cnpj email telefones endereco")
            .then(lojas => res.sender({ lojas })).catch(next);
    }

    // GET /:id
    show(req, res, next) {
        Loja.findById(req.payload.id).select("_id nome cnpj email telefones endereco")
            .then(loja => res.sender({ loja })).catch(next);
    }

    // POST /registrar
    store(req, res, next) {
        const { nome, cnpj, email, telefones, endereco } = req.body;
        const loja = new Loja({ nome, cnpj, email, telefones, endereco });
        loja.save().then(() => res.sender({ loja })).catch(next);
    }

    // PUT /:id
    update(req, res, next) {
        const { nome, cnpj, email, telefones, endereco } = req.body;
        Loja.findById(req.payload.loja).then(loja => {
            if (!loja) return res.status(401).json({ errors: "Loja não existe."});
            if ( nome ) loja.nome = nome;
            if ( cnpj ) loja.cnpj = email;
            if ( email ) loja.email = email;
            if ( telefones ) loja.telefones = telefones;
            if ( endereco ) loja.endereco = endereco;

            loja.save().then(() => res.sender({ loja })).catch(next);
        }).catch(next);
    }

    // DELETE /:id
    remove(req, res, next) {
        Loja.findById(req.payload.loja).then(loja => {
            if (!loja) return res.status(422).json({errors: "Loja não existe."});
            loja.remove().then(() => res.sender({deletado: true})).catch(next);
        }).catch(next);
    }
}

module.exports = LojaController;