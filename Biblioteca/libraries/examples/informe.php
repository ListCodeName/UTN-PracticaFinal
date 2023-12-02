<?php

include_once ('/modelo/Conectar.php');

$consulta = Conectar::conexion()->prepare("SELECT u.nombre, u.apellido, m.materia, l.titulo, a.autor, e.editorial, p.cantidad, p.fechaPedido
FROM (((((pedidos AS p
INNER JOIN libros AS l ON p.idLibro = l.idLibro)
INNER JOIN usuarios AS u ON p.idUsuarios = u.idUsuarios)
INNER JOIN materias AS m ON l.idMateria = m.idMateria)
INNER JOIN autores AS a ON l.idAutor = a.idAutor)
INNER JOIN editoriales AS e ON l.idEditorial = e.idEditorial)
WHERE l.activo = 2 ORDER BY p.fechaPedido ASC");
            
$consulta->execute();
            
$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

$tablas = "";

foreach ($resultados as &$pedido){
    $tablas += "<tr>
        <td width='150'>".$pedido['nombre']." ".$pedido['apellido']."</td>
        <td width='75'>".$pedido['materia']."</td>
        <td width='150'>".$pedido['titulo']."</td>
        <td width='75'>".$pedido['autor']."</td>
        <td width='75'>".$pedido['editorial']."</td>
        <td width='50'>".$pedido['cantidad']."</td>
        <td width='65'>".$pedido['fechaPedido']."</td>
    </tr>";
}


require_once('../tcpdf.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetTitle('Informe Biblioteca - Libros pedidos');

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 11);

// add a page
$pdf->AddPage();

$html = <<<EOF
<style>
    h1 {
        color: #333;
        font-size: 24pt;
    }
    table.first {
        color: #003300;
        border: 1px solid #333;
    }
    th{
        color: #FAFAFA;
        border: 1px solid #333;
        background-color: #002040;
        font-size: 9pt;
        text-align: center;
    }
    td {
        border: 1px solid #333;
        background-color: #ffffee;
        padding: 0px 5px;
        font-size: 8pt;
        text-align: center;
    }
</style>

<h1 class="title">SOLICITUD DE LIBROS 2023</h1>

<table class="first">
    <tr>
        <th width="150"><b>PROFESOR</b></th>
        <th width="75"><b>MATERIA</b></th>
        <th width="150"><b>LIBRO</b></th>
        <th width="75"><b>AUTOR</b></th>
        <th width="75"><b>EDITORIAL</b></th>
        <th width="50"><b>CANT.</b></th>
        <th width="65"><b>FECHA</b></th>
    </tr>
    $tabla
</table>
EOF;

// output the HTML content
$pdf->writeHTML($html, true, false, true, false, '');

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('Informe.pdf', 'I');

?>