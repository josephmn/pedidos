$(function () {
  creardatatable("#tbarea");
  creardatatable("#tbformula");

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var variable1 = urlParams.get('idarea');
  var variable2 = urlParams.get('variable2');

  $("#xid").val(variable1);
  $("#fxid").val(variable1);

  if (variable1 != null) {
    $.ajax({
      type: 'POST',
      url: '/pedidos/areacentrocosto/ListadoMatrizCentroCosto',
      data: { variable1: variable1 },

      beforeSend: function () {
        $("#div-load").html("");
        $("#div-load").append(
          "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },

      success: function (res) {
        // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
        $("#div-load").html("");
        $("#tbarea").dataTable().fnDestroy();
        $("#tablita-matriz").children().remove();
        for (const property in res.data) {
          let v_sub = res.data[property].v_sub;
          let v_descripcion = res.data[property].v_descripcion;

          let fila =
            "<tr><td class='text-left'>" +
            v_sub +
            "</td><td class='text-left'>" +
            v_descripcion +
            "</td><td  class='text-left'><a id=" +
            v_sub +
            " class='btn btn-success btn-sm text-white formula'><span class='fa-solid fa-plus fa-beat'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-matriz").appendChild(btn);
        }
        creardatatable("#tbarea");
      }
    });
    $.ajax({
      type: 'POST',
      url: '/pedidos/areacentrocosto/ListadoAreaCentroCosto',
      data: { variable1: variable1 },

      beforeSend: function () {
        $("#div-loadx").html("");
        $("#div-loadx").append(
          "<div id='div-loadx'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },

      success: function (res) {
        // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
        $("#div-loadx").html("");
        $("#tbformula").dataTable().fnDestroy();
        $("#tablita-formula").children().remove();
        for (const property in res.data) {
          let v_areid = res.data[property].v_areid;
          let v_sub = res.data[property].v_sub;
          let f_registro = res.data[property].f_registro;
          let v_estado = res.data[property].v_estado;
          let v_btn1Nombre = res.data[property].v_btn1Nombre;
          let v_btn1Color = res.data[property].v_btn1Color;
          let v_btn1Imagen = res.data[property].v_btn1Imagen;
          let v_colorestado = res.data[property].v_colorestado;

          let fila =
            "<tr><td class='text-left'>" +
            v_areid +
            "</td><td class='text-left'>" +
            v_sub +
            "</td><td class='text-left'>" +
            f_registro +
            "</td><td class='text-center'><span class='badge bg-" + v_colorestado + "'>" +
            v_estado +
            "</td><td  class='text-center'><a id=" +
            v_sub +
            " class='btn btn-" + v_btn1Color + " btn-sm text-white " + v_btn1Nombre + "'><span class='fa-solid " + v_btn1Imagen + "'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-formula").appendChild(btn);
        }
        creardatatable("#tbformula");
      }
    });
  }

  document.getElementById("frmgrupo").innerHTML = variable1;
  document.getElementById("frmnombrearea").innerHTML = variable2;

  document.getElementById("frmarea").innerHTML = '';

  

  $("#tbarea tbody").on("click", "a.formula", function () {
    var post = 0;
    var v_areid = variable1;
    let v_sub = $(this).attr("id");
    let i_idestado = 1;
    document.getElementById("frmgrupo").innerHTML = v_sub;
    document.getElementById("frmarea").innerHTML = v_areid;

    $.ajax({
      type: 'POST',
      url: '/pedidos/areacentrocosto/registro_areacentrocsoto',
      data: {
        post: post,
        v_areid: v_areid,
        v_sub: v_sub,
        i_idestado: i_idestado,
      },
      success: function (res) {

        if (res.vicon == 'success') {

          $.ajax({
            type: 'POST',
            url: '/pedidos/areacentrocosto/ListadoMatrizCentroCosto',
            data: { variable1: variable1 },

            beforeSend: function () {
              $("#div-load").html("");
              $("#div-load").append(
                "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
              );
            },
            success: function (res) {
              // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
              $("#div-load").html("");
              $("#tbarea").dataTable().fnDestroy();
              $("#tablita-matriz").children().remove();
              for (const property in res.data) {
                let v_sub = res.data[property].v_sub;
                let v_descripcion = res.data[property].v_descripcion;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_sub +
                  "</td><td class='text-left'>" +
                  v_descripcion +
                  "</td><td  class='text-left'><a id=" +
                  v_sub +
                  " class='btn btn-success btn-sm text-white formula'><span class='fa-solid fa-plus fa-beat'><b></b></span></a></td></tr>";
                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-matriz").appendChild(btn);
              }
              creardatatable("#tbarea");
            }
          });
          $.ajax({
            type: 'POST',
            url: '/pedidos/areacentrocosto/ListadoAreaCentroCosto',
            data: { variable1: variable1 },

            beforeSend: function () {
              $("#div-loadx").html("");
              $("#div-loadx").append(
                "<div id='div-loadx'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
              );
            },
            success: function (res) {
              // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
              $("#div-loadx").html("");
              $("#tbformula").dataTable().fnDestroy();
              $("#tablita-formula").children().remove();
              for (const property in res.data) {
                let v_areid = res.data[property].v_areid;
                let v_sub = res.data[property].v_sub;
                let f_registro = res.data[property].f_registro;
                let v_estado = res.data[property].v_estado;
                let v_btn1Nombre = res.data[property].v_btn1Nombre;
                let v_btn1Color = res.data[property].v_btn1Color;
                let v_btn1Imagen = res.data[property].v_btn1Imagen;
                let v_colorestado = res.data[property].v_colorestado;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_areid +
                  "</td><td class='text-left'>" +
                  v_sub +
                  "</td><td class='text-left'>" +
                  f_registro +
                  "</td><td class='text-center'><span class='badge bg-" + v_colorestado + "'>" +
                  v_estado +
                  "</td><td  class='text-center'><a id=" +
                  v_sub +
                  " class='btn btn-" + v_btn1Color + " btn-sm text-white " + v_btn1Nombre + "'><span class='fa-solid " + v_btn1Imagen + "'><b></b></span></a></td></tr>";
                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-formula").appendChild(btn);
              }
              creardatatable("#tbformula");
            }
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
          var id = setInterval(function () {
            location.reload();
            clearInterval(id);
          }, res.itimer);
        }

      }
    });
  });

  $('#btnagregartodo').on('click', function () {



    Swal.fire({
      title: "Seguro de asignar todos los Centros de Costo ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Asignar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        var post = 3;
        var v_areid = variable1;
        let v_sub = '';
        let i_idestado = 1;

        $.ajax({
          type: 'POST',
          url: '/pedidos/areacentrocosto/registro_areacentrocsoto',
          data: {
            post: post,
            v_areid: v_areid,
            v_sub: v_sub,
            i_idestado: i_idestado,
          },
          success: function (res) {

            if (res.vicon == 'success') {

              $.ajax({
                type: 'POST',
                url: '/pedidos/areacentrocosto/ListadoMatrizCentroCosto',
                data: { variable1: variable1 },

                beforeSend: function () {
                  $("#div-load").html("");
                  $("#div-load").append(
                    "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
                  );
                },
                success: function (res) {
                  // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
                  $("#div-load").html("");
                  $("#tbarea").dataTable().fnDestroy();
                  $("#tablita-matriz").children().remove();
                  for (const property in res.data) {
                    let v_sub = res.data[property].v_sub;
                    let v_descripcion = res.data[property].v_descripcion;

                    let fila =
                      "<tr><td class='text-left'>" +
                      v_sub +
                      "</td><td class='text-left'>" +
                      v_descripcion +
                      "</td><td  class='text-left'><a id=" +
                      v_sub +
                      " class='btn btn-success btn-sm text-white formula'><span class='fa-solid fa-plus fa-beat'><b></b></span></a></td></tr>";
                    let btn = document.createElement("tr");
                    btn.innerHTML = fila;
                    document.getElementById("tablita-matriz").appendChild(btn);
                  }
                  creardatatable("#tbarea");
                }
              });
              $.ajax({
                type: 'POST',
                url: '/pedidos/areacentrocosto/ListadoAreaCentroCosto',
                data: { variable1: variable1 },

                beforeSend: function () {
                  $("#div-loadx").html("");
                  $("#div-loadx").append(
                    "<div id='div-loadx'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
                  );
                },
                success: function (res) {
                  // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
                  $("#div-loadx").html("");
                  $("#tbformula").dataTable().fnDestroy();
                  $("#tablita-formula").children().remove();
                  for (const property in res.data) {
                    let v_areid = res.data[property].v_areid;
                    let v_sub = res.data[property].v_sub;
                    let f_registro = res.data[property].f_registro;
                    let v_estado = res.data[property].v_estado;
                    let v_btn1Nombre = res.data[property].v_btn1Nombre;
                    let v_btn1Color = res.data[property].v_btn1Color;
                    let v_btn1Imagen = res.data[property].v_btn1Imagen;
                    let v_colorestado = res.data[property].v_colorestado;

                    let fila =
                      "<tr><td class='text-left'>" +
                      v_areid +
                      "</td><td class='text-left'>" +
                      v_sub +
                      "</td><td class='text-left'>" +
                      f_registro +
                      "</td><td class='text-center'><span class='badge bg-" + v_colorestado + "'>" +
                      v_estado +
                      "</td><td  class='text-center'><a id=" +
                      v_sub +
                      " class='btn btn-" + v_btn1Color + " btn-sm text-white " + v_btn1Nombre + "'><span class='fa-solid " + v_btn1Imagen + "'><b></b></span></a></td></tr>";
                    let btn = document.createElement("tr");
                    btn.innerHTML = fila;
                    document.getElementById("tablita-formula").appendChild(btn);
                  }
                  creardatatable("#tbformula");
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
                location.reload();
                clearInterval(id);
              }, res.itimer);
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
  //#endregion

  $('#btncancelaretorno').on('click', function () {
    $("#modal-editar").modal('hide');
  });

  $("#tbformula tbody").on("click", "a.delete", function () {
    var post = 1;
    var v_areid = variable1;
    let v_sub = $(this).attr("id");
    let i_idestado = 0;
    document.getElementById("frmgrupo").innerHTML = v_sub;
    document.getElementById("frmarea").innerHTML = v_areid;

    $.ajax({
      type: 'POST',
      url: '/pedidos/areacentrocosto/registro_areacentrocsoto',
      data: {
        post: post,
        v_areid: v_areid,
        v_sub: v_sub,
        i_idestado: i_idestado,
      },
      success: function (res) {
        if (res.vicon == 'success') {
          $.ajax({
            type: 'POST',
            url: '/pedidos/areacentrocosto/ListadoMatrizCentroCosto',
            data: { variable1: variable1 },

            beforeSend: function () {
              $("#div-load").html("");
              $("#div-load").append(
                "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
              );
            },

            success: function (res) {
              // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
              $("#div-load").html("");
              $("#tbarea").dataTable().fnDestroy();
              $("#tablita-matriz").children().remove();
              for (const property in res.data) {
                let v_sub = res.data[property].v_sub;
                let v_descripcion = res.data[property].v_descripcion;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_sub +
                  "</td><td class='text-left'>" +
                  v_descripcion +
                  "</td><td  class='text-left'><a id=" +
                  v_sub +
                  " class='btn btn-success btn-sm text-white formula'><span class='fa-solid fa-plus fa-beat'><b></b></span></a></td></tr>";
                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-matriz").appendChild(btn);
              }
              creardatatable("#tbarea");
            }
          });
          $.ajax({
            type: 'POST',
            url: '/pedidos/areacentrocosto/ListadoAreaCentroCosto',
            data: { variable1: variable1 },

            beforeSend: function () {
              $("#div-loadx").html("");
              $("#div-loadx").append(
                "<div id='div-loadx'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
              );
            },

            success: function (res) {
              // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
              $("#div-loadx").html("");
              $("#tbformula").dataTable().fnDestroy();
              $("#tablita-formula").children().remove();
              for (const property in res.data) {
                let v_areid = res.data[property].v_areid;
                let v_sub = res.data[property].v_sub;
                let f_registro = res.data[property].f_registro;
                let v_estado = res.data[property].v_estado;
                let v_btn1Nombre = res.data[property].v_btn1Nombre;
                let v_btn1Color = res.data[property].v_btn1Color;
                let v_btn1Imagen = res.data[property].v_btn1Imagen;
                let v_colorestado = res.data[property].v_colorestado;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_areid +
                  "</td><td class='text-left'>" +
                  v_sub +
                  "</td><td class='text-left'>" +
                  f_registro +
                  "</td><td class='text-center'><span class='badge bg-" + v_colorestado + "'>" +
                  v_estado +
                  "</td><td  class='text-center'><a id=" +
                  v_sub +
                  " class='btn btn-" + v_btn1Color + " btn-sm text-white " + v_btn1Nombre + "'><span class='fa-solid " + v_btn1Imagen + "'><b></b></span></a></td></tr>";
                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-formula").appendChild(btn);
              }
              creardatatable("#tbformula");
            }
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
          var id = setInterval(function () {
            location.reload();
            clearInterval(id);
          }, res.itimer);
        }

      }
    });

  });


  $("#tbformula tbody").on("click", "a.editar", function () {
    var v_areid = variable1;
    let v_sub = $(this).attr("id");

    $.ajax({
      type: 'POST',
      url: '/pedidos/areacentrocosto/conultalineacentrocosto',
      data: {
        v_areid: v_areid,
        v_sub: v_sub,
      },
      success: function (res) {
        $("#xcomboestado").html("");
        $("#xcomboestado").append(res.FilascomboEstado);
      }
    });


    $("#xidarea").val(variable1);
    $("#txtcentrocosto").val(v_sub);
    $("#modal-editar").modal("show");
  });



  $('#btnguardaretorno').on('click', function () {
    var post = 2;
    var v_areid = variable1;
    let v_sub = $("#txtcentrocosto").val();;
    let i_idestado = $('#xcomboestado').val();;

    $.ajax({
      type: 'POST',
      url: '/pedidos/areacentrocosto/registro_areacentrocsoto',
      data: {
        post: post,
        v_areid: v_areid,
        v_sub: v_sub,
        i_idestado: i_idestado,
      },
      success: function (res) {

        if (res.vicon == 'success') {

          $.ajax({
            type: 'POST',
            url: '/pedidos/areacentrocosto/ListadoMatrizCentroCosto',
            data: { variable1: variable1 },

            beforeSend: function () {
              $("#div-load").html("");
              $("#div-load").append(
                "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
              );
            },

            success: function (res) {
              // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
              $("#div-load").html("");
              $("#tbarea").dataTable().fnDestroy();
              $("#tablita-matriz").children().remove();
              for (const property in res.data) {
                let v_sub = res.data[property].v_sub;
                let v_descripcion = res.data[property].v_descripcion;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_sub +
                  "</td><td class='text-left'>" +
                  v_descripcion +
                  "</td><td  class='text-left'><a id=" +
                  v_sub +
                  " class='btn btn-success btn-sm text-white formula'><span class='fa-solid fa-plus fa-beat'><b></b></span></a></td></tr>";
                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-matriz").appendChild(btn);
              }
              creardatatable("#tbarea");
            }
          });


          $.ajax({
            type: 'POST',
            url: '/pedidos/areacentrocosto/ListadoAreaCentroCosto',
            data: { variable1: variable1 },

            beforeSend: function () {
              $("#div-loadx").html("");
              $("#div-loadx").append(
                "<div id='div-loadx'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
              );
            },

            success: function (res) {
              // document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
              $("#div-loadx").html("");
              $("#tbformula").dataTable().fnDestroy();
              $("#tablita-formula").children().remove();
              for (const property in res.data) {
                let v_areid = res.data[property].v_areid;
                let v_sub = res.data[property].v_sub;
                let f_registro = res.data[property].f_registro;
                let v_estado = res.data[property].v_estado;
                let v_btn1Nombre = res.data[property].v_btn1Nombre;
                let v_btn1Color = res.data[property].v_btn1Color;
                let v_btn1Imagen = res.data[property].v_btn1Imagen;
                let v_colorestado = res.data[property].v_colorestado;

                let fila =
                  "<tr><td class='text-left'>" +
                  v_areid +
                  "</td><td class='text-left'>" +
                  v_sub +
                  "</td><td class='text-left'>" +
                  f_registro +
                  "</td><td class='text-center'><span class='badge bg-" + v_colorestado + "'>" +
                  v_estado +
                  "</td><td  class='text-center'><a id=" +
                  v_sub +
                  " class='btn btn-" + v_btn1Color + " btn-sm text-white " + v_btn1Nombre + "'><span class='fa-solid " + v_btn1Imagen + "'><b></b></span></a></td></tr>";
                let btn = document.createElement("tr");
                btn.innerHTML = fila;
                document.getElementById("tablita-formula").appendChild(btn);
              }
              creardatatable("#tbformula");
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
            location.reload();
            clearInterval(id);
          }, res.itimer);

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
          var id = setInterval(function () {
            location.reload();
            clearInterval(id);
          }, res.itimer);
        }

      }
    });
  });



});




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
      [25, 50, 100, -1],
      ["25", "50", "100", "Todo"],
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