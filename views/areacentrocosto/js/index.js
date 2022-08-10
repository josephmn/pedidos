$(function () {

  creardatatable("#tbgrupo");
  creardatatable("#tbarea");


  $("#btnagregar").on("click", function () {
    let v_id_grupo = '00';
    document.getElementById("titulomodal").innerHTML = "CREAR GRUPO";
    $('#xid').val('Nuevo');
    $('#xnombres').val('');
    $("#modal-agregar").modal("show");
    $('#modal-agregar').on('shown.bs.modal', function () {

      $.ajax({
        type: 'POST',
        url: '/pedidos/grupopedido/Consultar_grupo',
        data: {
          v_id_grupo: v_id_grupo
        },
        beforeSend: function () {
          $("#div-load").html("");
          $("#div-load").append(
            "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
          );
        },
        success: function (res) {
          $("#div-load").html("");
          $("#xestado").html("");
          $("#xestado").append(res.FilascomboEstado);
        }
      });
      $("#xnombres").focus();
    });
  });


  $("#tbgrupo tbody").on("click", "a.editar", function () {

    let v_id_grupo = $(this).attr("id");
    document.getElementById("titulomodal").innerHTML = "EDITAR GRUPO";
    $.ajax({
      type: 'POST',
      url: '/pedidos/grupopedido/Consultar_grupo',
      data: {
        v_id_grupo: v_id_grupo
      },
      beforeSend: function () {
        $("#div-load").html("");
        $("#div-load").append(
          "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        $("#div-load").html("");
        $('#xid').val(res.v_id_grupo.replace("&Ntilde;", "Ñ"));
        $('#xnombres').val(res.v_descripcion.replace("&Ntilde;", "Ñ"));


        $("#xestado").html("");
        $("#xestado").append(res.FilascomboEstado);

      }
    });
    $("#modal-agregar").modal("show");
    $('#modal-agregar').on('shown.bs.modal', function () {
      $("#xnombres").focus();
    });

  });





  $("#btnagregararea").on("click", function () {
    document.getElementById("titulomodalarea").innerHTML = "CREAR AREA";
    // $('#xid').val('Nuevo');
    // $('#xnombres').val('');
    $("#modal-area").modal("show");
    $('#modal-area').on('shown.bs.modal', function () {
      // $("#xnombres").focus();
    });
  });


  $('#xbtnguardar').on('click', function () {
    var post = 0;
    var v_id_grupo = $('#xid').val();
    var v_descripcion = $('#xnombres').val();
    var i_estado =  $('#xestado').val();;


    //Solo validacion        
    if ((v_descripcion == '' || v_descripcion == null)) {
      $("#xnombres").focus();
      Swal.fire({
        title: "INGRESAR NOMBRE DE GRUPO",
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

    Swal.fire({
      title: "Estas seguro de Guardar?",
      text: "",
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
          url: '/pedidos/grupopedido/registro_grupo',
          data: {
            post: post,
            v_id_grupo: v_id_grupo,
            v_descripcion: v_descripcion,
            i_estado: i_estado,
          },
          success: function (res) {
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
  });

  $('#xbtncancelar').on('click', function () {
    $("#modal-agregar").modal('hide');
  });
});


// function DibujarGrafico() {

//   Highcharts.chart('container', {
//     chart: {
//       plotBackgroundColor: null,
//       plotBorderWidth: 0,
//       plotShadow: false
//     },
//     title: {
//       text: 'Avance<br>Aprobaciones<br>',
//       align: 'center',
//       verticalAlign: 'middle',
//       y: 60
//     },
//     tooltip: {
//       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//     },
//     accessibility: {
//       point: {
//         valueSuffix: '%'
//       }
//     },
//     plotOptions: {
//       pie: {
//         dataLabels: {
//           enabled: true,
//           distance: -50,
//           style: {
//             fontWeight: 'bold',
//             color: 'white'
//           }
//         },
//         startAngle: -90,
//         endAngle: 90,
//         center: ['50%', '75%'],
//         size: '110%'
//       }
//     },
//     series: [{
//       type: 'pie',
//       name: 'Browser share',
//       innerSize: '50%',
//       data: [
//         ['Avance 60%', 60],
//         ['Pendiente 40%', 40],

//       ]
//     }]
//   });


//   // Highcharts.chart('container', {
//   //   chart: {
//   //     plotBackgroundColor: null,
//   //     plotBorderWidth: null,
//   //     plotShadow: false,
//   //     type: 'pie'
//   //   },
//   //   title: {
//   //     text: 'Browser market shares in January, 2018'
//   //   },
//   //   tooltip: {
//   //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//   //   },
//   //   accessibility: {
//   //     point: {
//   //       valueSuffix: '%'
//   //     }
//   //   },
//   //   plotOptions: {
//   //     pie: {
//   //       allowPointSelect: true,
//   //       cursor: 'pointer',
//   //       dataLabels: {
//   //         enabled: true,
//   //         format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//   //       }
//   //     }
//   //   },
//   //   series: [{
//   //     name: 'Brands',
//   //     colorByPoint: true,
//   //     data: [{
//   //       name: 'Chrome',
//   //       y: 0,
//   //       sliced: true,
//   //       selected: true
//   //     }, {
//   //       name: 'Internet Explorer',
//   //       y: 100
//   //     },
//   //     ]
//   //   }]
//   // });
// }



// function checkInput(r) {
//   var nu_correla = document.getElementById("nropedido").innerHTML;
//   var post = 0;
//   var respuesta = r.value;

//   if (respuesta == "Aprobar") {

//     Swal.fire({
//       title: "Seguro de enviar para su Aprobacion ?",
//       text: "Se enviara para su Aprobacion de las Jefaturas",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#61C250",
//       cancelButtonColor: "#ea5455",
//       confirmButtonText: "Si, Enviar!",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         $.ajax({
//           type: 'POST',
//           url: '/pedidos/aprobarpedido/ProcesoAprobacionPedido',
//           data: {
//             post: post,
//             nu_correla: nu_correla
//           },
//           success: function (res) {
//             Swal.fire({
//               icon: res.vicon,
//               title: res.vtitle,
//               text: res.vtext,
//               timer: res.itimer,
//               timerProgressBar: res.vprogressbar,
//               showCancelButton: false,
//               showConfirmButton: false,
//             });
//             var id = setInterval(function () {
//               location.reload();
//               clearInterval(id);
//             }, res.itimer);
//           }
//         });
//       }
//     });
//   }



//   if (respuesta == "Rechazar") {
//     Swal.fire({
//       title: "Seguro de Rechazar el pedido?",
//       text: "Pedido sera Rechazado",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#61C250",
//       cancelButtonColor: "#ea5455",
//       confirmButtonText: "Si, Rechazar!",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {

//         // $.ajax({
//         //   type: 'POST',
//         //   url: '/pedidos/pedidos/eliminar_fila_ppto',
//         //   data: { nu_correla: nu_correla, v_idlinea: v_idlinea },
//         //   success: function (res) {

//         //     if (res.respuesta == 1) {
//         //       $.ajax({
//         //         type: 'POST',
//         //         url: '/pedidos/pedidos/Mostrar_pedido_ppto',
//         //         data: { nu_correla: nu_correla },
//         //         success: function (res) {

//         //           $("#tbpptopedido").dataTable().fnDestroy();
//         //           $("#tablita-ppto").children().remove();

//         //           let myArray = [];
//         //           for (const property in res.data) {
//         //             let nu_correla = res.data[property].nu_correla;
//         //             let v_idlinea = res.data[property].v_idlinea;
//         //             let v_idppto = res.data[property].v_idppto;
//         //             let v_idpartida = res.data[property].v_idpartida;
//         //             let v_idmes = res.data[property].v_idmes;
//         //             let v_nombremes = res.data[property].v_nombremes;
//         //             let f_monto = res.data[property].f_monto;
//         //             let v_centrocosto = res.data[property].v_centrocosto;

//         //             let fila =
//         //               "<tr><td class='text-center'>" +
//         //               nu_correla +
//         //               "</td><td class='text-left'>" +
//         //               v_idppto +
//         //               "</td><td class='text-left'>" +
//         //               v_idpartida +
//         //               "</td><td class='text-left'>" +
//         //               v_idmes +
//         //               "</td><td class='text-left'>" +
//         //               v_nombremes +
//         //               "</td><td class='text-left'>" +
//         //               f_monto +
//         //               "</td><td class='text-left'>" +
//         //               v_centrocosto +
//         //               "</td><td><a id=" +
//         //               v_idlinea +
//         //               " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

//         //             let btn = document.createElement("tr");
//         //             btn.innerHTML = fila;
//         //             document.getElementById("tablita-ppto").appendChild(btn);
//         //           }
//         //           creardatatable("#tbpptopedido"); //perro
//         //         }
//         //       });
//         //     }

//         //   }
//         // });

//       }
//     });
//   }

//   if (respuesta == "Modificar") {
//     Swal.fire({
//       title: "Seguro de enviar a  Modificar el pedido?",
//       text: "Regresara un paso Anterior para su modificacion",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#61C250",
//       cancelButtonColor: "#ea5455",
//       confirmButtonText: "Si, Enviar!",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {

//         // $.ajax({
//         //   type: 'POST',
//         //   url: '/pedidos/pedidos/eliminar_fila_ppto',
//         //   data: { nu_correla: nu_correla, v_idlinea: v_idlinea },
//         //   success: function (res) {

//         //     if (res.respuesta == 1) {
//         //       $.ajax({
//         //         type: 'POST',
//         //         url: '/pedidos/pedidos/Mostrar_pedido_ppto',
//         //         data: { nu_correla: nu_correla },
//         //         success: function (res) {

//         //           $("#tbpptopedido").dataTable().fnDestroy();
//         //           $("#tablita-ppto").children().remove();

//         //           let myArray = [];
//         //           for (const property in res.data) {
//         //             let nu_correla = res.data[property].nu_correla;
//         //             let v_idlinea = res.data[property].v_idlinea;
//         //             let v_idppto = res.data[property].v_idppto;
//         //             let v_idpartida = res.data[property].v_idpartida;
//         //             let v_idmes = res.data[property].v_idmes;
//         //             let v_nombremes = res.data[property].v_nombremes;
//         //             let f_monto = res.data[property].f_monto;
//         //             let v_centrocosto = res.data[property].v_centrocosto;

//         //             let fila =
//         //               "<tr><td class='text-center'>" +
//         //               nu_correla +
//         //               "</td><td class='text-left'>" +
//         //               v_idppto +
//         //               "</td><td class='text-left'>" +
//         //               v_idpartida +
//         //               "</td><td class='text-left'>" +
//         //               v_idmes +
//         //               "</td><td class='text-left'>" +
//         //               v_nombremes +
//         //               "</td><td class='text-left'>" +
//         //               f_monto +
//         //               "</td><td class='text-left'>" +
//         //               v_centrocosto +
//         //               "</td><td><a id=" +
//         //               v_idlinea +
//         //               " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

//         //             let btn = document.createElement("tr");
//         //             btn.innerHTML = fila;
//         //             document.getElementById("tablita-ppto").appendChild(btn);
//         //           }
//         //           creardatatable("#tbpptopedido"); //perro
//         //         }
//         //       });
//         //     }

//         //   }
//         // });

//       }
//     });
//   }

//   if (respuesta == "Ver Archivos") {
//     $("#modal-file").modal("show");

//     var post = 3;
//     var nropedido = document.getElementById("nropedido").innerHTML;
//     var codprodnote = "";
//     var v_nombre_file = "";


//     $("#tbarchivo").dataTable().fnDestroy();
//     $("#tablita-nota").children().remove();

//     let count = 0;
//     $('#modal-file').on('shown.bs.modal', function () {
//       count = count + 1;
//       if (count == 1) {
//         $.ajax({
//           type: 'POST',
//           url: '/pedidos/aprobarpedido/MostrarFilePedido',
//           data: { post: post, nropedido: nropedido, codprodnote: codprodnote, v_nombre_file: v_nombre_file },

//           beforeSend: function () {
//             $("#div-01").html("");
//             $("#div-01").append(
//               "<div id='div-01'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
//             );
//           },

//           success: function (res) {
//             $("#div-01").html("");
//             let myArray = [];
//             for (const property in res.data) {
//               let nu_correla = res.data[property].nu_correla;
//               let item = res.data[property].v_codprod;
//               let descripcion = res.data[property].v_descripcion_file;
//               let icon = res.data[property].v_icon;
//               let color = res.data[property].v_color;
//               let tardwn = res.data[property].v_tardwn;
//               let tardwnname = res.data[property].v_tardwnname;
//               let url = res.data[property].v_url;
//               let nombre_file = res.data[property].v_nombre_file;
//               let fila =
//                 "<tr><td class='text-left'>" +
//                 nu_correla +
//                 "</td><td class='text-left'>" +
//                 item +
//                 "</td><td class='text-left'>" +
//                 descripcion +
//                 "</td><td class='text-center'><a " + tardwn + "'" + tardwnname + "'  class='btn btn-" +
//                 color + " btn-sm'  style='color:white' href='" + url + "'><span class='fa-solid fa-" +
//                 icon + "'><b></b></span></a></td></tr>";


//               let btn = document.createElement("tr");
//               btn.innerHTML = fila;
//               document.getElementById("tablita-nota").appendChild(btn);

//             }

//             creardatatable("#tbarchivo");
//           }
//         });
//       }
//     });
//   }


// }

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