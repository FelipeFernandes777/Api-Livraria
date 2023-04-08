import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenacao]: ordem }) // MongoDB aceita 2 valores, -1 e 1, sendo 1 para crescente e -1 para decrescente
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      res.status(200).send(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (error) {
    next(error);
  }
}

export default paginar;