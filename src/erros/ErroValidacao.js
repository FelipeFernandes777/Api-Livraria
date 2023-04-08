import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(error) {
    const mensagensErro = Object.values(error.erros);
    mensagensErro.map(error => error.message).join("; ");

    super({ message: `Os seguintes erros foram encontrados : ${mensagensErro}` });
  }
}
export default ErroValidacao;