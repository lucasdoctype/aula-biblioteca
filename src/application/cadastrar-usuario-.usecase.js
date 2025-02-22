module.exports = function cadastrarUsuarioUseCase() {
  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await usuariosRespositorio.cadastrarUsuairo({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email,  
    });
  };
};
