import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do(a) autora é obrigatorio"] // Posso passar tbm mensagens de erros
    },
    nacionalidade: { type: String }
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;