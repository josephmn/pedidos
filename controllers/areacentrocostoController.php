<?php

class areacentrocostoController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('controlacceso', 'areacentrocosto');

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



			$result = $soap->ListadoArea();
			$ListadoArea = json_decode($result->ListadoAreaResult, true);
			$this->_view->ListadoArea = $ListadoArea;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function asignarcentrocosto() //SubPestaña
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
					'plugins/vendors/css/animate/animate.min',
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

			$v_areid  = $_GET['idarea'];
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

			$this->_view->setJs(array('asignarcentrocosto'));
			$this->_view->renderizar('asignarcentrocosto');
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function conultalineacentrocosto() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_areid = $_POST['v_areid'];
			$v_sub = $_POST['v_sub'];

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

			$ddt = array(
				'v_areid' => $v_areid,
				'v_sub' => $v_sub,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->consultalineacentrocosto($ddt);
			$data = json_decode($result->consultalineacentrocostoResult, true);

			if (count($data) > 0) {


				$result = $soap->ComboEstadoGrupo();
				$ComboEstadoGrupo = json_decode($result->ComboEstadoGrupoResult, true);


				$v_areid  = $data[0]['v_areid'];
				$v_sub  = $data[0]['v_sub'];

				//Combo Estad Grupo
				$FilascomboEstado = "";
				$selestado = "";
				foreach ($ComboEstadoGrupo as $dp) {
					if ($dp['i_id'] == $data[0]['i_idestado']) {
						$selestado = "selected='selected'";
					} else {
						$selestado = "";
					}
					$FilascomboEstado .= "<option " . $selestado . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"v_areid" => $v_areid,
					"v_sub" => $v_sub,
					"FilascomboEstado" => $FilascomboEstado,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}





	public function ListadoMatrizCentroCosto() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_areid = $_POST['variable1'];

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

			$frm = array(
				'v_areid' => $v_areid,
			);
			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoMatrizCentroCosto($frm);
			$data = json_decode($result->ListadoMatrizCentroCostoResult, true);

			if (count($data) > 0) {

				$filas = [];
				$i = 0;
				foreach ($data as $da) {
					$propiedades1 = array(
						"v_sub" => ($da['v_sub']),
						"v_descripcion" => $da['v_descripcion'],
					);
					$filas += ["$i" => $propiedades1];
					$i++;
				}
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


	public function ListadoAreaCentroCosto() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_areid = $_POST['variable1'];

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

			$frm = array(
				'v_areid' => $v_areid,
			);
			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoAreaCentroCosto($frm);
			$data = json_decode($result->ListadoAreaCentroCostoResult, true);

			if (count($data) > 0) {

				$filas = [];
				$i = 0;
				foreach ($data as $da) {
					$propiedades1 = array(
						"v_areid" => ($da['v_areid']),
						"v_sub" => $da['v_sub'],
						"f_registro" => $da['f_registro'],
						"v_estado" => $da['v_estado'],
						"v_btn1" => $da['v_btn1'],
						"v_btn1Nombre" => $da['v_btn1Nombre'],
						"v_btn1Imagen" => $da['v_btn1Imagen'],
						"v_btn1Color" => $da['v_btn1Color'],
						"v_colorestado" => $da['v_colorestado'],
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
					'v_nombre_area' => $v_nombre_area,
					'data' => $filas
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}



	public function registro_areacentrocsoto() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post         = $_POST['post'];
			$v_areid      = $_POST['v_areid'];
			$v_sub        = $_POST['v_sub'];
			$i_idestado        = $_POST['i_idestado'];

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
				'post'          => $post,
				'v_areid'    => $v_areid,
				'v_sub' => $v_sub,
				'i_idestado' => $i_idestado,
			);

			$result2 = $soap->MantAreaCentroCosto($params);
			$MantAreaCentroCosto = json_decode($result2->MantAreaCentroCostoResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $MantAreaCentroCosto[0]['v_icon'],
					"vtitle" 		=> $MantAreaCentroCosto[0]['v_title'],
					"vtext" 		=> $MantAreaCentroCosto[0]['v_text'],
					"itimer" 		=> intval($MantAreaCentroCosto[0]['i_timer']),
					"icase" 		=> intval($MantAreaCentroCosto[0]['i_case']),
					"vprogressbar" 	=> $MantAreaCentroCosto[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function eliminar_grupoFormula() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post           = $_POST['post'];
			$v_id_grupo      = $_POST['v_id_grupo'];
			$v_idarea      = $_POST['v_idarea'];
			$i_idorden       = $_POST['i_idorden'];


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
				'post'          => $post,
				'v_id_grupo'     => $v_id_grupo,
				'v_idarea'     => $v_idarea,
				'i_idorden'      => $i_idorden,
				'v_username'      => $_SESSION['dni']

			);

			$result2 = $soap->EliminarFilaFormula($params);
			$EliminarFilaFormula = json_decode($result2->EliminarFilaFormulaResult, true);
			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $EliminarFilaFormula[0]['v_icon'],
					"vtitle" 		=> $EliminarFilaFormula[0]['v_title'],
					"vtext" 		=> $EliminarFilaFormula[0]['v_text'],
					"itimer" 		=> intval($EliminarFilaFormula[0]['i_timer']),
					"icase" 		=> intval($EliminarFilaFormula[0]['i_case']),
					"vprogressbar" 	=> $EliminarFilaFormula[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}
}
