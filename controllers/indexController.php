<?php

class indexController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->_view->setCss_Specific(
			array(
				'dist/css/fontawesome/css/all',
				'plugins/vendors/css/extensions/sweetalert2.min',
				'dist/css/bootstrap',
				'dist/css/colors',
				'dist/css/components',
				'dist/css/pages/page-auth',
				'plugins/vendors/css/extensions/ext-component-sweet-alerts'
			)
		);

		$this->_view->setJs_Specific(
			array(
				'plugins/vendors/js/jquery/jquery.min',
				'plugins/vendors/js/vendors.min',
				'plugins/vendors/js/extensions/sweetalert2.all.min',
				'dist/js/core/app-menu',
				'dist/js/core/app',
				'plugins/vendors/js/extensions/ext-component-sweet-alerts',
			)
		);

		$this->_view->setJs(array('index'));
		$this->_view->renderizar('index', true);
	}

	public function registro()
	{
		$this->_view->setCss_Specific(
			array(
				'plugins/vendors/css/extensions/sweetalert2.min',
				'dist/css/bootstrap',
				'dist/css/colors',
				'dist/css/components',
				'dist/css/pages/page-auth',
				'plugins/vendors/css/extensions/ext-component-sweet-alerts'
			)
		);

		$this->_view->setJs_Specific(
			array(
				'plugins/vendors/js/jquery/jquery.min',
				'plugins/vendors/js/vendors.min',
				'plugins/vendors/js/extensions/sweetalert2.all.min',
				'dist/js/core/app-menu',
				'dist/js/core/app',
				'plugins/vendors/js/extensions/ext-component-sweet-alerts',
			)
		);

		$this->_view->setJs(array('registro'));
		$this->_view->renderizar('registro', true);
	}

	// public function recupera_clave()
	// {
	// 	$this->_view->setJs(array('recuperaclave'));
	// 	$this->_view->renderizar('recuperaclave', true);
	// }

	// public function nuevoregistro()
	// {

	// 	putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
	// 	putenv("NLS_CHARACTERSET=AL32UTF8");

	// 	$this->getLibrary('json_php/JSON');
	// 	$json = new Services_JSON();

	// 	$nombre = $_POST['nombre'];
	// 	$apellidos = $_POST['apellidos'];
	// 	$correo = $_POST['correo'];
	// 	$password = $_POST['password'];
	// 	$perfil = 3; //usuario normal

	// 	$wsdl = 'http://localhost/RSWEB/WSReclutamiento.asmx?WSDL';

	// 	$options = array(
	// 		"uri" => $wsdl,
	// 		"style" => SOAP_RPC,
	// 		"use" => SOAP_ENCODED,
	// 		"soap_version" => SOAP_1_1,
	// 		"connection_timeout" => 60,
	// 		"trace" => false,
	// 		"encoding" => "UTF-8",
	// 		"exceptions" => false,
	// 	);

	// 	$soap = new SoapClient($wsdl, $options);

	// 	$params = array(
	// 		'nombres'		=> $nombre,
	// 		'apellidos' 	=> $apellidos,
	// 		'correo' 		=> $correo,
	// 		'clave' 		=> $password,
	// 		'perfil' 		=> intval($perfil),
	// 	);

	// 	$result = $soap->RegistroLogin($params);
	// 	$registro = json_decode($result->RegistroLoginResult, true);

	// 	$output = 0;

	// 	if ($registro[0]['v_respuesta'] == 2) {

	// 		$params2 = array(
	// 			'correo' => $correo,
	// 		);

	// 		$result = $soap->RegistroConsulta($params2);
	// 		$registroconsulta = json_decode($result->RegistroConsultaResult, true);

	// 		// envio de correo automatico de validacion de correo
	// 		$this->getLibrary('phpmailer/class.phpmailer');
	// 		$this->getLibrary('phpmailer/PHPMailerAutoload');

	// 		$mail = new PHPMailer;

	// 		$mail->isSMTP();
	// 		$mail->SMTPDebug = 0;
	// 		$mail->SMTPAuth = true;
	// 		// $mail->SMTPSecure = 'tls';
	// 		$mail->Mailer = 'smtp';
	// 		$mail->Host = 'mail.cafealtomayo.com.pe';
	// 		$mail->Username   = 'reportes@cafealtomayo.com.pe';
	// 		$mail->Password = 'rpt4m2020';
	// 		$mail->Port = 587;

	// 		$mail->From = ('reportes@cafealtomayo.com.pe');
	// 		$mail->FromName = "VERDUM PERÚ SAC";
	// 		// $mail->setFrom('reportes@cafealtomayo.com.pe', 'no replay verdum');
	// 		$mail->addReplyTo('reportes@cafealtomayo.com.pe', 'reportes');
	// 		$mail->addAddress($registroconsulta[0]['v_correo'], ($registroconsulta[0]['v_nombres'] . ' ' . $registroconsulta[0]['v_apellidos']));
	// 		$mail->Subject = 'VALIDACION DE CORREO ELECTRÓNICO';

	// 		$mail->isHTML(true);
	// 		$mail->CharSet = "utf-8";
	// 		$mail->Subject = 'VALIDACION DE CORREO ELECTRÓNICO';
	// 		$mail->Body = "
	// 		Hola <b>" . ($registroconsulta[0]['v_nombres'] . ' ' . $registroconsulta[0]['v_apellidos']) . ",</b>
	// 		<br>
	// 		<br>
	// 		Te enviamos la clave de confirmacion para poder válidar sus datos y correo.<br>
	// 		<br>
	// 		Clave: <b>" . $registroconsulta[0]['i_clave_confirmacion'] . "</b>
	// 		<br>
	// 		<br>
	// 		Saludo,<br>
	// 		Verdum Perú S.A.C.";

	// 		if (!$mail->send()) {
	// 			$output = 0; //	ERROR AL ENVIAR CORREO
	// 		} else {
	// 			$output = 1; // SE ENVIO CORRECTAMENTE
	// 		}

	// 		header('Content-type: application/json; charset=utf-8');

	// 		echo $json->encode(
	// 			array(
	// 				"registro" => $registro[0]['v_respuesta'],
	// 				"correo" => $output,
	// 			)
	// 		);

	// 	} else {
	// 		header('Content-type: application/json; charset=utf-8');

	// 		echo $json->encode(
	// 			array(
	// 				"registro" => $registro[0]['v_respuesta'], // 0 ya se encuentra correo registrado
	// 				"correo" => $output, // 0 no se envía correo
	// 			)
	// 		);
	// 	}

	// }

	// public function validarcodigo()
	// {
	// 	putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
	// 	putenv("NLS_CHARACTERSET=AL32UTF8");

	// 	$this->getLibrary('json_php/JSON');
	// 	$json = new Services_JSON();

	// 	$codigo = $_POST['codigo'];
	// 	$email = $_POST['email'];

	// 	$wsdl = 'http://localhost/RSWEB/WSReclutamiento.asmx?WSDL';

	// 	$options = array(
	// 		"uri" => $wsdl,
	// 		"style" => SOAP_RPC,
	// 		"use" => SOAP_ENCODED,
	// 		"soap_version" => SOAP_1_1,
	// 		"connection_timeout" => 60,
	// 		"trace" => false,
	// 		"encoding" => "UTF-8",
	// 		"exceptions" => false,
	// 	);

	// 	$soap = new SoapClient($wsdl, $options);

	// 	$params = array(
	// 		'codigo'	=> $codigo,
	// 		'correo'	=> $email,
	// 	);

	// 	$result = $soap->ValidarCodigo($params);
	// 	$validacion = json_decode($result->ValidarCodigoResult, true);

	// 	header('Content-type: application/json; charset=utf-8');

	// 	echo $json->encode(
	// 		array(
	// 			"validacion" => intval($validacion[0]['v_respuesta']),
	// 		)
	// 	);
	// }


	public function login()
	{
		putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
		putenv("NLS_CHARACTERSET=AL32UTF8");

		$this->getLibrary('json_php/JSON');
		$json = new Services_JSON();

		$dni = trim($_POST['dni']);
		$clave = md5($_POST['clave']);

		// $dni = '77683117';
		// $clave = '90c1ccf29dc97261e3d5eb6489667bfe';


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
			"v_dni"   => $dni,
			"v_clave" => $clave,
		);

		$soap = new SoapClient($wsdl, $options);
		$result = $soap->Login($param);
		$login = json_decode($result->LoginResult, true);

		// validamos que el logueo sea correcto
		if (count($login) > 0) {
			$perfil = array(
				"perfil" => $login[0]['i_id_perfil']
			);
			$rptusermenu = $soap->UsuarioMenu($perfil);
			$usermenu = json_decode($rptusermenu->UsuarioMenuResult, true);

			$rptusersubmenu = $soap->UsuarioSubMenu($perfil);
			$usersubmenu = json_decode($rptusersubmenu->UsuarioSubMenuResult, true);

			$filasmenu = "";
			$filassub = "";
			$menu1 = "dashboard";
			$submenu1 = "";
			$active = "";

			foreach ($menu as $m) {
				foreach ($submenu as $sm) {
					$active = $sm['v_link'] == $submenu1 ? " active" : "";
					if ($sm['i_idmenu'] == $m['i_id']) {
						$filassub .= "
						<ul class='nav-treeview'>
							<li class='nav-item " . $active . "'>
								<a href='" . BASE_URL . $sm['v_link'] . "/index' class='" . $sm['v_link'] . " nav-link'>
									<i data-feather='" . $sm['v_icono'] . "'></i>
									<span>" . $sm['v_nombre'] . "</span>
									" . $sm['v_span'] . "
								</a>
							</li>
						</ul>";
					}
					$active = "";
				}
				// menu-open
				$activem = $menu1 == $m['v_link'] && $m['i_submenu'] != 1 ? 'active ' : "";

				$filasmenu .= "
					<li class='" . $activem . "nav-item'>
						<a href=" . BASE_URL . $m['v_link'] . " class='" . $m['v_link'] . " nav-link'>
							<i data-feather='" . $m['v_icono'] . "'></i>
							<span class='menu-title text-truncate'>" . str_replace("&otilde;", "ó", $m['v_nombre']) . "</span>
						</a>
						" . $filassub . "
					</li>";
				$filassub = "";
			}

			$_SESSION['menuinicial'] = $filasmenu;


			// $filasmenu = "";
			// $filassub = "";
			// $menu1 = "";
			// $submenu1 = "dashboard";
			// $active = "";


			// foreach ($usermenu as $m) {

			// 	if (($m['v_link'] == $menu1) && ($m['i_submenu'] == 0) && ($submenu1 == "")) {
			// 		$active = " active";
			// 	} else {
			// 		$active = "";
			// 	}

			// 	$flecha = $m['i_submenu'] == 1 ? " has-sub" : "";


			// 	foreach ($usersubmenu as $sm) {
			// 		$activesm = $sm['v_link'] == $submenu1 ? " active" : "";
			// 		if ($sm['i_idmenu'] == $m['i_id']) {
			// 			$filassub .= "
			// 			<ul class='nav-treeview'>
			// 			<li class='nav-item " . $activesm . "'>
			// 					<a href='" . BASE_URL . $sm['v_link'] . "/index' class='d-flex align-items-center nav-link" . $active . "'>
			// 					<i data-feather=" . $sm['v_icono'] . "></i>
			// 						<span>" . $sm['v_nombre'] . "</span>								 
			// 					</a>
			// 				</li>
			// 			</ul>";
			// 		}
			// 		$activesm = "";
			// 	}

			// 	// menu-open
			// 	// $mopen = $menu1 == $m['v_link'] && $m['i_submenu'] == 1  ?  ' open' : "";

			// 	$mopen = $m['i_submenu'] == 1 ? " " : "";

			// 	// if (strval($m['v_link']) == strval($menu1)) {

			// 	// 	if (intval($m['i_submenu']) == 1) {
			// 	// 		$mopen =  " open";
			// 	// 	} else {
			// 	// 		$mopen =  " open";
			// 	// 	}
			// 	// }


			// 	$filasmenu .= "
			// 		<li class='" . $active  . " nav-item " . $flecha . $mopen . "' >
			// 			<a class='nav-link d-flex align-items-center' href=" . BASE_URL . $m['v_link'] . ">
			// 			<i data-feather=" . $m['v_icono'] . "></i>
			// 			<span class='menu-title text-truncate'> " . str_replace("&otilde;", "ó", $m['v_nombre']) . "</span>
			// 			</a>
			// 			" . $filassub . "
			// 		</li>";
			// 	$filassub = "";
			// }

			// $_SESSION['menuinicial'] = $filasmenu;



			$estado = 1; // logueo exitoso
			$url = "/pedidos/" . $usermenu[0]['v_link'] . "/index";
			$_SESSION['id'] = $login[0]['i_id'];
			$_SESSION['usuario'] = $login[0]['v_nombres'] . ', ' . $login[0]['v_apellidos'];
			$_SESSION['nombres'] = $login[0]['v_nombres'];
			$_SESSION['apellidos'] = $login[0]['v_apellidos'];
			$_SESSION['idperfil'] = $login[0]['i_id_perfil'];
			$_SESSION['perfil'] = $login[0]['v_nombreperfil'];
			$_SESSION['menus'] = $usermenu;
			$_SESSION['submenus'] = $usersubmenu;
			$_SESSION['selmenu'] = "dashboard";
			$_SESSION['selsubmenu'] = "";
			$_SESSION['despliegue'] = "";
			$_SESSION['foto'] = $login[0]['v_foto'];
			$_SESSION['id_cargo'] = $login[0]['v_id_cargo'];
			$_SESSION['carnombre'] = $login[0]['v_carnombre'];
			$_SESSION['sede'] = $login[0]['v_localsede'];
			$_SESSION['almacen'] = $login[0]['v_id_local'];
			$_SESSION['dni'] = $login[0]['v_dni'];
			$_SESSION['idarea'] = $login[0]['v_areid'];
			$_SESSION['area'] = $login[0]['v_area'];
			$_SESSION['v_token'] = $login[0]['v_token'];
		} else {
			$estado = 0;
			$url = "";
			$_SESSION['id'] = "";
			$_SESSION['usuario'] = "";
			$_SESSION['nombres'] =  "";
			$_SESSION['apellidos'] =  "";
			$_SESSION['idperfil'] =  "";
			$_SESSION['perfil'] = "";
			$_SESSION['menus'] = "";
			$_SESSION['submenus'] = "";
			$_SESSION['selmenu'] = "dashboard";
			$_SESSION['selsubmenu'] = "";
			$_SESSION['despliegue'] = "";
			$_SESSION['foto'] = "";
			$_SESSION['id_cargo'] == "";
			$_SESSION['carnombre'] = "";
			$_SESSION['sede'] = "";
			$_SESSION['almacen'] = "";
			$_SESSION['dni'] = "";
			$_SESSION['idarea'] = "";
			$_SESSION['area'] = "";
			$_SESSION['v_token'] = "";
		};

		header('Content-type: application/json; charset=utf-8');

		echo $json->encode(
			array(
				"estado" => intval($estado),
				"url" => $url,
			)
		);
	}



	public function logout()
	{
		if (isset($_SESSION['usuario'])) {
			session_destroy();
			unset($_SESSION['usuario']);
			$this->redireccionar('index');
		} else {
			session_destroy();
			unset($_SESSION['usuario']);
			$this->redireccionar('index');
		}
	}
}
