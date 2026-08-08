<?php

namespace App\Services;

use App\Models\EmpresaModel;
use App\Models\UsuarioModel;
use App\Models\TokenRevogadoModel;

class AuthService
{
    protected EmpresaModel $empresaModel;
    protected UsuarioModel $usuarioModel;
    protected TokenRevogadoModel $tokenRevogadoModel;

    public function __construct()
    {
        $this->empresaModel       = new EmpresaModel();
        $this->usuarioModel       = new UsuarioModel();
        $this->tokenRevogadoModel = new TokenRevogadoModel();
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

    /**
     * Autentica um usuário pelo e-mail e senha.
     *
     * @throws \DomainException se e-mail ou senha estiverem incorretos
     */
    public function autenticar(string $email, string $senha): array
    {
        $usuario = $this->usuarioModel->where('email', $email)->first();

        // Mesmo que o e-mail não exista, fazemos um password_hash() de
        // custo equivalente antes de decidir — isso evita que o tempo de
        // resposta "vaze" se aquele e-mail existe ou não (timing attack).
        $hashParaComparar = $usuario['senha_hash']
            ?? password_hash('timing-attack-dummy', PASSWORD_BCRYPT, ['cost' => 10]);

        if (! $usuario || ! password_verify($senha, $hashParaComparar)) {
            throw new \DomainException('E-mail ou senha incorretos.');
        }

        $empresa = $this->empresaModel->find($usuario['empresa_id']);

        return [
            'usuario' => $usuario,
            'empresa' => $empresa,
        ];
    }

    /**
     * Revoga um token, impedindo seu uso em requisições futuras
     * mesmo que ele ainda não tenha expirado naturalmente.
     */
    public function revogarToken(string $jti, string $usuarioId, int $expiraEmTimestamp): void
    {
        $this->tokenRevogadoModel->insert([
            'jti'        => $jti,
            'usuario_id' => $usuarioId,
            'expira_em'  => date('Y-m-d H:i:s', $expiraEmTimestamp),
        ]);
    }

    /**
     * Verifica se um token (pelo seu jti) já foi revogado.
     */
    public function tokenRevogado(string $jti): bool
    {
        return (bool) $this->tokenRevogadoModel->where('jti', $jti)->first();
    }
}