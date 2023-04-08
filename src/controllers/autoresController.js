import Erro404 from "../erros/Erro404.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;
      next();
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const autoresID = await autores.findById(id);

      if (autoresID !== null) {
        res.status(200).send(autoresID);
      } else {
        next(new Erro404().enviarResposta("Id do Autor não localizado."));
      }
    } catch (err) {
      next(err);
    }

  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = await new autores(req.body);
    try {
      const salvarAutor = await autor.save();
      res.status(201).send(salvarAutor.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      if (id !== null) {
        await autores.findByIdAndUpdate(id, { $set: req.body });
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new ErroValidacao().enviarResposta());
      }

    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      if (id !== null) {
        await autores.findByIdAndDelete(id);
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(ErroValidacao().enviarResposta());
      }

    } catch (err) {
      next(err);
    }
  };

}

export default AutorController;