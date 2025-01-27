<?php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\HttpFoundation\Response;


$routes = new RouteCollection();

$routes->add('home', new Route('/', [
    '_controller' => function () use ($twig) {
        return new Response($twig->render('home.html.twig', ['title' => 'FarmManager PWA']));
    }
]));

$routes->add('iatf', new Route('/iatf', [
    '_controller' => function () use ($twig) {
        return new Response($twig->render('iatf-form.html.twig', ['title' => 'FarmManager PWA']));
    }
]));

$routes->add('about', new Route('/about', [
    '_controller' => function () {
        return new Response('<h1>About FarmManager PWA</h1>');
    }
]));

return $routes;
