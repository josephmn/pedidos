<?php

class pedidoaprobadoController extends Controller
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

			$lst = array(
				'post' => 2,
				'v_cargo' => $_SESSION['id_cargo'],
				'i_perfil' => $_SESSION['idperfil'],
				'i_estado' => 1,
			);
			$result = $soap->ListadoPedidosAprobacion($lst);
			$ListadoPedidosAprobacion = json_decode($result->ListadoPedidosAprobacionResult, true);


			$estadopedido = array(
				'post' =>	3,
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

			$client = array(
				'nu_correla' =>		$nu_correla,
				'i_estado' =>		$i_estado,
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
					"v_botones_final" => $da['v_botones_final'],
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
			if (count($ProcesoAprobacionPedido) > 0) {

				$result2 = $soap->ListadoCorreo();
				$conficorreo = json_decode($result2->ListadoCorreoResult, true);
				$this->getLibrary('phpmailer/class.phpmailer');
				$this->getLibrary('phpmailer/PHPMailerAutoload');
				$mail = new PHPMailer;
				$mail->isSMTP();
				$mail->SMTPDebug = 0;
				$mail->SMTPAuth = true;
				$mail->SMTPSecure = 'tls';
				$mail->Mailer = 'smtp';
				$mail->Host = $conficorreo[0]['v_servidor_entrante'];
				$mail->Username  = $conficorreo[0]['v_correo_salida'];
				$mail->Password = $conficorreo[0]['v_password'];
				$mail->Port = $conficorreo[0]['i_puerto'];

				$mail->From = ($conficorreo[0]['v_correo_salida']);
				$mail->FromName = 'VERDUM PERÚ SAC';
				$mail->addAddress('programador.app03@verdum.com');

				$mail->isHTML(true);
				$mail->CharSet = "utf-8";
				$mail->Subject = 'ENVIO DE CORREO RECUPERACION DE CLAVE';
				$mail->Body = "
				Hola  
				<br>
				<br>
				Tiene el Siguiente pedido pendiente de Aprobar<br>
				<br> 
				<br>
				<br>
				Saludo,
				<br>
				VERDUM PERU SAC.
				<br>
				<br>";
				if (!$mail->send()) {
					$output = 0; //	ERROR AL ENVIAR CORREO
				} else {
					$output = 1; // SE ENVIO CORRECTAMENTE
				}
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $ProcesoAprobacionPedido[0]['v_icon'],
					"vtitle" 		=> $ProcesoAprobacionPedido[0]['v_title'],
					"vtext" 		=> $ProcesoAprobacionPedido[0]['v_text'],
					"itimer" 		=> $ProcesoAprobacionPedido[0]['i_timer'],
					"icase" 		=> $ProcesoAprobacionPedido[0]['i_case'],
					"vprogressbar" 	=> $ProcesoAprobacionPedido[0]['v_progressbar'],
					"output" 		=> $output,
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

			$this->getLibrary('fpdf/fpdf');
			$pdf = new FPDF('P', 'mm', 'A4');
			$pdf->AliasNbPages();
			$pdf = new MYPDF();
			$pdf = new alphapdf();
			$pdf->AddPage();

			$pdf->Image('./public/dist/img/logo_verdum.jpg', 10, 8, 125);
			$pdf->Ln(22);

			$col = array();
			$col[] = array('text' => utf8_decode("Código del país (Country code)  "), 'width' => '29', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Departamento  (Deparment)"), 'width' => '29', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Número        (Number)     "), 'width' => '29', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			$col1 = array();
			$col1[] = array('text' => utf8_decode("PE"), 'width' => '29', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col1[] = array('text' => utf8_decode("OPE"), 'width' => '29', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col1[] = array('text' => utf8_decode("2022-01"), 'width' => '29', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns1[] = $col1;

			$pdf->SetXY(112, 30);
			$pdf->WriteTable($columns);
			$pdf->SetXY(112, 40);
			$pdf->WriteTable($columns1);

			$pdf->SetXY(10, 27);
			$pdf->SetFont('Arial', 'B', 22, 'L');
			$pdf->Cell(190, 20, utf8_decode("SOLPED: # " . $data[0]['nu_correla']), 10, 8, 'L');


			$col2 = array();
			$col2[] = array('text' => 'Empresa / Company', 'width' => '80', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col2[] = array('text' => 'Presupuesto / Budget', 'width' => '109', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns2[] = $col2;

			$pdf->SetXY(10, 47);
			$pdf->WriteTable($columns2);


			// PARA LA TABLA DEL DETALLE
			$coltb = array();
			$coltb[] = array('text' => utf8_decode("Nro"), 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Codigo"), 'width' => '15', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Descripción del artículo"), 'width' => '90', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Cantidad"), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Unidad"), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Precio"), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("nu_total"), 'width' => '20', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsrela[] = $coltb;

			$i = 0;
			foreach ($data as $rl) {
				$col = array();
				$col[] = array('text' => utf8_decode($rl['i_item']), 'width' => '10', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['v_codprod']), 'width' => '15', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['v_descripcion']), 'width' => '90', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_cantidad']), 'width' => '18', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_cantidad']), 'width' => '18', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_precio']), 'width' => '18', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_total']), 'width' => '20', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columnsrela[] = $col;
				$i++;
			}
			//POSICION
			$pdf->SetXY(10, 55);
			$pdf->WriteTable($columnsrela);

			$pdf->Output("SOLPED-$data[0]['nu_correla'].pdf", 'I');
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
				'post' => 2,
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
						"v_color_porcentaje" => $da['v_color_porcentaje'],
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

		// $timezone = -5;
		// $diastring =  strval(gmdate("YmdHis", time() + 3600 * ($timezone + date("I"))));

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
		$result2 = $soap->ListadoCorreo();
		$conficorreo = json_decode($result2->ListadoCorreoResult, true);

		$this->getLibrary('phpmailer/class.phpmailer');
		$this->getLibrary('phpmailer/PHPMailerAutoload');

		$mail = new PHPMailer;
		$mail->isSMTP();
		$mail->SMTPDebug = 0;
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = 'tls';
		$mail->Mailer = 'smtp';
		$mail->Host = $conficorreo[0]['v_servidor_entrante']; //'mail.cafealtomayo.com.pe'
		$mail->Username  = $conficorreo[0]['v_correo_salida']; //'reportes@cafealtomayo.com.pe'  
		$mail->Password = $conficorreo[0]['v_password']; //'rpt4m2020';
		$mail->Port = $conficorreo[0]['i_puerto']; //25;

		$mail->From = ($conficorreo[0]['v_correo_salida']); //reportes@cafealtomayo.com.pe
		$mail->FromName = 'VERDUM PERÚ SAC';   //$conficorreo[0]['v_nombre_salida']; 
		$mail->addAddress('programador.app03@verdum.com');

		$mail->isHTML(true);
		$mail->CharSet = "utf-8";
		$mail->Subject = 'ENVIO DE CORREO RECUPERACION DE CLAVE';
		$mail->Body = "
		Hola  
		<br>
		<br>
		Tiene el Siguiente pedido pendiente de Aprobar<br>
		<br>
		Clave: <b>'demo'</b>
		<br>
		<br>
		Saludo,
		<br>
		VERDUM PERU SAC.
		<br>
		<br>";

		if (!$mail->send()) {
			$output = 0; //	ERROR AL ENVIAR CORREO
		} else {
			$output = 1; // SE ENVIO CORRECTAMENTE
		}
		header('Content-type: application/json; charset=utf-8');
		echo $json->encode(
			array(
				"correo" => $output
			)
		);
	}




	public  function   send()
	{
		$enviado = 'Enviado: ' . date("Y-m-d H:i:s") . "\n";
		$subject = "Este es el asunto del mensaje - ";
		$message = 'Este es el mensaje a enviar.';

		// Cargando la librería de PHPMailer
		$this->getLibrary('phpmailer/class.phpmailer');
		$this->getLibrary('phpmailer/PHPMailerAutoload');

		// Creando una nueva instancia de PHPMailer
		$mail = new PHPMailer();
		// Indicando el uso de SMTP
		$mail->isSMTP();

		// Habilitando SMTP debugging
		// 0 = apagado (para producción)
		// 1 = mensajes del cliente
		// 2 = mensajes del cliente y servidor
		$mail->SMTPDebug = 0;

		// Agregando compatibilidad con HTML
		$mail->Debugoutput = 'html';

		// Estableciendo el nombre del servidor de email
		$mail->Host = 'smtp.gmail.com';

		// Estableciendo el puerto
		$mail->Port = 465;

		// Estableciendo el sistema de encriptación
		$mail->SMTPSecure = 'tls';

		// Para utilizar la autenticación SMTP
		$mail->SMTPAuth = true;

		// Nombre de usuario para la autenticación SMTP - usar email completo para gmail
		$mail->Username = "notificaciones.verdum@gmail.com";

		// Password para la autenticación SMTP
		$mail->Password = '$Verdum2022$';

		// Estableciendo como quién se va a enviar el mail
		$mail->From = 'notificaciones.verdum@gmail.com';


		// Estableciendo a quién se va a enviar el mail
		$mail->addAddress('programador.app03@verdum.com', 'Otro usuario');

		// El asunto del mail
		$mail->Subject = $subject . $enviado;

		// Estableciendo el mensaje a enviar
		$mail->MsgHTML($message);


		// Adjuntando una imagen
		//$mail->addAttachment('images/phpmailer_mini.png');

		// Enviando el mensaje y controlando los errores
		if (!$mail->send()) {
			echo "No se pudo enviar el correo. Intentelo más tarde.";
		} else {
			echo "Gracias por contactarnos.";
		}
	}
}
