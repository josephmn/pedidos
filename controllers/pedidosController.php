<?php

class pedidosController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('pedidos', '');

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


			$dni = array(
				'v_username' => $_SESSION['dni'],
			);


			$tope = array(
				'post' =>  1,
				'nu_correla' => '',
				'v_idarea' => $_SESSION['idarea'],
			);


			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoPedidosUsuario($dni);
			$ListadoPedidosUsuario = json_decode($result->ListadoPedidosUsuarioResult, true);


			$result = $soap->ConsultaTopePedido($tope);
			$ConsultaTopePedido = json_decode($result->ConsultaTopePedidoResult, true);



			$this->_view->ListadoPedidosUsuario = $ListadoPedidosUsuario;
			$this->_view->ConsultaTopePedido = $ConsultaTopePedido;



			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function realizarpedido() //1
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->setCss_Specific(
				array(
					'plugins/fontawesome-free/css/all.min',
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
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
					'plugins/vendors/css/pickers/pickadate/pickadate',
					'plugins/vendors/css/pickers/flatpickr/flatpickr.min',
					'plugins/vendors/css/pickers/form-flat-pickr',
					'plugins/vendors/css/pickers/form-pickadate',

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
					'dist/js/scripts/pages/app-invoice',
					'plugins/vendors/js/forms/repeater/jquery.repeater.min',
					'plugins/vendors/js/pickers/pickadate/picker',
					'plugins/vendors/js/pickers/pickadate/picker.date',
					'plugins/vendors/js/pickers/pickadate/picker.time',
					'plugins/vendors/js/pickers/pickadate/legacy',
					'plugins/vendors/js/pickers/flatpickr/flatpickr.min',
					'dist/js/scripts/forms/pickers/form-pickers',
					// 'plugins/vendors/js/forms/addons/cleave/cleave-phone.us',
				)
			);



			// $v_username =  $_SESSION['correo'];
			// $v_codvend = $_GET['variable1'];
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

			$proveedor = array(
				'post' =>	1,
				'v_vendid' => "",
			);

			$estadopedido = array(
				'post' =>	1,
				'v_usuario' => $_SESSION['dni'],
			);


			$tipoorden = array(
				'post' =>	4,
				'v_usuario' => $_SESSION['dni'],
			);


			$dtz = new DateTimeZone("America/Rio_branco");
			$dt = new DateTime("now", $dtz);
			$currentTime = $dt->format("Y-m-d");


			$tipocambio = array(
				'post' =>	1,
				'fecha' => 	$currentTime,
			);

			$tope = array(
				'post' =>  1,
				'nu_correla' => '',
				'v_idarea' => $_SESSION['idarea'],
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoProveedor($proveedor);
			$proveedores = json_decode($result->ListadoProveedorResult, true);

			$result = $soap->PedidoEstados($estadopedido);
			$PedidoEstado = json_decode($result->PedidoEstadosResult, true);

			$result = $soap->PedidoEstados($tipoorden);
			$TipoOrden = json_decode($result->PedidoEstadosResult, true);

			$result = $soap->ListadoProducto();
			$ListadoProducto = json_decode($result->ListadoProductoResult, true);

			$result = $soap->ListadoMoneda();
			$ListadoMoneda = json_decode($result->ListadoMonedaResult, true);

			$result = $soap->ListadoTipoCambio($tipocambio);
			$ListadoTipoCambio = json_decode($result->ListadoTipoCambioResult, true);

			$result = $soap->ListadoNombrePppto();
			$ListadoNombrePppto = json_decode($result->ListadoNombrePpptoResult, true);

			$acct = array(
				'v_username' => $_SESSION['dni'],
			);


			$result = $soap->ListadoSubAcct($acct);
			$ListadoSubAcct = json_decode($result->ListadoSubAcctResult, true);

			$result = $soap->ComboProducto($tope);
			$ComboProducto = json_decode($result->ComboProductoResult, true);

			$result = $soap->ComboModoPedido();
			$ComboModoPedido = json_decode($result->ComboModoPedidoResult, true);

			$result = $soap->ListadoUnidad();
			$ListadoUnidad = json_decode($result->ListadoUnidadResult, true);

			$result = $soap->ConsultaTopePedido($tope);
			$ConsultaTopePedido = json_decode($result->ConsultaTopePedidoResult, true);

			$result = $soap->ComboLocal();
			$ComboLocal = json_decode($result->ComboLocalResult, true);

			$result = $soap->ListadoDirecciones();
			$ListadoDirecciones = json_decode($result->ListadoDireccionesResult, true);

			$this->_view->proveedores = $proveedores;
			$this->_view->PedidoEstado  = $PedidoEstado;
			$this->_view->ListadoProducto  = $ListadoProducto;
			$this->_view->ListadoMoneda  = $ListadoMoneda;
			$this->_view->ListadoTipoCambio  = $ListadoTipoCambio;
			$this->_view->ListadoNombrePppto  = $ListadoNombrePppto;
			$this->_view->ListadoSubAcct  = $ListadoSubAcct;
			$this->_view->TipoOrden  = $TipoOrden;
			// $this->_view->ComboDetPedido  = $ComboDetPedido;
			$this->_view->ComboProducto = $ComboProducto;
			$this->_view->ComboModoPedido = $ComboModoPedido;

			$this->_view->ListadoUnidad  = $ListadoUnidad;
			$this->_view->ConsultaTopePedido = $ConsultaTopePedido;
			$this->_view->ComboLocal = $ComboLocal;
			$this->_view->ListadoDirecciones = $ListadoDirecciones;

			$this->_view->setJs(array('realizarpedido'));
			$this->_view->renderizar('realizarpedido');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function combo_moneda() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

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
			$result = $soap->ListadoMoneda();
			$ListadoMoneda = json_decode($result->ListadoMonedaResult, true);

			$filasmoneda = "";
			foreach ($ListadoMoneda as $mn) {
				$filasmoneda .= "<option value=" . $mn['i_id'] . ">" . $mn['v_nombre'] . "</option>";
			}


			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"filasmoneda" => $filasmoneda,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}





	public function buscar_producto() //1
	{
		function html_caracteres($string)
		{
			$string = str_replace(
				array('&amp;', '&Ntilde;', '&Aacute;', '&Eacute;', '&Iacute;', '&Oacute;', '&Uacute;', 'C&eacute;'),
				array('&', 'Ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'é'),

				$string
			);
			return $string;
		}

		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_invtid = $_POST['v_invtid'];


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

			$prod = array(
				'v_invtid' => $v_invtid,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ConsultaProducto($prod);
			$data = json_decode($result->ConsultaProductoResult, true);

			$result = $soap->ComboLocal();
			$ComboLocal = json_decode($result->ComboLocalResult, true);

			if (count($data) > 0) {
				$v_nombreproducto  = $data[0]['v_nombre'];
				$v_nombreproducto  = utf8_decode(html_caracteres($v_nombreproducto));
				$v_undmedida  = $data[0]['v_unidad'];
				//Combo Local
				$FilascomboLocal = "";
				$sellocal = "";
				foreach ($ComboLocal as $dp) {
					$FilascomboLocal .= "<option " . $sellocal . " value=" . $dp['v_id_local'] . ">" . $dp['v_local'] . "</option>";
				}
			} else {
				$v_nombreproducto = "";
				$v_undmedida = "";
				$FilascomboLocal = "";
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"v_nombreproducto" => $v_nombreproducto,
					"v_undmedida" => $v_undmedida,
					"FilascomboLocal" => $FilascomboLocal,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function registro_pedido() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = 0;
			$nu_correla = $_POST['nu_correla'];
			$idarea =  $_SESSION['idarea'];
			$idusuario = $_SESSION['id'];
			$usuario = $_POST['usuario'];
			$usuario = $_POST['usuario'];
			$idmoneda = $_POST['idmoneda'];
			$moneda = $_POST['moneda'];
			$fecha = $_POST['fecha'];
			$tipocambio = $_POST['tipocambio'];
			$idestado = $_POST['idestado'];
			$estado = $_POST['estado'];
			$resumentotalsol = $_POST['resumentotalsol'];
			$resumentotaldol = $_POST['resumentotaldol'];
			$nota = $_POST['nota'];
			$d_fechaentrega = $_POST['d_fechaentrega'];
			$v_numerophone = $_POST['v_numerophone'];
			$v_nombrepedido = $_POST['v_nombrepedido'];
			$v_cargo  = $_SESSION['id_cargo'];

			$v_persona_recepciona  = $_POST['v_persona_recepciona'];
			$v_id_direccion_entrega  = $_POST['v_id_direccion_entrega'];
			$v_direccion_entrega  = $_POST['v_direccion_entrega'];

			$i_tipo_pedido  = $_POST['i_tipo_pedido'];
			$v_tipo_pedido  = $_POST['v_tipo_pedido'];
			$i_id_modo  = $_POST['i_id_modo'];

			$datosaci = $_POST['datosaci']; //Array del detalle


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
				'nu_correla' => $nu_correla,
				'i_idarea' => $idarea,
				'i_idusuario' => $idusuario,
				'v_username' =>  $usuario,
				'i_idmoneda' =>  $idmoneda,
				'v_moneda' => $moneda,
				'd_fecha' => $fecha,
				'f_tipocambio' => $tipocambio,
				'i_idestado' => $idestado,
				'v_estado' => $estado,
				'f_totalsol' => $resumentotalsol,
				'f_totaldol' => $resumentotaldol,
				'v_nota' => $nota,
				'd_fechaentrega' => $d_fechaentrega,
				'v_numerophone' => $v_numerophone,
				'v_nombrepedido' => $v_nombrepedido,
				'v_cargo' => $v_cargo,
				'v_persona_recepciona' => $v_persona_recepciona,
				'v_id_direccion_entrega' => $v_id_direccion_entrega,
				'v_direccion_entrega' => $v_direccion_entrega,
				'i_tipo_pedido' => $i_tipo_pedido,
				'v_tipo_pedido' => $v_tipo_pedido,
				'i_id_modo' => $i_id_modo,
			);

			$result2 = $soap->GuardarPedido($params);
			$GuardarPedido = json_decode($result2->GuardarPedidoResult, true);

			$correla  =  intval($GuardarPedido[0]['v_icon']);


			$i = 0;
			foreach ($datosaci as $di) {
				$params[$i] = array(
					'post'			=> $post,
					'nu_correla'	=> $correla,
					'i_item'			=>  $di['id'],
					'v_codprod'			=> $di['Item'],
					'v_descripcion'		=> $di['Descripcion'],
					'v_unidad'			=> $di['Unidad'],
					'nu_cantidad'	    => $di['Cantidad'],
					'nu_precio'			=> $di['Precio'],
					'nu_total' 		    => $di['Total'],
					'v_token' 			=> $_SESSION['v_token'],
					'v_username' 		=> $_SESSION['dni'],
					'v_id_local' 		=> $di['v_id_local'],
					'i_opcion' 		    => $di['i_opcion'],
					'v_centrocosto' 	=> $di['v_centrocosto'],
					'v_cuenta' 	        => $di['v_cuenta'],
				);

				$result3 = $soap->GuardarDetallePedido($params[$i]);
				$GuardarDetallePedido = json_decode($result3->GuardarDetallePedidoResult, true);
				$i++;
			}

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $GuardarDetallePedido[0]['v_icon'],
					"vtitle" 		=> $GuardarDetallePedido[0]['v_title'],
					"vtext" 		=> $correla,
					"itimer" 		=> intval($GuardarDetallePedido[0]['i_timer']),
					"icase" 		=> intval($GuardarDetallePedido[0]['i_case']),
					"vprogressbar" 	=> $GuardarDetallePedido[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function MostrarPedido() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$nu_correla = $_POST['nu_correla'];
			//$nu_correla = 1000000001;
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

			$tipoorden = array(
				'post' =>	4,
				'v_usuario' => $_SESSION['dni'],
			);


			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarPedido($client);
			$data = json_decode($result->MostrarPedidoResult, true);

			$result = $soap->ListadoMoneda();
			$ListadoMoneda = json_decode($result->ListadoMonedaResult, true);

			$result = $soap->ListadoDirecciones();
			$ListadoDirecciones = json_decode($result->ListadoDireccionesResult, true);

			$result = $soap->PedidoEstados($tipoorden);
			$TipoOrden = json_decode($result->PedidoEstadosResult, true);

			$result = $soap->ComboModoPedido();
			$ComboModoPedido = json_decode($result->ComboModoPedidoResult, true);


			if (count($data) > 0) {

				$nu_correla =   $data[0]['nu_correla'];
				$v_areid =   $data[0]['v_areid'];
				$v_area =   $data[0]['v_area'];
				$v_dni =   $data[0]['v_dni'];
				$d_fecha =   $data[0]['d_fecha'];
				$f_tipocambio =   $data[0]['f_tipocambio'];
				$d_fechaentrega =   $data[0]['d_fechaentrega'];
				$v_numerophone =   $data[0]['v_numerophone'];
				$v_nombrepedido =   $data[0]['v_nombrepedido'];
				$f_importotal =   $data[0]['f_importotal'];
				$v_nota =   $data[0]['v_nota'];
				$v_encargado =   $data[0]['v_encargado'];
				$i_idestado =   $data[0]['i_idestado'];
				$i_idorden_aprobacion =   $data[0]['i_idorden_aprobacion'];
				$i_filas =   $data[0]['i_filas'];
				$f_montoppto =   $data[0]['f_montoppto'];
				$v_persona_recepciona =   $data[0]['v_persona_recepciona'];
				$i_tipo_pedido =   $data[0]['i_tipo_pedido'];


				//Combo Modo
				$FilasModo = "";
				$selModo = "";
				foreach ($ComboModoPedido as $dp) {
					if ($dp['i_id'] == $data[0]['i_id_modo']) {
						$selModo = "selected='selected'";
					} else {
						$selModo = "";
					}
					$FilasModo .= "<option " . $selModo . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}



				//Combo Local
				$FilasTipo = "";
				$selTipo = "";
				foreach ($TipoOrden as $dp) {
					if ($dp['i_id'] == $data[0]['i_tipo_pedido']) {
						$selTipo = "selected='selected'";
					} else {
						$selTipo = "";
					}
					$FilasTipo .= "<option " . $selTipo . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}


				//Combo Local
				$FilasMoneda = "";
				$selMoneda = "";
				foreach ($ListadoMoneda as $dp) {
					if ($dp['i_id'] == $data[0]['i_idmoneda']) {
						$selMoneda = "selected='selected'";
					} else {
						$selMoneda = "";
					}
					$FilasMoneda .= "<option " . $selMoneda . " value=" . $dp['i_id'] . ">" . $dp['v_nombre'] . "</option>";
				}


				//Combo Direcciones
				$FilasDireccion = "";
				$selDireccion = "";
				foreach ($ListadoDirecciones as $dp) {
					if ($dp['v_id_local'] == $data[0]['v_id_direccion_entrega']) {
						$selDireccion = "selected='selected'";
					} else {
						$selDireccion = "";
					}
					$FilasDireccion .= "<option " . $selDireccion . " value=" . $dp['v_id_local'] . ">" . $dp['v_direccion'] . "</option>";
				}


				//Combo estado
				$FilasEstado = "";
				$FilasEstado .= "<option value=" . $data[0]['i_idestado'] . ">" . $data[0]['v_estado'] . "</option>";


				if ($data[0]['i_filas'] > 0) {
					$filas = [];
					$i = 0;
					foreach ($data as $da) {
						$propiedades1 = array(
							"id" => ($da['i_item']),
							"Item" => $da['v_codprod'],
							"Descripcion" => $da['v_descripcion'],
							"v_unidad" => $da['v_unidad'],
							"Cantidad" => $da['nu_cantidad'],
							"Precio" => $da['nu_precio'],
							"Total" => $da['nu_total'],
							"v_disabled" => $da['v_disabled'],
							"v_note_detalle" => $da['v_note_detalle'],
							"v_id_local" => $da['v_id_local'],
							"i_opcion" => $da['i_opcion'],
							"v_centrocosto" => $da['v_centrocosto'],
							"v_cuenta" => $da['v_cuenta'],
							"v_intercode" => $da['v_intercode'],
						);
						$filas += ["$i" => $propiedades1];
						$i++;
					}
				} else {
					$filas = "";
				}
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					'nu_correla' => $nu_correla,
					'v_areid' => $v_areid,
					'v_area' => $v_area,
					'v_dni' => $v_dni,
					'd_fecha' => $d_fecha,
					'f_tipocambio' => $f_tipocambio,
					'd_fechaentrega' => $d_fechaentrega,
					'v_numerophone' => $v_numerophone,
					'v_nombrepedido' => $v_nombrepedido,
					'f_importotal' => $f_importotal,
					'v_nota' => $v_nota,
					'v_encargado' => $v_encargado,
					'i_idestado' => $i_idestado,
					'i_idorden_aprobacion' => $i_idorden_aprobacion,
					'i_filas' => $i_filas,
					'v_persona_recepciona' => $v_persona_recepciona,
					'i_tipo_pedido' => $i_tipo_pedido,


					'f_montoppto' => $f_montoppto,
					'FilasMoneda' => $FilasMoneda,
					'FilasEstado' => $FilasEstado,
					'FilasDireccion' => $FilasDireccion,
					'FilasTipo' => $FilasTipo,
					'FilasModo' => $FilasModo,

					'data' => $filas

				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function eliminar_fila() //1
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();
			$post = $_POST['post'];
			$nu_correla = $_POST['nu_correla'];
			$i_item = $_POST['i_item'];

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
				'i_item' => $i_item,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->EliminarFila($params);
			$EliminarFila = json_decode($result->EliminarFilaResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"respuesta" 		=> $EliminarFila[0]['respuesta'],
					"v_mensaje" 		=> $EliminarFila[0]['v_mensaje'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function subir_archivos() //2
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$dia = date("Ymd"); //brindar formato
			$timezone = -5;
			$dia2 = gmdate("Y-m-d H:i:s", time() + 3600 * ($timezone + date("I")));
			$fconcat = date("YmdHis", time()); //formato año+hora, indice para registro de archivo

			if (is_array($_FILES) && count($_FILES) > 0) {

				$nombrefile = $_POST['nombrefile'];
				$nropedido = $_POST['nropedido'];
				$codprodnote = $_POST['codprodnote'];

				$extdoc = explode("/", $_FILES["archivo"]["type"]);
				$filesize = $_FILES["archivo"]["size"];

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
					'modulo'	=> 'subirarchivo', // 
					'mime'		=> $extdoc[0], // image / application --> mime clasificado por php
					'type'		=> $extdoc[1], // jpeg / pdf / msword --> tipo de archivo clasificado por php input file
				);

				$result = $soap->ConsultaTipoArchivo($params);
				$tipoarchivo = json_decode($result->ConsultaTipoArchivoResult, true);


				if (count($tipoarchivo) > 0) {
					$destino = "public/doc/filepedidos/" . rtrim(ltrim($nropedido)) . "_" . rtrim(ltrim($codprodnote)) . "_" . rtrim(ltrim($fconcat)) . "." . $tipoarchivo[0]["v_archivo"];
					$nomfile =  rtrim(ltrim($nropedido)) . "_" . rtrim(ltrim($codprodnote)) . "_" . rtrim(ltrim($fconcat));

					if (copy($_FILES['archivo']['tmp_name'], $destino)) {

						$param1 = array(
							"post" => 0,
							"v_descripcion_file" => $nombrefile,
							"nu_correla" => $nropedido,
							"v_codprod" => $codprodnote,
							"v_nombre_file" => $nomfile,
							"v_extension" => $tipoarchivo[0]["v_archivo"],
							"v_url" => $destino,
							"v_token" => $_SESSION['v_token'],
						);

						$result1 = $soap->GuardarPedidoFile($param1);
						$GuardarPedidoFile = json_decode($result1->GuardarPedidoFileResult, true);

						// 0 no se cargo
						// 1 se cargo correctamente
						header('Content-type: application/json; charset=utf-8');
						echo $json->encode(
							array(
								"vicon" 		=> $GuardarPedidoFile[0]['v_icon'],
								"vtitle" 		=> $GuardarPedidoFile[0]['v_title'],
								"vtext" 		=> $GuardarPedidoFile[0]['v_text'],
								"itimer" 		=> $GuardarPedidoFile[0]['i_timer'],
								"icase" 		=> $GuardarPedidoFile[0]['i_case'],
								"vprogressbar" 	=> $GuardarPedidoFile[0]['v_progressbar'],
							)
						);
					} else {
						//Error al copiar el archivo a la carpeta temp
						header('Content-type: application/json; charset=utf-8');
						echo $json->encode(
							array(
								// "dato" => "erro4 - Error al copiar el archivo a la carpeta temp"
								"vicon" 		=> "error",
								"vtitle" 		=> "No se encontro carpeta de destino para guardar el archivo a cargar...",
								"vtext" 		=> "No se pudo cargar el archivo!",
								"itimer" 		=> 3000,
								"icase" 		=> 4,
								"vprogressbar" 	=> true
							)
						);
					}
				} else {
					//Archivo no permitidos en el sistema
					header('Content-type: application/json; charset=utf-8');
					echo $json->encode(
						array(
							// "dato" => "error3 - Archivo no permitidos en el sistema"
							"vicon" 		=> "error",
							"vtitle" 		=> "Tipo de archivo no permitido para cargarlo en el sistema...",
							"vtext" 		=> "No se pudo cargar el archivo!",
							"itimer" 		=> 3000,
							"icase" 		=> 5,
							"vprogressbar" 	=> true
						)
					);
				}
			} else {

				header('Content-type: application/json; charset=utf-8');
				echo $json->encode(
					array(
						"vicon" 		=> "error",
						"vtitle" 		=> "Archivo no existe",
						"vtext" 		=> "Ocurrio un error al cargar el archivo, favor de volver a intentar",
						"itimer" 		=> 4000,
						"icase" 		=> 4,
						"vprogressbar" 	=> "true",
					)
				);
			}
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function ConsultaPedidoFile() //2
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$nu_correla = $_POST['nropedido'];
			$v_codprod = $_POST['codprodnote'];

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
			);


			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ConsultaPedidoFile($client);
			$data = json_decode($result->ConsultaPedidoFileResult, true);


			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"i_existe_file_pedido" => $data[0]['i_existe_file_pedido'],
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

	public function eliminar_fila_archivo() //2
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$nu_correla = $_POST['nropedido'];
			$i_item = $_POST['codprodnote'];
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


			$file = array(
				'post' =>		1,
				'nu_correla' =>		$nu_correla,
				'v_codprod' =>		$i_item,
				'v_nombre_file' =>	 $v_nombre_file,
			);


			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarPedidoFile($file);
			$data = json_decode($result->MostrarPedidoFileResult, true);
			unlink($data[0]['v_urldelete']);


			$param = array(
				'post' => $post,
				'nu_correla' => $nu_correla,
				'i_item' => $i_item,
				'v_nombre_file' => $v_nombre_file,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->EliminarFilaArchivo($param);
			$EliminarFila = json_decode($result->EliminarFilaArchivoResult, true);


			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"respuesta" 		=> $EliminarFila[0]['respuesta'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function Mostrar_partida_ppto() //3
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_codigo = $_POST['idppto'];

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

			$ppto = array(
				'v_codigo' =>	$v_codigo,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoPpptoPartida($ppto);
			$partidas = json_decode($result->ListadoPpptoPartidaResult, true);

			$c = 0;
			$filas = "";
			foreach ($partidas as $dv) {
				$filas .= "<option " . $dv['v_default'] . " value=" . $dv['v_idpartida'] . ">" . $dv['v_concepto'] . "</option>";
				$c++;
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas, $filas,
				)
			);
		} else {

			$this->redireccionar('index/logout');
		}
	}


	public function MostrarPptoMensual() //3
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$v_codigo = $_POST['v_codigo'];
			$v_idpartida = $_POST['v_idpartida'];


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

			$partida = array(
				'v_codigo' =>		$v_codigo,
				'v_idpartida' =>		$v_idpartida,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoPptoMensual($partida);
			$data = json_decode($result->ListadoPptoMensualResult, true);

			$filas = [];
			$i = 0;
			foreach ($data as $da) {
				$propiedades1 = array(
					"v_codigo" => ($da['v_codigo']),
					"v_idpartida" => $da['v_idpartida'],
					"v_codmes" => $da['v_codmes'],
					"v_nombremes" => $da['v_nombremes'],
					"f_saldo" => $da['f_saldo'],
					"v_namesaldomes" => $da['v_namesaldomes'],
					"v_disabled" => $da['v_disabled'],
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

	public function registro_pedido_ppto() //1
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$nu_correla = $_POST['nu_correla'];
			$v_item_pedido = $_POST['linedetalle'];
			$v_codprod = $_POST['v_codprod'];

			$v_idppto =  $_POST['v_idppto'];
			$v_idpartida =  $_POST['v_idpartida'];
			$v_idmes =  $_POST['codmes'];
			$v_nombremes = $_POST['nombremes'];
			$f_monto = $_POST['cantidadx'];
			$v_id_local = $_POST['v_id_local'];
			$v_centrocosto = $_POST['v_centrocosto'];
			$v_acct = $_POST['v_cuenta'];
			$v_token =  $_SESSION['v_token'];
			$v_idlinea = trim($nu_correla) . '_' . trim($v_idppto) . '_' . trim($v_idpartida) . '_' . trim($v_nombremes) . '_' . trim($v_id_local) . '_' . trim($v_centrocosto) . '_' . trim($v_acct);

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
				'v_idlinea' => $v_idlinea,
				'v_codprod' => $v_codprod,
				'nu_correla' => $nu_correla,
				'v_item_pedido' => $v_item_pedido,
				'v_idppto' => $v_idppto,
				'v_idpartida' => $v_idpartida,
				'v_idmes' =>  $v_idmes,
				'v_nombremes' =>  $v_nombremes,
				'f_monto' =>  $f_monto,
				'v_id_local' =>  $v_id_local,
				'v_centrocosto' =>  $v_centrocosto,
				'v_acct' =>  $v_acct,
				'v_token' =>  $v_token,
			);
			$soap = new SoapClient($wsdl, $options);
			$result2 = $soap->GuardarPedidoPpto($params);
			$GuardarPedidoPpto = json_decode($result2->GuardarPedidoPptoResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $GuardarPedidoPpto[0]['v_icon'],
					"vtitle" 		=> $GuardarPedidoPpto[0]['v_title'],
					"vtext" 		=> $GuardarPedidoPpto[0]['v_text'],
					"itimer" 		=> $GuardarPedidoPpto[0]['i_timer'],
					"icase" 		=> $GuardarPedidoPpto[0]['i_case'],
					"vprogressbar" 	=> $GuardarPedidoPpto[0]['v_progressbar'],


				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function Mostrar_pedido_ppto() //3 REE
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
			$partida = array(
				'nu_correla' => $nu_correla,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarPedidoPpto($partida);
			$data = json_decode($result->MostrarPedidoPptoResult, true);

			$result = $soap->ComboDetPedido($partida);
			$ComboDetPedido = json_decode($result->ComboDetPedidoResult, true);

			$result = $soap->ListadoNombrePppto();
			$ListadoNombrePppto = json_decode($result->ListadoNombrePpptoResult, true);

			$f_montoppto =   $data[0]['f_montoppto'];
			$f_diferencia =   $data[0]['f_diferencia'];


			//Combo detalle pedido
			$FilasDetPedido = "";
			$selDetPedido = "";
			foreach ($ComboDetPedido as $dp) {
				$FilasDetPedido .= "<option " . $selDetPedido . " value=" . $dp['i_item'] . ">" . $dp['v_descripcion'] . "</option>";
			}

			//Combo Presupuesto
			$FilasPresupuesto = "";
			$selPresupuesto = "";
			foreach ($ListadoNombrePppto as $dp) {
				$FilasPresupuesto .= "<option " . $selPresupuesto . " value=" . $dp['v_codigo'] . ">" . $dp['v_proyecto'] . "</option>";
			}



			$filas = [];
			$i = 0;
			foreach ($data as $da) {
				$propiedades1 = array(
					"nu_correla" => ($da['nu_correla']),
					"v_item_pedido" => ($da['v_item_pedido']),
					"v_codprod" => ($da['v_codprod']),
					"v_id_local" => ($da['v_id_local']),
					"v_idlinea" => ($da['v_idlinea']),
					"v_idppto" => $da['v_idppto'],
					"v_idpartida" => $da['v_idpartida'],
					"v_idmes" => $da['v_idmes'],
					"v_nombremes" => $da['v_nombremes'],
					"f_monto" => $da['f_monto'],
					"v_centrocosto" => $da['v_centrocosto'],
				);
				$filas += ["$i" => $propiedades1];
				$i++;
			}
			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					'f_montoppto' => $f_montoppto,
					'f_diferencia' => $f_diferencia,
					'data' => $filas,
					'FilasDetPedido' => $FilasDetPedido,
					'FilasPresupuesto' => $FilasPresupuesto
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}



	public function consulta_monto_item() //3 REE
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$nu_correla = $_POST['nu_correla'];
			$i_item = $_POST['i_item'];


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
			$partida = array(
				'nu_correla' => $nu_correla,
				'i_item' => $i_item,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ConsultaDetMonto($partida);
			$data = json_decode($result->ConsultaDetMontoResult, true);


			$nu_total =   $data[0]['nu_total'];
			$v_id_local =   $data[0]['v_id_local'];
			$v_centrocosto =   $data[0]['v_centrocosto'];
			$v_codprod =   $data[0]['v_codprod'];
			$v_cuenta =   $data[0]['v_cuenta'];

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					'nu_total' => $nu_total,
					'v_id_local' => $v_id_local,
					'v_centrocosto' => $v_centrocosto,
					'v_codprod' => $v_codprod,
					'v_cuenta' => $v_cuenta,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function consulta_cuenta() //3 REE
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();
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
			$sub = array(
				'v_sub' => $v_sub,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ComboCuenta($sub);
			$ComboCuenta = json_decode($result->ComboCuentaResult, true);

			//Combo detalle pedido
			$FilasCuenta = "";
			$selCuenta = "";
			foreach ($ComboCuenta as $dp) {
				$FilasCuenta .= "<option " . $selCuenta . " value=" . $dp['v_acct'] . ">" . $dp['v_descripcion'] . "</option>";
			}

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					'FilasCuenta' => $FilasCuenta,
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}





	public function eliminar_fila_ppto() //2
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$nu_correla = $_POST['nu_correla'];
			$v_idlinea = $_POST['v_idlinea'];


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


			$file = array(
				'nu_correla' =>		$nu_correla,
				'v_idlinea' =>		$v_idlinea,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->EliminarFilaPppto($file);
			$data = json_decode($result->EliminarFilaPpptoResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"respuesta" 		=> $data[0]['respuesta'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}
}
