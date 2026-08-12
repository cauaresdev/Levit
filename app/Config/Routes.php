<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->group('api/v1', function ($routes) {
    $routes->post('auth/registrar', 'AuthController::registrar');
    $routes->post('auth/login', 'AuthController::login');
    $routes->post('auth/logout', 'AuthController::logout', ['filter' => 'auth']);

    $routes->get('modulos', 'ModuloController::listar', ['filter' => 'auth']);
    $routes->post('modulos', 'ModuloController::criar', ['filter' => 'auth:gerenciar_modulos']);
    $routes->put('modulos/(:segment)', 'ModuloController::atualizar/$1', ['filter' => 'auth:gerenciar_modulos']);
    $routes->delete('modulos/(:segment)', 'ModuloController::excluir/$1', ['filter' => 'auth:gerenciar_modulos']);
    $routes->post('modulos/(:segment)/campos', 'ModuloController::adicionarCampo/$1', ['filter' => 'auth:gerenciar_modulos']);
    $routes->put('modulos/(:segment)/campos/reordenar', 'ModuloController::reordenarCampos/$1', ['filter' => 'auth:gerenciar_modulos']);
    $routes->put('modulos/(:segment)/campos/(:segment)', 'ModuloController::atualizarCampo/$1/$2', ['filter' => 'auth:gerenciar_modulos']);
    $routes->delete('modulos/(:segment)/campos/(:segment)', 'ModuloController::excluirCampo/$1/$2', ['filter' => 'auth:gerenciar_modulos']);
});