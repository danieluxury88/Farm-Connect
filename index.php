<?php
require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Load Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

// Serve the app
$request = Request::createFromGlobals();
echo $twig->render('base.html.twig', ['title' => 'FarmManager PWA']);
?>
