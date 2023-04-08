import Erro404 from "../erros/Erro404.js";

function manipulador404(req, res, next) {
  const error404 = new Erro404().enviarResposta();
  next(error404); // Next encaminha o erro, para o meu arquivo manipuladorDeErros.js
}

export default manipulador404;