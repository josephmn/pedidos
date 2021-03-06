$(function () {
  creardatatable("#tbarchivo");
  var table = $("#tbpedidos").DataTable({
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
    order: [
      [0, "asc"],
    ],
    lengthMenu: [
      [25, 50, 100, -1],
      ["25", "50", "100", "Todo"],
    ],
  });

  $("#carousel-example-generic").append(
    " <ol class='carousel-indicators'>\
    <li data-target='#carousel-example-generic' data-slide-to='0' class='active'></li>\
    <li data-target='#carousel-example-generic' data-slide-to='1'></li>\
    <li data-target='#carousel-example-generic' data-slide-to='2'></li>\
      </ol >\
    <div class='carousel-inner' role='listbox'>\
      <div class='carousel-item active'>\
        <img class='img-fluid' src='../pedidos/public/dist/img/Productosss.jpg' alt='First slide' />\
      </div>\
      <div class='carousel-item'>\
        <img class='img-fluid' src='../pedidos/public/dist/img/Inicio.jpeg' alt='Second slide' />\
      </div>\
      <div class='carousel-item'>\
        <img class='img-fluid' src='../pedidos/public/dist/img/Productsssos.jpg' alt='Third slide' />\
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
      url: "/pedidos/aprobarpedido/MostrarTimelinePedido",
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

          $("#idtimeline").append(
            "<li class='timeline-item'>\
              <span class='timeline-point timeline-point-"+ v_color_fase + " timeline-point-indicator'></span >\
              <div class='timeline-event'>\
                <div class='d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1'>\
                  <h6> <strong>"+ i_idorden + ".&nbsp;" + v_aprobador_uno + " </strong> </h6>\
                  <div class='col-sm-5'>\
                    <h6  class='badge badge-pill badge-"+ v_color_fase + "'>" + v_nombre_estado + "</h6>\
                    <span class='timeline-event-time'><strong>"+ d_fecha_registrotrk + "</strong></span>\
                  </div>\
                </div>\
                <p>"+ v_descripcion_aprobador + "</p>\
                <div class='media align-items-center'>\
                </div>\ " +
            v_botones_aprobacion + " \
            </div >\
          </li > "
          );
        }

        $("#carousel-example-generic").html("")

        $("#idico").append(
          "<i class='fa-solid fa-hourglass fa-spin'></i>"
        );
        document.getElementById('titulo_avance').innerHTML = "<b>AVANCE DE APROBACION(%)</b>";

        var numero = parseInt(res.f_porcentaje) / 100;


        $("#circle-container").html("");

        var circleBar = new ProgressBar.Circle("#circle-container", {
          color: "white",
          strokeWidth: 4,
          trailWidth: 25,
          trailColor: "black",
          easing: "easeInOut",
          from: { color: "#F32C1E", width: 24 },
          to: { color: "#03b300", width: 25 },
          text: {
            value: '0',
            className: 'progress-text',
            style: {
              color: 'black',
              position: 'absolute',
              top: '45%',
              left: '42%',
              padding: 0,
              margin: 0,
              transform: null
            }
          },
          step: (state, shape) => {
            shape.path.setAttribute("stroke", state.color);
            shape.path.setAttribute("stroke-width", state.width);
            shape.setText(Math.round(numero * 100) + ' %');
            console.log(shape.value());
          }
        });
        circleBar.animate(numero, {
          duration: 1250
        });
        console.log(circleBar);
      },
    });
  });

  // PARA LISTAR LAS PROVINCIAS
  $("#estado").change(function () {
    var i_estado = $("#estado").val();
    $.ajax({
      type: 'POST',
      url: '/pedidos/aprobarpedido/ListadoAprobacionesPedido',
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
                <h5 class='font-weight-bolder mb-0'>"+ nu_correla + " </h5>\
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
            " <a href='https://verdum.com/pedidos/aprobarpedido/documentopedido/" + nu_correla + "' class='btn btn-danger btn-sm bol' target='_blank' style='color:white'><i class='fas fa-file-pdf fa-beat'></i></a>"
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


  $("#btnguardaretorno").on("click", function () { //aqui ppto
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var post = 0;

    let v_comentario
    v_comentario = $("#notadescripcion").val();

    if (v_comentario == "" || v_comentario == null) {
      $("#notadescripcion").focus();
      Swal.fire({
        title: "INGRESE UN MOTIVO",
        timer: 2500,
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

    Swal.fire({
      title: "Seguro de enviar para su Modificacion ?",
      text: "Se enviara paso anterior para su cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Retornar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: '/pedidos/aprobarpedido/ProcesoRetornoPedido',
          data: {
            post: post,
            nu_correla: nu_correla,
            v_comentario: v_comentario
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
              }, res.itimer);
            }
            else {
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
              }, res.itimer);
            }
          }
        });
      }
    });

  });



  $("#btncancelaretorno").on("click", function () { //aqui ppto
    $("#modal-retorno").modal('hide');
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


  // Highcharts.chart('container', {
  //   chart: {
  //     plotBackgroundColor: null,
  //     plotBorderWidth: null,
  //     plotShadow: false,
  //     type: 'pie'
  //   },
  //   title: {
  //     text: 'Browser market shares in January, 2018'
  //   },
  //   tooltip: {
  //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //   },
  //   accessibility: {
  //     point: {
  //       valueSuffix: '%'
  //     }
  //   },
  //   plotOptions: {
  //     pie: {
  //       allowPointSelect: true,
  //       cursor: 'pointer',
  //       dataLabels: {
  //         enabled: true,
  //         format: '<b>{point.name}</b>: {point.percentage:.1f} %'
  //       }
  //     }
  //   },
  //   series: [{
  //     name: 'Brands',
  //     colorByPoint: true,
  //     data: [{
  //       name: 'Chrome',
  //       y: 0,
  //       sliced: true,
  //       selected: true
  //     }, {
  //       name: 'Internet Explorer',
  //       y: 100
  //     },
  //     ]
  //   }]
  // });
}


function checkInput(r) {
  var nu_correla = document.getElementById("nropedido").innerHTML;
  var post = 0;
  var respuesta = r.value;

  if (respuesta == "Aprobar") {

    Swal.fire({
      title: "Seguro de enviar para su Aprobacion ?",
      text: "Se enviara para su Aprobacion de las Jefaturas",
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
          url: '/pedidos/aprobarpedido/ProcesoAprobacionPedido',
          data: {
            post: post,
            nu_correla: nu_correla
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
              }, res.itimer);
            }
            else {
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
              }, res.itimer);
            }
          }
        });
      }
    });
  }



  if (respuesta == "Rechazar") {

    // $("#modal-retorno").modal("show");
    // Swal.fire({
    //   title: "Seguro de Rechazar el pedido?",
    //   text: "Pedido sera Rechazado",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#61C250",
    //   cancelButtonColor: "#ea5455",
    //   confirmButtonText: "Si, Rechazar!",
    //   cancelButtonText: "No",
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     // $.ajax({
    //     //   type: 'POST',
    //     //   url: '/pedidos/pedidos/eliminar_fila_ppto',
    //     //   data: { nu_correla: nu_correla, v_idlinea: v_idlinea },
    //     //   success: function (res) {

    //     //     if (res.respuesta == 1) {
    //     //       $.ajax({
    //     //         type: 'POST',
    //     //         url: '/pedidos/pedidos/Mostrar_pedido_ppto',
    //     //         data: { nu_correla: nu_correla },
    //     //         success: function (res) {

    //     //           $("#tbpptopedido").dataTable().fnDestroy();
    //     //           $("#tablita-ppto").children().remove();

    //     //           let myArray = [];
    //     //           for (const property in res.data) {
    //     //             let nu_correla = res.data[property].nu_correla;
    //     //             let v_idlinea = res.data[property].v_idlinea;
    //     //             let v_idppto = res.data[property].v_idppto;
    //     //             let v_idpartida = res.data[property].v_idpartida;
    //     //             let v_idmes = res.data[property].v_idmes;
    //     //             let v_nombremes = res.data[property].v_nombremes;
    //     //             let f_monto = res.data[property].f_monto;
    //     //             let v_centrocosto = res.data[property].v_centrocosto;

    //     //             let fila =
    //     //               "<tr><td class='text-center'>" +
    //     //               nu_correla +
    //     //               "</td><td class='text-left'>" +
    //     //               v_idppto +
    //     //               "</td><td class='text-left'>" +
    //     //               v_idpartida +
    //     //               "</td><td class='text-left'>" +
    //     //               v_idmes +
    //     //               "</td><td class='text-left'>" +
    //     //               v_nombremes +
    //     //               "</td><td class='text-left'>" +
    //     //               f_monto +
    //     //               "</td><td class='text-left'>" +
    //     //               v_centrocosto +
    //     //               "</td><td><a id=" +
    //     //               v_idlinea +
    //     //               " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

    //     //             let btn = document.createElement("tr");
    //     //             btn.innerHTML = fila;
    //     //             document.getElementById("tablita-ppto").appendChild(btn);
    //     //           }
    //     //           creardatatable("#tbpptopedido"); //perro
    //     //         }
    //     //       });
    //     //     }

    //     //   }
    //     // });

    //   }
    // });
  }

  if (respuesta == "Retornar") {
    $("#modal-retorno").modal("show");
  }

  if (respuesta == "Ver Archivos") {
    $("#modal-file").modal("show");

    var post = 3;
    var nropedido = document.getElementById("nropedido").innerHTML;
    var codprodnote = "";
    var v_nombre_file = "";


    $("#tbarchivo").dataTable().fnDestroy();
    $("#tablita-nota").children().remove();

    let count = 0;
    $('#modal-file').on('shown.bs.modal', function () {
      count = count + 1;
      if (count == 1) {
        $.ajax({
          type: 'POST',
          url: '/pedidos/aprobarpedido/MostrarFilePedido',
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
                icon + "'><b></b></span></a></td></tr>";


              let btn = document.createElement("tr");
              btn.innerHTML = fila;
              document.getElementById("tablita-nota").appendChild(btn);

            }

            creardatatable("#tbarchivo");
          }
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