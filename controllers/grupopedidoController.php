<?php

class grupopedidoController extends Controller
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



			$result = $soap->ListadoGrupo();
			$ListadoGrupo = json_decode($result->ListadoGrupoResult, true);
			$this->_view->ListadoGrupo = $ListadoGrupo;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function formulagrupo() //SubPestaña
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

			$v_id_grupo = $_GET['variable1'];
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

			$area = array(
				'v_id_grupo' =>		$v_id_grupo,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoGrupoArea($area);
			$ListadoGrupoArea = json_decode($result->ListadoGrupoAreaResult, true);

			$result = $soap->ListadoGrupoFormula($area);
			$ListadoGrupoFormula = json_decode($result->ListadoGrupoFormulaResult, true);

			$this->_view->ListadoGrupoArea = $ListadoGrupoArea;
			$this->_view->ListadoGrupoFormula = $ListadoGrupoFormula;

			$this->_view->setJs(array('formulagrupo'));
			$this->_view->renderizar('formulagrupo');
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function Consultar_GrupoArea() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_id_grupo = $_POST['v_id_grupo'];
			$v_id_area = $_POST['v_id_area'];

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

			$grparea = array(
				'v_id_grupo' => $v_id_grupo,
				'v_id_area' => $v_id_area,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarGrupoArea($grparea);
			$data = json_decode($result->MostrarGrupoAreaResult, true);

			$result = $soap->ComboArea();
			$ComboArea = json_decode($result->ComboAreaResult, true);

			$result = $soap->ComboEstadoGrupo();
			$ComboEstadoGrupo = json_decode($result->ComboEstadoGrupoResult, true);


			if (count($data) > 0) {
				$v_id_grupo  = $data[0]['v_id_grupo'];
				$v_descripcion  = $data[0]['v_descripcion'];
				//Combo Area
				$FilascomboArea = "";
				$selarea = "";
				foreach ($ComboArea as $dp) {
					if ($dp['v_areid'] == $data[0]['v_idarea']) {
						$selarea = "selected='selected'";
					} else {
						$selarea = "";
					}
					$FilascomboArea .= "<option " . $selarea . " value=" . $dp['v_areid'] . ">" . $dp['v_nombre'] . "</option>";
				}
				$v_area  = $data[0]['v_area'];

				//Combo EstadO Grupo
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
				$v_id_grupo   = "";
				$v_descripcion = "";

				//Combo Area
				$FilascomboArea = "";
				$selarea = "";
				foreach ($ComboArea as $dp) {
					$FilascomboArea .= "<option " . $selarea . " value=" . $dp['v_areid'] . ">" . $dp['v_nombre'] . "</option>";
				}

				$v_area  = "";
				//Combo EstadO Grupo
				$FilascomboEstado = "";
				$selEstado = "";
				foreach ($ComboEstadoGrupo as $dp) {
					$FilascomboEstado .= "<option " . $selEstado . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}
			}



			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"FilascomboArea" => $FilascomboArea,
					"FilascomboEstado" => $FilascomboEstado,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function Consultar_GrupoFormula() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_id_grupo = $_POST['v_id_grupo'];
			$v_idarea = $_POST['v_idarea'];
			$i_idorden = $_POST['i_idorden'];

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

			$formula = array(
				'v_id_grupo' => $v_id_grupo,
				'v_idarea' => $v_idarea,
				'i_idorden' => $i_idorden,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarGrupoFormula($formula);
			$data = json_decode($result->MostrarGrupoFormulaResult, true);

			$result = $soap->ComboCargo();
			$ComboCargo = json_decode($result->ComboCargoResult, true);

			$result = $soap->ComboUsuario();
			$ComboUsuario = json_decode($result->ComboUsuarioResult, true);

			$sgtmonto = array(
				'v_id_grupo' => $v_id_grupo,
				'v_idarea' => $v_idarea,
			);

			$result = $soap->ConsultaNextMonto($sgtmonto);
			$ConsultaNextMonto = json_decode($result->ConsultaNextMontoResult, true);


			if (count($data) > 0) {
				$i_idorden  = $data[0]['i_idorden'];
				$v_descripcion_uno  = $data[0]['v_descripcion_uno'];
				$v_condicion_uno  = $data[0]['v_condicion_uno'];
				$f_valorinicio_condicion_uno  = $data[0]['f_valorinicio_condicion_uno'];
				$f_valortope_condicion_uno  = $data[0]['f_valortope_condicion_uno'];
				//Combo Cargo
				$FilascomboCargo = "";
				$selcargo = "";
				foreach ($ComboCargo as $dp) {
					if ($dp['v_carid'] == $data[0]['v_idcargo']) {
						$selcargo = "selected='selected'";
					} else {
						$selcargo = "";
					}
					$FilascomboCargo .= "<option " . $selcargo . " value=" . $dp['v_carid'] . ">" . $dp['v_carnombre'] . "</option>";
				}

				$FilascomboUsuario = "";
				$selusuario = "";
				foreach ($ComboUsuario as $dp) {
					if ($dp['v_dni'] == $data[0]['v_username']) {
						$selusuario = "selected='selected'";
					} else {
						$selusuario = "";
					}
					$FilascomboUsuario .= "<option " . $selusuario . " value=" . $dp['v_dni'] . ">" . $dp['v_nombres'] . "</option>";
				}

				$v_aprobador_uno  = $data[0]['v_aprobador_uno'];
				$v_correo  = $data[0]['v_correo'];
				$v_validar_tope  = $data[0]['v_validar_tope'];
				$i_btn_aprobar  = $data[0]['i_btn_aprobar'];
				$i_btn_rechazar  = $data[0]['i_btn_rechazar'];
				$i_btn_modificar  = $data[0]['i_btn_modificar'];
				$f_monto_sgte  = $data[0]['f_monto_sgte'];
				$v_correo_next  = $data[0]['v_correo_next'];
				$v_nombre_correo  = $data[0]['v_nombre_correo'];
				$v_genero  = $data[0]['v_genero'];
			} else {
				//Combo Cargo
				$i_idorden  =  "";
				$v_descripcion_uno  = "";
				$v_condicion_uno  = "";
				$f_valorinicio_condicion_uno = "";
				$f_valortope_condicion_uno = "";

				$FilascomboCargo = "";
				$selcargo = "";
				foreach ($ComboCargo as $dp) {
					$FilascomboCargo .= "<option " . $selcargo . " value=" . $dp['v_carid'] . ">" . $dp['v_carnombre'] . "</option>";
				}


				$FilascomboUsuario = "";
				$selusuario = "";
				foreach ($ComboUsuario as $dp) {
					$FilascomboUsuario .= "<option " . $selusuario . " value=" . $dp['v_dni'] . ">" . $dp['v_nombres'] . "</option>";
				}


				$v_aprobador_uno  = "";
				$v_correo  = "";
				$v_validar_tope  = "";
				$i_btn_aprobar  = "";
				$i_btn_rechazar  = "";
				$i_btn_modificar  = "";
				$f_monto_sgte   = $ConsultaNextMonto[0]['f_monto_sgte'];
				$v_correo_next   = "";
				$v_nombre_correo  =  "";
				$v_genero  =  "";
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"i_idorden" => $i_idorden,
					"v_descripcion_uno" => $v_descripcion_uno,
					"v_condicion_uno" => $v_condicion_uno,
					"f_valorinicio_condicion_uno" => $f_valorinicio_condicion_uno,
					"f_valortope_condicion_uno" => $f_valortope_condicion_uno,
					"FilascomboCargo" => $FilascomboCargo,
					"FilascomboUsuario" => $FilascomboUsuario,
					"v_aprobador_uno" => $v_aprobador_uno,
					"v_correo" => $v_correo,
					"v_validar_tope" => $v_validar_tope,
					"i_btn_aprobar" => $i_btn_aprobar,
					"i_btn_rechazar" => $i_btn_rechazar,
					"i_btn_modificar" => $i_btn_modificar,
					"f_monto_sgte" => $f_monto_sgte,
					"v_correo_next" => $v_correo_next,
					"v_nombre_correo" => $v_nombre_correo,
					"v_genero" => $v_genero,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function registro_grupo() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post           = $_POST['post'];
			$v_id_grupo     = $_POST['v_id_grupo'];
			$v_descripcion  = $_POST['v_descripcion'];
			$i_estado       = $_POST['i_estado'];


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
				'v_id_grupo'    => $v_id_grupo,
				'v_descripcion' => $v_descripcion,
				'i_estado'      => $i_estado,
			);

			$result2 = $soap->GuardarGrupo($params);
			$MantenimientoUsuario = json_decode($result2->GuardarGrupoResult, true);

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


	public function Consultar_grupo() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_id_grupo = $_POST['v_id_grupo'];


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

			$grp = array(
				'v_id_grupo' => $v_id_grupo,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarListadoGrupo($grp);
			$data = json_decode($result->MostrarListadoGrupoResult, true);


			if (count($data) > 0) {
				$estado  =  1;
				$v_id_grupo  = $data[0]['v_id_grupo'];
				$v_descripcion  = $data[0]['v_descripcion'];
			} else {
				$estado  =  0;
				$v_id_grupo  =  "";
				$v_descripcion  =  "";
			}


			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"estado" => $estado,
					"v_id_grupo" => $v_id_grupo,
					"v_descripcion" => $v_descripcion,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function registro_grupoArea() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post           = $_POST['post'];
			$v_idgrupo      = $_POST['v_idgrupo'];
			$v_idarea       = $_POST['v_idarea'];
			$v_area         = $_POST['v_area'];
			$i_estado       = $_POST['i_estado'];


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
				'v_idgrupo'    => $v_idgrupo,
				'v_idarea' => $v_idarea,
				'v_area'      => $v_area,
				'i_estado'      => $i_estado,
			);

			$result2 = $soap->GuardarGrupoArea($params);
			$GuardarGrupoArea = json_decode($result2->GuardarGrupoAreaResult, true);
			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $GuardarGrupoArea[0]['v_icon'],
					"vtitle" 		=> $GuardarGrupoArea[0]['v_title'],
					"vtext" 		=> $GuardarGrupoArea[0]['v_text'],
					"itimer" 		=> intval($GuardarGrupoArea[0]['i_timer']),
					"icase" 		=> intval($GuardarGrupoArea[0]['i_case']),
					"vprogressbar" 	=> $GuardarGrupoArea[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function registro_grupoFormula() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post           = $_POST['post'];
			$v_idgrupo      = $_POST['v_idgrupo'];
			$v_idarea      = $_POST['v_idarea'];
			$i_idorden       = $_POST['i_idorden'];
			$v_descripcion_uno         = $_POST['v_descripcion_uno'];
			$v_condicion_uno       = $_POST['v_condicion_uno'];
			$f_valorinicio_condicion_uno       = $_POST['f_valorinicio_condicion_uno'];
			$f_valortope_condicion_uno       = $_POST['f_valortope_condicion_uno'];
			$v_idcargo       = $_POST['v_idcargo'];
			$v_aprobador_uno       = $_POST['v_aprobador_uno'];
			$v_correo       = $_POST['v_correo'];
			$v_correo_next       = $_POST['v_correo_next'];
			$v_validar_tope       = $_POST['v_validar_tope'];
			$i_btn_aprobar       = $_POST['i_btn_aprobar'];
			$i_btn_rechazar       = $_POST['i_btn_rechazar'];
			$i_btn_modificar       = $_POST['i_btn_modificar'];
			$v_username       = $_POST['v_username'];
			$v_nombre_correo       = $_POST['v_nombre_correo'];
			$v_genero       = $_POST['v_genero'];

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
				'v_idgrupo'     => $v_idgrupo,
				'v_idarea'     => $v_idarea,
				'i_idorden'      => $i_idorden,
				'v_descripcion_uno'        => $v_descripcion_uno,
				'v_condicion_uno'      => $v_condicion_uno,
				'f_valorinicio_condicion_uno'      => $f_valorinicio_condicion_uno,
				'f_valortope_condicion_uno'      => $f_valortope_condicion_uno,
				'v_idcargo'      => $v_idcargo,
				'v_aprobador_uno'      => $v_aprobador_uno,
				'v_correo'      => $v_correo,
				'v_correo_next'      => $v_correo_next,
				'v_validar_tope'      => $v_validar_tope,
				'i_btn_aprobar'      => $i_btn_aprobar,
				'i_btn_rechazar'      => $i_btn_rechazar,
				'i_btn_modificar'      => $i_btn_modificar,
				'v_username'      => $v_username,
				'v_nombre_correo'      => $v_nombre_correo,
				'v_genero'      => $v_genero,
			);

			$result2 = $soap->GuardarGrupoFormula($params);
			$GuardarGrupoFormula = json_decode($result2->GuardarGrupoFormulaResult, true);
			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $GuardarGrupoFormula[0]['v_icon'],
					"vtitle" 		=> $GuardarGrupoFormula[0]['v_title'],
					"vtext" 		=> $GuardarGrupoFormula[0]['v_text'],
					"itimer" 		=> intval($GuardarGrupoFormula[0]['i_timer']),
					"icase" 		=> intval($GuardarGrupoFormula[0]['i_case']),
					"vprogressbar" 	=> $GuardarGrupoFormula[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function ListadoGrupoFormula() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_id_grupo = $_POST['v_id_grupo'];
			$v_idarea = $_POST['v_id_area'];

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
				'v_id_grupo' =>		$v_id_grupo,
				'v_idarea' =>		$v_idarea,
			);
			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoGrupoFormula($frm);
			$data = json_decode($result->ListadoGrupoFormulaResult, true);

			if (count($data) > 0) {


				$v_nombre_area =   $data[0]['v_nombre_area'];

				$filas = [];
				$i = 0;
				foreach ($data as $da) {
					$propiedades1 = array(
						"v_id_grupo" => ($da['v_id_grupo']),
						"v_idarea" => $da['v_idarea'],
						"i_idorden" => $da['i_idorden'],
						"v_descripcion_uno" => $da['v_descripcion_uno'],
						"v_condicion_uno" => $da['v_condicion_uno'],
						"f_valorinicio_condicion_uno" => $da['f_valorinicio_condicion_uno'],
						"f_valortope_condicion_uno" => $da['f_valortope_condicion_uno'],
						"v_idcargo" => $da['v_idcargo'],
						"v_aprobador_uno" => $da['v_aprobador_uno'],
						"v_correo" => $da['v_correo'],
						"v_validar_tope" => $da['v_validar_tope'],
						"i_btn_aprobar" => $da['i_btn_aprobar'],
						"i_btn_rechazar" => $da['i_btn_rechazar'],
						"i_btn_modificar" => $da['i_btn_modificar'],
						"i_recepciona" => $da['i_recepciona'],
						"v_btn1Nombre" => $da['v_btn1Nombre'],
						"v_btn1Color" => $da['v_btn1Color'],
						"v_correo_next" => $da['v_correo_next'],
						"v_btn2Nombre" => $da['v_btn2Nombre'],
						"v_btn2Color" => $da['v_btn2Color'],
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
}
