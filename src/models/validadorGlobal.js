import mongoose from "mongoose";

// Definindo uma propiedade global para todos os types Strings;
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "" ? true : false,
  message: ({ path }) => `O campo: "${path}". Foi fornecido em branco `,
});