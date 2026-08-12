<?php

namespace App\Libraries;

class AuthenticatedUser
{
    public ?string $id = null;
    public ?string $empresaId = null;
    public ?string $jti = null;
    public ?int $expiraEm = null;
    public array $permissoes = [];

    public function autenticado(): bool
    {
        return $this->id !== null;
    }

    public function preencher(string $id, string $empresaId, string $jti, int $expiraEm, array $permissoes): void
    {
        $this->id         = $id;
        $this->empresaId  = $empresaId;
        $this->jti        = $jti;
        $this->expiraEm   = $expiraEm;
        $this->permissoes = $permissoes;
    }

    public function temPermissao(string $codigo): bool
    {
        return in_array($codigo, $this->permissoes, true);
    }
}