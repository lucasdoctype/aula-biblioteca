module.exports = class AppError extends Error {
     constructor(message) {
          super(message);
          this.message = message;
     }

     static dependencias = 'Alguma depêndencia obrigatória não foi fornecida';
     static parametrosObrigatoriosAusentes = 'Algum parâmetro está ausentes';
     static cpfJaCadastrado = "'Usuário já cadastrado com esse cpf'";
};
