import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O titulo do livro é obrigatorio"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "Autor(a) é obrigatorio"]
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatoria"],
      enum: {
        values: ["Casa do codigo", "Alura"],
        message: "A editora '{VALUE}' não é um valor permitido"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "Numero de paginas invalido, o valor tem que estar entre 10 e 5000 | Valor fornecido : {VALUE}"
      }
    }
  }
);
livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;