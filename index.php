<?php
require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\HttpKernel;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Load Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

// Load routes
$routes = require __DIR__ . '/routes.php';

// Handle the request
$request = Request::createFromGlobals();
$context = new RequestContext();
$context->fromRequest($request);

$matcher = new UrlMatcher($routes, $context);

try {
    $attributes = $matcher->match($request->getPathInfo());
    $controller = $attributes['_controller'];

    // Handle the controller
    $response = $controller();
} catch (ResourceNotFoundException $e) {
    $response = new Response('<h1>Page Not Found</h1>', 404);
} catch (Exception $e) {
    $response = new Response('<h1>An error occurred</h1>', 500);
}

// Send the response
$response->send();
