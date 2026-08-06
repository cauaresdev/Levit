<?php

namespace App\Services;

use App\Models\EmpresaModel;
use App\Models\UsuarioModel;

class AuthService
{
    protected EmpresaModel $empresaModel;
    protected UsuarioModel $usuarioModel;

    public function __construct()
    {
        $this->empresaModel = new EmpresaModel();
        $this->usuarioModel = new UsuarioModel();
    }

    /**
     * Cria uma empresa nova e o usuário fundador (admin) dela,
     * em uma única transação.
     *
     * @throws \DomainException se e-mail ou CNPJ/CPF já estiverem em uso
     * @throws \RuntimeException se a transação falhar por outro motivo
     */
    public function registrarFundador(array $dados): array
    {
        if ($this->usuarioModel->where('email', $dados['email'])->first()) {
            throw new \DomainException('Este e-mail já está em uso.');
        }

        if ($this->empresaModel->where('cnpj_cpf', $dados['cnpj_cpf'])->first()) {
            throw new \DomainException('Este CNPJ/CPF já está cadastrado.');
        }

        $db = db_connect();
        $db->transStart();

        $empresaId = $this->empresaModel->insert([
            'nome'     => $dados['nome_empresa'],
            'cnpj_cpf' => $dados['cnpj_cpf'],
        ]);

        $usuarioId = $this->usuarioModel->insert([
            'empresa_id' => $empresaId,
            'nome'       => $dados['nome'],
            'email'      => $dados['email'],
            'senha_hash' => password_hash($dados['senha'], PASSWORD_BCRYPT, ['cost' => 10]),
        ]);

        $db->transComplete();

        if ($db->transStatus() === false) {
            throw new \RuntimeException('Não foi possível concluir o cadastro. Tente novamente.');
        }

        return [
            'empresa' => $this->empresaModel->find($empresaId),
            'usuario' => $this->usuarioModel->find($usuarioId),
        ];
    }
}