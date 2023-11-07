<?php

$libro = array(
    'isbn' => '1234512',
    'titulo' => 'Caperucita y el lobo',
    'autor' => 'Julio Cortazar',
    'ubicacionFisica' => 'A33',
    'editorial' => 'Santillana',
    'materia' => 'Lengua y literatura',
    'lugarEdicion' =>  'Buenos Aires',
    'anio' => '2000',
    'serie' => 'Ficción',
    'observaciones' => 'Un libro muy interesante'
);

echo json_encode($libro);

?>