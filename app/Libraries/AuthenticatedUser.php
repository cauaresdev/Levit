<?php

namespace App\Libraries;

class AuthenticatedUser
{
    public ?string $id = null;
    public ?string $empresaId = null;
    public ?string $jti = null;
    public ?int $expiraEm = null;

    public function autenticado(): bool
    {
        return $this->id !== null;
    }

    public function preencher(string $id, string $empresaId, string $jti, int $expiraEm): void
    {
        $this->id        = $id;
        $this->empresaId = $empresaId;
        $this->jti       = $jti;
        $this->expiraEm  = $expiraEm;
    }
}