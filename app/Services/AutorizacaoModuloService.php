<?php

namespace App\Services;

use App\Exceptions\AcessoNegadoException;
use App\Exceptions\NaoEncontradoException;
use App\Models\CargoModuloPermissaoModel;

class AutorizacaoModuloService
{
    private const NIVEIS = ['visualizar' => 1, 'editar' => 2, 'gerenciar' => 3];

    protected CargoModuloPermissaoModel $cargoModuloPermissaoModel;

    public function __construct()
    {
        $this->cargoModuloPermissaoModel = new CargoModuloPermissaoModel();
    }

    public function nivelDeAcesso(string $cargoId, string $moduloId): ?string
    {
        $linha = $this->cargoModuloPermissaoModel
            ->where('cargo_id', $cargoId)
            ->where('modulo_id', $moduloId)
            ->first();

        return $linha['nivel'] ?? null;
    }

    /**
     * @throws NaoEncontradoException se não houver nenhum nível concedido (módulo "invisível")
     * @throws AcessoNegadoException se houver nível, mas insuficiente pra ação
     */
    public function exigirNivel(bool $acessoTotal, string $cargoId, string $moduloId, string $nivelMinimo): void
    {
        if ($acessoTotal) {
            return;
        }

        $nivelAtual = $this->nivelDeAcesso($cargoId, $moduloId);

        if ($nivelAtual === null) {
            throw new NaoEncontradoException('Módulo não encontrado.');
        }

        if (self::NIVEIS[$nivelAtual] < self::NIVEIS[$nivelMinimo]) {
            throw new AcessoNegadoException('Você não tem nível de acesso suficiente neste módulo.');
        }
    }

    /**
     * Usado ao criar um módulo — garante que quem criou já enxerga
     * o que acabou de criar, mesmo sem acesso_total.
     */
    public function concederGerenciar(string $cargoId, string $moduloId): void
    {
        $jaExiste = $this->cargoModuloPermissaoModel
            ->where('cargo_id', $cargoId)
            ->where('modulo_id', $moduloId)
            ->first();

        if ($jaExiste) {
            $this->cargoModuloPermissaoModel->update($jaExiste['id'], ['nivel' => 'gerenciar']);
            return;
        }

        $this->cargoModuloPermissaoModel->insert([
            'cargo_id'  => $cargoId,
            'modulo_id' => $moduloId,
            'nivel'     => 'gerenciar',
        ]);
    }
}