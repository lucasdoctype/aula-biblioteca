const AppError = require("./AppError");

describe("AppError", function () {
  test("Checar se AppErorr é uma instância de error ", function () {
    const appError = new AppError("Erro");
    expect(appError).toBeInstanceOf(Error);
  });

  test("Checando se a mensagem de erro de dependencia está correta", function () {
     const mensagemDependenciaAusente = "Alguma depêndencia obrigatória não foi fornecida";
     expect(mensagemDependenciaAusente).toBe(AppError.dependencias)
  });
});
