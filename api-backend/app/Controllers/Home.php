<?php

namespace App\Controllers;

class Home extends BaseApiController
{
    public function index()
    {
        return $this->response->setJSON([
            'status' => 'sucesso',
            'mensagem' => 'Sistema rodando.',
            'dados' => [
                'sistema' => 'Levit - Backend',
                'nivel_bateria' => '100%'
            ]
        ]);
    }

    public function naoEncontrado()
    {
        return $this->respondError('Recurso não encontrado.', 404);
    }
}
