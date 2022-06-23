<?php

class dashboardController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function cambiarsession()
	{
		if (isset($_SESSION['usuario'])) {

			$session = $_POST['string'];

			$_SESSION['selsubmenu'] = "";
			$_SESSION['selmenu'] = $session;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function cambiarsessionsub()
	{
		if (isset($_SESSION['usuario'])) {

			$sessionsub = $_POST['string'];

			$_SESSION['selsubmenu'] = $sessionsub;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function cambiaropen()
	{
		if (isset($_SESSION['usuario'])) {

			$sessionsub = $_POST['string'];

			$_SESSION['despliegue'] = $sessionsub;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			// <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
			// <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
			// <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
			$this->_view->conctructor_menu('dashboard', 'dashboard');


			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					'dist/css/extensions/toastr.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
					'dist/css/colors',
					'dist/css/components',

					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-validation',
					'dist/css/plugins/extensions/ext-component-toastr',
					'dist/css/custom',
					'dist/css/style',
					'plugins/datatables-net/css/jquery.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',

					'plugins/themes/css/dark-layout',
					'plugins/themes/css/bordered-layout',
					'plugins/themes/css/semi-dark-layout',

				)
			);





			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					'plugins/vendors/js/extensions/toastr.min',
					// 'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					'dist/js/scripts/components/components-bs-toast',
					'dist/js/scripts/components/components-bs-toast.min',
					'dist/js/scripts/components/components-modals',
					'dist/js/scripts/components/components-modals.min',


					//data tables
					'plugins/datatables-net/js/jquery.dataTables.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					'dist/js/scripts/forms/form-input-mask',

					'plugins/vendors/js/forms/cleave/cleave.min',
					'plugins/vendors/js/tables/datatable/datatables.buttons.min',
					'plugins/vendors/js/tables/datatable/jszip.min',

					'plugins/highcharts9/js/highcharts',
					'plugins/highcharts9/modules/variable-pie',
					'plugins/highcharts9/js/highcharts-more',

				)
			);

			$wsdl = 'http://localhost:81/VMWEB/WSVerdumweb.asmx?WSDL';

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


			$wsdl = 'http://localhost:81/VWPEDIDO/WSPedidoweb.asmx?WSDL';
			$soap = new SoapClient($wsdl, $options);


			$cargo = array(
				'post' => 1,
				'v_cargo' => $_SESSION['id_cargo'],
				'i_perfil' => $_SESSION['idperfil'],
				'i_estado' => 4,
			);

			$result = $soap->ListadoPedidosAprobacion($cargo);
			$ListadoPedidosAprobacion = json_decode($result->ListadoPedidosAprobacionResult, true);

			$this->_view->ListadoPedidosAprobacion = $ListadoPedidosAprobacion;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function NumeroPedidos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
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
			$grafico1 = array(
				'post' => 0,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoNumeroPedidos($grafico1);
			$ListadoNumeroPedidos = json_decode($result->ListadoNumeroPedidosResult, true);

			$array1 = [];
			$i = 0;
			foreach ($ListadoNumeroPedidos as $da) {
				$v_nombre = $da['v_nombre'];
				$i_nro_pedidos = $da['i_nro_pedidos'];

				$pie = array("name" => $v_nombre, 'y' => floatval($i_nro_pedidos), 'drilldown' => $v_nombre);

				$array1 += ["$i" => $pie];
				$i++;
			}
			echo json_encode($array1);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function SolesPedidos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
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
			$grafico1 = array(
				'post' => 1,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->ListadoNumeroPedidos($grafico1);
			$ListadoNumeroPedidos = json_decode($result->ListadoNumeroPedidosResult, true);

			$array1 = [];
			$i = 0;
			foreach ($ListadoNumeroPedidos as $da) {
				$v_nombre = $da['v_nombre'];
				$i_nro_pedidos = $da['i_nro_pedidos'];

				$pie = array("name" => $v_nombre, 'y' => floatval($i_nro_pedidos), 'sliced' => '1', 'selected' => '1');

				$array1 += ["$i" => $pie];
				$i++;
			}
			echo json_encode($array1);
		} else {
			$this->redireccionar('index/logout');
		}
	}
}
