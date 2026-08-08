<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->group('api/v1', function ($routes) {
    $routes->post('auth/registrar', 'AuthController::registrar');
    $routes->post('auth/login', 'AuthController::login');
    $routes->post('auth/logout', 'AuthController::logout', ['filter' => 'auth']);
    $routes->get('auth/me', 'AuthController::me', ['filter' => 'auth']);
});