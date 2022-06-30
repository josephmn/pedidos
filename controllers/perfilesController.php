<?php

class perfilesController extends Controller
{
	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('configuracion', 'perfiles');


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

					// 'plugins/vendors/css/vendors.min',
					// 'dist/css/bootstrap',
					// 'dist/css/bootstrap-extended',
					// 'dist/css/colors',
					// 'dist/css/components',
					// 'dist/css/core/menu/menu-types/vertical-menu',
					// 'dist/css/style',
					// 'dist/css/fontawesome/css/all',
					// 'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					// 'plugins/datatables-net/css/jquery.dataTables.min',
					// 'plugins/datatables-net/css/responsive.dataTables.min',


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


					// 'plugins/vendors/js/vendors.min',
					// 'dist/js/scripts/components/components-modals',
					// 'dist/js/core/app-menu',
					// 'dist/js/core/app',
					// 'plugins/vendors/js/extensions/sweetalert2.all.min',
					// 'plugins/datatables-net/js/jquery.dataTables.min',
					// 'plugins/datatables-net/js/dataTables.responsive.min',
					// 'plugins/vendors/js/forms/select/select2.full.min',


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
			$result = $soap->MostrarPerfil();
			$ListadoPerfil = json_decode($result->MostrarPerfilResult, true);

			$this->_view->ListadoPerfil = $ListadoPerfil;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function accesoperfil() //SUBMENU PARA ACCESO AL SUBPERFIL
	{
		if (isset($_SESSION['usuario'])) {

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
				)
			);
			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';

			$perfil = $_GET["perfil"];
			$nombreperfil = $_GET["nombreperfil"];

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
			$param1 = array(
				"post" => 0,
				"perfil" => $perfil,
				"menu" => 0, //no se usa para este caso
			);
			$result = $soap->ComboMenu($param1);
			$menu = json_decode($result->ComboMenuResult, true);


			$param2 = array(
				"post" => 1,
				"perfil" => $perfil,
				"menu" => 0, //no se usa para este caso
			);

			$result = $soap->ComboMenu($param2);
			$submenu = json_decode($result->ComboMenuResult, true);

			$this->_view->perfil = $perfil;
			$this->_view->nombreperfil = $nombreperfil;
			$this->_view->submenu = $submenu;
			$this->_view->menu = $menu;

			$this->_view->setJs(array('accesoperfil'));
			$this->_view->renderizar('accesoperfil');
		} else {
			$this->redireccionar('index/logout');
		}
	}



	public function combomenu()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$perfil = $_POST["perfil"];

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

			$param = array(
				"post" => 2,
				"perfil" => $perfil,
				"menu" => 0, //no se usa para este caso
			);

			$result = $soap->ComboMenu($param);
			$combomenu = json_decode($result->ComboMenuResult, true);

			$filas = "";
			foreach ($combomenu as $dv) {
				$filas .= "<option " . $dv['v_default'] . " value=" . $dv['i_submenu'] . ">" . $dv['v_menu'] . "</option>";
			};

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function combosubmenu()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$perfil = $_POST["codperfil"];
			$menu = $_POST["menu"];

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

			$param = array(
				"post" => 3,
				"perfil" => $perfil,
				"menu" => $menu, //se trae el id del menu para cargar los submenu asociados
			);

			$result = $soap->ComboMenu($param);
			$combomenu = json_decode($result->ComboMenuResult, true);

			$filas = "";
			foreach ($combomenu as $dv) {
				$filas .= "<option " . $dv['v_default'] . " value=" . $dv['i_submenu'] . ">" . $dv['v_submenu'] . "</option>";
			};

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function mantenimiento_accesos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST["post"];
			$menu = $_POST["menu"];
			$submenu = $_POST["submenu"];
			$perfil = $_POST["perfil"];
			$tipo = $_POST["tipo"];

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

			$param = array(
				"post" 		=> $post,
				"menu" 		=> $menu,
				"submenu" 	=> $submenu,
				"perfil" 	=> $perfil,
				"tipo" 		=> $tipo,
				"user"		=> $_SESSION['dni']
			);

			$result = $soap->MantPerfilAccesos($param);
			$mantperfiles = json_decode($result->MantPerfilAccesosResult, true);

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $mantperfiles[0]['v_icon'],
					"vtitle" 		=> $mantperfiles[0]['v_title'],
					"vtext" 		=> $mantperfiles[0]['v_text'],
					"itimer" 		=> $mantperfiles[0]['i_timer'],
					"icase" 		=> $mantperfiles[0]['i_case'],
					"vprogressbar" 	=> $mantperfiles[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}







	public function registro_perfil() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$i_idperfil = $_POST['i_idperfil'];
			$v_nombre = $_POST['v_nombre'];
			$v_descripcion = $_POST['v_descripcion'];
			$i_estado = $_POST['i_estado'];
			$v_username =  $_SESSION['dni'];

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
			$params = array(
				'post' => $post,
				'i_idperfil' => $i_idperfil,
				'v_nombre' => $v_nombre,
				'v_descripcion' => $v_descripcion,
				'i_estado' =>  $i_estado,
				'v_username' =>  $v_username,
			);

			$result2 = $soap->GuardarPerfil($params);
			$MantenimientoPerfil = json_decode($result2->GuardarPerfilResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $MantenimientoPerfil[0]['v_icon'],
					"vtitle" 		=> $MantenimientoPerfil[0]['v_title'],
					"vtext" 		=> $MantenimientoPerfil[0]['v_text'],
					"itimer" 		=> intval($MantenimientoPerfil[0]['i_timer']),
					"icase" 		=> intval($MantenimientoPerfil[0]['i_case']),
					"vprogressbar" 	=> $MantenimientoPerfil[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function Consultar_perfil() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$i_idperfil = $_POST['i_idperfil'];
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

			$dni = array(
				'i_idperfil' => $i_idperfil,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ConsultaPerfil($dni);
			$data = json_decode($result->ConsultaPerfilResult, true);

			$result = $soap->ComboEstadoGrupo();
			$ComboEstadoGrupo = json_decode($result->ComboEstadoGrupoResult, true);

			if (count($data) > 0) {
				$estado = 1;
				$i_id  = $data[0]['i_id'];
				$v_nombre  = $data[0]['v_nombre'];
				$v_descripcion  = $data[0]['v_descripcion'];

				//Combo Estado Grupo
				$FilascomboEstado = "";
				$selestado = "";
				foreach ($ComboEstadoGrupo as $dp) {
					if ($dp['i_id'] == $data[0]['i_estado']) {
						$selestado = "selected='selected'";
					} else {
						$selestado = "";
					}
					$FilascomboEstado .= "<option " . $selestado . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}
			} else {
				$estado = 0;
				$i_id  = '';
				$v_nombre  = '';
				$v_descripcion  = '';
				// Combo perfil
				$FilascomboEstado = "";
				$selestado = "";
				foreach ($ComboEstadoGrupo as $dp) {
					$FilascomboEstado .= "<option " . $selestado . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}
			}


			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"estado" => $estado,
					"i_id" => $i_id,
					"v_nombre" => $v_nombre,
					"v_descripcion" => $v_descripcion,
					"FilascomboEstado" => $FilascomboEstado,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}
}
