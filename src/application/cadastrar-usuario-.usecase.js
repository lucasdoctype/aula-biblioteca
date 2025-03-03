const { Eiter } = require('../shared/errors');
const AppError = require('../shared/errors/AppError');

module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }) {
    if (!usuariosRepository) throw new AppError(AppError.dependencias);

    return async function ({ nome_completo, CPF, telefone, endereco, email }) {
        
        const camposPreenchidos = nome_completo && CPF && telefone && email && endereco;
        if (!camposPreenchidos) throw new AppError(AppError.parametrosObrigatoriosAusentes);

        const existePorCpf = await usuariosRepository.existePorCpf(CPF);
        if (existePorCpf) return Eiter.Left(Eiter.valorJaCadastrado('CPF'));

        const existePorEmail = await usuariosRepository.existePorEmail(email);
        if (existePorEmail) return Eiter.Left(Eiter.valorJaCadastrado('Email'));

        await usuariosRepository.cadastrar({
            nome_completo,
            CPF,
            telefone,
            endereco,
            email,
        });

        return Eiter.Right(null);
    };
};
