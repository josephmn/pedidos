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

			$this->_view->conctructor_menu('aprobarpedido', '');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/forms/wizard/bs-stepper.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
					'plugins/vendors/css/animate/animate.min',
					'dist/css/forms/select/select2.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
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
					'plugins/vendors/js/extensions/toastr.min',
					'plugins/vendors/js/forms/wizard/bs-stepper.min',
					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
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
				'post' => 1,
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
				'v_username' =>		$_SESSION['dni'],
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

			// $post = 0;
			// $nu_correla = 1000000001;
			// $v_username =  $_SESSION['dni'];
			// $v_idarea =  $_SESSION['idarea'];
			// $v_cargo =  $_SESSION['id_cargo'];

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

			$client = array(
				'nu_correla' =>		$nu_correla,
			);

			$time = array(
				'nu_correla' =>		$nu_correla,
				'i_estado' =>	    4,
				'v_username' =>		$_SESSION['dni'],
			);

			$soap = new SoapClient($wsdl, $options);
			$result2 = $soap->ProcesoAprobacionPedido($params);
			$ProcesoAprobacionPedido = json_decode($result2->ProcesoAprobacionPedidoResult, true);

			$result = $soap->MostrarTimelinePedido($time);
			$data = json_decode($result->MostrarTimelinePedidoResult, true);


			if (count($ProcesoAprobacionPedido) > 0) {
				$result2 = $soap->ListadoCorreo();
				$conficorreo = json_decode($result2->ListadoCorreoResult, true);

				$result = $soap->MostrarPedido($client);
				$MostrarPedido = json_decode($result->MostrarPedidoResult, true);

				$this->getLibrary('phpmailer/class.phpmailer');
				$this->getLibrary('phpmailer/PHPMailerAutoload');
				$mail = new PHPMailer;
				$mail->isSMTP();
				$mail->SMTPDebug = 0;
				$mail->SMTPAuth = true;
				// $mail->SMTPSecure = 'tls';
				$mail->Mailer = 'smtp';
				$mail->Host = $conficorreo[0]['v_servidor_entrante'];
				$mail->Username  = $conficorreo[0]['v_correo_salida'];
				$mail->Password = $conficorreo[0]['v_password'];
				$mail->Port = $conficorreo[0]['i_puerto'];

				$mail->From = ($conficorreo[0]['v_correo_salida']);
				$mail->FromName = 'VERDUM PERÚ SAC';
				$mail->addAddress(trim($ProcesoAprobacionPedido[0]['v_correo_next']));

				foreach ($data as $or) {
					if (($or['v_correo'] != '') && ($or['v_correo'] != $ProcesoAprobacionPedido[0]['v_correo_next'])) {
						// var_dump($or['v_correo']);
						$mail->AddCC($or['v_correo']);
					}
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

				$saludo_envio = "";
				$mensaje_final_solped = "";
				$mensaje_final_detalle = "";
				if (trim($ProcesoAprobacionPedido[0]['m_v_alias_correo']) == 'FIN') {
					$saludo_envio = 'Estimado Marco, ' . $saludo;
					$mensaje_final_solped = 'PROCESO DE APROBACIONES DE (SOLPED) FINALIZADO';
					$mensaje_final_detalle = 'Se ha completado la fase de aprobacion de la Siguiente SOLPED:';
				} else {
					$alias_correo = "";
					if (intval($ProcesoAprobacionPedido[0]['m_i_genero'])  == 1) {
						$alias_correo = 'Estimado ';
					} else {
						$alias_correo = 'Estimada ';
					}

					$mensaje_final_solped = 'CORREO PARA APROBACION DE SOLPED';
					$saludo_envio = $alias_correo . (trim($ProcesoAprobacionPedido[0]['m_v_alias_correo'])) . ', ' . $saludo;
					$mensaje_final_detalle = 'Envío mi solicitud de pedido para su aprobacion:';
				}

				$filas = "";
				$filas .= "
					<tr>
						<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=center>" . $MostrarPedido[0]['nu_correla'] . "</td>
						<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=left>" . $MostrarPedido[0]['v_nombrepedido'] . "</td>
						<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=center>" . $MostrarPedido[0]['v_area'] . "</td>
						<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=center>" . $MostrarPedido[0]['v_moneda'] . "</td>
						<td style='border: 1px solid black; border-collapse: collapse; border-color: black;' ALIGN=right>" . number_format($MostrarPedido[0]['f_importotal'], 2) . "</td>
					</tr>
					";

				$mail->isHTML(true);
				$mail->CharSet = "utf-8";
				$mail->Subject = $mensaje_final_solped;
				$mail->Body = "
				 " . $saludo_envio . "</b>
				<br>
				<br>
				$mensaje_final_detalle<br>
				<br>
				<table cellspacing='1' cellpadding='5'>
					<thead>
						<tr ALIGN=center>
							<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#46C435'>#SOLPED</th>
							<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#46C435'>DESCRIPCION</th>
							<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#46C435'>AREA SOLICITA.</th>
							<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#46C435'>MONEDA</th>
							<th style='border: 1px solid black; border-collapse: collapse; border-color: black;' bgcolor='#46C435'>IMPORTE TOTAL</th>
						</tr>
					</thead>
					<tbody>
						" . $filas . "
					</tbody>				
				</table>
				<br>				
				Puede ingresar al sistema de SOLPED, desde la siguiente direccion : https://verdum.com/pedidos
				<br>
				<br>
				Saludos,<br>"
					. $_SESSION['usuario'] . "
				<br>
				VERDUM PERU SAC- SOLPED PORTAL WEB - " . date("Y") . " 
				<br>
				<br>";
				//<img src='" . BASE_URL2 . "public/dist/img/footer.png'>";

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
					"v_correo_next" 	=> $ProcesoAprobacionPedido[0]['v_correo_next'],
					"output" 		=> $output,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function ProcesoRetornoPedido() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$nu_correla = $_POST['nu_correla'];
			$v_comentario = $_POST['v_comentario'];
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
				'v_comentario' => $v_comentario,
			);


			$soap = new SoapClient($wsdl, $options);
			$result2 = $soap->ProcesoRetornoPedido($params);
			$ProcesoRetornoPedido = json_decode($result2->ProcesoRetornoPedidoResult, true);

			if (count($ProcesoRetornoPedido) > 0) {
				$result2 = $soap->ListadoCorreo();
				$conficorreo = json_decode($result2->ListadoCorreoResult, true);


				$this->getLibrary('phpmailer/class.phpmailer');
				$this->getLibrary('phpmailer/PHPMailerAutoload');
				$mail = new PHPMailer;
				$mail->isSMTP();
				$mail->SMTPDebug = 0;
				$mail->SMTPAuth = true;
				// $mail->SMTPSecure = 'tls';
				$mail->Mailer = 'smtp';
				$mail->Host = $conficorreo[0]['v_servidor_entrante'];
				$mail->Username  = $conficorreo[0]['v_correo_salida'];
				$mail->Password = $conficorreo[0]['v_password'];
				$mail->Port = $conficorreo[0]['i_puerto'];

				$mail->From = ($conficorreo[0]['v_correo_salida']);
				$mail->FromName = 'VERDUM PERÚ SAC';
				// $mail->addAddress('programador.app03@verdum.com');
				$mail->addAddress(trim($ProcesoRetornoPedido[0]['v_correo_next']));

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

				$saludo_envio = "";
				$mensaje_final_solped = "";
				$mensaje_final_detalle = "";
				if (trim($ProcesoRetornoPedido[0]['m_v_alias_correo']) == 'FIN') {
					$saludo_envio = 'Estimado Marco, ' . $saludo;
					$mensaje_final_solped = 'PROCESO DE APROBACIONES DE (SOLPED) FINALIZADO';
					$mensaje_final_detalle = 'Se ha completado la fase de aprobacion de la Siguiente SOLPED:';
				} else {
					$alias_correo = "";
					if (intval($ProcesoRetornoPedido[0]['m_i_genero'])  == 1) {
						$alias_correo = 'Estimado ';
					} else {
						$alias_correo = 'Estimada ' . $saludo;
					}

					$mensaje_final_solped = 'CORREO PARA MODIFICACION DE SOLPED (' . $nu_correla . ')';
					$saludo_envio = $alias_correo . (trim($ProcesoRetornoPedido[0]['m_v_alias_correo'])) . ', ' . $saludo;
					$mensaje_final_detalle = 'El siguiente pedido, debe ser modificado debido a que: 
						<br>'
						. $ProcesoRetornoPedido[0]['m_v_motivo'];
				}

				$mail->isHTML(true);
				$mail->CharSet = "utf-8";
				$mail->Subject = $mensaje_final_solped;
				$mail->Body = "
				 " . $saludo_envio . "</b>
				<br>
				<br>
				$mensaje_final_detalle<br>
				<br>							
				Puede ingresar al sistema de SOLPED, desde la siguiente direccion : http://localhost/pedidos
				<br>
				<br>
				Saludos,<br>"
					. $_SESSION['usuario'] . "
				<br>
				VERDUM PERU SAC- SOLPED PORTAL WEB - " . date("Y") . " 
				<br>
				<br>";
				//<img src='" . BASE_URL2 . "public/dist/img/footer.png'>";
				if (!$mail->send()) {
					$output = 0; //	ERROR AL ENVIAR CORREO
				} else {
					$output = 1; // SE ENVIO CORRECTAMENTE
				}
			}
			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $ProcesoRetornoPedido[0]['v_icon'],
					"vtitle" 		=> $ProcesoRetornoPedido[0]['v_title'],
					"vtext" 		=> $ProcesoRetornoPedido[0]['v_text'],
					"itimer" 		=> $ProcesoRetornoPedido[0]['i_timer'],
					"icase" 		=> $ProcesoRetornoPedido[0]['i_case'],
					"vprogressbar" 	=> $ProcesoRetornoPedido[0]['v_progressbar'],
					"v_correo_next" 	=> $ProcesoRetornoPedido[0]['v_correo_next'],
					"output" 		=> $output,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function documentopedido($nu_correla)  //PARA IMPRIMIR EL DOCUMENTO DE AL SOPED
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

			$tb2 = array(
				'nu_correla' =>		$nu_correla,
				'i_estado' =>		4,
				'v_username' =>		$_SESSION['dni'],
			);

			$partida = array(
				'nu_correla' => $nu_correla,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarPedido($params);
			$data = json_decode($result->MostrarPedidoResult, true);

			//PARA ENVIO DE CORREOS A TODOS LOS INVOLUCRADOS
			$result = $soap->MostrarTimelinePedido($tb2);
			$personas = json_decode($result->MostrarTimelinePedidoResult, true);

			//PARA VER EL DETALLE DEL PRESUPUESTO INGRESADO
			$result = $soap->MostrarPedidoPpto($partida);
			$MostrarPedidoPpto = json_decode($result->MostrarPedidoPptoResult, true);


			$this->getLibrary('fpdf/fpdf');
			$pdf = new FPDF('P', 'mm', 'A4');


			$pdf->AliasNbPages();
			$pdf = new MYPDF();
			$pdf = new alphapdf();
			$pdf->AddPage();
			$pdf->Image('./public/dist/img/logo_verdum.jpg', 10, 8, 120);

			$col = array();
			$col[] = array('text' => utf8_decode("Código del país (Country code)  "), 'width' => '29', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Departamento  (Deparment)"), 'width' => '29', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Número        (Number)     "), 'width' => '27', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			$col1 = array();
			$col1[] = array('text' => utf8_decode("PE"), 'width' => '29', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col1[] = array('text' => utf8_decode($data[0]['v_areid']), 'width' => '29', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col1[] = array('text' => utf8_decode($data[0]['nu_correla']), 'width' => '27', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns1[] = $col1;

			$pdf->SetXY(115, 30);
			$pdf->WriteTable($columns);
			$pdf->SetXY(115, 38);
			$pdf->WriteTable($columns1);

			$pdf->SetXY(10, 25);
			$pdf->SetFont('Arial', 'B', 22, 'L');
			$pdf->Cell(190, 20, utf8_decode("SOLPED: # " . $data[0]['nu_correla']), 10, 8, 'L');

			$col2 = array();
			$col2[] = array('text' => 'Empresa / Company', 'width' => '105', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'font_style' => 'B', 'linearea' => 'LTBR');
			$col2[] = array('text' => 'Presupuesto / Budget', 'width' => '85', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns2[] = $col2;
			$pdf->SetXY(10, 47);
			$pdf->WriteTable($columns2);


			$col3 = array();
			$col3[] = array('text' => utf8_decode($data[0]['v_empresa']), 'width' => '105', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			// $col3[] = array('text' => 'Cuenta/Account: ', 'width' => '40', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			// $col3[] = array('text' => '121301', 'width' => '45', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col3[] = array('text' => 'Departamento / Department :', 'width' => '40', 'height' => '10', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col3[] = array('text' => utf8_decode($data[0]['v_area']), 'width' => '45', 'height' => '10', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');

			$columns3[] = $col3;
			$pdf->SetXY(10, 52);
			$pdf->WriteTable($columns3);


			$col4 = array();
			$col4[] = array('text' => utf8_decode('Nombre y dirección completa de entrega / Name & full delivery address'), 'width' => '105', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');


			$columns4[] = $col4;
			$pdf->SetXY(10, 57);
			$pdf->WriteTable($columns4);

			$col5 = array();
			$col5[] = array('text' => 'Nombre del contacto para la entrega: ' . $data[0]['v_persona_recepciona'], 'width' => '105', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			// $col5[] = array('text' => 'Presupuesto / Budget', 'width' => '84', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');

			$col5[] = array('text' => 'Presupuesto / Budget', 'width' => '40', 'height' => '10', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col5[] = array('text' => 'SI (X)', 'width' => '22', 'height' => '10', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col5[] = array('text' => 'NO ( )', 'width' => '23', 'height' => '10', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');

			$columns5[] = $col5;
			$pdf->SetXY(10, 62);
			$pdf->WriteTable($columns5);


			$col6 = array();
			$col6[] = array('text' => 'Area Solitante: ' . utf8_decode($data[0]['v_area']), 'width' => '52', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col6[] = array('text' => 'Telefono: ' . utf8_decode($data[0]['v_numerophone']), 'width' => '53', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns6[] = $col6;
			$pdf->SetXY(10, 67);
			$pdf->WriteTable($columns6);


			$col7 = array();
			$col7[] = array('text' => 'Direccion de entrega: ' . $data[0]['v_direccion_entrega'], 'width' => '105', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col7[] = array('text' => utf8_decode('Límite presupuesto en PEN / Budget limit PEN: ' . $data[0]['f_valortope_condicion_uno']), 'width' => '85', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns7[] = $col7;
			$pdf->SetXY(10, 72);
			$pdf->WriteTable($columns7);


			$col8 = array();
			$col8[] = array('text' => utf8_decode('Fecha de entrega deseada / Desired delivery date :'), 'width' => '40', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col8[] = array('text' => '                                       ' . utf8_decode($data[0]['d_fechaentrega']), 'width' => '45', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns8[] = $col8;
			$pdf->SetXY(115, 77);
			$pdf->WriteTable($columns8);



			// $pdf->Ln(4);
			$colYY = array();
			$colYY[] = array('text' => 'Nombre del contacto solicitante (Contac name):', 'width' => '78', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.1', 'linearea' => 'LTBR');
			$colYY[] = array('text' => $data[0]['v_nombres'], 'width' => '27', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.1', 'linearea' => 'TBR');
			$columnsYY[] = $colYY;
			$pdf->SetXY(10, 87);
			$pdf->WriteTable($columnsYY);


			$colXX = array();
			$colXX[] = array('text' => 'Nro. de Telefono (Phone Number):', 'width' => '78', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.1', 'linearea' => 'LTBR');
			$colXX[] = array('text' => $data[0]['v_numerophone'], 'width' => '27', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.1', 'linearea' => 'TBR');
			$columnsXX[] = $colXX;
			$pdf->SetXY(10, 92);
			$pdf->WriteTable($columnsXX);


			$colTT = array();
			$colTT[] = array('text' => utf8_decode('Medio de transporte / Transport means :'), 'width' => '35', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$colTT[] = array('text' => utf8_decode('Aire / Air       ( )'), 'width' => '15', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'TBR');
			$colTT[] = array('text' => utf8_decode('Tierra / Road       (X)'), 'width' => '19', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$colTT[] = array('text' => utf8_decode('Mar / Sea       ( )'), 'width' => '16', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsTT[] = $colTT;
			$pdf->SetXY(115, 87);
			$pdf->WriteTable($columnsTT);



			// $col9[] = array('text' => 'Nro. de Telefono (Phone Number):', 'width' => '27', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.1', 'linearea' => 'TBR');
			// $col9[] = array('text' => '                 ' . '945 228 290', 'width' => '18', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.1', 'linearea' => 'LTBR');			


			$pdf->Ln(4);
			// PARA LA TABLA DEL DETALLE
			$coltb = array();
			$coltb[] = array('text' => utf8_decode("Nro"), 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Codigo"), 'width' => '15', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Descripción del artículo"), 'width' => '90', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Cantidad"), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Unidad"), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("Precio"), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb[] = array('text' => utf8_decode("nu_total"), 'width' => '21', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsrela[] = $coltb;
			$i = 0;
			foreach ($data as $rl) {
				$col = array();
				$col[] = array('text' => utf8_decode($rl['i_item']), 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['v_codprod']), 'width' => '15', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['v_descripcion']), 'width' => '90', 'height' => '5', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_cantidad']), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_cantidad']), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_precio']), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['nu_total']), 'width' => '21', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columnsrela[] = $col;
				$i++;
			}

			//POSICION
			// $pdf->SetXY(10, 102);
			$pdf->WriteTable($columnsrela);

			$pdf->Ln(0);
			$col10 = array();
			$col10[] = array('text' => utf8_decode('Para acción (For action)'), 'width' => '20', 'height' => '4', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col10[] = array('text' => utf8_decode(''), 'width' => '113', 'height' => '4', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col10[] = array('text' => utf8_decode(''), 'width' => '18', 'height' => '4', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LT');

			$col10[] = array('text' => utf8_decode('Moneda (Currency)'), 'width' => '18', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col10[] = array('text' => utf8_decode('Valor total (Total value)'), 'width' => '21', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns10[] = $col10;
			$pdf->WriteTable($columns10);

			$pdf->SetX(161);
			$col12 = array();
			$col12[] = array('text' => utf8_decode($data[0]['v_moneda']), 'width' => '18', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col12[] = array('text' => utf8_decode($data[0]['f_importotal']), 'width' => '21', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns12[] = $col12;
			$pdf->WriteTable($columns12);

			$pdf->Ln(4);

			$col13 = array();
			$col13[] = array('text' => utf8_decode('Observaciones (Agente aduanero, Instrucciones de empaque, etc.) / Remarks (clearing agent, packing instructions, etc.) '), 'width' => '190', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns13[] = $col13;
			$pdf->WriteTable($columns13);

			$pdf->Ln(4);
			$col17 = array();
			$col17[] = array('text' => utf8_decode('Centro de costo del Presupuesto Ingresado'), 'width' => '190', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '128,185,0', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns17[] = $col17;
			$pdf->WriteTable($columns17);

			////TABLA DE PRESUPUESTO INGRESADO
			$coltb2 = array();
			$coltb2[] = array('text' => utf8_decode('Id'), 'width' => '15', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '128,185,0', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb2[] = array('text' => utf8_decode('Centro de Costo'), 'width' => '30', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '128,185,0', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb2[] = array('text' => utf8_decode('Cod. Partida'), 'width' => '48', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '128,185,0', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb2[] = array('text' => utf8_decode('Nombre Mes'), 'width' => '48', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '128,185,0', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb2[] = array('text' => utf8_decode('Monto'), 'width' => '49', 'height' => '4', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '128,185,0', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsrela2[] = $coltb2;
			$i = 0;
			foreach ($MostrarPedidoPpto  as $rl) {
				$col2 = array();
				$col2[] = array('text' => utf8_decode($rl['i_id']), 'width' => '15', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col2[] = array('text' => utf8_decode($rl['v_centrocosto']), 'width' => '30', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col2[] = array('text' => utf8_decode($rl['v_idpartida']), 'width' => '48', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col2[] = array('text' => utf8_decode($rl['v_nombremes']), 'width' => '48', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col2[] = array('text' => utf8_decode($rl['f_monto']), 'width' => '49', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columnsrela2[] = $col2;
				$i++;
			}
			$pdf->Ln(0);
			$pdf->WriteTable($columnsrela2);


			$pdf->Ln(4);
			$col14 = array();
			$col14[] = array('text' => utf8_decode('Registro de aprobación / Field approval'), 'width' => '190', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns14[] = $col14;
			$pdf->WriteTable($columns14);

			////TABLA DE APROBADORES DE LA SOLPED
			$coltb1 = array();
			$coltb1[] = array('text' => utf8_decode(''), 'width' => '47', 'height' => '6', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb1[] = array('text' => utf8_decode('Nombre / Name'), 'width' => '47', 'height' => '6', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb1[] = array('text' => utf8_decode('Firma / Signature'), 'width' => '48', 'height' => '6', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$coltb1[] = array('text' => utf8_decode('Fecha / Date'), 'width' => '48', 'height' => '6', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsrela1[] = $coltb1;
			$i = 0;
			foreach ($personas  as $rl) {
				$col1 = array();
				$col1[] = array('text' => utf8_decode($rl['v_aprobador_uno']), 'width' => '47', 'height' => '8', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col1[] = array('text' => utf8_decode($rl['v_nombres']), 'width' => '47', 'height' => '8', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col1[] = array('text' => utf8_decode($rl['v_descripcion']), 'width' => '48', 'height' => '8', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col1[] = array('text' => utf8_decode($rl['d_fecha_registrotrk']), 'width' => '48', 'height' => '8', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columnsrela1[] = $col1;
				$i++;
			}
			$pdf->Ln(0);
			$pdf->WriteTable($columnsrela1);

			$pdf->Ln(0);
			$col16 = array();
			$col16[] = array('text' => utf8_decode(''), 'width' => '190', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => 'B', 'fillcolor' => '212,216,216', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns16[] = $col16;
			// $pdf->SetXY(10, 225);
			$pdf->WriteTable($columns16);


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
				'post' => 1,
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



	public function ValidacionPedido() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();
			$post = $_POST['post'];
			$nu_correla = $_POST['nu_correla'];
			$xi_tipo = $_POST['xi_tipo'];

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

			$param = array(
				'post' =>		$post,
				'nu_correla' =>		$nu_correla,
				'xi_tipo' =>		$xi_tipo,
			);

			$tipoorden = array(
				'post' =>	4,
				'v_usuario' => $_SESSION['dni'],
			);


			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ValidacionPedido($param);
			$data = json_decode($result->ValidacionPedidoResult, true);

			$result = $soap->PedidoEstados($tipoorden);
			$TipoOrden = json_decode($result->PedidoEstadosResult, true);


			if (count($data) > 0) {
				$i_valor =   $data[0]['i_valor'];
				$v_mensaje =   $data[0]['v_mensaje'];
				$i_tipo =   $data[0]['i_tipo'];

				//Combo Local
				$FilasTipo = "";
				$selTipo = "";
				foreach ($TipoOrden as $dp) {
					if ($dp['i_id'] == $data[0]['i_tipo']) {
						$selTipo = "selected='selected'";
					} else {
						$selTipo = "";
					}
					$FilasTipo .= "<option " . $selTipo . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					'i_valor' => $i_valor,
					'v_mensaje' => $v_mensaje,
					'i_tipo' => $i_tipo,
					'FilasTipo' => $FilasTipo,
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
