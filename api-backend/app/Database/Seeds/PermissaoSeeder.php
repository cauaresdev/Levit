<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class PermissaoSeeder extends Seeder
{
    public function run()
    {
        helper('uuid');

        $permissoes = [
            ['codigo' => 'gerenciar_modulos',      'descricao' => 'Criar, editar e excluir módulos'],
            ['codigo' => 'gerenciar_equipe',       'descricao' => 'Convidar, remover membros e gerenciar cargos'],
            ['codigo' => 'gerenciar_recrutamento', 'descricao' => 'Gerenciar o Kanban de recrutamento e candidatos'],
            ['codigo' => 'ver_relatorios',         'descricao' => 'Visualizar relatórios e exportações'],
            ['codigo' => 'gerenciar_automacoes',   'descricao' => 'Criar e editar automações'],
        ];

        foreach ($permissoes as $permissao) {
            $jaExiste = $this->db->table('permissao')
                ->where('codigo', $permissao['codigo'])
                ->get()
                ->getRow();

            if ($jaExiste) {
                continue;
            }

            $this->db->table('permissao')->insert([
                'id'        => generate_uuid_v7(),
                'codigo'    => $permissao['codigo'],
                'descricao' => $permissao['descricao'],
            ]);
        }
    }
}