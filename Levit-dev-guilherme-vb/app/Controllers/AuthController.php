<?php

namespace App\Controllers;

use App\Services\AuthService;
use App\Services\JwtService;

class AuthController extends BaseApiController
{
    protected AuthService $authService;
    protected JwtService $jwtService;

    public function __construct()
    {
        $this->authService = new AuthService();
        $this->jwtService  = new JwtService();
    }

    public function registrar()
    {
        $dados = $this->request->getJSON(true) ?? [];

        $rules = [
            'nome'         => ['required', 'min_length[3]', 'max_length[150]'],
            'email'        => ['required', 'valid_email', 'max_length[150]'],
            'senha'        => ['required', 'min_length[8]', 'regex_match[/^(?=.*[A-Za-z])(?=.*\d).+$/]'],
            'cnpj_cpf'     => ['required', 'max_length[18]'],
            'nome_empresa' => ['required', 'min_length[2]', 'max_length[150]'],
        ];

        $messages = [
            'senha' => [
                'regex_match' => 'A senha deve conter letras e números.',
            ],
        ];

        if (! $this->validateData($dados, $rules, $messages)) {
            return $this->respondError('Dados inválidos.', 422, $this->validator->getErrors());
        }

        try {
            $resultado = $this->authService->registrarFundador($dados);
        } catch (\DomainException $e) {
            return $this->respondError($e->getMessage(), 409);
        } catch (\RuntimeException $e) {
            return $this->respondError($e->getMessage(), 500);
        }

        $token = $this->jwtService->gerar([
            'sub'        => $resultado['usuario']['id'],
            'empresa_id' => $resultado['empresa']['id'],
        ]);

        return $this->respondSuccess(
            $this->respostaAutenticacao($resultado['usuario'], $resultado['empresa']),
            201
        );
    }

    private function respostaAutenticacao(array $usuario, array $empresa): array
    {
        $token = $this->jwtService->gerar([
            'sub'        => $usuario['id'],
            'empresa_id' => $empresa['id'],
        ]);

        return [
            'token'   => $token,
            'usuario' => [
                'id'    => $usuario['id'],
                'nome'  => $usuario['nome'],
                'email' => $usuario['email'],
            ],
            'empresa' => [
                'id'   => $empresa['id'],
                'nome' => $empresa['nome'],
            ],
        ];
    }

    public function login()
    {
        $dados = $this->request->getJSON(true) ?? [];

        $rules = [
            'email' => ['required', 'valid_email'],
            'senha' => ['required'],
        ];

        if (! $this->validateData($dados, $rules)) {
            return $this->respondError('Dados inválidos.', 422, $this->validator->getErrors());
        }

        try {
            $resultado = $this->authService->autenticar($dados['email'], $dados['senha']);
        } catch (\DomainException $e) {
            return $this->respondError($e->getMessage(), 401);
        }

        return $this->respondSuccess(
            $this->respostaAutenticacao($resultado['usuario'], $resultado['empresa']),
            200
        );
    }

    public function logout()
    {
        $user = service('authenticatedUser');

        $this->authService->revogarToken($user->jti, $user->id, $user->expiraEm);

        return $this->respondSuccess(null, 200);
    }
}