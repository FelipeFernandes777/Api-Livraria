import Erro404 from "../erros/Erro404.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      if (id !== null) {
        const livrosResultado = await livros.findById(id);

        res.status(200).send(livrosResultado);
      } else {
        next(new Erro404().enviarResposta("Id do livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = await new livros(req.body);

    try {
      const salvarLivro = await livro.save();
      res.status(201).send(salvarLivro.toJSON());
    } catch (err) {
      next(err);
    }

  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      if (id !== null) {
        await livros.findByIdAndUpdate(id, { $set: req.body });
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new Erro404().enviarResposta("Id do livro não encontrado"));
      }

    } catch (err) {
      res.status(500).send({ message: `Error interno do servidor ${err.message}` });
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      if (id !== null) {
        await livros.findByIdAndDelete(id);
        res.status(200).send({ message: "livro removido com sucesso" });
      } else {
        next(new Erro404().enviarResposta("Id do livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultados = livros;

        req.resultado = livrosResultados;
        next();
      } else {
        res.status(200).send([]);
      }

    } catch (err) {
      next(err);
    }
  };
}
async function processaBusca(params) {

  const { editora, titulo, nomeAutor, minPaginas, maxPaginas } = params;

  let busca = {};

  if (editora) {
    busca.editora = editora;
  }
  if (titulo) {
    busca.titulo = {
      $regex: titulo,
      $options: "i"
    };
  }
  if (minPaginas) {
    busca.minPaginas = {
      $get: 100
    };
  }
  if (maxPaginas) {
    busca.maxPaginas = {
      $let: 1000
    };
  }

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;