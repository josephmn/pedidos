$(function () {
  creardatatable("#tbcotizacion");
  creardatatable("#tbpedidos");


  $("#carousel-example-generic").append(
    " <ol class='carousel-indicators'>\
    <li data-target='#carousel-example-generic' data-slide-to='0' class='active'></li>\
    <li data-target='#carousel-example-generic' data-slide-to='1'></li>\
    <li data-target='#carousel-example-generic' data-slide-to='2'></li>\
      </ol >\
    <div class='carousel-inner' role='listbox'>\
      <div class='carousel-item active'>\
        <img class='img-fluid' src='../public/dist/img/Productosss.jpg' alt='First slide' />\
      </div>\
      <div class='carousel-item'>\
        <img class='img-fluid' src='../public/dist/img/Inicio.jpeg' alt='Second slide' />\
      </div>\
      <div class='carousel-item'>\
        <img class='img-fluid' src='../public/dist/img/Productsssos.jpg' alt='Third slide' />\
      </div>\
    </div>\
    <a class='carousel-control-prev' href='#carousel-example-generic' role='button' data-slide='prev'>\
      <span class='carousel-control-prev-icon' aria-hidden='true'></span>\
      <span class='sr-only'>Previous</span>\
    </a>\
    <a class='carousel-control-next' href='#carousel-example-generic' role='button' data-slide='next'>\
      <span class='carousel-control-next-icon' aria-hidden='true'></span>\
      <span class='sr-only'>Next</span>\
    </a> "
  );

  document.getElementById('titulo_avance').innerHTML = "";


  $("#tbpedidos tbody").on("click", "a.revisar", function () {
    var i_estado = $("#estado").val();
    var nu_correla = $(this).attr("id");
    document.getElementById('nropedido').innerHTML = nu_correla;
    document.getElementById("nropedido").style.color = "green";
    $.ajax({
      type: "POST",
      url: "/pedidos/pedidoaprobado/MostrarTimelinePedido",
      data: { nu_correla: nu_correla, i_estado: i_estado },
      beforeSend: function () {
        $("#div-load").html("");
        $("#div-load").append(
          "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-success' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        console.log(res.data);
        $("#div-load").html("");
        $("#idtimeline").html("");
        $("#idico").html("");

        $("#xproveedor").html("");
        $("#xproveedor").append(res.FilascomboProveedor);

        let myArray = [];
        for (const property in res.data) {
          let nu_correla = res.data[property].nu_correla;
          let i_idorden = res.data[property].i_idorden;
          let v_aprobador_uno = res.data[property].v_aprobador_uno;
          let v_color_fase = res.data[property].v_color_fase;
          let v_nombre_estado = res.data[property].v_nombre_estado;
          let v_botones_aprobacion = res.data[property].v_botones_aprobacion;
          let v_descripcion_aprobador = res.data[property].v_descripcion_aprobador;
          let d_fecha_registrotrk = res.data[property].d_fecha_registrotrk;
          let v_botones_final = res.data[property].v_botones_final;
          let v_botones_cotizacion = res.data[property].v_botones_cotizacion;

          $("#idtimeline").append(
            "<li class='timeline-item'>\
              <span class='timeline-point timeline-point-"+ v_color_fase + " timeline-point-indicator'></span >\
              <div class='timeline-event'>\
                <div class='d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1'>\
                  <h6> <strong>"+ i_idorden + ".&nbsp;" + v_aprobador_uno + " </strong> </h6>\
                  <div class='col-sm-4'>\
                    <h6  class='badge badge-pill badge-"+ v_color_fase + "'>" + v_nombre_estado + "</h6>\
                    <span class='timeline-event-time'><strong>"+ d_fecha_registrotrk + "</strong></span>\
                  </div>\
                </div>\
                <p>"+ v_descripcion_aprobador + "</p>\
                <div class='media align-items-center'>\
                </div>\ " +
            v_botones_cotizacion + " \
            </div>\ " +
            v_botones_final + " \
            </div >\
          </li > "
          );
        }
        $("#carousel-example-generic").html("")
        document.getElementById('titulo_avance').innerHTML = "<b>APROBACION COMPLETADA(%)</b>";
        document.getElementById('idpedidocotizacion').innerHTML = nu_correla;

        $("#idico").append(
          "<i class='fa-solid fa-hourglass fa-spin'></i>"
        );

        $("#support-tracker-chart").html("");
        var numero = parseInt(res.f_porcentaje);
        var $avgSessionStrokeColor2 = '#ebf0f7';
        var $textHeadingColor = '#5e5873';
        var $white = '#fff';
        var $strokeColor = '#ebe9f1';
        var $supportTrackerChart = document.querySelector('#support-tracker-chart');
        var supportTrackerChartOptions;
        var gainedChart;
        var orderChart;
        var avgSessionsChart;
        var supportTrackerChart;
        var salesVisitChart;
        var isRtl = $('html').attr('data-textdirection') === 'rtl';

        supportTrackerChartOptions = {
          chart: {
            height: 200,
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              size: 150,
              offsetY: 20,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: '65%'
              },
              track: {
                background: $white,
                strokeWidth: '100%'
              },
              dataLabels: {
                name: {
                  offsetY: -5,
                  color: $textHeadingColor,
                  fontSize: '1rem'
                },
                value: {
                  offsetY: 15,
                  color: $textHeadingColor,
                  fontSize: '1.714rem'
                }
              }
            }
          },
          colors: [window.colors.solid.danger],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: [window.colors.solid.primary],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
            }
          },
          stroke: {
            dashArray: 8
          },
          series: [numero],
          labels: ['Completo']
        };
        supportTrackerChart = new ApexCharts($supportTrackerChart, supportTrackerChartOptions);
        supportTrackerChart.render();
      },
    });
  });

  // PARA LISTAR LAS PROVINCIAS
  $("#estado").change(function () {
    var i_estado = $("#estado").val();
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidoaprobado/ListadoAprobacionesPedido',
      data: { i_estado: i_estado },

      beforeSend: function () {
        $("#div-load1").html("");
        $("#div-load1").append(
          "<div id='div-load1'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-primary' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },

      success: function (res) {
        document.getElementById('nropedido').innerHTML = null;
        $("#div-load").html("");
        $("#idtimeline").html("");
        $("#idico").html("");
        $("#circle-container").html("");


        $("#div-load1").html("");
        console.log(res.data);
        $("#tbpedidos").dataTable().fnDestroy();
        $("#tablita-apro").children().remove();
        for (const property in res.data) {
          let nu_correla = res.data[property].nu_correla;
          let v_nombrepedido = res.data[property].v_nombrepedido;
          let v_nombrearea = res.data[property].v_nombrearea;
          let v_moneda = res.data[property].v_moneda;
          let d_fecha = res.data[property].d_fecha;
          let nu_total = res.data[property].nu_total;
          let f_porcentaje = res.data[property].f_porcentaje;
          let v_color_porcentaje = res.data[property].v_color_porcentaje;

          let fila =
            "<tr><td class='text-left'>" +
            "<div class='media'>\
              <div class='avatar bg-light-success mr-0'>\
                <div class='avatar-content'>\
                    <i class='fa-solid fa-truck-fast'></i>\
                </div>\
              </div>\
              <div class='media-body my-auto'>\
                <h5 class='font-weight-bolder mb-0'> &nbsp; "+ nu_correla + " </h5>\
            </div>\
            </div>"
            +
            "</td><td class='text-left'><strong>" +
            v_nombrepedido +
            "</strong> </td><td class='text-left'><strong>" +
            v_nombrearea +
            "</strong> </td><td class='text-left'><strong>" +
            v_moneda +
            "</strong> </td><td class='text-left'>" +
            d_fecha +
            "</td><td class='text-left'>" +
            nu_total +
            "</td><td class='text-left'>" +

            " <span class='badge badge-glow badge-" + v_color_porcentaje + " '> " + f_porcentaje + " %</span>\
            <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-trending-up text-success font-medium-2'>\
                <polyline points='23 6 13.5 15.5 8.5 10.5 1 18'></polyline>\
                <polyline points='17 6 23 6 23 12'></polyline>\
            </svg>"
            +
            "</td><td><a" +
            " <a href='http://localhost/pedidos/aprobarpedido/documentopedido/" + nu_correla + "' class='btn btn-danger btn-sm bol' target='_blank' style='color:white'><i class='fas fa-file-pdf fa-beat'></i></a>"
            +
            "</td><td><a id=" +
            nu_correla +
            " class='btn btn-primary btn-sm text-white revisar'><span class='fa-solid fa-eye fa-beat'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-apro").appendChild(btn);
        }
        creardatatable("#tbpedidos");
      }
    });
  });

  $("#btnproveedor").on("click", function () {
    var formData = new FormData();
    var files = $("#archivo")[0].files[0];
    var nropedido = document.getElementById("nropedido").innerHTML;
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var post = 0;
    var nombrefile = $('#descripcionfile').val();
    var v_nombre_file = "";
    var v_vendid = $('#xproveedor  option:selected').val();


    if ((v_vendid == "XXXXXXX" || v_vendid == null)) {
      $("#xproveedor").focus();
      Swal.fire({
        title: 'SELECCIONAR UN PROVEEDOR',
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


    $.ajax({
      url: "/pedidos/pedidoaprobado/agregar_proveedor_solped",
      type: "POST",
      data: {
        nropedido: nropedido,
        v_vendid: v_vendid
      },
      success: function (res) {
        console.log(res.vicon);
        Swal.fire({
          icon: res.vicon,
          title: res.vtitle,
          text: res.vtext,
          timer: res.itimer,
          timerProgressBar: res.vprogressbar,
          showCancelButton: false,
          showConfirmButton: false,
        });
      },
    });

  });

  $("#btnsubirfile").on("click", function () {
    var formData = new FormData();
    var files = $("#archivo")[0].files[0];
    var nropedido = document.getElementById("nropedido").innerHTML;
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var post = 0;
    var nombrefile = $('#descripcionfile').val();
    var v_nombre_file = "";
    var v_vendid = $('#xproveedor  option:selected').val();

    var i_proveedor_final = 0; //document.getElementById("customCheck1").checked;

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

    if ((v_vendid == "XXXXXXX" || v_vendid == null)) {
      $("#xproveedor").focus();
      Swal.fire({
        title: 'SELECCIONAR UN PROVEEDOR',
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
    formData.append("v_vendid", v_vendid);
    formData.append("i_proveedor_final", Number(i_proveedor_final));


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
          url: "/pedidos/pedidoaprobado/subir_archivos_cotizacion",
          type: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res.vicon);
            if (res.icase == 1) {
              $.ajax({
                type: 'POST',
                url: "/pedidos/pedidoaprobado/MostrarPedidoCotizacion",
                data: { nu_correla: nu_correla },
                success: function (res) {

                  $("#tbcotizacion").dataTable().fnDestroy();
                  $("#tablita-coti").children().remove();
                  for (const property in res.filascotizacion) {
                    let nu_correla = res.filascotizacion[property].nu_correla;
                    let descripcion = res.filascotizacion[property].v_descripcion_file;
                    let icon = res.filascotizacion[property].v_icon;
                    let color = res.filascotizacion[property].v_color;
                    let tardwn = res.filascotizacion[property].v_tardwn;
                    let tardwnname = res.filascotizacion[property].v_tardwnname;
                    let url = res.filascotizacion[property].v_url;
                    let nombre_file = res.filascotizacion[property].v_nombre_file;
                    let v_vendid = res.filascotizacion[property].v_vendid;

                    let fila =
                      "<tr><td class='text-left'>\
                      <div class='media'>\
                          <div class='avatar bg-light-success mr-0'>\
                              <div class='avatar-content'>\
                                  <i class='fa-solid fa-building'></i>\
                              </div>\
                          </div>\
                          <div class='media-body my-auto'>\
                              <h6 class='font-weight-bolder mb-0'> "+ v_vendid + "</h6>\
                          </div>\
                      </div>"
                      +
                      "</td><td class='text-left'>\
                      <div class='media'>\
                          <div class='avatar bg-light-" +
                      color + " mr-0'>\
                              <div class='avatar-content'>\
                              <i class='fa-solid fa-" +
                      icon + "'></i>\
                              </div>\
                          </div>\
                          <div class='media-body my-auto'>\
                              <h6 class='font-weight-bolder mb-0'> &nbsp;"+ descripcion + "</h6>\
                          </div>\
                      </div>"+
                      "</td><td class='text-left'><strong>" +
                      nombre_file +
                      "</strong> </td><td class='text-center'><a " + tardwn + "'" + tardwnname + "'  class='btn btn-" +
                      color + " btn-sm'  style='color:white' href='" + url + "'><span class='fa-solid fa-" +
                      icon + "'><b></b></span></a></td>" +
                      "</td><td class='text-center'><a id=" +
                      nombre_file +
                      " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                    let btn = document.createElement("tr");
                    btn.innerHTML = fila;
                    document.getElementById("tablita-coti").appendChild(btn);
                  }

                  $('#descripcionfile').val('');
                  var $el = $("#archivo");
                  $el.wrap("<form>").closest("form").get(0).reset();
                  $el.unwrap();

                  creardatatable("#tbcotizacion");
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

});

function DibujarGrafico() {
  Highcharts.chart('container', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Avance<br>Aprobaciones<br>',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [
        ['Avance 60%', 60],
        ['Pendiente 40%', 40],

      ]
    }]
  });
}


function checkInput(r) {
  var nu_correla = document.getElementById("nropedido").innerHTML;
  var respuesta = r.value;
  var v_ruc = '';

  if (respuesta == "Generar Orden de Compra") {
    var post = 0;

    Swal.fire({
      title: "Seguro de generar una orden de Compra ?",
      text: "Se generará la orden con los datos de la SOLPED",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Procesar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: '/pedidos/pedidoaprobado/ProcesoPedidoSolomon',
          data: {
            post: post,
            nu_correla: nu_correla,
            v_ruc: v_ruc
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

            $("#modal-insert").modal("hide");

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
              location.reload();
              clearInterval(id);
            }, res.itimer);
          }
        });
      }
    });
  }

  if (respuesta == "Generar Orden de Servicio") {
    var post = 1;

    Swal.fire({
      title: "Seguro de generar una orden de Compra ?",
      text: "Se generará la orden con los datos de la SOLPED",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Procesar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: '/pedidos/pedidoaprobado/ProcesoPedidoSolomon',
          data: {
            post: post,
            nu_correla: nu_correla,
            v_ruc: v_ruc
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

            $("#modal-insert").modal("hide");

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
              location.reload();
              clearInterval(id);
            }, res.itimer);
          }
        });
      }
    });
  }

  if (respuesta == "Cotizaciones y Proveedor") {
    $("#modal-cotizacion").modal("show");

    let count = 0;
    $('#modal-cotizacion').on('shown.bs.modal', function () {
      count = count + 1;
      if (count == 1) {

        // PARA TABLA DE COTIZACION
        $("#tbcotizacion").dataTable().fnDestroy();
        $("#tablita-coti").children().remove();

        $.ajax({
          type: "POST",
          url: "/pedidos/pedidoaprobado/MostrarPedidoCotizacion",
          data: { nu_correla: nu_correla },
          success: function (res) {

            for (const property in res.filascotizacion) {
              let nu_correla = res.filascotizacion[property].nu_correla;
              let descripcion = res.filascotizacion[property].v_descripcion_file;
              let icon = res.filascotizacion[property].v_icon;
              let color = res.filascotizacion[property].v_color;
              let tardwn = res.filascotizacion[property].v_tardwn;
              let tardwnname = res.filascotizacion[property].v_tardwnname;
              let url = res.filascotizacion[property].v_url;
              let nombre_file = res.filascotizacion[property].v_nombre_file;
              let v_vendid = res.filascotizacion[property].v_vendid;

              let fila =
                "<tr><td class='text-left'>\
                <div class='media'>\
                    <div class='avatar bg-light-success mr-0'>\
                        <div class='avatar-content'>\
                            <i class='fa-solid fa-building'></i>\
                        </div>\
                    </div>\
                    <div class='media-body my-auto'>\
                        <h6 class='font-weight-bolder mb-0'> "+ v_vendid + "</h6>\
                    </div>\
                </div>"
                +
                "</td><td class='text-left'>\
                <div class='media'>\
                    <div class='avatar bg-light-" +
                color + " mr-0'>\
                        <div class='avatar-content'>\
                        <i class='fa-solid fa-" +
                icon + "'></i>\
                        </div>\
                    </div>\
                    <div class='media-body my-auto'>\
                        <h6 class='font-weight-bolder mb-0'> &nbsp;"+ descripcion + "</h6>\
                    </div>\
                </div>"+
                "</td><td class='text-left'><strong>" +
                nombre_file +
                "</strong> </td><td class='text-center'><a " + tardwn + "'" + tardwnname + "'  class='btn btn-" +
                color + " btn-sm'  style='color:white' href='" + url + "'><span class='fa-solid fa-" +
                icon + "'><b></b></span></a></td>" +
                "</td><td class='text-center'><a id=" +
                nombre_file +
                " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

              let btn = document.createElement("tr");
              btn.innerHTML = fila;
              document.getElementById("tablita-coti").appendChild(btn);
            }

            creardatatable("#tbcotizacion");
          },
        });
      }

    });




  }



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