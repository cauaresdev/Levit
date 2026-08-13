<?php

namespace App\Services;

use App\Exceptions\NaoEncontradoException;
use App\Models\CandidatoModel;
use App\Models\EmpresaModel;
use App\Models\HistoricoFaseModel;

class CandidatoService
{
    private const FASES_VALIDAS = ['inscrito', 'entrevista', 'teste', 'aprovado'];

    protected EmpresaModel $empresaModel;
    protected CandidatoModel $candidatoModel;
    protected HistoricoFaseModel $historicoFaseModel;

    public function __construct()
    {
        $this->empresaModel       = new EmpresaModel();
        $this->candidatoModel     = new CandidatoModel();
        $this->historicoFaseModel = new HistoricoFaseModel();
    }

    /**
     * Registra uma candidatura pública — endpoint sem autenticação.
     *
     * @throws NaoEncontradoException se a empresa não existir
     * @throws \DomainException se o e-mail já se candidatou antes
     */
    public function criarCandidatura(string $empresaId, array $dados): array
    {
        if (! $this->empresaModel->find($empresaId)) {
            throw new NaoEncontradoException('Empresa não encontrada.');
        }

        $jaExiste = $this->candidatoModel
            ->where('empresa_id', $empresaId)
            ->where('email', $dados['email'])
            ->first();

        if ($jaExiste) {
            throw new \DomainException('Você já se candidatou para esta empresa anteriormente.');
        }

        $candidatoId = $this->candidatoModel->insert([
            'empresa_id'     => $empresaId,
            'nome'           => $dados['nome'],
            'email'          => $dados['email'],
            'telefone'       => $dados['telefone'] ?? null,
            'cargo_desejado' => $dados['cargo_desejado'] ?? null,
            'mensagem'       => $dados['mensagem'] ?? null,
        ]);

        return $this->buscarCandidato($candidatoId, $empresaId);
    }

    /**
     * Monta o Kanban já agrupado por fase, com contagem por coluna.
     */
    public function listarKanban(string $empresaId): array
    {
        $candidatos = $this->candidatoModel
            ->where('empresa_id', $empresaId)
            ->orderBy('criado_em', 'ASC')
            ->findAll();

        $kanban = [];

        foreach (self::FASES_VALIDAS as $fase) {
            $kanban[$fase] = ['total' => 0, 'candidatos' => []];
        }

        foreach ($candidatos as $candidato) {
            $fase = $candidato['fase_atual'];
            $kanban[$fase]['candidatos'][] = $candidato;
            $kanban[$fase]['total']++;
        }

        return $kanban;
    }

    /**
     * @throws \DomainException se a fase for inválida ou já for a atual
     * @throws NaoEncontradoException se o candidato não existir
     */
    public function moverFase(string $candidatoId, string $empresaId, string $novaFase, string $usuarioId): array
    {
        if (! in_array($novaFase, self::FASES_VALIDAS, true)) {
            throw new \DomainException("Fase inválida: '{$novaFase}'.");
        }

        $candidato = $this->candidatoModel
            ->where('id', $candidatoId)
            ->where('empresa_id', $empresaId)
            ->first();

        if (! $candidato) {
            throw new NaoEncontradoException('Candidato não encontrado.');
        }

        if ($candidato['fase_atual'] === $novaFase) {
            throw new \DomainException('O candidato já está nessa fase.');
        }

        $db = db_connect();
        $db->transStart();

        $this->candidatoModel->update($candidatoId, ['fase_atual' => $novaFase]);

        $this->historicoFaseModel->insert([
            'candidato_id'  => $candidatoId,
            'fase_anterior' => $candidato['fase_atual'],
            'fase_nova'     => $novaFase,
            'alterado_por'  => $usuarioId,
        ]);

        $db->transComplete();

        if ($db->transStatus() === false) {
            throw new \RuntimeException('Não foi possível mover o candidato. Tente novamente.');
        }

        return $this->buscarCandidato($candidatoId, $empresaId);
    }

    public function buscarCandidato(string $candidatoId, string $empresaId): array
    {
        $candidato = $this->candidatoModel
            ->where('id', $candidatoId)
            ->where('empresa_id', $empresaId)
            ->first();

        if (! $candidato) {
            throw new NaoEncontradoException('Candidato não encontrado.');
        }

        return $candidato;
    }

    public function excluirCandidato(string $candidatoId, string $empresaId): void
    {
        $this->buscarCandidato($candidatoId, $empresaId);
        $this->candidatoModel->delete($candidatoId);
    }
}