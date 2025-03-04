/**
 * 
 * @description: ATENÇÃO, esta classe não deve ser instanciada diretamente, use um dos métodos Left ou Right.
 * 
 */


module.exports = class Eiter {
     constructor(left, right) {
          this.left = left;
          this.right = right;
     }

     static Left(left) {
          return new Eiter(left, null);
     }

     static Right(right) {
          return new Eiter(null, right);
     }

     static valorJaCadastrado(valor) {
          return { message: `${valor} já cadastrado` };
     }
};
