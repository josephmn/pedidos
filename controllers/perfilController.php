<?php

class perfilController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('perfil', '');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/forms/wizard/bs-stepper.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
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
					'dist/js/scripts/forms/form-wizard',
					'plugins/datatables-net/js/jquery.dataTables.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					'plugins/vendors/js/extensions/sweetalert2.all.min',
					'dist/js/scripts/forms/form-input-mask',
					'plugins/vendors/js/forms/cleave/cleave.min',
					'dist/js/scripts/forms/form-wizard',
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


			// $params = array(
			// 	'post' => 2,
			// 	'correo' => $_SESSION['correo'],
			// );


			// $result = $soap->ConsultaLogin($params);
			// $login = json_decode($result->ConsultaLoginResult, true);

			// $this->_view->login = $login;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}



	public function subir_archivo()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			if (is_array($_FILES) && count($_FILES) > 0) {

				// VARIABLE EN DONDE GUARDAMOS LA FECHA Y HORA
				// $fecha_hora = date("Ymd_His", time());

				// RECORTAMOS EL TIPO DE ARCHIVO Y LO GUADAMOS EN UNA VARIABLE
				$extdoc = explode("/", $_FILES["archivo"]["type"]);
				// DECIMOS EN QUE RUTA SE GUARDARA EL ARCHIVO
				// $destino = "public/doc/perfil_foto/" . ltrim(rtrim($_SESSION['dni'])) . "_" . $fecha_hora . "." .$extdoc[1];
				$destino = "public/doc/perfil/" . ltrim(rtrim($_SESSION['id'])) . "." . $extdoc[1];

				//var_dump(BASE_URL.$destino);exit;

				if (($_FILES["archivo"]["type"] == "image/jpeg") || ($_FILES["archivo"]["type"] == "image/jpg") || ($_FILES["archivo"]["type"] == "image/png")) {

					if ($_FILES['archivo']['size'] > 1050000) {
						echo $json->encode( // tipo archivo erroneo
							array(
								"vicon" 		=> "info",
								"vtitle" 		=> "Archivo sobrepasa 1 Mb.",
								"vtext" 		=> "Favor de subir un archivo mas ligero...!!!",
								"itimer" 		=> 3000,
								"icase" 		=> 4,
								"vprogressbar" 	=> true,
							)
						);
					} else {
						if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $destino)) {

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
								'post' => 1,
								'id' => intval($_SESSION['id']),
								'nombres' => "",
								'apellidos' => "",
								'foto' => $destino,
								'user' => intval($_SESSION['id']),
							);

							$soap = new SoapClient($wsdl, $options);
							$result = $soap->MantUsuarioLogin($params);
							$fotoperfil = json_decode($result->MantUsuarioLoginResult, true);

							$_SESSION['foto'] = $destino;

							header('Content-type: application/json; charset=utf-8');
							echo $json->encode(
								array(
									"vicon" 		=> $fotoperfil[0]['v_icon'],
									"vtitle" 		=> $fotoperfil[0]['v_title'],
									"vtext" 		=> $fotoperfil[0]['v_text'],
									"itimer" 		=> intval($fotoperfil[0]['i_timer']),
									"icase" 		=> intval($fotoperfil[0]['i_case']),
									"vprogressbar" 	=> $fotoperfil[0]['v_progressbar'],
								)
							);
						}
					}
				} else {
					header('Content-type: application/json; charset=utf-8');
					echo $json->encode( // tipo archivo erroneo
						array(
							"vicon" 		=> "info",
							"vtitle" 		=> "Tipo de archivo no admitido",
							"vtext" 		=> "Favor de subir un archivo: *jpeg | *jpg | *png ...!!!",
							"itimer" 		=> 3000,
							"icase" 		=> 2,
							"vprogressbar" 	=> true,
						)
					);
				}
			} else {
				header('Content-type: application/json; charset=utf-8');
				echo $json->encode( // archivo no existe
					array(
						"vicon" 		=> "error",
						"vtitle" 		=> "Archivo de origen no encontrado",
						"vtext" 		=> "Favor de volver a intentar subir un archivo...!!!",
						"itimer" 		=> 3000,
						"icase" 		=> 3,
						"vprogressbar" 	=> true,
					)
				);
			}
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function cambiar_clave()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();
			$newpasswd = $_POST['newpasswd'];

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
				'dni' => $_SESSION['dni'],
				'username' =>  $_SESSION['dni'],
				'password' => $newpasswd,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->CambioClaveUsuario($params);
			$manpassword = json_decode($result->CambioClaveUsuarioResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $manpassword[0]['v_icon'],
					"vtitle" 		=> $manpassword[0]['v_title'],
					"vtext" 		=> $manpassword[0]['v_text'],
					"itimer" 		=> intval($manpassword[0]['i_timer']),
					"icase" 		=> intval($manpassword[0]['i_case']),
					"vprogressbar" 	=> $manpassword[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}



	// public function mantenimiento_login()
	// {
	// 	if (isset($_SESSION['usuario'])) {

	// 		putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
	// 		putenv("NLS_CHARACTERSET=AL32UTF8");

	// 		$this->getLibrary('json_php/JSON');
	// 		$json = new Services_JSON();

	// 		$nombres = $_POST['nombre'];
	// 		$apellidos = $_POST['apellido'];

	// 		$_SESSION['usuario']=$nombres.', '.$apellidos;

	// 		$wsdl = 'http://localhost:81/VMWEB/WSVerdumweb.asmx?WSDL';

	// 		$options = array(
	// 			"uri" => $wsdl,
	// 			"style" => SOAP_RPC,
	// 			"use" => SOAP_ENCODED,
	// 			"soap_version" => SOAP_1_1,
	// 			"connection_timeout" => 60,
	// 			"trace" => false,
	// 			"encoding" => "UTF-8",
	// 			"exceptions" => false,
	// 		);

	// 		$params = array(
	// 			'id' => intval($_SESSION['id']),
	// 			'nombres' => $nombres,
	// 			'apellidos' => $apellidos,
	// 			'user' => intval($_SESSION['id']),
	// 		);

	// 		$soap = new SoapClient($wsdl, $options);
	// 		$result = $soap->MantLogin($params);
	// 		$mantelogin = json_decode($result->MantLoginResult, true);

	// 		header('Content-type: application/json; charset=utf-8');

	// 		echo $json->encode(
	// 			array(
	// 				"vicon" 		=> $mantelogin[0]['v_icon'],
	// 				"vtitle" 		=> $mantelogin[0]['v_title'],
	// 				"vtext" 		=> $mantelogin[0]['v_text'],
	// 				"itimer" 		=> intval($mantelogin[0]['i_timer']),
	// 				"icase" 		=> intval($mantelogin[0]['i_case']),
	// 				"vprogressbar" 	=> $mantelogin[0]['v_progressbar'],
	// 			)
	// 		);

	// 	} else {
	// 		$this->redireccionar('index/logout');
	// 	}
	// }





}
