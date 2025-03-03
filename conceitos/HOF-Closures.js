function somar({ x, y }) {
  return x + y;
}

function subtrair({ x, y }) {
  return x - y;
}

function aplicarOperacao({ n1, n2, operacao }) {
  return operacao({ x: n1, y: n2 });
}

// console.log(aplicarOperacao({ n1: 5, n2: 3, operacao: somar }));
// console.log(aplicarOperacao({ n1: 5, n2: 3, operacao: subtrair }));

// criterio 2

function criarMultiplicador(fator) {
  return function (numero) {
    return numero * fator;
  };
}

const multiplicador2 = criarMultiplicador(2);
const multiplicador5 = criarMultiplicador(5);

console.log('Resultado de multiplicar por 4', multiplicador2(4));
console.log('Resultado de multiplicar por 5', multiplicador5(3));

// function concatenador(nome) {
//   return function (sobrenome, ultimonome) {
//     return nome + " " + sobrenome + " " + ultimonome;
//   };
// }

// const concatenadorLucas = concatenador("Lucas");
// const concatenadorDaniel = concatenador("Daniel");

// console.log(concatenadorLucas("Silva" , "de Freitas"));
// console.log(concatenadorDaniel("Silva" , "de Freitas"));
