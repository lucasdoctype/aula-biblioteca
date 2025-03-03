const AppError = require('../../shared/errors/AppError');
const Eiter = require('../../shared/errors/Either');
const cadastrarUsuarioUsecase = require('../cadastrar-usuario-.usecase');

describe('Cadastrar usuario UseCase', function () {
     const usuariosRepository = {
          cadastrar: jest.fn(),
          existePorCpf: jest.fn(),
          existePorEmail: jest.fn(),
     };

     test('Deve poder Cadastrar um Usuário', async function () {
          const usuarioDto = {
               nome_completo: 'nome_valido',
               CPF: 'CPF_valido',
               endereco: 'endereco_valido',
               telefone: 'telefone_valido',
               email: 'email_valido',
          };

          const sut = cadastrarUsuarioUsecase({ usuariosRepository });
          const output = await sut(usuarioDto);

          expect(output.right).toBeNull();
          expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDto);
          expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
     });

     test('Deve retornar um throw AppError se o usuarioRepository não for fornecido', function () {
          expect(() => cadastrarUsuarioUsecase({})).toThrow(AppError.dependencias);
     });

     test('Deve retornar um throw AppError se campos obrigatórios não forem fornecidos', async function () {
          const sut = cadastrarUsuarioUsecase({ usuariosRepository });
          await expect(() => sut({})).rejects.toThrow(new AppError(AppError.parametrosObrigatoriosAusentes));
     });

     test('Deve retornar um throw  Eiter.Left se já existir um cadastro com o CPF', async function () {
          usuariosRepository.existePorCpf.mockResolvedValue(true);
          const usuarioDto = {
               nome_completo: 'nome_valido',
               CPF: 'CPF_ja_cadastrado',
               endereco: 'endereco_valido',
               telefone: 'telefone_valido',
               email: 'email_valido',
          };

          const sut = cadastrarUsuarioUsecase({ usuariosRepository });
          const output = await sut(usuarioDto);

          expect(output.right).toBeNull();
          expect(output.left).toEqual(Eiter.valorJaCadastrado('CPF'));
          expect(usuariosRepository.existePorCpf).toHaveBeenCalledWith(usuarioDto.CPF);
          expect(usuariosRepository.existePorCpf).toHaveBeenCalledTimes(1);
     });

     test('Deve retornar um Eiter.Left se já existir um cadastro com o Email', async function () {
          usuariosRepository.existePorCpf.mockResolvedValue(false);
          usuariosRepository.existePorEmail.mockResolvedValue(true);
          const usuarioDto = {
               nome_completo: 'nome_valido',
               CPF: 'CPF_valido',
               endereco: 'endereco_valido',
               telefone: 'telefone_valido',
               email: 'email_ja_cadastrado',
          };

          const sut = cadastrarUsuarioUsecase({ usuariosRepository });
          const output = await sut(usuarioDto);

          expect(output.right).toBeNull();
          expect(output.left).toEqual(Eiter.valorJaCadastrado('Email'));
          expect(usuariosRepository.existePorEmail).toHaveBeenCalledWith(usuarioDto.email);
          expect(usuariosRepository.existePorEmail).toHaveBeenCalledTimes(1);
     });
});
