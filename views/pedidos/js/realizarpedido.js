$(function () {
  var fecha = new Date();
  var mes = fecha.getMonth() + 1;
  var dia = fecha.getDate();
  var anio = fecha.getFullYear();
  var output = anio + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
  $('#fecha').val(output);

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var variable1 = urlParams.get('variable1');

  $("#encargadoestado").val('USUARIO');
  document.getElementById("pptoadd").disabled = true;

  $("#tabs").html("");
  $("#tabs").append(
    " <li class= 'nav-item' >\
    <a class='nav-link active' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-home'>\
      <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>\
      <polyline points='9 22 9 12 15 12 15 22'></polyline>\
    </svg> Orden de Compra</a>\
  </li >\
    <li class='nav-item'>\
      <a class='nav-link' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
        <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
      </svg> Orden de Servicio</a>\
    </li>\
    <li class='nav-item'>\
    <a class='nav-link' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='vacio' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
      <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
    </svg> Pedido Procesado</a>\
    </li>\
    ");

  document.getElementById('homeIcon').className += " active";
  document.getElementById("profileIcon-tab").disabled = true;
  document.getElementById("profileIcon-tab").style.color = "red";

  document.getElementById("vacio-tab").disabled = true;
  document.getElementById("vacio-tab").style.color = "red";

  document.getElementById("btnsendpedido").disabled = true;
  document.getElementById("customRadio1").disabled = true;

  document.getElementById('fecharesumen').innerHTML = 'RESUMEN DEL PEDIDO (' + output + ')';
  document.getElementById("nropedido").style.color = "red";
  document.getElementById('nropedido').innerHTML = "NUEVO";
  document.getElementById('resumentotal').innerHTML = "0";

  // creardatatable("#tbproducto");
  creardatatable("#example2");
  creardatatable("#tbarchivo");
  creardatatable("#tbpptopedido");
  creardatatable("#tbarchivox");
  var datosppto = [];
  var codmes = "";
  var nombremes = "";
  var monto = 0;

  //Array general par manejos de datos
  var countaci = 1;
  var datosaci = [];

  document.getElementById('monedaimporte').innerHTML = $('#moneda option:selected').text();

  $("#tipoorden").change(function () {
    var tipoorden = $("#tipoorden").val();
    var xi_tipo = $("#tipoorden").val();
    var post = 2;
    var nu_correla = document.getElementById("nropedido").innerHTML;

    if (nu_correla != 'NUEVO') {
      $.ajax({
        type: 'POST',
        url: '/pedidos/aprobarpedido/ValidacionPedido',
        data: {
          post: post,
          nu_correla: nu_correla,
          xi_tipo: xi_tipo
        },
        success: function (res) {
          if (Number(res.i_valor) == 1) {

            Swal.fire(
              res.v_mensaje,
              '',
              'warning'
            )
            $("#tipoorden").html("");
            $("#tipoorden").append(res.FilasTipo);

            console.log(res.FilasTipo);

            return;
          } else {

            $("#tabs").html("");

            if (Number(tipoorden) == 1) {

              $("#tabs").append(
                " <li class= 'nav-item' >\
                <a class='nav-link active' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-home'>\
                  <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>\
                  <polyline points='9 22 9 12 15 12 15 22'></polyline>\
                </svg> Orden de Compra</a>\
              </li >\
                <li class='nav-item'>\
                  <a class='nav-link' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
                    <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
                  </svg> Orden de Servicio</a>\
                </li>\
                <li class='nav-item'>\
                <a class='nav-link' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='vacio' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
                  <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
                </svg> Procesado</a>\
                </li>\
                ");

              document.getElementById("homeIcon-tab").disabled = false;
              document.getElementById("homeIcon-tab").style.color = "green";

              document.getElementById('profileIcon').className = "";
              document.getElementById('profileIcon').className += "tab-pane";
              document.getElementById('homeIcon').className = "";
              document.getElementById('homeIcon').className += "tab-pane active";

              document.getElementById("profileIcon-tab").disabled = true;
              document.getElementById("profileIcon-tab").style.color = "red";
            } else {

              $("#tabs").append(
                " <li class= 'nav-item' >\
                <a class='nav-link ' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-home'>\
                  <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>\
                  <polyline points='9 22 9 12 15 12 15 22'></polyline>\
                </svg> Orden de Compra</a>\
              </li >\
                <li class='nav-item'>\
                  <a class='nav-link active' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
                    <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
                  </svg> Orden de Servicio</a>\
                </li>\
                <li class='nav-item'>\
                <a class='nav-link' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='vacio' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
                  <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
                </svg> Procesado</a>\
                </li>\
                ");

              document.getElementById('homeIcon').className = "";
              document.getElementById('homeIcon').className += "tab-pane";
              document.getElementById('profileIcon').className = "";
              document.getElementById('profileIcon').className += "tab-pane active";


              document.getElementById("homeIcon-tab").disabled = true;
              document.getElementById("homeIcon-tab").style.color = "red";

              document.getElementById("profileIcon-tab").disabled = false;
              document.getElementById("profileIcon-tab").style.color = "green";
            }
          }
        }
      });
    } else {
      countaci = 1;
      datosaci = [];

      $("#example2").dataTable().fnDestroy();
      $("#tablita-aci").children().remove();


      $("#tabs").html("");
      if (Number(tipoorden) == 1) {

        $("#tabs").append(
          " <li class= 'nav-item' >\
          <a class='nav-link active' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-home'>\
            <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>\
            <polyline points='9 22 9 12 15 12 15 22'></polyline>\
          </svg> Orden de Compra</a>\
        </li >\
          <li class='nav-item'>\
            <a class='nav-link' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
              <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
            </svg> Orden de Servicio</a>\
          </li>\
          <li class='nav-item'>\
          <a class='nav-link' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='vacio' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
            <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
          </svg> Procesado</a>\
          </li>\
          ");

        document.getElementById("homeIcon-tab").disabled = false;
        document.getElementById("homeIcon-tab").style.color = "green";

        document.getElementById('profileIcon').className = "";
        document.getElementById('profileIcon').className += "tab-pane";
        document.getElementById('homeIcon').className = "";
        document.getElementById('homeIcon').className += "tab-pane active";

        document.getElementById("profileIcon-tab").disabled = true;
        document.getElementById("profileIcon-tab").style.color = "red";
      } else {

        $("#tabs").append(
          " <li class= 'nav-item' >\
          <a class='nav-link ' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-home'>\
            <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>\
            <polyline points='9 22 9 12 15 12 15 22'></polyline>\
          </svg> Orden de Compra</a>\
        </li >\
          <li class='nav-item'>\
            <a class='nav-link active' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
              <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
            </svg> Orden de Servicio</a>\
          </li>\
          <li class='nav-item'>\
          <a class='nav-link' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='vacio' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
            <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
          </svg> Procesado</a>\
          </li>\
          ");

        document.getElementById('homeIcon').className = "";
        document.getElementById('homeIcon').className += "tab-pane";
        document.getElementById('profileIcon').className = "";
        document.getElementById('profileIcon').className += "tab-pane active";


        document.getElementById("homeIcon-tab").disabled = true;
        document.getElementById("homeIcon-tab").style.color = "red";

        document.getElementById("profileIcon-tab").disabled = false;
        document.getElementById("profileIcon-tab").style.color = "green";
      }
    }






  });


  //#region                                               (CARGA CON EL NUMERO DE PEDIDO  QUE SE TRAE COMO PARAMETRO)
  if (variable1 != null) {
    var nu_correla = variable1;
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/MostrarPedido',
      data: { nu_correla: nu_correla },
      success: function (res) {
        console.log(res.data);
        countaci = Number(res.i_filas) + 1;
        document.getElementById("pptoadd").disabled = false;
        document.getElementById('nropedido').innerHTML = res.nu_correla;
        document.getElementById("nropedido").style.color = "#42DE0A";
        document.getElementById("idarea").innerHTML = res.v_areid;
        document.getElementById("area").innerHTML = res.v_area;
        $('#fecha').val(res.d_fecha);
        $('#fechaentrega').val(res.d_fechaentrega);
        $('#tipocambio').val(res.f_tipocambio);
        $('#nrophone').val(res.v_numerophone);
        $('#namepedido').val(res.v_nombrepedido);
        $("#encargadoestado").val(res.v_encargado);
        $("#estado").html("");
        $("#estado").append(res.FilasEstado);
        //tutan




        if (Number(res.i_idorden_aprobacion) != 0) {
          document.getElementById("btnguardar").disabled = true;
          document.getElementById("btnsendpedido").disabled = true;
          $('#customRadio1').prop('checked', true);

          $("#tabs").html("");
          $("#tabs").append(
            " <li class= 'nav-item' >\
          <a class='nav-link' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='false'>  </a>\
          </li >\
          <li class='nav-item'>\
            <a class='nav-link' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='false'> </a>\
          </li>\
          <li class='nav-item'>\
          <a class='nav-link active' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='vacio' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
            <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
          </svg> Pedido Procesado</a>\
          </li>\
          ");

          document.getElementById('profileIcon').className = "";
          document.getElementById('profileIcon').className += "tab-pane";

          document.getElementById('homeIcon').className = "";
          document.getElementById('homeIcon').className += "tab-pane";

          document.getElementById('panevacio').className = "";
          document.getElementById('panevacio').className += "tab-pane active";

          document.getElementById("homeIcon-tab").disabled = true;
          document.getElementById("homeIcon-tab").style.color = "red";

          document.getElementById("profileIcon-tab").disabled = true;
          document.getElementById("profileIcon-tab").style.color = "red";

          document.getElementById("vacio-tab").disabled = false;
          document.getElementById("vacio-tab").style.color = "green";


        } else {
          document.getElementById("btnguardar").disabled = false;
          document.getElementById("btnsendpedido").disabled = false;
          $('#customRadio1').prop('checked', false);

          $("#tabs").html("");
          if (Number(res.i_tipo_pedido) == 1) {

            $("#tabs").append(
              " <li class= 'nav-item' >\
            <a class='nav-link active' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-home'>\
              <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>\
              <polyline points='9 22 9 12 15 12 15 22'></polyline>\
            </svg> Orden de Compra</a>\
          </li >\
            <li class='nav-item'>\
              <a class='nav-link' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
                <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
              </svg> Orden de Servicio</a>\
            </li>\
            <li class='nav-item'>\
            <a class='nav-link' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='vacio' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
              <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
            </svg> Procesado</a>\
            </li>\
            ");

            document.getElementById('profileIcon').className = "";
            document.getElementById('profileIcon').className += "tab-pane";

            document.getElementById('panevacio').className = "";
            document.getElementById('panevacio').className += "tab-pane";

            document.getElementById('homeIcon').className = "";
            document.getElementById('homeIcon').className += "tab-pane active";

            document.getElementById("profileIcon-tab").disabled = true;
            document.getElementById("profileIcon-tab").style.color = "red";

            document.getElementById("vacio-tab").disabled = true;
            document.getElementById("vacio-tab").style.color = "red";

            document.getElementById("homeIcon-tab").disabled = false;
            document.getElementById("homeIcon-tab").style.color = "green";

          } else {

            $("#tabs").append(
              " <li class= 'nav-item' >\
            <a class='nav-link ' id='homeIcon-tab' data-toggle='tab' href='#homeIcon' aria-controls='home' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-home'>\
              <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>\
              <polyline points='9 22 9 12 15 12 15 22'></polyline>\
            </svg> Orden de Compra</a>\
          </li >\
            <li class='nav-item'>\
              <a class='nav-link active' id='profileIcon-tab' data-toggle='tab' href='#profileIcon' aria-controls='profile' role='tab' aria-selected='true'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
                <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
              </svg> Orden de Servicio</a>\
            </li>\
            <li class='nav-item'>\
            <a class='nav-link' id='vacio-tab' data-toggle='tab' href='#panevacio' aria-controls='profile' role='tab' aria-selected='false'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'>\
              <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'></path>\
            </svg> Procesado</a>\
            </li>\
            ");

            document.getElementById('homeIcon').className = "";
            document.getElementById('homeIcon').className += "tab-pane";

            document.getElementById('profileIcon').className = "";
            document.getElementById('profileIcon').className += "tab-pane active";

            document.getElementById('panevacio').className = "";
            document.getElementById('panevacio').className += "tab-pane";

            document.getElementById("homeIcon-tab").disabled = true;
            document.getElementById("homeIcon-tab").style.color = "red";

            document.getElementById("vacio-tab").disabled = true;
            document.getElementById("vacio-tab").style.color = "red";


            document.getElementById("profileIcon-tab").disabled = false;
            document.getElementById("profileIcon-tab").style.color = "green";


          }

        }


        $("#moneda").html("");
        $("#moneda").append(res.FilasMoneda);

        $("#tipoorden").html("");
        $("#tipoorden").append(res.FilasTipo);

        $("#cbocondicion").html("");
        $("#cbocondicion").append(res.FilasModo);


        $('#contactoentrega').val(res.v_persona_recepciona);
        $("#iddireccion").html("");
        $("#iddireccion").append(res.FilasDireccion);

        document.getElementById('resumentotal').innerHTML = res.f_importotal;
        document.getElementById('importepresupuesto').innerHTML = res.f_montoppto;

        $('#note').val(res.v_nota);
        $("#example2").dataTable().fnDestroy();
        $("#tablita-aci").children().remove();
        let myArray = [];
        for (const property in res.data) {
          let id = res.data[property].id;
          let item = res.data[property].Item;
          let nombre = res.data[property].Descripcion;
          let v_unidad = res.data[property].v_unidad;
          let qty = res.data[property].Cantidad;
          let price = res.data[property].Precio;
          let importe = res.data[property].Total;
          let v_disabled = res.data[property].v_disabled;
          let v_note_detalle = res.data[property].v_note_detalle;
          let v_id_local = res.data[property].v_id_local;
          let i_opcion = res.data[property].i_opcion;
          let v_centrocosto = res.data[property].v_centrocosto;
          let v_cuenta = res.data[property].v_cuenta;
          let v_intercode = res.data[property].v_intercode;

          let fila =
            "<tr><td class='text-center'>" +
            id +
            "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(66,222,10)'></span>" +

            "</td><td class='text-left'>" +
            item +
            "</td><td class='text-left'>" +
            nombre +
            "</td><td class='text-left'>" +
            v_id_local +
            "</td><td class='text-left'>" +
            v_centrocosto +
            "</td><td class='text-left'>" +
            v_cuenta +
            "</td><td class='text-left'>" +
            v_unidad +
            "</td><td class='text-left'>" +
            qty +
            "</td><td class='text-left'>" +
            price +
            "</td><td class='text-left'>" +
            importe +
            "</td><td><a id=" +
            item +
            " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
            "</td><td><a id=" +
            id +
            " class='btn btn-danger btn-sm text-white delete " + v_disabled + "'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-aci").appendChild(btn);
          myArray.push({ id: parseInt(id), Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
        }
        creardatatable("#example2");
        datosaci.splice(0, datosaci.length);
        datosaci = myArray;
        console.log(datosaci);
        document.getElementById('monedaimporte').innerHTML = $('#moneda option:selected').text();
      }
    });
  }
  //#endregion

  //#region                                               (OPCION DE PRODUCTOS)
  // $("#tbproducto tbody").on("click", "a.agregar", function () {
  //   var chekcontrol = document.getElementById("customRadio1").checked;
  //   if (chekcontrol == false) {
  //     $("#descripcion").html("");
  //     $("#unidad").html("");
  //     document.getElementById("cantidad").value = null;
  //     document.getElementById("precio").value = null;
  //     document.getElementById("importe").value = null;
  //     var v_invtid = $(this).attr("id");

  //     var btrue = new Boolean(false);
  //     $('#example2 tr').each(function () {
  //       var codprod = $(this).find("td").eq(2).html();
  //       if (codprod == v_invtid) {
  //         btrue = true
  //       }
  //     });

  //     if ((btrue == true)) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "YA AGREGO ESTE PRODUCTO" + '  ' + '(' + v_invtid + ')',
  //         text: "Para volver a añadir quitar del detalle!",
  //         timer: 4000,
  //         timerProgressBar: true,
  //       })
  //       return;
  //     }

  //     $.ajax({
  //       type: 'POST',
  //       url: '/pedidos/pedidos/buscar_producto',
  //       data: { v_invtid: v_invtid },

  //       beforeSend: function () {
  //         $("#losdatoproductos").html("");
  //         $("#losdatoproductos").append(
  //           "<div id='div-01'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
  //         );
  //       },

  //       success: function (res) {
  //         $('#unidad').val(res.v_undmedida);
  //         $("#descripcion").html(v_invtid + "-" + (res.v_nombreproducto));
  //         document.getElementById("codproducto").value = v_invtid
  //         document.getElementById("nombreproduco").value = (res.v_nombreproducto);

  //         $("#xlocal").html("");
  //         $("#xlocal").append(res.FilascomboLocal);
  //         $("#losdatoproductos").html("");
  //       }
  //     });

  //     $("#myModal").modal("show");
  //     $('#myModal').on('shown.bs.modal', function () {
  //       $("#cantidad").focus();
  //     });


  //   } else {
  //     Swal.fire({
  //       title: "PEDIDO YA FUE ENVIADO PARA SU APROBACION",
  //       timer: 2400,
  //       showClass: {
  //         popup: 'animate__animated animate__fadeInDown'
  //       },
  //       hideClass: {
  //         popup: 'animate__animated animate__fadeOutUp'
  //       }
  //     })
  //     return;
  //   }
  // });

  $("#cboproducto").change(function () {
    var chekcontrol = document.getElementById("customRadio1").checked;
    if (chekcontrol == false) {
      $("#descripcion").html("");
      $("#unidad").html("");
      document.getElementById("cantidad").value = null;
      document.getElementById("precio").value = null;
      document.getElementById("importe").value = null;

      var v_invtid = $("#cboproducto").val();
      let v_id_local = $('#xlocal  option:selected').val();
      let v_centrocosto = $('#xidcentrocosto  option:selected').val();


      $.ajax({
        type: 'POST',
        url: '/pedidos/pedidos/buscar_producto',
        data: { v_invtid: v_invtid },


        beforeSend: function () {
          $("#losdatoproductos").html("");
          $("#losdatoproductos").append(
            "<div id='div-01'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
          );
        },

        success: function (res) {
          $("#losdatoproductos").html("");
          $('#unidad').val(res.v_undmedida);
          // $("#descripcion").html(v_invtid + "-" + (res.v_nombreproducto));
          document.getElementById("codproducto").value = v_invtid
          document.getElementById("nombreproduco").value = (res.v_nombreproducto);
          $("#cantidad").focus();
        }
      });



    } else {
      Swal.fire({
        title: "PEDIDO YA FUE ENVIADO PARA SU APROBACION",
        timer: 2400,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }


  });

  $("#cantidad").change(function () {
    var cantidad = $('#cantidad').val();
    var Precio = $('#precio').val();
    var total = (cantidad * Precio);
    $('#importe').val('');
    $('#importe').val(parseFloat(parseFloat(total).toFixed(3)));
  });

  $("#precio").change(function () {
    var cantidad = $('#cantidad').val();
    var Precio = $('#precio').val();
    var total = (cantidad * Precio);
    $('#importe').val('');
    $('#importe').val(parseFloat(parseFloat(total).toFixed(3)));
  });

  $("#xidcentrocosto").change(function () {
    let v_sub = $('#xidcentrocosto  option:selected').val();

    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/consulta_cuenta',
      data: { v_sub: v_sub },
      beforeSend: function () {
        $("#losdatoproductos").html("");
        $("#losdatoproductos").append(
          "<div id='div-01'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-success' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {

        console.log(res.FilasCuenta);
        $("#losdatoproductos").html("");
        $("#xacctcontable").html("");
        $("#xacctcontable").append(res.FilasCuenta);

      }
    });

  });

  $("#insertar").on("click", function () {    //Insertar en la tabla detalle del pedido
    $('#resumentotal').val('');
    let item = document.getElementById("codproducto").value;
    let nombre = document.getElementById("nombreproduco").value;
    let qty = $("#cantidad").val();
    let price = $("#precio").val();
    let importe = $("#importe").val();
    let v_unidad = $("#unidad").val();
    let v_id_local = $('#xlocal  option:selected').val();
    let v_centrocosto = $('#xidcentrocosto  option:selected').val();
    let v_cuenta = $('#xacctcontable  option:selected').val();
    let v_note_detalle = 'NO';
    let i_opcion = 1;

    var v_invtid = document.getElementById("codproducto").value;

    if ((qty == 0)) {
      $("#cantidad").focus();
      Swal.fire({
        icon: "warning",
        title: "INGRESAR CANTIDAD",
        text: "",
        timer: 2400,
        timerProgressBar: true,
      })
      return;
    }

    if ((price == 0)) {
      $("#precio").focus();
      Swal.fire({
        icon: "warning",
        title: "INGRESAR PRECIO",
        text: "",
        timer: 2400,
        timerProgressBar: true,
      })
      return;
    }

    if ((v_id_local == null || v_id_local == 'XXXXXXX')) {
      $("#xlocal").focus();
      Swal.fire({
        title: 'SELECCIONAR ALMACEN',
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if ((v_centrocosto == null || v_centrocosto == 'XXXXXXXXXX')) {
      $("#xidcentrocosto").focus();
      Swal.fire({
        title: 'SELECCIONAR CENTRO DE COSTO',
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if ((v_cuenta == null)) {
      $("#xacctcontable").focus();
      Swal.fire({
        title: 'NO EXISTE CUENTA, PARA EL CENTRO DE COSTO',
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if ((v_invtid == null || v_invtid == '')) {
      $("#cboproducto").focus();
      Swal.fire({
        title: 'SELECCIONAR PRODUCTO',
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    var btrue = new Boolean(false);
    $('#example2 tr').each(function () {
      var codprod = $(this).find("td").eq(2).html();
      var local = $(this).find("td").eq(4).html();
      var centrocosto = $(this).find("td").eq(5).html();

      if (codprod == v_invtid && local == v_id_local && centrocosto == v_centrocosto) {
        btrue = true
      }
    });

    if ((btrue == true)) {
      Swal.fire({
        icon: "error",
        title: "YA AGREGO ESTE PRODUCTO " + '  ' + '(' + v_invtid + ') CON EL CENTRO DE COSTO ' + '(' + v_centrocosto + ') PARA EL ALMACEN DE' + '(' + v_id_local + ')',
        text: "Para volver a añadir quitar del detalle!",
        timer: 7000,
        timerProgressBar: true,
      })
      return;
    }

    $("#example2").dataTable().fnDestroy();
    // $("#tablita-aci").children().remove();
    let fila =
      "<tr><td class='text-center'>" +
      countaci +
      "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(3,164,90)'></span>" +
      "</td><td class='text-left'>" +
      item +
      "</td><td class='text-left'>" +
      nombre +
      "</td><td class='text-left'>" +
      v_id_local +
      "</td><td class='text-left'>" +
      v_centrocosto +
      "</td><td class='text-left'>" +
      v_cuenta +
      "</td><td class='text-left'>" +
      v_unidad +
      "</td><td class='text-left'>" +
      qty +
      "</td><td class='text-left'>" +
      price +
      "</td><td class='text-left'>" +
      importe +
      "</td><td><a id=" +
      item +
      " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
      "</td><td><a id=" +
      countaci +
      " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-aci").appendChild(btn);
    datosaci.push({ id: countaci, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
    console.log(datosaci);
    countaci = countaci + 1;
    creardatatable("#example2");



    $("#myModal").modal('hide');
    //CALCULAR
    var resumentotal = 0;

    $('#example2 tr').each(function () {
      var total = $(this).find("td").eq(10).html();
      if ((parseFloat(total)) > 0) {
        resumentotal = (parseFloat(resumentotal) + parseFloat(total));
      }
    });

    document.getElementById('resumentotal').innerHTML = resumentotal;

  });
  //#endregion

  //#region                                               (OPCION 2 DESCRIPCION OPCIONAL)  
  $("#cantidaditem").change(function () {
    var cantidaditem = $('#cantidaditem').val();
    var precioitem = $('#precioitem').val();
    var total = (cantidaditem * precioitem);
    $('#totalitem').val('');
    $('#totalitem').val(parseFloat(parseFloat(total).toFixed(3)));
  });

  $("#precioitem").change(function () {
    var cantidaditem = $('#cantidaditem').val();
    var precioitem = $('#precioitem').val();
    var total = (cantidaditem * precioitem);
    $('#totalitem').val('');
    $('#totalitem').val(parseFloat(parseFloat(total).toFixed(3)));
  });


  $("#xidcentrocostoitem").change(function () {
    let v_sub = $('#xidcentrocostoitem  option:selected').val();
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/consulta_cuenta',
      data: { v_sub: v_sub },
      beforeSend: function () {
        $("#losdatoproductos").html("");
        $("#losdatoproductos").append(
          "<div id='div-01'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-success' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        console.log(res.FilasCuenta);
        $("#losdatoproductos").html("");
        $("#xacctcontableitem").html("");
        $("#xacctcontableitem").append(res.FilasCuenta);

      }
    });
  });

  $("#additem").on("click", function () {
    var chekcontrol = document.getElementById("customRadio1").checked;
    if (chekcontrol == false) {

      $('#resumentotal').val('');
      let item = countaci.toString()
      let nombre = document.getElementById("descripcionitem").value;
      let qty = $("#cantidaditem").val();
      let price = $("#precioitem").val();
      let importe = $("#totalitem").val();
      let v_unidad = $("#unidaditem").val();
      let v_id_local = $('#x2local  option:selected').val();
      let v_centrocosto = $('#xidcentrocostoitem  option:selected').val();
      let v_cuenta = $('#xacctcontableitem  option:selected').val();

      let v_note_detalle = 'NO';
      let i_opcion = 2;

      if ((nombre == "" || nombre == null)) {
        $("#descripcionitem").focus();
        Swal.fire({
          title: "INGRESAR DESCRIPCION",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        return;
      }

      if ((qty == 0)) {
        $("#cantidaditem").focus();
        Swal.fire({
          icon: "warning",
          title: "INGRESAR CANTIDAD",
          text: "",
          timer: 2400,
          timerProgressBar: true,
        })
        return;
      }

      if ((price == 0)) {
        $("#precioitem").focus();
        Swal.fire({
          icon: "warning",
          title: "INGRESAR PRECIO",
          text: "",
          timer: 2400,
          timerProgressBar: true,
        })
        return;
      }

      if ((unidad == "XXX" || unidad == null)) {
        $("#unidaditem").focus();
        Swal.fire({
          title: "SELECCIONAR UNIDAD",
          timer: 2400,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        return;
      }

      if ((v_id_local == null || v_id_local == 'XXXXXXX')) {
        $("#x2local").focus();
        Swal.fire({
          title: 'SELECCIONAR ALMACEN',
          timer: 3000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        return;
      }

      if ((v_centrocosto == null || v_centrocosto == 'XXXXXXXXXX')) {
        $("#xidcentrocostoitem").focus();
        Swal.fire({
          title: 'SELECCIONAR CENTRO DE COSTO',
          timer: 3000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        return;
      }


      if ((v_cuenta == null)) {
        $("#xacctcontableitem").focus();
        Swal.fire({
          title: 'NO EXISTE CUENTA, PARA EL CENTRO DE COSTO',
          timer: 3000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        return;
      }

      var btrue = new Boolean(false);
      $('#example2 tr').each(function () {
        var local = $(this).find("td").eq(4).html();
        var centrocosto = $(this).find("td").eq(5).html();

        if (local == v_id_local && centrocosto == v_centrocosto) {
          btrue = true
        }
      });

      if ((btrue == true)) {
        Swal.fire({
          icon: "error",
          title: 'YA AGREGO ESTE CENTRO DE COSTO ' + '(' + v_centrocosto + ') PARA EL ALMACEN DE' + '(' + v_id_local + ')',
          text: "Para volver a añadir quitar del detalle!",
          timer: 7000,
          timerProgressBar: true,
        })
        return;
      }


      $("#example2").dataTable().fnDestroy();
      // $("#tablita-aci").children().remove();
      let fila =
        "<tr><td class='text-center'>" +
        countaci +
        "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(3,164,90)'></span>" +
        "</td><td class='text-left'>" +
        item +
        "</td><td class='text-left'>" +
        nombre +
        "</td><td class='text-left'>" +
        v_id_local +
        "</td><td class='text-left'>" +
        v_centrocosto +
        "</td><td class='text-left'>" +
        v_cuenta +
        "</td><td class='text-left'>" +
        v_unidad +
        "</td><td class='text-left'>" +
        qty +
        "</td><td class='text-left'>" +
        price +
        "</td><td class='text-left'>" +
        importe +
        "</td><td><a id=" +
        item +
        " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
        "</td><td><a id=" +
        countaci +
        " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-aci").appendChild(btn);
      datosaci.push({ id: countaci, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
      console.log(datosaci);
      countaci = countaci + 1;
      creardatatable("#example2");

      var resumentotal = 0;

      $('#example2 tr').each(function () {
        var total = $(this).find("td").eq(10).html();
        if ((parseFloat(total)) > 0) {
          resumentotal = (parseFloat(resumentotal) + parseFloat(total));
        }
      });

      document.getElementById('resumentotal').innerHTML = resumentotal;
      document.getElementById("descripcionitem").value = null;
      document.getElementById("precioitem").value = null;
      document.getElementById("cantidaditem").value = null;
      document.getElementById("totalitem").value = null;


      $("#descripcionitem").focus();
    } else {
      Swal.fire({
        title: "PEDIDO YA FUE ENVIADO PARA SU APROBACION",
        timer: 2400,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }




  });

  //#endregion

  //#region                                               (ACCIONES EN LA TABLA DETALLE DEL PEDIDO)
  $("#example2 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");

    var post = 0;
    var nu_correla = document.getElementById("nropedido").innerHTML;
    let i_item = parseInt(id);

    if (nu_correla != "NUEVO") {
      $.ajax({
        type: "POST",
        url: '/pedidos/pedidos/eliminar_fila',
        data: { post: post, nu_correla: nu_correla, i_item: i_item },
        beforeSend: function () {
          $("#losdelete").html("");
          $("#losdelete").append(
            "<div id='div-01'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
          );
        },

        success: function (res) {
          $("#losdelete").html("");
          if (res.v_mensaje == '' && Number(res.respuesta) == 1) {

            let valor = parseInt(id);
            $('#resumentotal').val('');
            $("#example2").dataTable().fnDestroy();
            $("#tablita-aci").children().remove();

            let index = datosaci.findIndex(object => object.id === valor);
            datosaci.splice(index, 1);

            let myArray = [];
            let contador = 1;
            let v_color = '';
            for (const property in datosaci) {
              let item = datosaci[property].Item;
              let nombre = datosaci[property].Descripcion;
              let v_unidad = datosaci[property].Unidad;
              let qty = datosaci[property].Cantidad;
              let price = datosaci[property].Precio;
              let importe = datosaci[property].Total;
              let v_note_detalle = datosaci[property].v_note_detalle;
              let v_id_local = datosaci[property].v_id_local;
              let i_opcion = datosaci[property].i_opcion;
              let v_centrocosto = datosaci[property].v_centrocosto;
              let v_cuenta = datosaci[property].v_cuenta;


              if (Number(i_opcion) == 2) {
                item = Number(contador);
              }

              if (v_note_detalle == 'SI') {
                v_color = 'color:rgb(66,222,10)';
              } else {
                v_color = 'color:rgb(3,164,90)';
              }

              let fila =
                "<tr><td class='text-center'>" +
                contador +
                "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

                "</td><td class='text-left'>" +
                item +
                "</td><td class='text-left'>" +
                nombre +
                "</td><td class='text-left'>" +
                v_id_local +
                "</td><td class='text-left'>" +
                v_centrocosto +
                "</td><td class='text-left'>" +
                v_cuenta +
                "</td><td class='text-left'>" +
                v_unidad +
                "</td><td class='text-left'>" +
                qty +
                "</td><td class='text-left'>" +
                price +
                "</td><td class='text-left'>" +
                importe +
                "</td><td><a id=" +
                item +
                " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
                "</td><td><a id=" +
                contador +
                " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
              let btn = document.createElement("tr");
              btn.innerHTML = fila;
              document.getElementById("tablita-aci").appendChild(btn);
              myArray.push({ id: parseInt(contador), Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
              contador = contador + 1;

              //CALCULAR
              var resumentotal = 0;
              $('#example2 tr').each(function () {
                var total = $(this).find("td").eq(10).html();
                if ((parseFloat(total)) > 0) {
                  resumentotal = (parseFloat(resumentotal) + parseFloat(total));
                }
              });
              document.getElementById('resumentotal').innerHTML = resumentotal;
            }
            creardatatable("#example2");
            datosaci.splice(0, datosaci.length);
            datosaci = myArray;
            countaci = contador;
            console.log(datosaci);
          } else if (res.v_mensaje != '' && Number(res.respuesta) == 2) {
            Swal.fire(
              res.v_mensaje,
              '',
              'warning'
            )
            return

          } else {
            let valor = parseInt(id);
            $('#resumentotal').val('');
            $("#example2").dataTable().fnDestroy();
            $("#tablita-aci").children().remove();

            let index = datosaci.findIndex(object => object.id === valor);
            datosaci.splice(index, 1);

            let myArray = [];
            let contador = 1;
            let v_color = '';
            for (const property in datosaci) {
              let item = datosaci[property].Item;
              let nombre = datosaci[property].Descripcion;
              let v_unidad = datosaci[property].Unidad;
              let qty = datosaci[property].Cantidad;
              let price = datosaci[property].Precio;
              let importe = datosaci[property].Total;
              let v_note_detalle = datosaci[property].v_note_detalle;
              let v_id_local = datosaci[property].v_id_local;
              let i_opcion = datosaci[property].i_opcion;
              let v_centrocosto = datosaci[property].v_centrocosto;
              let v_cuenta = datosaci[property].v_cuenta;


              if (Number(i_opcion) == 2) {
                item = Number(contador);
              }

              if (v_note_detalle == 'SI') {
                v_color = 'color:rgb(66,222,10)';
              } else {
                v_color = 'color:rgb(3,164,90)';
              }

              let fila =
                "<tr><td class='text-center'>" +
                contador +
                "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

                "</td><td class='text-left'>" +
                item +
                "</td><td class='text-left'>" +
                nombre +
                "</td><td class='text-left'>" +
                v_id_local +
                "</td><td class='text-left'>" +
                v_centrocosto +
                "</td><td class='text-left'>" +
                v_cuenta +
                "</td><td class='text-left'>" +
                v_unidad +
                "</td><td class='text-left'>" +
                qty +
                "</td><td class='text-left'>" +
                price +
                "</td><td class='text-left'>" +
                importe +
                "</td><td><a id=" +
                item +
                " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
                "</td><td><a id=" +
                contador +
                " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
              let btn = document.createElement("tr");
              btn.innerHTML = fila;
              document.getElementById("tablita-aci").appendChild(btn);
              myArray.push({ id: parseInt(contador), Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
              contador = contador + 1;

              //CALCULAR
              var resumentotal = 0;
              $('#example2 tr').each(function () {
                var total = $(this).find("td").eq(10).html();
                if ((parseFloat(total)) > 0) {
                  resumentotal = (parseFloat(resumentotal) + parseFloat(total));
                }
              });
              document.getElementById('resumentotal').innerHTML = resumentotal;
            }
            creardatatable("#example2");
            datosaci.splice(0, datosaci.length);
            datosaci = myArray;
            countaci = contador;
            console.log(datosaci);
          }
        },
      });

    } else {
      let valor = parseInt(id);
      $('#resumentotal').val('');
      $("#example2").dataTable().fnDestroy();
      $("#tablita-aci").children().remove();

      let index = datosaci.findIndex(object => object.id === valor);
      datosaci.splice(index, 1);

      let myArray = [];
      let contador = 1;
      let v_color = '';
      for (const property in datosaci) {
        let item = datosaci[property].Item;
        let nombre = datosaci[property].Descripcion;
        let v_unidad = datosaci[property].Unidad;
        let qty = datosaci[property].Cantidad;
        let price = datosaci[property].Precio;
        let importe = datosaci[property].Total;
        let v_note_detalle = datosaci[property].v_note_detalle;
        let v_id_local = datosaci[property].v_id_local;
        let i_opcion = datosaci[property].i_opcion;
        let v_centrocosto = datosaci[property].v_centrocosto;
        let v_cuenta = datosaci[property].v_cuenta;


        if (Number(i_opcion) == 2) {
          item = Number(contador);
        }

        if (v_note_detalle == 'SI') {
          v_color = 'color:rgb(66,222,10)';
        } else {
          v_color = 'color:rgb(3,164,90)';
        }

        let fila =
          "<tr><td class='text-center'>" +
          contador +
          "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

          "</td><td class='text-left'>" +
          item +
          "</td><td class='text-left'>" +
          nombre +
          "</td><td class='text-left'>" +
          v_id_local +
          "</td><td class='text-left'>" +
          v_centrocosto +
          "</td><td class='text-left'>" +
          v_cuenta +
          "</td><td class='text-left'>" +
          v_unidad +
          "</td><td class='text-left'>" +
          qty +
          "</td><td class='text-left'>" +
          price +
          "</td><td class='text-left'>" +
          importe +
          "</td><td><a id=" +
          item +
          " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
          "</td><td><a id=" +
          contador +
          " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
        let btn = document.createElement("tr");
        btn.innerHTML = fila;
        document.getElementById("tablita-aci").appendChild(btn);
        myArray.push({ id: contador, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
        contador = contador + 1;

        //CALCULAR
        var resumentotal = 0;
        $('#example2 tr').each(function () {
          var total = $(this).find("td").eq(10).html();
          if ((parseFloat(total)) > 0) {
            resumentotal = (parseFloat(resumentotal) + parseFloat(total));
          }
        });
        document.getElementById('resumentotal').innerHTML = resumentotal;
      }
      creardatatable("#example2");
      datosaci.splice(0, datosaci.length);
      datosaci = myArray;
      countaci = contador;
      console.log(datosaci);
    }

    // Swal.fire({
    //   title: "ESTAS SEGURO DE ELIMINAR LA FILA ?",
    //   text: "",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#61C250",
    //   cancelButtonColor: "#ea5455",
    //   confirmButtonText: "Si, Eliminar!",
    //   cancelButtonText: "No",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     var post = 0;
    //     var nu_correla = document.getElementById("nropedido").innerHTML;
    //     let i_item = parseInt(id);

    //     if (nu_correla != "NUEVO") {
    //       $.ajax({
    //         type: "POST",
    //         url: '/pedidos/pedidos/eliminar_fila',
    //         data: { post: post, nu_correla: nu_correla, i_item: i_item },
    //         success: function (res) {
    //           if (res.v_mensaje == '' && Number(res.respuesta) == 1) {

    //             let valor = parseInt(id);
    //             $('#resumentotal').val('');
    //             $("#example2").dataTable().fnDestroy();
    //             $("#tablita-aci").children().remove();

    //             let index = datosaci.findIndex(object => object.id === valor);
    //             datosaci.splice(index, 1);

    //             let myArray = [];
    //             let contador = 1;
    //             let v_color = '';
    //             for (const property in datosaci) {
    //               let item = datosaci[property].Item;
    //               let nombre = datosaci[property].Descripcion;
    //               let v_unidad = datosaci[property].Unidad;
    //               let qty = datosaci[property].Cantidad;
    //               let price = datosaci[property].Precio;
    //               let importe = datosaci[property].Total;
    //               let v_note_detalle = datosaci[property].v_note_detalle;
    //               let v_id_local = datosaci[property].v_id_local;
    //               let i_opcion = datosaci[property].i_opcion;
    //               let v_centrocosto = datosaci[property].v_centrocosto;
    //               let v_cuenta = datosaci[property].v_cuenta;


    //               if (Number(i_opcion) == 2) {
    //                 item = Number(contador);
    //               }

    //               if (v_note_detalle == 'SI') {
    //                 v_color = 'color:rgb(66,222,10)';
    //               } else {
    //                 v_color = 'color:rgb(3,164,90)';
    //               }

    //               let fila =
    //                 "<tr><td class='text-center'>" +
    //                 contador +
    //                 "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

    //                 "</td><td class='text-left'>" +
    //                 item +
    //                 "</td><td class='text-left'>" +
    //                 nombre +
    //                 "</td><td class='text-left'>" +
    //                 v_id_local +
    //                 "</td><td class='text-left'>" +
    //                 v_centrocosto +
    //                 "</td><td class='text-left'>" +
    //                 v_cuenta +
    //                 "</td><td class='text-left'>" +
    //                 v_unidad +
    //                 "</td><td class='text-left'>" +
    //                 qty +
    //                 "</td><td class='text-left'>" +
    //                 price +
    //                 "</td><td class='text-left'>" +
    //                 importe +
    //                 "</td><td><a id=" +
    //                 item +
    //                 " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
    //                 "</td><td><a id=" +
    //                 contador +
    //                 " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
    //               let btn = document.createElement("tr");
    //               btn.innerHTML = fila;
    //               document.getElementById("tablita-aci").appendChild(btn);
    //               myArray.push({ id: parseInt(contador), Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
    //               contador = contador + 1;

    //               //CALCULAR
    //               var resumentotal = 0;
    //               $('#example2 tr').each(function () {
    //                 var total = $(this).find("td").eq(10).html();
    //                 if ((parseFloat(total)) > 0) {
    //                   resumentotal = (parseFloat(resumentotal) + parseFloat(total));
    //                 }
    //               });
    //               document.getElementById('resumentotal').innerHTML = resumentotal;
    //             }
    //             creardatatable("#example2");
    //             datosaci.splice(0, datosaci.length);
    //             datosaci = myArray;
    //             countaci = contador;
    //             console.log(datosaci);
    //           } else if (res.v_mensaje != '' && Number(res.respuesta) == 2) {
    //             Swal.fire(
    //               res.v_mensaje,
    //               '',
    //               'warning'
    //             )
    //             return

    //           } else {
    //             let valor = parseInt(id);
    //             $('#resumentotal').val('');
    //             $("#example2").dataTable().fnDestroy();
    //             $("#tablita-aci").children().remove();

    //             let index = datosaci.findIndex(object => object.id === valor);
    //             datosaci.splice(index, 1);

    //             let myArray = [];
    //             let contador = 1;
    //             let v_color = '';
    //             for (const property in datosaci) {
    //               let item = datosaci[property].Item;
    //               let nombre = datosaci[property].Descripcion;
    //               let v_unidad = datosaci[property].Unidad;
    //               let qty = datosaci[property].Cantidad;
    //               let price = datosaci[property].Precio;
    //               let importe = datosaci[property].Total;
    //               let v_note_detalle = datosaci[property].v_note_detalle;
    //               let v_id_local = datosaci[property].v_id_local;
    //               let i_opcion = datosaci[property].i_opcion;
    //               let v_centrocosto = datosaci[property].v_centrocosto;
    //               let v_cuenta = datosaci[property].v_cuenta;


    //               if (Number(i_opcion) == 2) {
    //                 item = Number(contador);
    //               }

    //               if (v_note_detalle == 'SI') {
    //                 v_color = 'color:rgb(66,222,10)';
    //               } else {
    //                 v_color = 'color:rgb(3,164,90)';
    //               }

    //               let fila =
    //                 "<tr><td class='text-center'>" +
    //                 contador +
    //                 "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

    //                 "</td><td class='text-left'>" +
    //                 item +
    //                 "</td><td class='text-left'>" +
    //                 nombre +
    //                 "</td><td class='text-left'>" +
    //                 v_id_local +
    //                 "</td><td class='text-left'>" +
    //                 v_centrocosto +
    //                 "</td><td class='text-left'>" +
    //                 v_cuenta +
    //                 "</td><td class='text-left'>" +
    //                 v_unidad +
    //                 "</td><td class='text-left'>" +
    //                 qty +
    //                 "</td><td class='text-left'>" +
    //                 price +
    //                 "</td><td class='text-left'>" +
    //                 importe +
    //                 "</td><td><a id=" +
    //                 item +
    //                 " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
    //                 "</td><td><a id=" +
    //                 contador +
    //                 " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
    //               let btn = document.createElement("tr");
    //               btn.innerHTML = fila;
    //               document.getElementById("tablita-aci").appendChild(btn);
    //               myArray.push({ id: parseInt(contador), Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
    //               contador = contador + 1;

    //               //CALCULAR
    //               var resumentotal = 0;
    //               $('#example2 tr').each(function () {
    //                 var total = $(this).find("td").eq(10).html();
    //                 if ((parseFloat(total)) > 0) {
    //                   resumentotal = (parseFloat(resumentotal) + parseFloat(total));
    //                 }
    //               });
    //               document.getElementById('resumentotal').innerHTML = resumentotal;
    //             }
    //             creardatatable("#example2");
    //             datosaci.splice(0, datosaci.length);
    //             datosaci = myArray;
    //             countaci = contador;
    //             console.log(datosaci);
    //           }
    //         },
    //       });


    //     } else {
    //       let valor = parseInt(id);
    //       $('#resumentotal').val('');
    //       $("#example2").dataTable().fnDestroy();
    //       $("#tablita-aci").children().remove();

    //       let index = datosaci.findIndex(object => object.id === valor);
    //       datosaci.splice(index, 1);

    //       let myArray = [];
    //       let contador = 1;
    //       let v_color = '';
    //       for (const property in datosaci) {
    //         let item = datosaci[property].Item;
    //         let nombre = datosaci[property].Descripcion;
    //         let v_unidad = datosaci[property].Unidad;
    //         let qty = datosaci[property].Cantidad;
    //         let price = datosaci[property].Precio;
    //         let importe = datosaci[property].Total;
    //         let v_note_detalle = datosaci[property].v_note_detalle;
    //         let v_id_local = datosaci[property].v_id_local;
    //         let i_opcion = datosaci[property].i_opcion;
    //         let v_centrocosto = datosaci[property].v_centrocosto;
    //         let v_cuenta = datosaci[property].v_cuenta;


    //         if (Number(i_opcion) == 2) {
    //           item = Number(contador);
    //         }

    //         if (v_note_detalle == 'SI') {
    //           v_color = 'color:rgb(66,222,10)';
    //         } else {
    //           v_color = 'color:rgb(3,164,90)';
    //         }

    //         let fila =
    //           "<tr><td class='text-center'>" +
    //           contador +
    //           "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

    //           "</td><td class='text-left'>" +
    //           item +
    //           "</td><td class='text-left'>" +
    //           nombre +
    //           "</td><td class='text-left'>" +
    //           v_id_local +
    //           "</td><td class='text-left'>" +
    //           v_centrocosto +
    //           "</td><td class='text-left'>" +
    //           v_cuenta +
    //           "</td><td class='text-left'>" +
    //           v_unidad +
    //           "</td><td class='text-left'>" +
    //           qty +
    //           "</td><td class='text-left'>" +
    //           price +
    //           "</td><td class='text-left'>" +
    //           importe +
    //           "</td><td><a id=" +
    //           item +
    //           " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
    //           "</td><td><a id=" +
    //           contador +
    //           " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
    //         let btn = document.createElement("tr");
    //         btn.innerHTML = fila;
    //         document.getElementById("tablita-aci").appendChild(btn);
    //         myArray.push({ id: contador, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
    //         contador = contador + 1;

    //         //CALCULAR
    //         var resumentotal = 0;
    //         $('#example2 tr').each(function () {
    //           var total = $(this).find("td").eq(10).html();
    //           if ((parseFloat(total)) > 0) {
    //             resumentotal = (parseFloat(resumentotal) + parseFloat(total));
    //           }
    //         });
    //         document.getElementById('resumentotal').innerHTML = resumentotal;
    //       }
    //       creardatatable("#example2");
    //       datosaci.splice(0, datosaci.length);
    //       datosaci = myArray;
    //       countaci = contador;
    //       console.log(datosaci);
    //     }
    //   }
    // });

  });

  $("#example2 tbody").on("click", "a.file", function () {
    let id = $(this).attr("id");
    var post = 0;
    var nropedido = document.getElementById("nropedido").innerHTML;
    document.getElementById('codprodnote').innerHTML = id;
    var codprodnote = id
    var v_nombre_file = "";

    var chekcontrol = document.getElementById("customRadio1").checked;

    if ((nropedido == "NUEVO")) {
      $("#namepedido").focus();
      Swal.fire({
        title: "PRIMERO DEBE GUARDAR PARA AGREGAR ARCHIVOS",
        timer: 2400,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }
    var encargadoestado = $('#encargadoestado').val();
    if (chekcontrol == false) {

      $.ajax({
        type: 'POST',
        url: '/pedidos/pedidos/ConsultaPedidoFile',
        data: { post: post, nropedido: nropedido, codprodnote: codprodnote },

        success: function (res) {

          if (Number(res.i_existe_file_pedido) == 0) {

            Swal.fire({
              icon: 'warning',
              title: 'PRIMERO DEBE GUARDAR EL PRODUCTO',
              timer: 2400,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            return;

          } else {
            $("#tbarchivo").dataTable().fnDestroy();
            $("#tablita-nota").children().remove();
            $("#modal-nota").modal("show");
            let count = 0;
            $('#modal-nota').on('shown.bs.modal', function () {
              count = count + 1;
              if (count == 1) {
                $("#descripcionfile").focus();
                $.ajax({
                  type: 'POST',
                  url: '/pedidos/pedidos/MostrarFilePedido',
                  data: { post: post, nropedido: nropedido, codprodnote: codprodnote, v_nombre_file: v_nombre_file },

                  beforeSend: function () {
                    $("#div-01").html("");
                    $("#div-01").append(
                      "<div id='div-01'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
                    );
                  },

                  success: function (res) {


                    $("#div-01").html("");
                    let myArray = [];
                    for (const property in res.data) {
                      let nu_correla = res.data[property].nu_correla;
                      let item = res.data[property].v_codprod;
                      let descripcion = res.data[property].v_descripcion_file;
                      let icon = res.data[property].v_icon;
                      let color = res.data[property].v_color;
                      let tardwn = res.data[property].v_tardwn;
                      let tardwnname = res.data[property].v_tardwnname;
                      let url = res.data[property].v_url;
                      let nombre_file = res.data[property].v_nombre_file;
                      let fila =
                        "<tr><td class='text-left'>" +
                        nu_correla +
                        "</td><td class='text-left'>" +
                        item +
                        "</td><td class='text-left'>" +
                        descripcion +
                        "</td><td class='text-center'><a " + tardwn + "'" + tardwnname + "'  class='btn btn-" +
                        color + " btn-sm'  style='color:white' href='" + url + "'><span class='fa-solid fa-" +
                        icon + "'><b></b></span></a></td>" +
                        "</td><td class='text-center'><a id=" +
                        nombre_file +
                        " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                      let btn = document.createElement("tr");
                      btn.innerHTML = fila;
                      document.getElementById("tablita-nota").appendChild(btn);
                      // myArray.push({ NroOrden: nu_correla, Item: item, url: url });
                    }
                    $('#descripcionfile').val('');
                    var $el = $("#archivo");
                    $el.wrap("<form>").closest("form").get(0).reset();
                    $el.unwrap();
                    creardatatable("#tbarchivo");
                  }
                });
              }
            });
          }
        }
      });
    } else {
      $("#modal-files").modal("show");
      $("#tbarchivos").dataTable().fnDestroy();
      $("#tablita-files").children().remove();
      var post = 3;
      var nropedido = document.getElementById("nropedido").innerHTML;
      var codprodnote = "";
      var v_nombre_file = "";
      let count = 0;
      $('#modal-files').on('shown.bs.modal', function () {
        count = count + 1;
        if (count == 1) {
          $.ajax({
            type: 'POST',
            url: '/pedidos/aprobarpedido/MostrarFilePedido',
            data: { post: post, nropedido: nropedido, codprodnote: codprodnote, v_nombre_file: v_nombre_file },

            beforeSend: function () {
              $("#div-files").html("");
              $("#div-files").append(
                "<div id='div-files'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-success' role='status' aria-hidden='true'></div>\</div>\ </div>"
              );
            },

            success: function (res) {
              $("#div-files").html("");
              let myArray = [];
              for (const property in res.data) {
                let nu_correla = res.data[property].nu_correla;
                let item = res.data[property].v_codprod;
                let descripcion = res.data[property].v_descripcion_file;
                let icon = res.data[property].v_icon;
                let color = res.data[property].v_color;
                let tardwn = res.data[property].v_tardwn;
                let tardwnname = res.data[property].v_tardwnname;
                let url = res.data[property].v_url;
                let nombre_file = res.data[property].v_nombre_file;
                let fila =
                  "<tr><td class='text-left'>" +
                  nu_correla +
                  "</td><td class='text-left'>" +
                  item +
                  "</td><td class='text-left'>" +
                  descripcion +
                  "</td><td class='text-center'><a " + tardwn + "'" + tardwnname + "'  class='btn btn-" +
                  color + " btn-sm'  style='color:white' href='" + url + "'><span class='fa-solid fa-" +
                  icon + "'><b></b></span></a></td></tr>";


                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-files").appendChild(btn);

              }

              creardatatable("#tbarchivos");
            }
          });
        }
      });
    }
  });

  $("#moneda").change(function () {
    var moneda = $('#moneda option:selected').text();
    var tipocambio = $('#tipocambio').val();
    document.getElementById('monedaimporte').innerHTML = $('#moneda option:selected').text();


    if (moneda == 'USD' && tipocambio == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'NO HAY REGISTRO DEL TIPO DE CAMBIO PARA HOY EN EL SISTEMA',
        text: 'Coordinar con el area contable',
      })

      $.ajax({
        type: 'POST',
        url: '/pedidos/pedidos/combo_moneda',
        data: {},
        success: function (res) {
          $("#moneda").html("");
          $("#moneda").append(res.filasmoneda);
        }
      });
    } else {
    }
  });

  $("#btnguardar").on("click", function () {
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var idarea = document.getElementById("idarea").innerHTML;
    var usuario = document.getElementById("usuario").innerHTML;
    var idmoneda = $('#moneda').val();
    var moneda = $('#moneda option:selected').text();
    var fecha = $('#fecha').val();
    var tipocambio = $('#tipocambio').val();
    var idestado = $('#estado').val();
    var estado = $('#estado option:selected').text();
    var resumentotal = document.getElementById("resumentotal").innerHTML;
    var resumentotalsol = 0;
    var resumentotaldol = 0;

    if (moneda == "USD") {
      resumentotalsol = parseFloat((parseFloat(resumentotal) * parseFloat(tipocambio))).toFixed(3);
      resumentotaldol = resumentotal;
    } else {
      resumentotalsol = resumentotal;
      resumentotaldol = 0;
    }

    var nota = $('#note').val();
    var d_fechaentrega = $('#fechaentrega').val();
    var v_numerophone = $('#nrophone').val();
    var v_nombrepedido = $('#namepedido').val();
    var nota = $('#note').val();
    var d_fechaentrega = $('#fechaentrega').val();
    var v_numerophone = $('#nrophone').val();
    var v_nombrepedido = $('#namepedido').val().toUpperCase();

    var montolimite = document.getElementById("montolimite").innerHTML;



    var v_persona_recepciona = $('#contactoentrega').val();
    var v_id_direccion_entrega = $('#iddireccion option:selected').val();
    var v_direccion_entrega = $('#iddireccion option:selected').text();

    var i_tipo_pedido = $('#tipoorden option:selected').val();
    var v_tipo_pedido = $('#tipoorden option:selected').text();

    var i_id_modo = $('#cbocondicion option:selected').val();



    console.log(datosaci);
    if (Number(resumentotalsol) > Number(montolimite)) {
      Swal.fire({
        icon: 'warning',
        title: 'MONTO DEL PEDIDO (' + resumentotalsol + ') SOBREPASA EL LIMITE (' + montolimite + ')',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }


    if (v_nombrepedido == '' || v_nombrepedido == null) {
      $('#namepedido').focus();
      Swal.fire({
        icon: 'warning',
        title: 'INGRESE NOMBRE AL PEDIDO',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if (d_fechaentrega == '' || d_fechaentrega == null) {
      $('#fechaentrega').focus();
      Swal.fire({
        icon: 'warning',
        title: 'INGRESE  FECHA DE ENTREGA',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }


    if (v_persona_recepciona == '' || v_persona_recepciona == null) {
      $('#contactoentrega').focus();
      Swal.fire({
        icon: 'warning',
        title: 'INGRESE CONTACTO DE ENTREGA',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if (v_id_direccion_entrega == 'XXXXXXX' || v_id_direccion_entrega == null) {
      $('#iddireccion').focus();
      Swal.fire({
        icon: 'warning',
        title: 'SELECCIONE DIRECCION DE ENTREGA',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if (datosaci.length == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'NO A INGRESADO NINGUN ITEM EN EL DETALLE',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    Swal.fire({
      title: "Estas seguro de guardar en el Sistema?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Guardar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: '/pedidos/pedidos/registro_pedido',
          data: {
            nu_correla: nu_correla,
            idarea: idarea,
            usuario: usuario,
            idmoneda: idmoneda,
            moneda: moneda,
            fecha: fecha,
            tipocambio: tipocambio,
            idestado: idestado,
            estado: estado,
            resumentotalsol: resumentotalsol,
            resumentotaldol: resumentotaldol,
            nota: nota,
            d_fechaentrega: d_fechaentrega,
            v_numerophone: v_numerophone,
            v_nombrepedido: v_nombrepedido,
            v_persona_recepciona: v_persona_recepciona,
            v_id_direccion_entrega: v_id_direccion_entrega,
            v_direccion_entrega: v_direccion_entrega,
            i_tipo_pedido: i_tipo_pedido,
            v_tipo_pedido: v_tipo_pedido,
            i_id_modo: i_id_modo,

            datosaci: datosaci
          },

          beforeSend: function () {
            $("#modal-insert").modal("show");
            var n = 0;
            var l = document.getElementById("number");
            window.setInterval(function () {
              l.innerHTML = n;
              n++;
            }, 2000);
          },


          success: function (res) {
            var nu_correla = res.vtext


            $.ajax({
              type: 'POST',
              url: '/pedidos/pedidos/MostrarPedido',
              data: { nu_correla: nu_correla },
              success: function (res) {
                console.log(res.data);
                // countaci = Number(res.i_filas) + 1;
                // if (Number(res.i_idorden_aprobacion) != 0) {
                //   document.getElementById("btnguardar").disabled = true;
                //   document.getElementById("btnsendpedido").disabled = true;
                //   $('#customRadio1').prop('checked', true);
                // } else {
                //   document.getElementById("btnguardar").disabled = false;
                //   document.getElementById("btnsendpedido").disabled = false;
                //   $('#customRadio1').prop('checked', false);
                // }
                countaci = Number(res.i_filas) + 1;
                document.getElementById("pptoadd").disabled = false;
                document.getElementById('nropedido').innerHTML = res.nu_correla;
                document.getElementById("nropedido").style.color = "#42DE0A";
                document.getElementById("idarea").innerHTML = res.v_areid;
                document.getElementById("area").innerHTML = res.v_area;
                $('#fecha').val(res.d_fecha);
                $('#fechaentrega').val(res.d_fechaentrega);
                $('#tipocambio').val(res.f_tipocambio);
                $('#nrophone').val(res.v_numerophone);
                $('#namepedido').val(res.v_nombrepedido);
                $("#encargadoestado").val(res.v_encargado);
                $("#estado").html("");
                $("#estado").append(res.FilasEstado);
                //tutan
                if (Number(res.i_idorden_aprobacion) != 0) {
                  document.getElementById("btnguardar").disabled = true;
                  document.getElementById("btnsendpedido").disabled = true;
                  $('#customRadio1').prop('checked', true);
                } else {
                  document.getElementById("btnguardar").disabled = false;
                  document.getElementById("btnsendpedido").disabled = false;
                  $('#customRadio1').prop('checked', false);
                }

                $("#moneda").html("");
                $("#moneda").append(res.FilasMoneda);
                document.getElementById('resumentotal').innerHTML = res.f_importotal;
                document.getElementById('importepresupuesto').innerHTML = res.f_montoppto;


                document.getElementById('importepresupuesto').innerHTML = res.f_montoppto;


                $('#contactoentrega').val(res.v_persona_recepciona);
                $("#iddireccion").html("");
                $("#iddireccion").append(res.FilasDireccion);

                $("#example2").dataTable().fnDestroy();
                $("#tablita-aci").children().remove();

                let myArray = [];
                let v_color = '';
                console.log(res.data);
                for (const property in res.data) {
                  let id = parseInt(res.data[property].id);
                  let item = res.data[property].Item;
                  let nombre = res.data[property].Descripcion;
                  let v_unidad = res.data[property].v_unidad;
                  let qty = res.data[property].Cantidad;
                  let price = res.data[property].Precio;
                  let importe = res.data[property].Total;
                  let v_disabled = res.data[property].v_disabled;
                  let v_note_detalle = res.data[property].v_note_detalle;
                  let v_id_local = res.data[property].v_id_local;
                  let i_opcion = res.data[property].i_opcion;
                  let v_centrocosto = res.data[property].v_centrocosto;
                  let v_cuenta = res.data[property].v_cuenta;

                  if (v_note_detalle == 'SI') {
                    v_color = 'color:rgb(66,222,10)';
                  } else {
                    v_color = 'color:rgb(3,164,90)';
                  }

                  let fila =
                    "<tr><td class='text-center'>" +
                    id +
                    "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +
                    "</td><td class='text-left'>" +
                    item +
                    "</td><td class='text-left'>" +
                    nombre +
                    "</td><td class='text-left'>" +
                    v_id_local +
                    "</td><td class='text-left'>" +
                    v_centrocosto +
                    "</td><td class='text-left'>" +
                    v_cuenta +
                    "</td><td class='text-left'>" +
                    v_unidad +
                    "</td><td class='text-left'>" +
                    qty +
                    "</td><td class='text-left'>" +
                    price +
                    "</td><td class='text-left'>" +
                    importe +
                    "</td><td><a id=" +
                    item +
                    " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
                    "</td><td><a id=" +
                    id +
                    " class='btn btn-danger btn-sm text-white delete " + v_disabled + "'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                  let btn = document.createElement("tr");
                  btn.innerHTML = fila;
                  document.getElementById("tablita-aci").appendChild(btn);
                  myArray.push({ id: id, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
                }
                creardatatable("#example2");
                datosaci.splice(0, datosaci.length);
                datosaci = myArray;
                console.log(datosaci);


                $('#tbproducto tbody tr').each(function () {
                  $(this).find("td:eq(1)").attr('disabled', true);
                });

                document.getElementById('monedaimporte').innerHTML = $('#moneda option:selected').text();
                document.getElementById("pptoadd").disabled = false;
              }
            });

            Swal.fire({
              icon: res.vicon,
              title: res.vtitle,
              text: 'ya puede añadir archivos en el Pedido',
              timer: res.itimer,
              timerProgressBar: res.vprogressbar,
              showCancelButton: false,
              showConfirmButton: false,
            });

            var id = setInterval(function () {
              document.getElementById("nropedido").style.color = "#42DE0A";
              document.getElementById('nropedido').innerHTML = res.vtext;

              $("#modal-insert").modal("hide");
              clearInterval(id);
            }, res.itimer);
          }
        });
      }
    });
  });

  $('#btnsendpedido').on('click', function () {  //ENVIAR CORREO raaa
    var post = 0;
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var nombre = document.getElementById("montolimite").innerHTML;
    var xi_tipo = 0;

    if (nu_correla == 'NUEVO' || nu_correla == null) {
      $('#namepedido').focus();
      Swal.fire({
        icon: 'warning',
        title: 'DEBE TENE UN PEDIDO PARA ENVIAR',
        timer: 2400,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if (nombre == 0 || nombre == null) {
      Swal.fire({
        icon: 'warning',
        title: 'EL AREA QUE ESTA ASGINADO, NO TIENE FORMULA DE APROBACIONES, COORDINAR CON EL AREA DE COMPRAS',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }



    Swal.fire({
      title: "Seguro de enviar para su Aprobacion ?",
      text: "Se enviara para Aprobacion de las Jefaturas",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Enviar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {


        $.ajax({
          type: 'POST',
          url: '/pedidos/aprobarpedido/ValidacionPedido',
          data: {
            post: post,
            nu_correla: nu_correla,
            xi_tipo: xi_tipo
          },
          success: function (res) {
            if (Number(res.i_valor) == 1) {
              $('#namepedido').focus();
              Swal.fire(
                res.v_mensaje,
                '',
                'warning'
              )
            } else {
              $.ajax({
                type: 'POST',
                url: '/pedidos/aprobarpedido/ProcesoAprobacionPedido',
                data: {
                  post: post,
                  nu_correla: nu_correla
                },

                beforeSend: function () {
                  $("#btnsendpedido").attr("disabled", "disabled");
                  $("#btnguardar").attr("disabled", "disabled");
                  $("#cancelar").attr("disabled", "disabled");
                  $("#btnsendpedido").html(
                    "<span class='spinner-border spinner-border-sm'></span> \
                              <span class='ml-25 align-middle'>Enviando...</span>"
                  );
                },

                beforeSend: function () {
                  $("#modal-insert").modal("show");
                  var n = 0;
                  var l = document.getElementById("number");
                  window.setInterval(function () {
                    l.innerHTML = n;
                    n++;
                  }, 2000);
                },

                success: function (res) {

                  if (Number(res.output) == 1) {
                    $("#btnsendpedido").html("<span class='ml-25 align-middle'>Enviado</span>");
                    $("#modal-insert").modal("hide");
                    Swal.fire({
                      icon: res.vicon,
                      title: res.vtitle,
                      text: res.vtext + ', se envio un correo de notificacion a: ' + res.v_correo_next,
                      timer: res.itimer,
                      timerProgressBar: res.vprogressbar,
                      showCancelButton: false,
                      showConfirmButton: false,
                    });
                    var id = setInterval(function () {
                      location.reload();
                      clearInterval(id);
                      location.href = "https://verdum.com/pedidos/pedidos/index";
                    }, res.itimer);
                  } else {
                    $("#btnsendpedido").html("<span class='ml-25 align-middle'>Enviado</span>");
                    $("#modal-insert").modal("hide");
                    Swal.fire({
                      icon: res.vicon,
                      title: res.vtitle,
                      text: res.vtext + ', No se pudo enviar el correo de notificacion',
                      timer: res.itimer,
                      timerProgressBar: res.vprogressbar,
                      showCancelButton: false,
                      showConfirmButton: false,
                    });
                    var id = setInterval(function () {
                      location.reload();
                      clearInterval(id);
                      location.href = "https://verdum.com/pedidos/pedidos/index";
                    }, res.itimer);
                  }

                }
              });

            }
          }
        });
      }
    });



  });
  //#endregion

  // #region                                              (ACCIONES EN LA TABLA DETALLE DEL PRESUPUESTO)
  $("#pptoadd").on("click", function () { //aqui ppto
    var nropedido = document.getElementById("nropedido").innerHTML;
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var chekcontrol = document.getElementById("customRadio1").checked;

    if ((nropedido == "NUEVO")) {
      $("#namepedido").focus();
      Swal.fire({
        title: "PRIMERO DEBE GUARDAR PARA AGREGAR PRESUPUESTO",
        timer: 2400,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }
    var resumentotal = document.getElementById("resumentotal").innerHTML;
    var tipocambio = $('#tipocambio').val();

    //perro
    var moneda = $('#moneda option:selected').text();


    $("#idpartida").html("");
    $("#div-mes").html("");


    if (moneda == 'USD') {
      document.getElementById('importepedido').innerHTML = (Number(resumentotal) * Number(tipocambio)).toFixed(2);
      document.getElementById('montosolped').innerHTML = (Number(resumentotal) * Number(tipocambio)).toFixed(2);
    } else {
      document.getElementById('importepedido').innerHTML = resumentotal;
      document.getElementById('montosolped').innerHTML = resumentotal;
    }

    document.getElementById('nropedidoppto').innerHTML = nu_correla;
    var encargadoestado = $('#encargadoestado').val();

    if (chekcontrol == false) {
      $("#modal-ppto").modal("show");
      let count = 0;
      $('#modal-ppto').on('shown.bs.modal', function () {
        count = count + 1;
        if (count == 1) {
          $.ajax({
            type: 'POST',
            url: '/pedidos/pedidos/Mostrar_pedido_ppto',
            data: { nu_correla: nu_correla },
            success: function (res) {

              document.getElementById('resumenppto').innerHTML = res.f_montoppto;
              document.getElementById('diferenciappto').innerHTML = res.f_diferencia;

              if (Number(res.f_diferencia) == 0) {
                document.getElementById("diferenciappto").style.color = "green";
              } else {
                document.getElementById("diferenciappto").style.color = "red";
              }

              $("#lineapedido").html("");
              $("#lineapedido").append(res.FilasDetPedido);

              $("#idppto").html("");
              $("#idppto").append(res.FilasPresupuesto);



              $("#tbpptopedido").dataTable().fnDestroy();
              $("#tablita-ppto").children().remove();

              let myArray = [];
              for (const property in res.data) {
                let nu_correla = res.data[property].nu_correla;
                let v_item_pedido = res.data[property].v_item_pedido;
                let v_codprod = res.data[property].v_codprod;
                let v_id_local = res.data[property].v_id_local;

                let v_idlinea = res.data[property].v_idlinea;
                let v_idppto = res.data[property].v_idppto;
                let v_idpartida = res.data[property].v_idpartida;
                let v_idmes = res.data[property].v_idmes;
                let v_nombremes = res.data[property].v_nombremes;
                let f_monto = res.data[property].f_monto;
                let v_centrocosto = res.data[property].v_centrocosto;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_codprod +
                  "</td><td class='text-left'>" +
                  v_id_local +
                  "</td><td class='text-left'>" +
                  v_idppto +
                  "</td><td class='text-left'>" +
                  v_idpartida +
                  "</td><td class='text-left'>" +
                  v_idmes +
                  "</td><td class='text-left'>" +
                  v_nombremes +
                  "</td><td class='text-left'>" +
                  v_centrocosto +
                  "</td><td class='text-left'>" +
                  f_monto +
                  "</td><td><a id=" +
                  v_idlinea +
                  " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-ppto").appendChild(btn);
              }
              creardatatable("#tbpptopedido"); //perro
            }
          });
        }
      });

    } else {
      $("#modal-pptos").modal("show");
      let count = 0;
      $('#modal-pptos').on('shown.bs.modal', function () {
        count = count + 1;
        if (count == 1) {
          $.ajax({
            type: 'POST',
            url: '/pedidos/pedidos/Mostrar_pedido_ppto',
            data: { nu_correla: nu_correla },
            success: function (res) {

              document.getElementById('resumenppto').innerHTML = res.f_montoppto;
              document.getElementById('diferenciappto').innerHTML = res.f_diferencia;
              if (Number(res.f_diferencia) == 0) {
                document.getElementById("diferenciappto").style.color = "green";
              } else {
                document.getElementById("diferenciappto").style.color = "red";
              }

              $("#lineapedido").html("");
              $("#lineapedido").append(res.FilasDetPedido);

              $("#idppto").html("");
              $("#idppto").append(res.FilasPresupuesto);


              $("#tbpptopedidos").dataTable().fnDestroy();
              $("#tablita-pptos").children().remove();

              let myArray = [];
              for (const property in res.data) {
                let nu_correla = res.data[property].nu_correla;
                let v_item_pedido = res.data[property].v_item_pedido;
                let v_codprod = res.data[property].v_codprod;
                let v_id_local = res.data[property].v_id_local;
                let v_idlinea = res.data[property].v_idlinea;
                let v_idppto = res.data[property].v_idppto;
                let v_idpartida = res.data[property].v_idpartida;
                let v_idmes = res.data[property].v_idmes;
                let v_nombremes = res.data[property].v_nombremes;
                let f_monto = res.data[property].f_monto;
                let v_centrocosto = res.data[property].v_centrocosto;

                let fila =
                  "<tr><td class='text-center'>" +
                  v_codprod +
                  "</td><td class='text-left'>" +
                  v_id_local +
                  "</td><td class='text-left'>" +
                  v_idppto +
                  "</td><td class='text-left'>" +
                  v_idpartida +
                  "</td><td class='text-left'>" +
                  v_idmes +
                  "</td><td class='text-left'>" +
                  v_nombremes +
                  "</td><td class='text-left'>" +
                  v_centrocosto +
                  "</td><td class='text-left'>" +
                  f_monto +
                  "</td></tr>";

                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-pptos").appendChild(btn);
              }
              creardatatable("#tbpptopedidos"); //perro
            }
          });
        }
      });
    }

  });

  $(document).on('change', 'input[type="checkbox"]', function (e) {
    $("#montolleva").val('');
    if (this.id == "ENERO") {
      if (this.checked) {
        codmes = $('#202201').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("ENEROSAL").innerHTML;
        document.getElementById("FEBRERO").disabled = true;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "FEBRERO") {
      if (this.checked) {
        codmes = $('#202202').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("FEBREROSAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "MARZO") {
      if (this.checked) {
        codmes = $('#202203').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("MARZOSAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "ABRIL") {
      if (this.checked) {
        codmes = $('#202204').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("ABRILSAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "MAYO") {
      if (this.checked) {
        codmes = $('#202205').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("MAYOSAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "JUNIO") {
      if (this.checked) {
        codmes = $('#202206').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("JUNIOSAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "JULIO") {
      if (this.checked) {
        codmes = $('#202207').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("JULIOSAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "AGOSTO") {
      if (this.checked) {
        codmes = $('#202208').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("AGOSTOSAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "SEPTIEMBRE") {
      if (this.checked) {
        codmes = $('#202209').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("SEPTIEMBRESAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "OCTUBRE") {
      if (this.checked) {
        codmes = $('#202210').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("OCTUBRESAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "NOVIEMBRE") {
      if (this.checked) {
        codmes = $('#202211').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("NOVIEMBRESAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
    if (this.id == "DICIEMBRE") {
      if (this.checked) {
        codmes = $('#202212').val();
        nombremes = $(this).attr("id");
        monto = document.getElementById("DICIEMBRESAL").innerHTML;
        $("#montolleva").val(monto);
        Habilitar(true);
      }
    }
  });

  $("#idppto").change(function () {
    var idppto = $("#idppto").val();
    $("#div-mes").html("");
    $.ajax({
      type: "POST",
      url: "/pedidos/pedidos/Mostrar_partida_ppto",
      data: { idppto: idppto },
      success: function (res) {
        $("#idpartida").html("");
        $("#idpartida").append(res.data);
      },
    });
  });

  $("#idpartida").change(function () {
    $("#montolleva").val('');
    var v_codigo = $("#idppto").val();
    var v_idpartida = $("#idpartida").val();
    $.ajax({
      type: "POST",
      url: "/pedidos/pedidos/MostrarPptoMensual",
      data: { v_codigo: v_codigo, v_idpartida: v_idpartida },

      beforeSend: function () {
        $("#div-ppto").html("");
        $("#div-ppto").append(
          "<div id='div-ppto'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        $("#div-ppto").html("");
        $("#div-mes").html("");
        let myArray = [];
        let clase_colormes = '';
        let clase_colormonto = '';

        for (const property in res.data) {
          let v_codigo = res.data[property].v_codigo;
          let v_idpartida = res.data[property].v_idpartida;
          let v_codmes = res.data[property].v_codmes;
          let v_nombremes = res.data[property].v_nombremes;
          let f_saldo = res.data[property].f_saldo;
          let v_namesaldomes = res.data[property].v_namesaldomes;
          let v_disabled = res.data[property].v_disabled;

          if (Number(f_saldo) == 0) {
            clase_colormes = '';
            clase_colormonto = '';
          } else {
            clase_colormes = 'badge badge-light-danger';
            clase_colormonto = 'badge-light-success';
          }


          $("#div-mes").append(
            " <div class='col-sm-4'>\<div class='business-item'>\
                  <div class='d-flex align-items-center justify-content-between'>\
                    <div class='custom-control custom-checkbox'>\
                      <input type='checkbox'  class='custom-control-input' id=" + v_nombremes + " " + v_disabled + " = " + v_disabled + ">\
                        <label class='custom-control-label "+ clase_colormes + "' id=" + v_nombremes + " for=" + v_nombremes + ">" + v_nombremes + "</label>\
                    </div>\
                    <div class='badge "+ clase_colormonto + "' id=" + v_namesaldomes + ">" + f_saldo + "</div>\
                    <input type='hidden' id="+ v_codmes + " value=" + v_codmes + "  > \
                  </div>\
                </div>\
                </div> "
          );
        }
      },
    });
  });

  $("#btnhabilitar").on("click", function () {
    $("#montolleva").val('');
    var v_codigo = $("#idppto").val();
    var v_idpartida = $("#idpartida").val();
    $.ajax({
      type: "POST",
      url: "/pedidos/pedidos/MostrarPptoMensual",
      data: { v_codigo: v_codigo, v_idpartida: v_idpartida },

      beforeSend: function () {
        $("#div-ppto").html("");
        $("#div-ppto").append(
          "<div id='div-ppto'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        $("#div-ppto").html("");
        $("#div-mes").html("");
        let myArray = [];
        let clase_colormes = '';
        let clase_colormonto = '';

        for (const property in res.data) {
          let v_codigo = res.data[property].v_codigo;
          let v_idpartida = res.data[property].v_idpartida;
          let v_codmes = res.data[property].v_codmes;
          let v_nombremes = res.data[property].v_nombremes;
          let f_saldo = res.data[property].f_saldo;
          let v_namesaldomes = res.data[property].v_namesaldomes;
          let v_disabled = res.data[property].v_disabled;

          if (Number(f_saldo) == 0) {
            clase_colormes = '';
            clase_colormonto = '';
          } else {
            clase_colormes = 'badge badge-light-danger';
            clase_colormonto = 'badge-light-success';
          }

          $("#div-mes").append(
            " <div class='col-sm-4'>\<div class='business-item'>\
                  <div class='d-flex align-items-center justify-content-between'>\
                    <div class='custom-control custom-checkbox'>\
                      <input type='checkbox'  class='custom-control-input' id=" + v_nombremes + " " + v_disabled + " = " + v_disabled + ">\
                        <label class='custom-control-label "+ clase_colormes + "' id=" + v_nombremes + " for=" + v_nombremes + ">" + v_nombremes + "</label>\
                    </div>\
                    <div class='badge "+ clase_colormonto + "' id=" + v_namesaldomes + ">" + f_saldo + "</div>\
                    <input type='hidden' id="+ v_codmes + " value=" + v_codmes + "  > \
                  </div>\
                </div>\
                </div> "
          );
        }
      },
    });
  });


  $("#montolleva").change(function () {
    var cantidad = $('#montolleva').val();
    var cantidadx = parseFloat(cantidad);
    var montox = parseFloat(monto);
    console.log(Number(cantidadx).toFixed(2));
    console.log(Number(montox).toFixed(2));

    // console.log(cantidadx);
    // console.log(montox);

    if (cantidadx > montox) {
      $("#montolleva").focus();
      $('#montolleva').val(monto);
      Swal.fire({
        title: 'EL MONTO INGRESADO ES MAYOR AL SALDO DEL MES SELECCIONADO',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }
  });

  $("#lineapedido").change(function () {
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var i_item = $('#lineapedido  option:selected').val();

    $('#montoitem').val(0);

    $.ajax({
      type: "POST",
      url: "/pedidos/pedidos/consulta_monto_item",
      data: { nu_correla: nu_correla, i_item: i_item },

      beforeSend: function () {
        $("#div-ppto").html("");
        $("#div-ppto").append(
          "<div id='div-ppto'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        $("#div-ppto").html("");
        $('#montoitem').val(res.nu_total);
        $('#pptoalmacen').val(res.v_id_local);
        $('#pptocentrocosto').val(res.v_centrocosto);
        $('#codigoproducto').val(res.v_codprod);
        $('#itemcuenta').val(res.v_cuenta);
      },
    });
  });


  // consulta_monto_item

  $("#agregarppto").on("click", function () { //perro
    var post = 0;
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var v_idppto = $('#idppto  option:selected').val();
    var v_idpartida = $('#idpartida  option:selected').val();
    var linedetalle = $('#lineapedido option:selected').val();

    var v_id_local = $('#pptoalmacen').val();
    var v_centrocosto = $('#pptocentrocosto').val();
    var v_cuenta = $('#itemcuenta').val();

    var v_codprod = $('#codigoproducto').val();


    var montoitem = $('#montoitem').val();
    var cantidad = $('#montolleva').val();

    var cantidadx = parseFloat(cantidad);
    var montox = parseFloat(monto);
    var montoitemx = parseFloat(montoitem);


    if (linedetalle == 0 || linedetalle == null) {
      $("#lineapedido").focus();
      Swal.fire({
        title: 'SELECCIONE UN ITEM DEL PEDIDO',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if (montox == 0) {
      $("#montolleva").focus();
      $('#montolleva').val(monto);
      Swal.fire({
        title: 'MARCAR UN MES A RESTAR',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if (cantidad == 0 || cantidad == null) {
      $("#montolleva").focus();
      $('#montolleva').val(monto);
      Swal.fire({
        title: 'INGRESAR MONTO',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }


    if (cantidadx != montoitem) {
      $("#montolleva").focus();
      $('#montolleva').val(monto);
      Swal.fire({
        title: "MONTO DEL PRESUPUESTO (" + cantidadx + ') ES DIFERENTE QUE DEL ITEM (' + montoitem + ')',
        // title: "YA AGREGO ESTE PRODUCTO " + '  ' + '(' + v_invtid + ') CON EL CENTRO DE COSTO ' + '(' + v_centrocosto + ') PARA EL ALMACEN DE' + '(' + v_id_local + ')',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/registro_pedido_ppto',
      data: {
        post: post,
        nu_correla: nu_correla,
        linedetalle: linedetalle,
        v_codprod: v_codprod,
        v_idppto: v_idppto,
        v_idpartida: v_idpartida,
        codmes: codmes,
        nombremes: nombremes,
        cantidadx: cantidadx,
        v_id_local: v_id_local,
        v_centrocosto: v_centrocosto,
        v_cuenta: v_cuenta,
      },

      beforeSend: function () {
        $("#loadppto").html("");
        $("#loadppto").append(
          "<div id='loadppto'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },

      success: function (res) {
        $("#loadppto").html("");
        $.ajax({
          type: 'POST',
          url: '/pedidos/pedidos/Mostrar_pedido_ppto',
          data: { nu_correla: nu_correla },
          success: function (res) {

            document.getElementById('resumenppto').innerHTML = res.f_montoppto;
            document.getElementById('diferenciappto').innerHTML = res.f_diferencia;
            if (Number(res.f_diferencia) == 0) {
              document.getElementById("diferenciappto").style.color = "green";
            } else {
              document.getElementById("diferenciappto").style.color = "red";
            }

            $("#lineapedido").html("");
            $("#lineapedido").append(res.FilasDetPedido);


            $("#tbpptopedido").dataTable().fnDestroy();
            $("#tablita-ppto").children().remove();

            let myArray = [];
            for (const property in res.data) {
              let nu_correla = res.data[property].nu_correla;
              let v_item_pedido = res.data[property].v_item_pedido;
              let v_id_local = res.data[property].v_id_local;
              let v_codprod = res.data[property].v_codprod;
              let v_idlinea = res.data[property].v_idlinea;
              let v_idppto = res.data[property].v_idppto;
              let v_idpartida = res.data[property].v_idpartida;
              let v_idmes = res.data[property].v_idmes;
              let v_nombremes = res.data[property].v_nombremes;
              let f_monto = res.data[property].f_monto;
              let v_centrocosto = res.data[property].v_centrocosto;

              let fila =
                "<tr><td class='text-left'>" +
                v_codprod +
                "</td><td class='text-left'>" +
                v_id_local +
                "</td><td class='text-left'>" +
                v_idppto +
                "</td><td class='text-left'>" +
                v_idpartida +
                "</td><td class='text-left'>" +
                v_idmes +
                "</td><td class='text-left'>" +
                v_nombremes +
                "</td><td class='text-left'>" +
                v_centrocosto +
                "</td><td class='text-left'>" +
                f_monto +
                "</td><td><a id=" +
                v_idlinea +
                " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

              let btn = document.createElement("tr");
              btn.innerHTML = fila;
              document.getElementById("tablita-ppto").appendChild(btn);
            }
            creardatatable("#tbpptopedido"); //perro
          }
        });

        Swal.fire({
          icon: res.vicon,
          title: res.vtitle,
          text: res.vtext,
          timer: res.itimer,
          timerProgressBar: res.vprogressbar,
          showCancelButton: false,
          showConfirmButton: false,
        });
        var id = setInterval(function () {
          clearInterval(id);
        }, res.itimer);
      }
    });

    // Swal.fire({
    //   title: "Estas seguro de guardar en el Sistema?",
    //   text: "",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#61C250",
    //   cancelButtonColor: "#ea5455",
    //   confirmButtonText: "Si, Guardar!",
    //   cancelButtonText: "No",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     $.ajax({
    //       type: 'POST',
    //       url: '/pedidos/pedidos/registro_pedido_ppto',
    //       data: {
    //         post: post,
    //         nu_correla: nu_correla,
    //         linedetalle: linedetalle,
    //         v_codprod: v_codprod,
    //         v_idppto: v_idppto,
    //         v_idpartida: v_idpartida,
    //         codmes: codmes,
    //         nombremes: nombremes,
    //         cantidadx: cantidadx,
    //         v_id_local: v_id_local,
    //         v_centrocosto: v_centrocosto,
    //         v_cuenta: v_cuenta,
    //       },
    //       success: function (res) {
    //         $.ajax({
    //           type: 'POST',
    //           url: '/pedidos/pedidos/Mostrar_pedido_ppto',
    //           data: { nu_correla: nu_correla },
    //           success: function (res) {

    //             document.getElementById('resumenppto').innerHTML = res.f_montoppto;
    //             document.getElementById('diferenciappto').innerHTML = res.f_diferencia;
    //             if (Number(res.f_diferencia) == 0) {
    //               document.getElementById("diferenciappto").style.color = "green";
    //             } else {
    //               document.getElementById("diferenciappto").style.color = "red";
    //             }

    //             $("#lineapedido").html("");
    //             $("#lineapedido").append(res.FilasDetPedido);


    //             $("#tbpptopedido").dataTable().fnDestroy();
    //             $("#tablita-ppto").children().remove();

    //             let myArray = [];
    //             for (const property in res.data) {
    //               let nu_correla = res.data[property].nu_correla;
    //               let v_item_pedido = res.data[property].v_item_pedido;
    //               let v_id_local = res.data[property].v_id_local;
    //               let v_codprod = res.data[property].v_codprod;
    //               let v_idlinea = res.data[property].v_idlinea;
    //               let v_idppto = res.data[property].v_idppto;
    //               let v_idpartida = res.data[property].v_idpartida;
    //               let v_idmes = res.data[property].v_idmes;
    //               let v_nombremes = res.data[property].v_nombremes;
    //               let f_monto = res.data[property].f_monto;
    //               let v_centrocosto = res.data[property].v_centrocosto;

    //               let fila =
    //                 "<tr><td class='text-left'>" +
    //                 v_codprod +
    //                 "</td><td class='text-left'>" +
    //                 v_id_local +
    //                 "</td><td class='text-left'>" +
    //                 v_idppto +
    //                 "</td><td class='text-left'>" +
    //                 v_idpartida +
    //                 "</td><td class='text-left'>" +
    //                 v_idmes +
    //                 "</td><td class='text-left'>" +
    //                 v_nombremes +
    //                 "</td><td class='text-left'>" +
    //                 v_centrocosto +
    //                 "</td><td class='text-left'>" +
    //                 f_monto +
    //                 "</td><td><a id=" +
    //                 v_idlinea +
    //                 " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

    //               let btn = document.createElement("tr");
    //               btn.innerHTML = fila;
    //               document.getElementById("tablita-ppto").appendChild(btn);
    //             }
    //             creardatatable("#tbpptopedido"); //perro
    //           }
    //         });

    //         Swal.fire({
    //           icon: res.vicon,
    //           title: res.vtitle,
    //           text: res.vtext,
    //           timer: res.itimer,
    //           timerProgressBar: res.vprogressbar,
    //           showCancelButton: false,
    //           showConfirmButton: false,
    //         });
    //         var id = setInterval(function () {
    //           clearInterval(id);
    //         }, res.itimer);
    //       }
    //     });
    //   }
    // });

  });

  $("#tbpptopedido tbody").on("click", "a.delete", function () {
    let v_idlinea = $(this).attr("id");
    var nu_correla = document.getElementById("nropedido").innerHTML;


    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/eliminar_fila_ppto',
      data: { nu_correla: nu_correla, v_idlinea: v_idlinea },
      success: function (res) {

        if (res.respuesta == 1) {
          $.ajax({
            type: 'POST',
            url: '/pedidos/pedidos/Mostrar_pedido_ppto',
            data: { nu_correla: nu_correla },
            success: function (res) {

              document.getElementById('resumenppto').innerHTML = res.f_montoppto;
              document.getElementById('diferenciappto').innerHTML = res.f_diferencia;
              if (Number(res.f_diferencia) == 0) {
                document.getElementById("diferenciappto").style.color = "green";
              } else {
                document.getElementById("diferenciappto").style.color = "red";
              }

              $("#idppto").html("");
              $("#idppto").append(res.FilasPresupuesto);


              $("#tbpptopedido").dataTable().fnDestroy();
              $("#tablita-ppto").children().remove();

              let myArray = [];
              for (const property in res.data) {
                let nu_correla = res.data[property].nu_correla;
                let v_idlinea = res.data[property].v_idlinea;
                let v_codprod = res.data[property].v_codprod;
                let v_id_local = res.data[property].v_id_local;
                let v_idppto = res.data[property].v_idppto;
                let v_idpartida = res.data[property].v_idpartida;
                let v_idmes = res.data[property].v_idmes;
                let v_nombremes = res.data[property].v_nombremes;
                let f_monto = res.data[property].f_monto;
                let v_centrocosto = res.data[property].v_centrocosto;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_codprod +
                  "</td><td class='text-left'>" +
                  v_id_local +
                  "</td><td class='text-left'>" +
                  v_idppto +
                  "</td><td class='text-left'>" +
                  v_idpartida +
                  "</td><td class='text-left'>" +
                  v_idmes +
                  "</td><td class='text-left'>" +
                  v_nombremes +
                  "</td><td class='text-left'>" +
                  v_centrocosto +
                  "</td><td class='text-left'>" +
                  f_monto +
                  "</td><td><a id=" +
                  v_idlinea +
                  " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-ppto").appendChild(btn);
              }
              creardatatable("#tbpptopedido"); //perro
            }
          });
        }

      }
    });


    // Swal.fire({
    //   title: "Estas seguro de eliminar la Fila?",
    //   text: "Se eliminar la fila del Ppto",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#61C250",
    //   cancelButtonColor: "#ea5455",
    //   confirmButtonText: "Si, Procesar!",
    //   cancelButtonText: "No",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     $.ajax({
    //       type: 'POST',
    //       url: '/pedidos/pedidos/eliminar_fila_ppto',
    //       data: { nu_correla: nu_correla, v_idlinea: v_idlinea },
    //       success: function (res) {

    //         if (res.respuesta == 1) {
    //           $.ajax({
    //             type: 'POST',
    //             url: '/pedidos/pedidos/Mostrar_pedido_ppto',
    //             data: { nu_correla: nu_correla },
    //             success: function (res) {

    //               document.getElementById('resumenppto').innerHTML = res.f_montoppto;
    //               document.getElementById('diferenciappto').innerHTML = res.f_diferencia;
    //               if (Number(res.f_diferencia) == 0) {
    //                 document.getElementById("diferenciappto").style.color = "green";
    //               } else {
    //                 document.getElementById("diferenciappto").style.color = "red";
    //               }

    //               $("#idppto").html("");
    //               $("#idppto").append(res.FilasPresupuesto);


    //               $("#tbpptopedido").dataTable().fnDestroy();
    //               $("#tablita-ppto").children().remove();

    //               let myArray = [];
    //               for (const property in res.data) {
    //                 let nu_correla = res.data[property].nu_correla;
    //                 let v_idlinea = res.data[property].v_idlinea;
    //                 let v_codprod = res.data[property].v_codprod;
    //                 let v_id_local = res.data[property].v_id_local;
    //                 let v_idppto = res.data[property].v_idppto;
    //                 let v_idpartida = res.data[property].v_idpartida;
    //                 let v_idmes = res.data[property].v_idmes;
    //                 let v_nombremes = res.data[property].v_nombremes;
    //                 let f_monto = res.data[property].f_monto;
    //                 let v_centrocosto = res.data[property].v_centrocosto;

    //                 let fila =
    //                   "<tr><td class='text-left'>" +
    //                   v_codprod +
    //                   "</td><td class='text-left'>" +
    //                   v_id_local +
    //                   "</td><td class='text-left'>" +
    //                   v_idppto +
    //                   "</td><td class='text-left'>" +
    //                   v_idpartida +
    //                   "</td><td class='text-left'>" +
    //                   v_idmes +
    //                   "</td><td class='text-left'>" +
    //                   v_nombremes +
    //                   "</td><td class='text-left'>" +
    //                   v_centrocosto +
    //                   "</td><td class='text-left'>" +
    //                   f_monto +
    //                   "</td><td><a id=" +
    //                   v_idlinea +
    //                   " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

    //                 let btn = document.createElement("tr");
    //                 btn.innerHTML = fila;
    //                 document.getElementById("tablita-ppto").appendChild(btn);
    //               }
    //               creardatatable("#tbpptopedido"); //perro
    //             }
    //           });
    //         }

    //       }
    //     });

    //   }
    // });
  });

  $('#close_ppto1').on('click', function () {
    var nu_correla = document.getElementById("nropedido").innerHTML;
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/MostrarPedido',
      data: { nu_correla: nu_correla },
      success: function (res) {
        console.log(res.data);

        console.log(res.data);
        countaci = Number(res.i_filas) + 1;
        document.getElementById("pptoadd").disabled = false;
        document.getElementById('nropedido').innerHTML = res.nu_correla;
        document.getElementById("nropedido").style.color = "#42DE0A";
        document.getElementById("idarea").innerHTML = res.v_areid;
        document.getElementById("area").innerHTML = res.v_area;
        $('#fecha').val(res.d_fecha);
        $('#fechaentrega').val(res.d_fechaentrega);
        $('#tipocambio').val(res.f_tipocambio);
        $('#nrophone').val(res.v_numerophone);
        $('#namepedido').val(res.v_nombrepedido);
        $("#encargadoestado").val(res.v_encargado);
        $("#estado").html("");
        $("#estado").append(res.FilasEstado);
        //tutan
        if (Number(res.i_idorden_aprobacion) != 0) {
          document.getElementById("btnguardar").disabled = true;
          document.getElementById("btnsendpedido").disabled = true;
          $('#customRadio1').prop('checked', true);
        } else {
          document.getElementById("btnguardar").disabled = false;
          document.getElementById("btnsendpedido").disabled = false;
          $('#customRadio1').prop('checked', false);
        }
        document.getElementById('resumentotal').innerHTML = res.f_importotal;
        document.getElementById('importepresupuesto').innerHTML = res.f_montoppto;


        $('#contactoentrega').val(res.v_persona_recepciona);
        $("#iddireccion").html("");
        $("#iddireccion").append(res.FilasDireccion);

        countaci = Number(res.i_filas) + 1;
        $("#example2").dataTable().fnDestroy();
        $("#tablita-aci").children().remove();

        let myArray = [];
        let v_color = '';
        for (const property in res.data) {
          let id = res.data[property].id;
          let item = res.data[property].Item;
          let nombre = res.data[property].Descripcion;
          let v_unidad = res.data[property].v_unidad;
          let qty = res.data[property].Cantidad;
          let price = res.data[property].Precio;
          let importe = res.data[property].Total;
          let v_note_detalle = res.data[property].v_note_detalle;
          let v_disabled = res.data[property].v_disabled;
          let v_id_local = res.data[property].v_id_local;
          let i_opcion = res.data[property].i_opcion;
          let v_centrocosto = res.data[property].v_centrocosto;
          let v_cuenta = res.data[property].v_cuenta;


          if (v_note_detalle == 'SI') {
            v_color = 'color:rgb(66,222,10)';
          } else {
            v_color = 'color:rgb(3,164,90)';
          }

          let fila =
            "<tr><td class='text-center'>" +
            id +
            "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

            "</td><td class='text-left'>" +
            item +
            "</td><td class='text-left'>" +
            nombre +
            "</td><td class='text-left'>" +
            v_id_local +
            "</td><td class='text-left'>" +
            v_centrocosto +
            "</td><td class='text-left'>" +
            v_cuenta +
            "</td><td class='text-left'>" +
            v_unidad +
            "</td><td class='text-left'>" +
            qty +
            "</td><td class='text-left'>" +
            price +
            "</td><td class='text-left'>" +
            importe +
            "</td><td><a id=" +
            item +
            " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
            "</td><td><a id=" +
            id +
            " class='btn btn-danger btn-sm text-white delete " + v_disabled + "'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-aci").appendChild(btn);
          myArray.push({ id: id, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
        }
        creardatatable("#example2");
        datosaci.splice(0, datosaci.length);
        datosaci = myArray;
        console.log(datosaci);
      }
    });

  });

  $('#close_ppto2').on('click', function () {
    var nu_correla = document.getElementById("nropedido").innerHTML;
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/MostrarPedido',
      data: { nu_correla: nu_correla },
      success: function (res) {

        // alert('Vuel a revisar');

        console.log(res.data);
        countaci = Number(res.i_filas) + 1;
        $("#example2").dataTable().fnDestroy();
        $("#tablita-aci").children().remove();

        let myArray = [];
        let v_color = '';
        for (const property in res.data) {
          let id = res.data[property].id;
          let item = res.data[property].Item;
          let nombre = res.data[property].Descripcion;
          let v_unidad = res.data[property].v_unidad;
          let qty = res.data[property].Cantidad;
          let price = res.data[property].Precio;
          let importe = res.data[property].Total;
          let v_note_detalle = res.data[property].v_note_detalle;
          let v_disabled = res.data[property].v_disabled;
          let v_id_local = res.data[property].v_id_local;
          let i_opcion = res.data[property].i_opcion;
          let v_centrocosto = res.data[property].v_centrocosto;
          let v_cuenta = res.data[property].v_cuenta;

          if (v_note_detalle == 'SI') {
            v_color = 'color:rgb(66,222,10)';
          } else {
            v_color = 'color:rgb(3,164,90)';
          }


          let fila =
            "<tr><td class='text-center'>" +
            id +
            "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

            "</td><td class='text-left'>" +
            item +
            "</td><td class='text-left'>" +
            nombre +
            "</td><td class='text-left'>" +
            v_id_local +
            "</td><td class='text-left'>" +
            v_centrocosto +
            "</td><td class='text-left'>" +
            v_cuenta +
            "</td><td class='text-left'>" +
            v_unidad +
            "</td><td class='text-left'>" +
            qty +
            "</td><td class='text-left'>" +
            price +
            "</td><td class='text-left'>" +
            importe +
            "</td><td><a id=" +
            item +
            " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
            "</td><td><a id=" +
            id +
            " class='btn btn-danger btn-sm text-white delete " + v_disabled + "'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-aci").appendChild(btn);
          myArray.push({ id: id, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
        }
        creardatatable("#example2");
        datosaci.splice(0, datosaci.length);
        datosaci = myArray;
        console.log(datosaci);
      }
    });

  });

  //#endregion

  //#region                                               (ACCIONES EN LA TABLA DETALLE DE ARCHIVOS)
  $('#close_pedido').on('click', function () {
    var nu_correla = document.getElementById("nropedido").innerHTML;
    $("#example2").dataTable().fnDestroy();
    $("#tablita-aci").children().remove();

    let myArray = [];
    let v_color = '';
    for (const property in datosaci) {
      let contador = datosaci[property].id;
      let item = datosaci[property].Item;
      let nombre = datosaci[property].Descripcion;
      let v_unidad = datosaci[property].Unidad;
      let qty = datosaci[property].Cantidad;
      let price = datosaci[property].Precio;
      let importe = datosaci[property].Total;
      let v_note_detalle = datosaci[property].v_note_detalle;
      let v_disabled = datosaci[property].v_disabled;
      let v_id_local = datosaci[property].v_id_local;
      let i_opcion = datosaci[property].i_opcion;
      let v_centrocosto = datosaci[property].v_centrocosto;
      let v_cuenta = datosaci[property].v_cuenta;

      if (v_note_detalle == 'SI') {
        v_color = 'color:rgb(66,222,10)';
      } else {
        v_color = 'color:rgb(3,164,90)';
      }



      let fila =
        "<tr><td class='text-center'>" +
        contador +
        "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

        "</td><td class='text-left'>" +
        item +
        "</td><td class='text-left'>" +
        nombre +
        "</td><td class='text-left'>" +
        v_id_local +
        "</td><td class='text-left'>" +
        v_centrocosto +
        "</td><td class='text-left'>" +
        v_cuenta +
        "</td><td class='text-left'>" +
        v_unidad +
        "</td><td class='text-left'>" +
        qty +
        "</td><td class='text-left'>" +
        price +
        "</td><td class='text-left'>" +
        importe +
        "</td><td><a id=" +
        item +
        " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete " + v_disabled + "'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-aci").appendChild(btn);
      myArray.push({ id: contador, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
    }

    creardatatable("#example2");

    console.log(datosaci);
    //CALCULAR
    var resumentotal = 0;
    $('#example2 tr').each(function () {
      var total = $(this).find("td").eq(10).html();
      if ((parseFloat(total)) > 0) {
        resumentotal = (parseFloat(resumentotal) + parseFloat(total));
      }
    });
    document.getElementById('resumentotal').innerHTML = resumentotal;


    // $.ajax({
    //   type: 'POST',
    //   url: '/pedidos/pedidos/MostrarPedido',
    //   data: { nu_correla: nu_correla },
    //   success: function (res) {
    //     console.log(res.data);
    //     countaci = Number(res.i_filas) + 1;
    //     $("#example2").dataTable().fnDestroy();
    //     $("#tablita-aci").children().remove();

    //     let myArray = [];
    //     for (const property in res.data) {
    //       let id = res.data[property].id;
    //       let item = res.data[property].Item;
    //       let nombre = res.data[property].Descripcion;
    //       let v_unidad = res.data[property].v_unidad;
    //       let qty = res.data[property].Cantidad;
    //       let price = res.data[property].Precio;
    //       let importe = res.data[property].Total;
    //       let v_disabled = res.data[property].v_disabled;

    //       let fila =
    //         "<tr><td class='text-center'>" +
    //         id +
    //         "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(66,222,10)'></span>" +

    //         "</td><td class='text-left'>" +
    //         item +
    //         "</td><td class='text-left'>" +
    //         nombre +
    //         "</td><td class='text-left'>" +
    //         v_unidad +
    //         "</td><td class='text-left'>" +
    //         qty +
    //         "</td><td class='text-left'>" +
    //         price +
    //         "</td><td class='text-left'>" +
    //         importe +
    //         "</td><td><a id=" +
    //         item +
    //         " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
    //         "</td><td><a id=" +
    //         id +
    //         " class='btn btn-danger btn-sm text-white delete " + v_disabled + "'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
    //       let btn = document.createElement("tr");
    //       btn.innerHTML = fila;
    //       document.getElementById("tablita-aci").appendChild(btn);
    //       myArray.push({ id: id, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });
    //     }
    //     creardatatable("#example2");
    //     datosaci.splice(0, datosaci.length);
    //     datosaci = myArray;
    //     console.log(datosaci);
    //   }
    // });


  });

  $('#close_pedido2').on('click', function () {
    var nu_correla = document.getElementById("nropedido").innerHTML;
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/MostrarPedido',
      data: { nu_correla: nu_correla },
      success: function (res) {

        // alert('Vuel a revisar');

        console.log(res.data);
        countaci = Number(res.i_filas) + 1;
        $("#example2").dataTable().fnDestroy();
        $("#tablita-aci").children().remove();

        let myArray = [];
        let v_color = '';
        for (const property in res.data) {
          let id = res.data[property].id;
          let item = res.data[property].Item;
          let nombre = res.data[property].Descripcion;
          let v_unidad = res.data[property].v_unidad;
          let qty = res.data[property].Cantidad;
          let price = res.data[property].Precio;
          let importe = res.data[property].Total;
          let v_note_detalle = res.data[property].v_note_detalle;
          let v_disabled = res.data[property].v_disabled;
          let v_id_local = res.data[property].v_id_local;
          let i_opcion = res.data[property].i_opcion;
          let v_centrocosto = res.data[property].v_centrocosto;
          let v_cuenta = res.data[property].v_cuenta;

          if (v_note_detalle == 'SI') {
            v_color = 'color:rgb(66,222,10)';
          } else {
            v_color = 'color:rgb(3,164,90)';
          }


          let fila =
            "<tr><td class='text-center'>" +
            id +
            "</td><td><span class='fa-solid fa-truck fa-beat'  style='" + v_color + "'></span>" +

            "</td><td class='text-left'>" +
            item +
            "</td><td class='text-left'>" +
            nombre +
            "</td><td class='text-left'>" +
            v_id_local +
            "</td><td class='text-left'>" +
            v_centrocosto +
            "</td><td class='text-left'>" +
            v_cuenta +
            "</td><td class='text-left'>" +
            v_unidad +
            "</td><td class='text-left'>" +
            qty +
            "</td><td class='text-left'>" +
            price +
            "</td><td class='text-left'>" +
            importe +
            "</td><td><a id=" +
            item +
            " class='btn btn-info btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
            "</td><td><a id=" +
            id +
            " class='btn btn-danger btn-sm text-white delete " + v_disabled + "'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-aci").appendChild(btn);
          myArray.push({ id: id, Item: item, Descripcion: nombre, v_id_local: v_id_local, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe, v_note_detalle: v_note_detalle, i_opcion: i_opcion, v_centrocosto: v_centrocosto, v_cuenta: v_cuenta });
        }
        creardatatable("#example2");
        datosaci.splice(0, datosaci.length);
        datosaci = myArray;
        console.log(datosaci);
      }
    });

  });

  $("#btnsubirfile").on("click", function () {
    var formData = new FormData();
    var files = $("#archivo")[0].files[0];
    var nropedido = document.getElementById("nropedido").innerHTML;
    var codprodnote = document.getElementById("codprodnote").innerHTML;
    var post = 0;
    var nombrefile = $('#descripcionfile').val();
    var v_nombre_file = "";

    if ((nombrefile == "" || nombrefile == null)) {
      $("#descripcionfile").focus();
      Swal.fire({
        icon: "warning",
        title: "INGRESAR DESCRIPCION PARA EL ARCHIVO",
        text: "",
        timer: 2400,
        timerProgressBar: true,
      })
      return;
    }

    if ((files == null)) {
      Swal.fire({
        title: 'CARGAR UN ARCHIVO DESDE LA OPCION (SELECCIONAR ARCHIVO)',
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    formData.append("archivo", files);
    formData.append("nombrefile", nombrefile);
    formData.append("nropedido", nropedido);
    formData.append("codprodnote", codprodnote);
    Swal.fire({
      title: "Estas seguro de subir el Archivo?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, subir!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: "/pedidos/pedidos/subir_archivos",
          type: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            if (res.icase == 1) {
              $.ajax({
                type: 'POST',
                url: '/pedidos/pedidos/MostrarFilePedido',
                data: { post: post, nropedido: nropedido, codprodnote: codprodnote, v_nombre_file: v_nombre_file },
                success: function (res) {
                  $("#tbarchivo").dataTable().fnDestroy();
                  $("#tablita-nota").children().remove();
                  let myArray = [];
                  for (const property in res.data) {
                    let nu_correla = res.data[property].nu_correla;
                    let item = res.data[property].v_codprod;
                    let descripcion = res.data[property].v_descripcion_file;
                    let icon = res.data[property].v_icon;
                    let color = res.data[property].v_color;
                    let tardwn = res.data[property].v_tardwn;
                    let tardwnname = res.data[property].v_tardwnname;
                    let url = res.data[property].v_url;
                    let nombre_file = res.data[property].v_nombre_file;

                    let fila =
                      "<tr><td class='text-left'>" +
                      nu_correla +
                      "</td><td class='text-left'>" +
                      item +
                      "</td><td class='text-left'>" +
                      descripcion +
                      // "</td><td class='text-center'><a download='mi-nombre-nuevo.mp3'  class='btn btn-" + color + " btn-sm' target='_blank' style='color:white' href='" + url + "'><span class='fa-solid fa-" + icon + "'><b></b></span></a></td>" +
                      "</td><td class='text-center'><a " + tardwn + "'" + tardwnname + "'  class='btn btn-" +
                      color + " btn-sm'  style='color:white' href='" + url + "'><span class='fa-solid fa-" +
                      icon + "'><b></b></span></a></td>" +
                      "</td><td class='text-center'><a id=" +
                      nombre_file +
                      " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                    let btnxx = document.createElement("tr");
                    btnxx.innerHTML = fila;
                    document.getElementById("tablita-nota").appendChild(btnxx);
                    myArray.push({ NroOrden: nu_correla, Item: item, url: url });
                  }

                  $('#descripcionfile').val('');
                  var $el = $("#archivo");
                  $el.wrap("<form>").closest("form").get(0).reset();
                  $el.unwrap();

                  creardatatable("#tbarchivo");
                }
              });

              // var tbarchivo = $("#tbarchivo").DataTable({
              //   destroy: true,
              //   lengthChange: true,
              //   responsive: true,
              //   autoWidth: false,
              //   language: {
              //     decimal: "",
              //     emptyTable: "No hay información",
              //     info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
              //     infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
              //     infoFiltered: "(Filtrado de _MAX_ total entradas)",
              //     infoPostFix: "",
              //     thousands: ",",
              //     lengthMenu: "Mostrar _MENU_ Entradas",
              //     loadingRecords: "Cargando...",
              //     processing: "Procesando...",
              //     search: "Buscar:",
              //     zeroRecords: "Sin resultados encontrados",
              //     paginate: {
              //       first: "Primero",
              //       last: "Ultimo",
              //       next: "Siguiente",
              //       previous: "Anterior",
              //     },
              //   },
              //   ajax: {
              //     type: 'POST',
              //     url: '/pedidos/pedidos/MostrarFilePedido',
              //     data: { nropedido: nropedido, codprodnote: codprodnote },
              //   },

              //   columns: [
              //     { data: "nu_correla" },
              //     { data: "v_codprod" },
              //     { data: "v_descripcion_file" },
              //   ],
              //   order: [[0, "asc"]],
              // });

              Swal.fire({
                icon: res.vicon,
                title: res.vtitle,
                text: res.vtext,
                timer: res.itimer,
                timerProgressBar: res.vprogressbar,
                showCancelButton: false,
                showConfirmButton: false,
              });

            } else {
              Swal.fire({
                icon: res.vicon,
                title: res.vtitle,
                text: res.vtext,
                timer: res.itimer,
                timerProgressBar: res.vprogressbar,
                showCancelButton: false,
                showConfirmButton: false,
              });
            }
          },
        });
      }
    });

  });

  $("#tbarchivo tbody").on("click", "a.delete", function () {
    let v_nombre_file = $(this).attr("id");
    Swal.fire({
      title: "Estas seguro de eliminar la Fila?",
      text: "Se eliminar el archivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Procesar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        var post = 0;
        var nropedido = document.getElementById("nropedido").innerHTML;
        var codprodnote = document.getElementById("codprodnote").innerHTML;
        $.ajax({
          type: 'POST',
          url: '/pedidos/pedidos/eliminar_fila_archivo',
          data: { post: post, nropedido: nropedido, codprodnote: codprodnote, v_nombre_file: v_nombre_file },
          success: function (res) {
            if (res.respuesta == 1) {
              var post = 0;
              $.ajax({
                type: 'POST',
                url: '/pedidos/pedidos/MostrarFilePedido',
                data: { post: post, nropedido: nropedido, codprodnote: codprodnote, v_nombre_file: v_nombre_file },
                success: function (res) {

                  console.log(res.data);
                  $("#tbarchivo").dataTable().fnDestroy();
                  $("#tablita-nota").children().remove();

                  let myArray = [];
                  for (const property in res.data) {
                    let nu_correla = res.data[property].nu_correla;
                    let item = res.data[property].v_codprod;
                    let descripcion = res.data[property].v_descripcion_file;
                    let icon = res.data[property].v_icon;
                    let color = res.data[property].v_color;
                    let tardwn = res.data[property].v_tardwn;
                    let tardwnname = res.data[property].v_tardwnname;
                    let url = res.data[property].v_url;
                    let nombre_file = res.data[property].v_nombre_file;

                    let fila =
                      "<tr><td class='text-left'>" +
                      nu_correla +
                      "</td><td class='text-left'>" +
                      item +
                      "</td><td class='text-left'>" +
                      descripcion +
                      "</td><td class='text-center'><a " + tardwn + "'" + tardwnname + "'  class='btn btn-" +
                      color + " btn-sm'  style='color:white' href='" + url + "'><span class='fa-solid fa-" +
                      icon + "'><b></b></span></a></td>" +
                      "</td><td class='text-center'><a id=" +
                      nombre_file +
                      " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                    let btn = document.createElement("tr");
                    btn.innerHTML = fila;
                    document.getElementById("tablita-nota").appendChild(btn);
                  }
                  creardatatable("#tbarchivo");
                  $('#descripcionfile').val('');
                  var $el = $("#archivo");
                  $el.wrap("<form>").closest("form").get(0).reset();
                  $el.unwrap();
                }
              });
            }
          }
        });
      }
    });
  });

  //#endregion 

});




$('#cancelar').on('click', function () {
  location.href = "https://verdum.com/pedidos/pedidos/realizarpedido/index";
});


function Habilitar(valor) {
  document.getElementById("ENERO").disabled = valor;
  document.getElementById("FEBRERO").disabled = valor;
  document.getElementById("MARZO").disabled = valor;
  document.getElementById("ABRIL").disabled = valor;
  document.getElementById("MAYO").disabled = valor;
  document.getElementById("JUNIO").disabled = valor;
  document.getElementById("JULIO").disabled = valor;
  document.getElementById("AGOSTO").disabled = valor;
  document.getElementById("SEPTIEMBRE").disabled = valor;
  document.getElementById("OCTUBRE").disabled = valor;
  document.getElementById("NOVIEMBRE").disabled = valor;
  document.getElementById("DICIEMBRE").disabled = valor;
}


function creardatatable(nombretabla) {
  var tabla = $(nombretabla).dataTable({
    lengthChange: true,
    responsive: true,
    autoWidth: false,
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    order: [[0, "asc"]],
    lengthMenu: [
      [50, 100, 150, -1],
      ["50", "100", "150", "Todo"],
    ],
  });
  return tabla;
}


// padres
function navegacionmenu(string) {
  $.ajax({
    type: "POST",
    url: "/pedidos/dashboard/cambiarsession",
    data: { string: string },
  });
  var dato = ""; //cerrado
  $.ajax({
    type: "POST",
    url: "/pedidos/dashboard/cambiaropen",
    data: { string: dato },
  });
}

// hijos
function clicksub(string) {
  $.ajax({
    type: "POST",
    url: "/pedidos/dashboard/cambiarsessionsub",
    data: { string: string },
  });
  var dato = "open"; //cerrado
  $.ajax({
    type: "POST",
    url: "/pedidos/dashboard/cambiaropen",
    data: { string: dato },
  });
}