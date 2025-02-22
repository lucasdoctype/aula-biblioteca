const cadastrarUsuarioUsecase = require("../cadastrar-usuario-.usecase");

describe("Cadastrar usuario UseCase", function () {
  const usuariosRepository = {
    cadastrar: jest.fn(),
  };

  test("Deve poder Cadastrar um Usuário", async function () {
    const usuarioDto = {
      nome_completo: "nome_valido",
      CPF: "CPF_valido",
      telefone: "telefone_valido",
      email: "email_valido",
    };

    const sut = cadastrarUsuarioUsecase({ usuariosRepository });
    const output = await sut(usuarioDto);

    expect(output).toBeUndefined();
    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDto); 
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);

  });
});
