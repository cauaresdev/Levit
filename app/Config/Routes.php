<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->group('api/v1', function ($routes) {
    $routes->post('auth/registrar', 'AuthController::registrar');
});