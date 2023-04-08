import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta();
  }
  else if (error instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(error).enviarResposta(res); // Sempre passo o "res" com parametro da função
  }
  else if (error instanceof ErroBase) {
    error.enviarResposta(res);
  }
  else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;