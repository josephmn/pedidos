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

					// 'dist/css/fontawesome/css/all',
					// 'dist/css/forms/wizard/bs-stepper.min',
					// 'plugins/vendors/css/extensions/sweetalert2.min',
					// 'plugins/vendors/css/charts/vendors.min',
					// 'plugins/vendors/css/charts/apexcharts',
					// 'plugins/vendors/css/extensions/toastr.min',
					// 'dist/css/bootstrap-extended',
					// 'dist/css/themes/bordered-layout',
					// 'plugins/plugins/charts/chart-apex',
					// 'dist/css/forms/select/select2.min',
					// 'dist/css/bootstrap',
					// 'dist/css/colors',
					// 'dist/css/components',
					// 'dist/css/core/menu/menu-types/vertical-menu',
					// 'dist/css/plugins/forms/form-validation',
					// 'dist/css/plugins/forms/form-wizard',
					// 'dist/css/custom',
					// 'dist/css/style',
					// 'dist/css/plugins/forms/wizard/form-wizard',
					// 'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					// 'plugins/datatables-net/css/jquery.dataTables.min',
					// 'plugins/datatables-net/css/responsive.dataTables.min',

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
					'plugins/vendors/css/charts/apexcharts',
					'plugins/vendors/css/charts/vendors.min',
					'plugins/plugins/charts/chart-apex',

				)
			);

			$this->_view->setJs_Specific(
				array(

					// 'plugins/vendors/js/vendors.min',
					// 'plugins/vendors/js/forms/wizard/bs-stepper.min',
					// 'plugins/vendors/js/charts/apexcharts',
					// 'plugins/vendors/js/charts/chart.min',
					// 'plugins/vendors/js/charts/apexcharts.min',
					// 'plugins/vendors/js/extensions/toastr.min',
					// 'plugins/vendors/js/extensions/moment.min',
					// 'plugins/vendors/js/forms/select/select2.full.min',
					// 'plugins/vendors/js/forms/validation/jquery.validate.min',
					// 'dist/js/core/app-menu',
					// 'dist/js/core/app',
					// 'dist/js/scripts/forms/form-wizard',
					// 'plugins/datatables-net/js/jquery.dataTables.min',
					// 'plugins/datatables-net/js/dataTables.responsive.min',
					// 'plugins/vendors/js/extensions/sweetalert2.all.min',
					// 'dist/js/scripts/forms/form-input-mask',
					// 'plugins/vendors/js/forms/cleave/cleave.min',
					// 'dist/js/scripts/forms/form-wizard',
					// 'dist/js/scripts/progressbar/progressbar',
					// 'dist/js/scripts/progressbar/progressbar.min',

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

					'plugins/vendors/js/charts/apexcharts',
					'plugins/vendors/js/charts/chart.min',
					'plugins/vendors/js/charts/apexcharts.min',


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


			$coti = array(
				'post' =>		0,
				'nu_correla' =>		'1000000001',
				'v_nombre_file' =>	 	 '',
			);
			

			$result = $soap->ListadoPedidosAprobacion($lst);
			$ListadoPedidosAprobacion = json_decode($result->ListadoPedidosAprobacionResult, true);

			$result = $soap->MostrarPedidoCotizacion($coti);
			$MostrarPedidoCotizacion = json_decode($result->MostrarPedidoCotizacionResult, true);

			$estadopedido = array(
				'post' =>	3,
				'v_usuario' => $_SESSION['dni'],
			);
			$result = $soap->PedidoEstados($estadopedido);
			$PedidoEstado = json_decode($result->PedidoEstadosResult, true);


			$this->_view->ListadoPedidosAprobacion = $ListadoPedidosAprobacion;
			$this->_view->PedidoEstado = $PedidoEstado;
			$this->_view->MostrarPedidoCotizacion = $MostrarPedidoCotizacion;

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


			$coti = array(
				'post' =>		0,
				'nu_correla' =>		$nu_correla,
				'v_nombre_file' =>	 	 '',
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MostrarTimelinePedido($client);
			$data = json_decode($result->MostrarTimelinePedidoResult, true);
			$f_porcentaje  =  intval($data[0]['f_porcentaje']);

			$result = $soap->ComboProveedor();
			$ComboProveedor = json_decode($result->ComboProveedorResult, true);

			$result = $soap->MostrarPedidoCotizacion($coti);
			$MostrarPedidoCotizacion = json_decode($result->MostrarPedidoCotizacionResult, true);

			$filascotizacion = [];
			$i = 0;
			foreach ($MostrarPedidoCotizacion as $da) {
				$propiedadescoti = array(
					"nu_correla" => ($da['nu_correla']),
					"v_descripcion_file" => $da['v_descripcion_file'],
					"v_icon" => $da['v_icon'],
					"v_color" => $da['v_color'],
					"v_tardwn" => $da['v_tardwn'],
					"v_tardwnname" => $da['v_tardwnname'],
					"v_url" => $da['v_url'],
					"v_nombre_file" => $da['v_nombre_file'],
				);
				$filascotizacion += ["$i" => $propiedadescoti];
				$i++;
			}




			//Combo perfil
			$FilascomboProveedor = "";
			$selcombo = "";
			foreach ($ComboProveedor as $dp) {
				if ($dp['v_vendid'] == $data[0]['v_vendId']) {
					$selcombo = "selected='selected'";
				} else {
					$selcombo = "";
				}
				$FilascomboProveedor .= "<option " . $selcombo . " value=" . $dp['v_vendid'] . ">" . $dp['v_name'] . "</option>";
			}


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
					"v_botones_cotizacion" => $da['v_botones_cotizacion'],
				);
				$filas += ["$i" => $propiedades1];
				$i++;
			}

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					'data' => $filas,
					'f_porcentaje' => $f_porcentaje,
					'FilascomboProveedor' => $FilascomboProveedor,
					'filascotizacion' => $filascotizacion
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}


	public function MostrarPedidoCotizacion() //1
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



			$coti = array(
				'post' =>		0,
				'nu_correla' =>		$nu_correla,
				'v_nombre_file' =>	 	 '',
			);

			$soap = new SoapClient($wsdl, $options);

			$result = $soap->MostrarPedidoCotizacion($coti);
			$MostrarPedidoCotizacion = json_decode($result->MostrarPedidoCotizacionResult, true);

			$filascotizacion = [];
			$i = 0;
			foreach ($MostrarPedidoCotizacion as $da) {
				$propiedadescoti = array(
					"nu_correla" => ($da['nu_correla']),
					"v_descripcion_file" => $da['v_descripcion_file'],
					"v_icon" => $da['v_icon'],
					"v_color" => $da['v_color'],
					"v_tardwn" => $da['v_tardwn'],
					"v_tardwnname" => $da['v_tardwnname'],
					"v_url" => $da['v_url'],
					"v_nombre_file" => $da['v_nombre_file'],
					"v_vendid" => $da['v_vendid'],

				);
				$filascotizacion += ["$i" => $propiedadescoti];
				$i++;
			}

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					'filascotizacion' => $filascotizacion
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function subir_archivos_cotizacion() //2
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
				$v_vendid = $_POST['v_vendid'];
				$i_proveedor_final = $_POST['i_proveedor_final'];

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
					$destino = "public/doc/Cotizacion/" . rtrim(ltrim($nropedido)) . "_" . rtrim(ltrim($fconcat)) . "." . $tipoarchivo[0]["v_archivo"];
					$nomfile =  rtrim(ltrim($nropedido)) . "_" . rtrim(ltrim($fconcat));


					if (copy($_FILES['archivo']['tmp_name'], $destino)) {

						$param1 = array(
							"post" => 0,
							"v_descripcion_file" => $nombrefile,
							"nu_correla" => $nropedido,
							"v_nombre_file" => $nomfile,
							"v_extension" => $tipoarchivo[0]["v_archivo"],
							"v_url" => $destino,
							"v_token" => $_SESSION['v_token'],
							"v_vendid" => $v_vendid,
							"i_proveedor_final" => $i_proveedor_final,
						);

						$result1 = $soap->GuardarPedidoCotizacion($param1);
						$GuardarPedidoCotizacion = json_decode($result1->GuardarPedidoCotizacionResult, true);

						// 0 no se cargo
						// 1 se cargo correctamente
						header('Content-type: application/json; charset=utf-8');
						echo $json->encode(
							array(
								"vicon" 		=> $GuardarPedidoCotizacion[0]['v_icon'],
								"vtitle" 		=> $GuardarPedidoCotizacion[0]['v_title'],
								"vtext" 		=> $GuardarPedidoCotizacion[0]['v_text'],
								"itimer" 		=> $GuardarPedidoCotizacion[0]['i_timer'],
								"icase" 		=> $GuardarPedidoCotizacion[0]['i_case'],
								"vprogressbar" 	=> $GuardarPedidoCotizacion[0]['v_progressbar'],
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


	public function agregar_proveedor_solped() //EN PEDIDO A SOLOMON
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$nropedido = $_POST['nropedido'];
			$v_vendid = $_POST['v_vendid'];


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


			$param1 = array(
				"post" => 1,
				"v_descripcion_file" => '',
				"nu_correla" => $nropedido,
				"v_nombre_file" => '',
				"v_extension" => '',
				"v_url" => '',
				"v_token" => $_SESSION['v_token'],
				"v_vendid" => $v_vendid,
				"i_proveedor_final" => 0,
			);
			$soap = new SoapClient($wsdl, $options);
			$result1 = $soap->GuardarPedidoCotizacion($param1);
			$GuardarPedidoCotizacion = json_decode($result1->GuardarPedidoCotizacionResult, true);


			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $GuardarPedidoCotizacion[0]['v_icon'],
					"vtitle" 		=> $GuardarPedidoCotizacion[0]['v_title'],
					"vtext" 		=> $GuardarPedidoCotizacion[0]['v_text'],
					"itimer" 		=> $GuardarPedidoCotizacion[0]['i_timer'],
					"icase" 		=> $GuardarPedidoCotizacion[0]['i_case'],
					"vprogressbar" 	=> $GuardarPedidoCotizacion[0]['v_progressbar'],
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

	public function ProcesoPedidoSolomon() //EN PEDIDO A SOLOMON
	{
		if (isset($_SESSION['usuario'])) {
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$nu_correla = $_POST['nu_correla'];
			$v_username =  $_SESSION['dni'];
			$v_ruc = $_POST['v_ruc'];

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
				'v_ruc' => $v_ruc,
			);

			$client = array(
				'nu_correla' =>		$nu_correla,
			);

			$soap = new SoapClient($wsdl, $options);
			$result2 = $soap->ProcesarPedidoSolomon($params);
			$ProcesarPedidoSolomon = json_decode($result2->ProcesarPedidoSolomonResult, true);
			if (count($ProcesarPedidoSolomon) > 0) {
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $ProcesarPedidoSolomon[0]['v_icon'],
					"vtitle" 		=> $ProcesarPedidoSolomon[0]['v_title'],
					"vtext" 		=> $ProcesarPedidoSolomon[0]['v_text'],
					"itimer" 		=> $ProcesarPedidoSolomon[0]['i_timer'],
					"icase" 		=> $ProcesarPedidoSolomon[0]['i_case'],
					"vprogressbar" 	=> $ProcesarPedidoSolomon[0]['v_progressbar'],
				)
			);
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
}
