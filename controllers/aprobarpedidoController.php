<?php

class aprobarpedidoController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/forms/wizard/bs-stepper.min',
					'plugins/vendors/css/extensions/sweetalert2.min',

					'plugins/vendors/css/charts/vendors.min',
					'plugins/vendors/css/charts/apexcharts',
					'plugins/vendors/css/extensions/toastr.min',
					'dist/css/bootstrap-extended',
					'dist/css/themes/bordered-layout',
					'plugins/plugins/charts/chart-apex',

					'dist/css/forms/select/select2.min',
					'dist/css/bootstrap',
					'dist/css/colors',
					'dist/css/components',
					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-validation',
					'dist/css/plugins/forms/form-wizard',
					'dist/css/custom',
					'dist/css/style',
					'dist/css/plugins/forms/wizard/form-wizard',
					'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					'plugins/datatables-net/css/jquery.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',
				)
			);

			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					'plugins/vendors/js/forms/wizard/bs-stepper.min',


					'plugins/vendors/js/charts/apexcharts',
					'plugins/vendors/js/charts/chart.min',
					'plugins/vendors/js/charts/apexcharts.min',
					'plugins/vendors/js/extensions/toastr.min',
					'plugins/vendors/js/extensions/moment.min',


					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					'dist/js/scripts/forms/form-wizard',
					'plugins/datatables-net/js/jquery.dataTables.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					'plugins/vendors/js/extensions/sweetalert2.all.min',
					'dist/js/scripts/forms/form-input-mask',
					'plugins/vendors/js/forms/cleave/cleave.min',
					'dist/js/scripts/forms/form-wizard',

					'dist/js/scripts/progressbar/progressbar',
					'dist/js/scripts/progressbar/progressbar.min',


				)
			);
			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$cargo = array(
				'v_cargo' => $_SESSION['id_cargo'],
				'i_perfil' => $_SESSION['idperfil'],
				'i_estado' => 3,
			);

			$result = $soap->ListadoPedidosAprobacion($cargo);
			$ListadoPedidosAprobacion = json_decode($result->ListadoPedidosAprobacionResult, true);




			$estadopedido = array(
				'post' =>	2,
				'v_usuario' => $_SESSION['dni'],
			);

			$result = $soap->PedidoEstados($estadopedido);
			$PedidoEstado = json_decode($result->PedidoEstadosResult, true);


			$this->_view->ListadoPedidosAprobacion = $ListadoPedidosAprobacion;
			$this->_view->PedidoEstado = $PedidoEstado;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function MostrarTimelinePedido() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$nu_correla = $_POST['nu_correla'];

			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$client = array(
				'nu_correla' =>		$nu_correla,
			);


			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarTimelinePedido($client);
			$data = json_decode($result->MostrarTimelinePedidoResult, true);

			$f_porcentaje  =  intval($data[0]['f_porcentaje']);


			$filas = [];
			$i = 0;
			foreach ($data as $da) {
				$propiedades1 = array(
					"nu_correla" => ($da['nu_correla']),
					"v_idgrupo" => $da['v_idgrupo'],
					"v_area" => $da['v_area'],
					"v_moneda" => $da['v_moneda'],
					"f_total" => $da['f_total'],
					"v_validar_tope" => $da['v_validar_tope'],
					"f_valorinicio_condicion_uno" => $da['f_valorinicio_condicion_uno'],
					"f_valortope_condicion_uno" => $da['f_valortope_condicion_uno'],
					"v_secuencia" => $da['v_secuencia'],
					"i_idorden_aprobacion" => $da['i_idorden_aprobacion'],
					"Status" => $da['Status'],
					"v_color_fase" => $da['v_color_fase'],
					"i_idorden" => $da['i_idorden'],
					"v_aprobador_uno" => $da['v_aprobador_uno'],
					"v_secuencia_val" => $da['v_secuencia_val'],
					"v_nombre_estado" => $da['v_nombre_estado'],
					"v_botones_aprobacion" => $da['v_botones_aprobacion'],
					"v_descripcion_aprobador" => $da['v_descripcion_aprobador'],
					"d_fecha_registrotrk" => $da['d_fecha_registrotrk'],
				);
				$filas += ["$i" => $propiedades1];
				$i++;
			}
			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					'data' => $filas,
					'f_porcentaje' => $f_porcentaje
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function MostrarFilePedido() //2
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$nu_correla = $_POST['nropedido'];
			$v_codprod = $_POST['codprodnote'];
			$v_nombre_file = $_POST['v_nombre_file'];

			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$client = array(
				'post' =>		$post,
				'nu_correla' =>		$nu_correla,
				'v_codprod' =>		$v_codprod,
				'v_nombre_file' =>	 	$v_nombre_file,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarPedidoFile($client);
			$data = json_decode($result->MostrarPedidoFileResult, true);

			$filas = [];
			$i = 0;
			foreach ($data as $da) {
				$propiedades1 = array(
					"nu_correla" => ($da['nu_correla']),
					"v_codprod" => $da['v_codprod'],
					"v_descripcion_file" => $da['v_descripcion_file'],
					"v_icon" => $da['v_icon'],
					"v_color" => $da['v_color'],
					"v_tardwn" => $da['v_tardwn'],
					"v_tardwnname" => $da['v_tardwnname'],
					"v_url" => $da['v_url'],
					"v_nombre_file" => $da['v_nombre_file'],
				);
				$filas += ["$i" => $propiedades1];
				$i++;
			}
			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					'data' => $filas
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function ProcesoAprobacionPedido() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$nu_correla = $_POST['nu_correla'];
			$v_username =  $_SESSION['dni'];
			$v_idarea =  $_SESSION['idarea'];
			$v_cargo =  $_SESSION['id_cargo'];


			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$params = array(
				'post' => $post,
				'nu_correla' => $nu_correla,
				'v_username' => $v_username,
				'v_idarea' => $v_idarea,
				'v_cargo' => $v_cargo,
			);

			$soap = new SoapClient($wsdl, $options);
			$result2 = $soap->ProcesoAprobacionPedido($params);
			$ProcesoAprobacionPedido = json_decode($result2->ProcesoAprobacionPedidoResult, true);

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $ProcesoAprobacionPedido[0]['v_icon'],
					"vtitle" 		=> $ProcesoAprobacionPedido[0]['v_title'],
					"vtext" 		=> $ProcesoAprobacionPedido[0]['v_text'],
					"itimer" 		=> $ProcesoAprobacionPedido[0]['i_timer'],
					"icase" 		=> $ProcesoAprobacionPedido[0]['i_case'],
					"vprogressbar" 	=> $ProcesoAprobacionPedido[0]['v_progressbar'],

				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function documentopedido($nu_correla)
	{
		if (isset($_SESSION['usuario'])) {

			function html_caracteres($string)
			{
				$string = str_replace(
					array('&amp;', '&Ntilde;', '&Aacute;', '&Eacute;', '&Iacute;', '&Oacute;', '&Uacute;'),
					array('&', 'Ñ', 'Á', 'É', 'Í', 'Ó', 'Ú'),
					$string
				);
				return $string;
			}

			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				//"cache_wsdl"=> WSDL_CACHE_BOTH,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$params = array(
				'nu_correla' =>		$nu_correla,
			);


			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarPedido($params);
			$data = json_decode($result->MostrarPedidoResult, true);


			// $dni = $boletas_cabecera[0]['DNI'];


			$this->getLibrary('fpdf/fpdf');

			$pdf = new FPDF('P', 'mm', 'A4');
			$pdf->AddPage();




			// $pdf->Cell(2);
			// $pdf->SetMargins(8, 1, 10);
			// $pdf->Cell(0, 23, "", 1, 0, "C");

			// $pdf->SetFont('Arial', 'B', 12);
			// $pdf->MultiCell(
			// 	190,
			// 	-2,
			// 	"",
			// 	0,
			// 	"L",
			// 	false
			// );
			// $pdf->MultiCell(190, 10, "BOLETA DE PAGO MENSUAL NRO: # " . $boletas_cabecera[0]['NBRBOLETA'], 0, "C", false);

			// $pdf->Ln(1);

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(5),
			// 	$pdf->Cell(27, 5, "RAZON SOCIAL : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(80, 5, $boletas_cabecera[0]['RAZONSOCIAL'], 0, 0, "L"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(5),
			// 	$pdf->Cell(27, 3, "R.U.C. : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(80, 3, $boletas_cabecera[0]['RUC'], 0, 0, "L"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(5),
			// 	$pdf->Cell(27, 2, "PERIODO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(80, 2, $boletas_cabecera[0]['PERIODO'], 0, 0, "L"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->Image('./public/dist/img/logo_boleta.jpg', 128, 17, 70, 14, "jpg");

			// $pdf->Ln(2);

			// $pdf->Cell(72);
			// $pdf->SetMargins(8, 2, 56);
			// $pdf->SetLineWidth(0.5);
			// $pdf->Cell(0, 53, "", 1, 0, "C"); // CUADRO DE REGIMEN, BANCO Y REMUNERACION

			// $pdf->SetFont('Arial', 'B', 12);
			// $pdf->MultiCell(
			// 	190,
			// 	0,
			// 	"",
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->Cell(147);
			// $pdf->SetMargins(8, 2, 10);
			// $pdf->SetLineWidth(0.5);
			// $pdf->Cell(0, 72, "", 1, 0, "C"); // CUADRO DE CONTROL DE DIAS

			// $pdf->Ln(3);

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(3),
			// 	$pdf->Cell(32, 3, "TIPO TRABAJADOR : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(31, 3, $boletas_cabecera[0]['TTRABAJADOR'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "REG. LABORAL : ", 0, 0, "R"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(48, 3, $boletas_cabecera[0]['REGIMEN'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'BU', 8),
			// 	$pdf->Cell(32, 3, "CONTROL DE DIAS", 0, 0, "L"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(3),
			// 	$pdf->Cell(32, 3, utf8_decode("PAÍS : "), 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(31, 3, utf8_decode(html_caracteres($boletas_cabecera[0]['PAIS'])), 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "AFP / SNP : ", 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(48, 3, $boletas_cabecera[0]['AFPNOMBRE'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "LABORADOS : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['DLABORADOS'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(12, 48, 78, 48); // LINEA DEBAJO DE PAIS

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(80, 55, 154, 55); //LINEA DEBAJO DE CUSPP

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "TIPO DOCUMENTO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(31, 3, $boletas_cabecera[0]['TDOCUMENTO'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "CUSPP : ", 0, 0, "R"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(48, 3, $boletas_cabecera[0]['NUMAFP'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "FALTAS : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['FALTAS'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "NRO. DOCUMENTO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(31, 3, $boletas_cabecera[0]['DNI'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(48, 3, "", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "VACACIONES : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['VACACIONES'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(12, 58, 78, 58); //LINEA DEBAJO DE DNI

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "NOMBRES : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(31, 3, utf8_decode(html_caracteres($boletas_cabecera[0]['PERNOMBRE'])), 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "BANCO : ", 0, 0, "R"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(48, 3, $boletas_cabecera[0]['BANCO'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "PERMISO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['DPERMISO'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "APELLIDO PATENO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(31, 3, utf8_decode(html_caracteres($boletas_cabecera[0]['PERPATERNO'])), 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "NRO. CUENTA : ", 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(48, 3, $boletas_cabecera[0]['CTABANCARIA'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "LCGH : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['DLCGH'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "APELLIDO MATERNO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, utf8_decode(html_caracteres($boletas_cabecera[0]['PERMATERNO'])), 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(44, 3, "", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "LSGH : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['DLSGH'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(12, 73, 78, 73); // LINEA DEBAJO DE APELLIDO MATERNO

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(80, 70, 154, 70); // LINEA DEBAJO DE NUMERO DE CUENTA

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "FEC. INGRESO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(31, 3, $boletas_cabecera[0]['FINGRESO'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, utf8_decode("REMUNERACIÓN : "), 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(48, 3, $boletas_cabecera[0]['REMUNERACION'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "SCGH : ", 0, 0, "L"),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['SUSPECGH'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "FIN DE CONTRATO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(31, 3, $boletas_cabecera[0]['FIN_CONTRATO'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "MODO DE PAGO : ", 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(48, 3, $boletas_cabecera[0]['TIPO_PAGO'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "SSGH : ", 0, 0, "L"),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['SUSPESGH'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->Cell(32, 3, "", 0, 0, "L"),
			// 	$pdf->Cell(31, 3, "", 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, utf8_decode("BÁSICO TEÓRICO : "), 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(48, 3, number_format($boletas_cabecera[0]['BASICO'],2), 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "DES. MEDICO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['DMEDICO'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->Cell(32, 3, "", 0, 0, "L"),
			// 	$pdf->Cell(31, 3, "", 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->Cell(32, 3, "", 0, 0, "L"),
			// 	$pdf->Cell(48, 3, "", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "OTROS : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['DOTROS'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, utf8_decode("ÁREA :"), 0, 0, "L"),
			// 	$pdf->Cell(50, 3, $boletas_cabecera[0]['AREA'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "HR. LABORABLES : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(29, 3, $boletas_cabecera[0]['HLABORADAS'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "INCP / ENFER. : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $boletas_cabecera[0]['SUBINCAPACIDAD'], 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $SUB_MATERNO = "";
			// $NOM_MATERNO = "";
			// if ($boletas_cabecera[0]['SEXO'] == "H") {
			// 	$SUB_MATERNO = "";
			// 	$NOM_MATERNO = "";
			// } else {
			// 	$SUB_MATERNO = $boletas_cabecera[0]['SUBMATERNO'];
			// 	$NOM_MATERNO = "MATERNIDAD : ";
			// };

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, utf8_decode("SUB ÁREA : "), 0, 0, "L"),
			// 	$pdf->Cell(50, 3, $boletas_cabecera[0]['SUBAREA'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "HR. SOBRETIEMPO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(29, 3, $boletas_cabecera[0]['HSOBRETIEMPO'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, $NOM_MATERNO, 0, 0, "L"),
			// 	// $pdf->Cell(35, 3, "MATERNIDAD : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(6, 3, $SUB_MATERNO, 0, 0, "R"),
			// 	// $pdf->Cell(6, 3, 0, 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $suma = array(
			// 	intval($boletas_cabecera[0]['DLABORADOS']),
			// 	intval($boletas_cabecera[0]['FALTAS']),
			// 	intval($boletas_cabecera[0]['VACACIONES']),
			// 	intval($boletas_cabecera[0]['DPERMISO']),
			// 	intval($boletas_cabecera[0]['DLCGH']),
			// 	intval($boletas_cabecera[0]['DLSGH']),
			// 	intval($boletas_cabecera[0]['SUSPECGH']),
			// 	intval($boletas_cabecera[0]['SUSPESGH']),
			// 	intval($boletas_cabecera[0]['DMEDICO']),
			// 	intval($boletas_cabecera[0]['DOTROS']),
			// 	intval($boletas_cabecera[0]['SUBINCAPACIDAD']),
			// 	intval($boletas_cabecera[0]['SUBMATERNO'])
			// );

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->SetLineWidth(0.5),
			// 	$pdf->Line(12, 91, 150, 91), // LINEA DEBAJO DE CUADRO REGIMEN, BANCO Y REMUNERACION
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(32, 3, "CARGO : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, $boletas_cabecera[0]['CARGO'], 0, 0, "L"),
			// 	$pdf->Cell(2),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, "", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(41, 3, "", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, utf8_decode("TOTAL DÍAS : "), 0, 0, "L"),
			// 	// $pdf->Cell(35, 3, "MATERNIDAD : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(6, 3, array_sum($suma), 0, 0, "R"),
			// 	// $pdf->Cell(6, 3, 0, 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(94, 108, 94, 91); // LINEA VERTICAL DE SEPARACION DE CARGO Y HORAS

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(157, 103, 197, 103); // LINEA DEBAJO DE SUBSIDIO PARA TOTAL

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(12, 108, 150, 108); // LINE DE DIVISION DE DEBAJO DE CARGO

			// $pdf->SetLineWidth(0.5);
			// $pdf->Line(63, 108, 63, 112); // LINEA VERTICAL DE SEPARACION DE CARGO Y HORAS

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(34, 3, "FECHA INICIO CORTE : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(20, 3, $boletas_cabecera[0]['FCORTEINICIO'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(30, 3, "FECHA FIN CORTE : ", 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(61, 3, $boletas_cabecera[0]['FCORTEFIN'], 0, 0, "L"),
			// 	$pdf->SetFont('Arial', '', 8),
			// 	$pdf->Cell(35, 3, '', 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(
			// 		6,
			// 		3,
			// 		'',
			// 		0,
			// 		0,
			// 		"R"
			// 	),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->Ln(4);

			// $pdf->Cell(4);
			// $pdf->SetMargins(8, 2, 10);
			// $pdf->SetLineWidth(0.5);
			// $pdf->Cell(0, 7, "", 1, 0, "C"); // CUADRO QUE REDONDEA LA CABECERA DE LA TABLA DE RUBROS

			// $pdf->SetFont('Arial', 'B', 12);
			// $pdf->MultiCell(
			// 	190,
			// 	0,
			// 	"",
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->Ln(2);

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(32, 3, utf8_decode("CÓDIGO"), 0, 0, "C"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(50, 3, utf8_decode("CONCEPTOS"), 0, 0, "L"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(54, 3, utf8_decode("INGRESOS"), 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(27, 3, utf8_decode("DESCUENTOS"), 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(25, 3, utf8_decode("APORTES"), 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// // DATOS INICIO
			// $filas = "";
			// if (isset($boletas_detalle)) {

			// 	$pdf->Ln(2);

			// 	$contador1 = 0;
			// 	$contador2 = 0;
			// 	$contador3 = 0;

			// 	foreach ($boletas_detalle as $filas) {

			// 		if ($filas['RUBTIPO'] == "02" || $filas['RUBTIPO'] == "04") {
			// 			$valor01 = number_format($filas['CANTIDAD'], 2);
			// 			$contador1 = $contador1 + 1;
			// 		} else {
			// 			$valor01 = "";
			// 		};

			// 		if ($filas['RUBTIPO'] == "03") {
			// 			$valor02 = number_format($filas['CANTIDAD'], 2);
			// 			$contador2 = $contador2 + 1;
			// 		} else {
			// 			$valor02 = "";
			// 		};

			// 		if ($filas['RUBTIPO'] == "01") {
			// 			$valor03 = number_format($filas['CANTIDAD'], 2);
			// 			$contador3 = $contador3 + 1;
			// 		} else {
			// 			$valor03 = "";
			// 		};

			// 		$pdf->MultiCell(
			// 			190,
			// 			5,
			// 			$pdf->Cell(3),
			// 			$pdf->SetFont('Arial', '', 8),
			// 			$pdf->Cell(32, 3, $filas['RUBID'], 0, 0, "C"),
			// 			$pdf->SetFont('Arial', '', 8),
			// 			$pdf->Cell(50, 3, utf8_decode(html_caracteres($filas['RUBDESC'])), 0, 0, "L"),
			// 			$pdf->SetFont('Arial', '', 8),
			// 			$pdf->Cell(54, 3, $valor01, 0, 0, "R"),
			// 			$pdf->SetFont('Arial', '', 8),
			// 			$pdf->Cell(27, 3, $valor02, 0, 0, "R"),
			// 			$pdf->SetFont('Arial', '', 8),
			// 			$pdf->Cell(25, 3, $valor03, 0, 0, "R"),
			// 			0,
			// 			"L",
			// 			false
			// 		);
			// 	}
			// };

			// $ingresos = intval($contador1);
			// $descuentos = array(intval($contador1), intval($contador2));
			// $aportes = array(intval($contador1), intval($contador2), intval($contador3));

			// $pdf->Rect(12, 125, 188, $ingresos * 5.1); // PARA INGRESOS
			// $pdf->Rect(12, 125, 188, (array_sum($descuentos) * 5.1)); // PARA DESCUENTOS
			// $pdf->Rect(12, 125, 188, (array_sum($aportes) * 5.1)); // PARA APORTES

			// $pdf->Ln(1);

			// $pdf->Cell(4);
			// $pdf->SetMargins(8, 2, 10);
			// $pdf->SetLineWidth(0.5);
			// $pdf->Cell(0, 7, "", 1, 0, "C");

			// $pdf->SetFont('Arial', 'B', 12);
			// $pdf->MultiCell(
			// 	190,
			// 	0,
			// 	"",
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->Ln(2);

			// $pdf->MultiCell(
			// 	190,
			// 	5,
			// 	$pdf->Cell(3),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(32, 3, "", 0, 0, "C"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(50, 3, "TOTAL S/", 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(54, 3, number_format($boletas_cabecera[0]['INGRESOS'], 2), 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(27, 3, number_format($boletas_cabecera[0]['DESCUENTOS'], 2), 0, 0, "R"),
			// 	$pdf->SetFont('Arial', 'B', 8),
			// 	$pdf->Cell(25, 3, number_format($boletas_cabecera[0]['APORTES'], 2), 0, 0, "R"),
			// 	0,
			// 	"L",
			// 	false
			// );

			// $pdf->Ln(2);

			// $pdf->Cell(4);
			// $pdf->SetMargins(8, 2, 10);
			// $pdf->SetLineWidth(0.5);
			// $pdf->Cell(0, 7, "", 1, 0, "C");


			// $pdf->Ln(2);

			// $pago_neto = ($boletas_cabecera[0]['INGRESOS'] - $boletas_cabecera[0]['DESCUENTOS']);

			// 	$pdf->Cell(4);
			// 	$pdf->SetFont('Arial', 'B', 8);
			// 	$pdf->Cell(158, 3, "NETO A PAGAR (S/)", 0, 0, "C");
			// 	$pdf->Cell(29, 3, number_format($pago_neto, 2), 0, 0, "R");

			// $pdf->Ln(2);

			// $extenson = explode(".",$boletas_cabecera[0]['FIRMA']);

			// if ($extenson[1] == "jpg" || $extenson[1] == "jpeg"){
			// 	$pdf->MultiCell(
			// 		190,
			// 		5,
			// 		$pdf->Image($boletas_cabecera[0]['FIRMA'], 35, 220, 60, 35, "jpg"),
			// 		$pdf->Cell(3),
			// 		$pdf->SetFont('Arial', 'B', 8),
			// 		$pdf->SetXY(124, 246),
			// 		$pdf->Cell(50, 3, "________________________________", 0, 0, "C"),
			// 		$pdf->SetXY(124, 250),
			// 		$pdf->SetFont('Arial', 'B', 10),
			// 		$pdf->Cell(50, 3, "Firma del Trabajador", 0, 0, "C"),
			// 		0,
			// 		"L",
			// 		false
			// 	);
			// } else {
			// 	$pdf->MultiCell(
			// 		190,
			// 		5,
			// 		$pdf->Image($boletas_cabecera[0]['FIRMA'], 35, 220, 60, 35, "png"),
			// 		$pdf->Cell(3),
			// 		$pdf->SetFont('Arial', 'B', 8),
			// 		$pdf->SetXY(124, 246),
			// 		$pdf->Cell(50, 3, "________________________________", 0, 0, "C"),
			// 		$pdf->SetXY(124, 250),
			// 		$pdf->SetFont('Arial', 'B', 10),
			// 		$pdf->Cell(50, 3, "Firma del Trabajador", 0, 0, "C"),
			// 		0,
			// 		"L",
			// 		false
			// 	);
			// }

			// $nombre = $boletas_cabecera[0]['PERNOMBRE'];
			// $paterno = $boletas_cabecera[0]['PERPATERNO'];
			// $materno = $boletas_cabecera[0]['PERMATERNO'];
			// $pdf->Output("BOLETA-$dni-$nombre $paterno $materno.pdf",'I');

		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function ListadoAprobacionesPedido() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$i_estado = $_POST['i_estado'];

			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$pdo = array(
				'v_cargo' => $_SESSION['id_cargo'],
				'i_perfil' => $_SESSION['idperfil'],
				'i_estado' => $i_estado,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoPedidosAprobacion($pdo);
			$data = json_decode($result->ListadoPedidosAprobacionResult, true);

			if (count($data) > 0) {
				$filas = [];
				$i = 0;
				foreach ($data as $da) {
					$propiedades1 = array(
						"nu_correla" => ($da['nu_correla']),
						"v_nombrepedido" => $da['v_nombrepedido'],
						"v_nombrearea" => $da['v_nombrearea'],
						"v_moneda" => $da['v_moneda'],
						"d_fecha" => $da['d_fecha'],
						"nu_total" => $da['nu_total'],
						"f_porcentaje" => $da['f_porcentaje'],
					);
					$filas += ["$i" => $propiedades1];
					$i++;
				}
			} else {
				$v_nombre_area =    '';
				$filas = '';
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					'data' => $filas
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function enviar_correo()
	{

		putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
		putenv("NLS_CHARACTERSET=AL32UTF8");

		$this->getLibrary('json_php/JSON');
		$json = new Services_JSON();

		$envio_para = $_POST['envio_para'];
		$envio_cc = $_POST['envio_cc'];
		$envio_asunto = $_POST['envio_asunto'];
		$detalle = $_POST['detalle'];

		$envio_base = $_POST['envio_base'];
		$envio_igv = $_POST['envio_igv'];
		$envio_total = $_POST['envio_total'];

		$timezone = -5;
		$diastring =  strval(gmdate("YmdHis", time() + 3600 * ($timezone + date("I"))));

		$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

		$options = array(
			"uri" => $wsdl,
			"style" => SOAP_RPC,
			"use" => SOAP_ENCODED,
			"soap_version" => SOAP_1_1,
			"connection_timeout" => 60,
			"trace" => false,
			"encoding" => "UTF-8",
			"exceptions" => false,
		);

		$soap = new SoapClient($wsdl, $options);

		$result2 = $soap->ConfiguracionCorreo();
		$conficorreo = json_decode($result2->ConfiguracionCorreoResult, true);

		$this->getLibrary('phpmailer/class.phpmailer');
		$this->getLibrary('phpmailer/PHPMailerAutoload');

		$mail = new PHPMailer;

		$mail->isSMTP();
		$mail->SMTPDebug = 0;
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = 'tls';
		$mail->Mailer = 'smtp';
		$mail->Host = $conficorreo[0]['v_servidor_entrante']; //mail.cafealtomayo.com.pe
		$mail->Username = $conficorreo[0]['v_correo_salida']; //reportes@cafealtomayo.com.pe
		$mail->Password = $conficorreo[0]['v_password']; //rpt4m2020
		$mail->Port = $conficorreo[0]['i_puerto']; //25

		$mail->From = ($conficorreo[0]['v_correo_salida']); //reportes@cafealtomayo.com.pe
		$mail->FromName = $conficorreo[0]['v_nombre_salida']; // VERDUM PERÚ SAC
		// $mail->addAddress($envio_para);
		// $mail->Timeout=60;
		// $mail->addReplyTo('reportes@cafealtomayo.com.pe', 'noreplay verdum');
		$mail->addAddress('backoffice01@verdum.com');
		$mail->addAddress('backoffice02@verdum.com');
		// $mail->addAddress('programador.app02@verdum.com');

		if (!empty($envio_cc) || $envio_cc != null || $envio_cc != "") {
			$mail->addCC($envio_cc);
		}
		// CCO
		$mail->addBCC($conficorreo[0]['v_correo_salida']);
		$mail->addBCC('programador.app02@verdum.com');

		$filas = "";
		foreach ($detalle as $dt) {
			$filas .= "
			<tr>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=center>" . $dt['sku'] . "</td>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=left>" . $dt['descripcion'] . "</td>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . number_format($dt['precio'], 2) . "</td>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . $dt['cantidad'] . "</td>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . number_format($dt['subtotal'], 2) . "</td>
			</tr>
			";
		}

		$saludo = "";
		$timezone = -5;
		$hora =  strval(gmdate("H", time() + 3600 * ($timezone + date("I"))));

		if ($hora >= 0 && $hora <= 11) {
			$saludo = 'buenos días,';
		} else if ($hora >= 12 && $hora <= 18) {
			$saludo = 'buenas tardes,';
		} else if ($hora >= 19 && $hora <= 23) {
			$saludo = 'buenas noches,';
		}

		$datos_cliente = "";
		if ($_SESSION['cliente'] == 0) {
			$datos_cliente = "
			<br>
			DEPARTAMENTO: " . $_SESSION['departamento'] . "<br>
			PROVINCIA: " . $_SESSION['provincia'] . "<br>
			DISTRITO: " . $_SESSION['distrito'] . "<br>
			DIRECCION: " . $_SESSION['direccion'] . "<br>
			REFERENCIA: " . $_SESSION['referencia'] . "<br>
			<br>
			";
		} else {
			$datos_cliente = "<br>";
		}

		$mail->isHTML(true);
		$mail->CharSet = "utf-8";
		$mail->Subject = $envio_asunto;
		// $mail->addEmbeddedImage('public/dist/img/banner.png', 'imgcid');
		$mail->Body = "
		Hola " . $saludo . "</b>
		<br>
		<br>
		Envío mi solicitud de pedido para mi pronta atención, a continuacion detallo lo solicitado:<br>
		<br>
		<table cellspacing='1' cellpadding='5'>
			<thead>
				<tr ALIGN=center>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>SKU</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>DESCRIPCION</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>PRECIO UNIT.</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>CANTIDAD (UND)</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>TOTAL</th>
				</tr>
			</thead>
			<tbody>
				" . $filas . "
			</tbody>
			<tfoot>
				<tr>
				<th></th>
				<th></th>
				<th></th>
				<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>SUBTOTAL </th>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . $envio_base . "</td>
				</tr>
				<tr>
				<th></th>
				<th></th>
				<th></th>
				<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>IGV (18%)</th>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . $envio_igv . "</td>
				</tr>
				<tr>
				<th></th>
				<th></th>
				<th></th>
				<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>TOTAL S/</th>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . $envio_total . "</td>
				</tr>
			</tfoot>
		</table>
		" . $datos_cliente . "
		Saludos,<br>"
			. $_SESSION['usuario'] . "
		<br>
		VIVE VERDUM - PEDIDO PORTAL WEB - " . date("Y") . " - TICKET: " . $diastring . "
		<br>
		<br>
		<img src='" . BASE_URL2 . "public/dist/img/footer.png'>";

		$envio_mensaje = "Hola " . $saludo . "</b>		
		<br>
		<br>
		Envío mi solicitud de pedido para mi pronta atención, a continuacion detallo lo solicitado:<br>
		<br>
		<table cellspacing='1' cellpadding='5'>
			<thead>
				<tr ALIGN=center>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>SKU</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>DESCRIPCION</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>PRECIO UNIT.</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>CANTIDAD (UND)</th>
					<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#8fce00'>TOTAL</th>
				</tr>
			</thead>
			<tbody>
				" . $filas . "
			</tbody>
			<tfoot>
				<tr>
				<th></th>
				<th></th>
				<th></th>
				<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>SUBTOTAL </th>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . $envio_base . "</td>
				</tr>
				<tr>
				<th></th>
				<th></th>
				<th></th>
				<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>IGV (18%)</th>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . $envio_igv . "</td>
				</tr>
				<tr>
				<th></th>
				<th></th>
				<th></th>
				<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>TOTAL S/</th>
				<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . $envio_total . "</td>
				</tr>
			</tfoot>
		</table>
		" . $datos_cliente . "
		Saludos,<br>"
			. $_SESSION['usuario'] . "
		<br>
		VIVE VERDUM - PEDIDO PORTAL WEB - " . date("Y") . " - TICKET: " . $diastring . "
		<br>
		<br>
		<img src='" . BASE_URL2 . "public/dist/img/footer.png'>";

		if (!$mail->send()) {
			$output = 2; //	ERROR AL ENVIAR CORREO

			// GUARDAMOS LOG DE ENVIO DE CORREO ERROR
			$param3 = array(
				"post"		=> 1,
				"para"		=> $envio_para,
				"copia"		=> $envio_cc,
				"asunto"	=> $envio_asunto,
				"mensaje"	=> $envio_mensaje,
				"output"	=> 2,
				"ruta"   	=> 'CORREO VENTA WEB - ERROR',
				"user" 		=> $_SESSION['dni'],
			);

			$soap->MantLogCorreos($param3);
		} else {
			$output = 1; // SE ENVIO CORRECTAMENTE

			// GUARDAMOS LOG DE ENVIO DE CORREO SUCCESS
			$param3 = array(
				"post"		=> 1,
				"para"		=> $envio_para,
				"copia"		=> $envio_cc,
				"asunto"	=> $envio_asunto,
				"mensaje"	=> $envio_mensaje,
				"output"	=> 1,
				"ruta"   	=> 'CORREO VENTA WEB - SUCCESS',
				"user" 		=> $_SESSION['dni'],
			);

			$soap->MantLogCorreos($param3);

			// GUARDAMOS DATOS DE LA VENTA - (CABECRA Y DETALLE)

			// CABECERA
			$param4 = array(
				"post"		=> 1, // insert
				"id"		=> 1, // id de control para genera correlativo de venta al personal
				"ticket"	=> $diastring,
				"para"		=> $envio_para,
				"copia"		=> $envio_cc,
				"asunto"	=> $envio_asunto,
				"subtotal"	=> $envio_base,
				"igv"		=> $envio_igv,
				"total"   	=> $envio_total,
				"user" 		=> $_SESSION['dni'],
			);

			$result4 = $soap->MantVentaCabecera($param4);
			$ventacab = json_decode($result4->MantVentaCabeceraResult, true);

			$correlativo = $ventacab[0]['v_icon'];

			// array DETALLE
			$i = 0;
			foreach ($detalle as $dtv) {
				$param[$i] = array(
					"post"		=> 1, // insert
					"pedido"	=> $correlativo, // correlativo viene despues de insert en cabecera
					"sku"		=> $dtv['sku'],
					"precio"	=> $dtv['precio'],
					"cantidad"	=> $dtv['cantidad'],
					"subtotal"	=> $dtv['subtotal'],
					"user" 		=> $_SESSION['dni'],
				);
				$soap->MantVentaDetalle($param[$i]);
				$i++;
			}
		}

		header('Content-type: application/json; charset=utf-8');

		echo $json->encode(
			array(
				"correo" => $output
			)
		);
	}
}
