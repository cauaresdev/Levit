<?php

namespace App\Controllers;

class Home extends BaseController
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
}
