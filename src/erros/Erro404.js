import ErroBase from "./ErroBase.js";

class Erro404 extends ErroBase {
  constructor(mensagem = "Pagina não encontrada") {
    super(mensagem, 404);
  }
}

export default Erro404;