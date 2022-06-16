<?php

class usuarioController extends Controller
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
			$result = $soap->ListadoUsuario();
			$ListadoUsuario = json_decode($result->ListadoUsuarioResult, true);

			// $result = $soap->ComboPerfil();
			// $ComboPerfil = json_decode($result->ComboPerfilResult, true);

			// $result = $soap->ComboCargo();
			// $ComboCargo = json_decode($result->ComboCargoResult, true);

			// $result = $soap->ComboArea();
			// $ComboArea = json_decode($result->ComboAreaResult, true);

			// $result = $soap->ComboLocal();
			// $ComboLocal = json_decode($result->ComboLocalResult, true);


			$this->_view->ListadoUsuario = $ListadoUsuario;
			// $this->_view->ComboPerfil = $ComboPerfil;
			// $this->_view->ComboCargo = $ComboCargo;
			// $this->_view->ComboArea = $ComboArea;
			// $this->_view->ComboLocal = $ComboLocal;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function Consultar_Usuario() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_dni = $_POST['v_dni'];
			//$v_dni = '77683117';

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
				'v_dni' => $v_dni,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ConsultaUsuario($dni);
			$data = json_decode($result->ConsultaUsuarioResult, true);

			$result = $soap->ComboPerfil();
			$ComboPerfil = json_decode($result->ComboPerfilResult, true);

			$result = $soap->ComboCargo();
			$ComboCargo = json_decode($result->ComboCargoResult, true);

			$result = $soap->ComboArea();
			$ComboArea = json_decode($result->ComboAreaResult, true);

			$result = $soap->ComboLocal();
			$ComboLocal = json_decode($result->ComboLocalResult, true);

			$result = $soap->ComboUsuarioSolomon();
			$ComboUsuarioSolomon = json_decode($result->ComboUsuarioSolomonResult, true);

			if (count($data) > 0) {
				//Combo perfil
				$FilascomboPerfil = "";
				$selcombo = "";
				foreach ($ComboPerfil as $dp) {
					if ($dp['i_id'] == $data[0]['i_perfil']) {
						$selcombo = "selected='selected'";
					} else {
						$selcombo = "";
					}
					$FilascomboPerfil .= "<option " . $selcombo . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}

				//Combo Cargo
				$FilascomboCargo = "";
				$selcargo = "";
				foreach ($ComboCargo as $dp) {
					if ($dp['v_carid'] == $data[0]['v_id_cargo']) {
						$selcargo = "selected='selected'";
					} else {
						$selcargo = "";
					}
					$FilascomboCargo .= "<option " . $selcargo . " value=" . $dp['v_carid'] . ">" . $dp['v_carnombre'] . "</option>";
				}

				//Combo Area
				$FilascomboArea = "";
				$selarea = "";
				foreach ($ComboArea as $dp) {
					if ($dp['v_areid'] == $data[0]['v_id_area']) {
						$selarea = "selected='selected'";
					} else {
						$selarea = "";
					}
					$FilascomboArea .= "<option " . $selarea . " value=" . $dp['v_areid'] . ">" . $dp['v_nombre'] . "</option>";
				}

				//Combo Local
				$FilascomboLocal = "";
				$sellocal = "";
				foreach ($ComboLocal as $dp) {
					if ($dp['v_id_local'] == $data[0]['v_id_local']) {
						$sellocal = "selected='selected'";
					} else {
						$sellocal = "";
					}
					$FilascomboLocal .= "<option " . $sellocal . " value=" . $dp['v_id_local'] . ">" . $dp['v_local'] . "</option>";
				}

				//Combo Usuario Solomon
				$FilascomboUsuarioSolomon = "";
				$selsolomon = "";
				foreach ($ComboUsuarioSolomon as $dp) {
					if ($dp['v_userid'] == $data[0]['v_usuario_solomon']) {
						$selsolomon = "selected='selected'";
					} else {
						$selsolomon = "";
					}
					$FilascomboUsuarioSolomon .= "<option " . $selsolomon . " value=" . $dp['v_userid'] . ">" . $dp['v_username'] . "</option>";
				}

				$estado  =  1;
				$v_dni  = $data[0]['v_dni'];
				$v_nombres  = $data[0]['v_nombres'];
				$v_apellidos  = $data[0]['v_apellidos'];
				$v_correo  = $data[0]['v_correo'];

				$i_persexo  = $data[0]['i_persexo'];
				$v_persexo_nombre  = $data[0]['v_persexo_nombre'];
			} else {
				$estado  =  0;
				$v_dni  =  "";
				$v_nombres  =  "";
				$v_apellidos  =  "";
				$v_correo  =  "";
				$i_persexo   =  "";
				$v_persexo_nombre   =  "";
				// Combo perfil
				$FilascomboPerfil = "";
				$selcombo = "";
				foreach ($ComboPerfil as $dp) {
					$FilascomboPerfil .= "<option " . $selcombo . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}

				//Combo Cargo
				$FilascomboCargo = "";
				$selcargo = "";
				foreach ($ComboCargo as $dp) {
					$FilascomboCargo .= "<option " . $selcargo . " value=" . $dp['v_carid'] . ">" . $dp['v_carnombre'] . "</option>";
				}

				//Combo Area
				$FilascomboArea = "";
				$selarea = "";
				foreach ($ComboArea as $dp) {
					$FilascomboArea .= "<option " . $selarea . " value=" . $dp['v_areid'] . ">" . $dp['v_nombre'] . "</option>";
				}

				//Combo Local
				$FilascomboLocal = "";
				$sellocal = "";
				foreach ($ComboLocal as $dp) {
					$FilascomboLocal .= "<option " . $sellocal . " value=" . $dp['v_id_local'] . ">" . $dp['v_local'] . "</option>";
				}


				//Combo Usuario Solomon
				$FilascomboUsuarioSolomon = "";
				$selsolomon = "";
				foreach ($ComboUsuarioSolomon as $dp) {
					$FilascomboUsuarioSolomon .= "<option " . $selsolomon . " value=" . $dp['v_userid'] . ">" . $dp['v_username'] . "</option>";
				}
			}


			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"estado" => $estado,
					"v_dni" => $v_dni,
					"v_nombres" => $v_nombres,
					"v_apellidos" => $v_apellidos,
					"v_correo" => $v_correo,
					"i_persexo" => $i_persexo,
					"v_persexo_nombre" => $v_persexo_nombre,
					"FilascomboPerfil" => $FilascomboPerfil,
					"FilascomboCargo" => $FilascomboCargo,
					"FilascomboArea" => $FilascomboArea,
					"FilascomboLocal" => $FilascomboLocal,
					"FilascomboUsuarioSolomon" => $FilascomboUsuarioSolomon,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function Consultar_Persona() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_dni = $_POST['v_dni'];

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
				'v_dni' => $v_dni,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ConsultaPersona($dni);
			$data = json_decode($result->ConsultaPersonaResult, true);

			if (count($data) > 0) {
				$estado  =  1;
				$v_dni  = $data[0]['v_dni'];
				$v_nombres  = $data[0]['v_nombres'];
				$v_apellidos  = $data[0]['v_apellidos'];
				$i_persexo  = $data[0]['persexo'];
				$v_persexo_nombre  = $data[0]['persexo_nombre'];
			} else {
				$estado  =  0;
				$v_dni  =  "";
				$v_nombres  =  "";
				$v_apellidos  =  "";
				$i_persexo =  "";
				$v_persexo_nombre =  "";
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"estado" => $estado,
					"v_dni" => $v_dni,
					"v_nombres" => $v_nombres,
					"v_apellidos" => $v_apellidos,

					"i_persexo" => $i_persexo,
					"v_persexo_nombre" => $v_persexo_nombre,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function registro_usuario() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$v_dni = $_POST['v_dni'];
			$v_nombres = $_POST['v_nombres'];
			$v_apellidos = $_POST['v_apellidos'];
			$v_correo = $_POST['v_correo'];
			$v_clave = $_POST['v_clave'];
			$i_estado = $_POST['i_estado'];
			$i_perfil = $_POST['i_perfil'];
			$v_id_cargo = $_POST['v_id_cargo'];
			$v_id_local = $_POST['v_id_local'];
			$v_id_area = $_POST['v_id_area'];
			$i_persexo = $_POST['i_persexo'];
			$v_persexo_nombre = $_POST['v_persexo_nombre'];
			$v_usuario_solomon = $_POST['v_usuario_solomon'];


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
				'v_dni' => $v_dni,
				'v_nombres' => $v_nombres,
				'v_apellidos' => $v_apellidos,
				'v_correo' =>  $v_correo,
				'v_clave' =>  $v_clave,
				'i_estado' => $i_estado,
				'i_perfil' => $i_perfil,
				'v_id_cargo' => $v_id_cargo,
				'v_id_local' => $v_id_local,
				'v_id_area' => $v_id_area,
				'i_persexo' => $i_persexo,
				'v_persexo_nombre' => $v_persexo_nombre,
				'v_usuario_solomon' => $v_usuario_solomon,
			);

			$result2 = $soap->MantenimientoUsuario($params);
			$MantenimientoUsuario = json_decode($result2->MantenimientoUsuarioResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $MantenimientoUsuario[0]['v_icon'],
					"vtitle" 		=> $MantenimientoUsuario[0]['v_title'],
					"vtext" 		=> $MantenimientoUsuario[0]['v_text'],
					"itimer" 		=> intval($MantenimientoUsuario[0]['i_timer']),
					"icase" 		=> intval($MantenimientoUsuario[0]['i_case']),
					"vprogressbar" 	=> $MantenimientoUsuario[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}
}
