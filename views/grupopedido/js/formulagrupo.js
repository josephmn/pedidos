$(function () {
  creardatatable("#tbarea");
  creardatatable("#tbformula");

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var variable1 = urlParams.get('variable1');

  $("#xid").val(variable1);
  $("#fxid").val(variable1);

  document.getElementById("frmgrupo").innerHTML = variable1;
  document.getElementById("frmarea").innerHTML = '';
  document.getElementById("customSwitch101").disabled = true;

  //#region                                                  (PARA MANT. DE AERA Y GRUPO)
  $("#btnagregararea").on("click", function () {
    document.getElementById("titulomodalarea").innerHTML = "AGREGAR AREA";
    var v_id_grupo = variable1;
    var v_id_area = '';
    document.getElementById('xarea').disabled = false;
    $.ajax({
      type: 'POST',
      url: '/pedidos/grupopedido/Consultar_GrupoArea',
      data: {
        v_id_grupo: v_id_grupo,
        v_id_area: v_id_area,
      },
      success: function (res) {
        $("#xarea").html("");
        $("#xarea").append(res.FilascomboArea);

        $("#xestado").html("");
        $("#xestado").append(res.FilascomboEstado);
      }
    });

    $("#modal-area").modal("show");
    $('#modal-area').on('shown.bs.modal', function () {
      $("#xarea").focus();
    });
  });

  $('#xbtncancelar').on('click', function () {
    $("#modal-area").modal('hide');
  });


  $("#tbarea tbody").on("click", "a.editar", function () {
    document.getElementById("titulomodalarea").innerHTML = "EDITAR AREA";
    var v_id_grupo = variable1;
    let v_id_area = $(this).attr("id");
    document.getElementById('xarea').disabled = true;
    $.ajax({
      type: 'POST',
      url: '/pedidos/grupopedido/Consultar_GrupoArea',
      data: {
        v_id_grupo: v_id_grupo,
        v_id_area: v_id_area,
      },
      success: function (res) {
        $("#xarea").html("");
        $("#xarea").append(res.FilascomboArea);
        $("#xestado").html("");
        $("#xestado").append(res.FilascomboEstado);
      }
    });
    $("#modal-area").modal("show");
    $('#modal-area').on('shown.bs.modal', function () {
      $("#xnombres").focus();
    });

  });

  $("#tbarea tbody").on("click", "a.formula", function () {
    var v_id_grupo = variable1;
    let v_id_area = $(this).attr("id");
    document.getElementById("frmgrupo").innerHTML = v_id_grupo;
    document.getElementById("frmarea").innerHTML = v_id_area;
    $.ajax({
      type: 'POST',
      url: '/pedidos/grupopedido/ListadoGrupoFormula',
      data: { v_id_grupo: v_id_grupo, v_id_area: v_id_area },

      beforeSend: function () {
        $("#div-load").html("");
        $("#div-load").append(
          "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-success' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        document.getElementById("frmareanombre").innerHTML = res.v_nombre_area;
        $("#div-load").html("");
        console.log(res.data);
        $("#tbformula").dataTable().fnDestroy();
        $("#tablita-formula").children().remove();
        for (const property in res.data) {
          let v_id_grupo = res.data[property].v_id_grupo;
          let v_idarea = res.data[property].v_idarea;
          let i_idorden = res.data[property].i_idorden;
          let v_descripcion_uno = res.data[property].v_descripcion_uno;
          let v_condicion_uno = res.data[property].v_condicion_uno;
          let f_valorinicio_condicion_uno = res.data[property].f_valorinicio_condicion_uno;
          let f_valortope_condicion_uno = res.data[property].f_valortope_condicion_uno;
          let v_idcargo = res.data[property].v_idcargo;
          let v_aprobador_uno = res.data[property].v_aprobador_uno;
          let v_correo = res.data[property].v_correo;
          let v_validar_tope = res.data[property].v_validar_tope;
          let i_btn_aprobar = res.data[property].i_btn_aprobar;
          let i_btn_rechazar = res.data[property].i_btn_rechazar;
          let i_btn_modificar = res.data[property].i_btn_modificar;
          let i_recepciona = res.data[property].i_recepciona;
          let v_btn1Nombre = res.data[property].v_btn1Nombre;
          let v_btn1Color = res.data[property].v_btn1Color;
          let v_correo_next = res.data[property].v_correo_next;
          let fila =
            "<tr><td class='text-center'>" +
            v_id_grupo +
            "</td><td class='text-left'>" +
            v_idarea +
            "</td><td class='text-center'>" +
            i_idorden +
            "</td><td class='text-left'>" +
            v_descripcion_uno +
            "</strong></td><td class='text-center'> <strong>" +
            f_valorinicio_condicion_uno +
            "</strong></td><td class='text-center'><strong>" +
            f_valortope_condicion_uno +
            "</strong></td><td class='text-center'>" +
            v_validar_tope +
            "</td><td class='text-left'><strong>" +
            v_aprobador_uno +
            "</td><td class='text-left'> <strong>" +
            v_correo +
            "</strong></td><td class='text-left'> <strong>" +
            v_correo_next +
            "</strong> </td><td class='text-center'>" +
            v_validar_tope +
            "</td><td class='text-center'>" +
            i_btn_aprobar +
            "</td><td class='text-center'>" +
            i_btn_rechazar +
            "</td><td class='text-center'>" +
            i_btn_modificar +
            "</td><td class='text-center'>" +
            i_recepciona +
            "</td><td><a id=" +
            i_idorden +
            " class='btn btn-" + v_btn1Color + " btn-sm text-white " + v_btn1Nombre + "'><span class='fa-solid fa-marker fa-beat'><b></b></span></a></td>" +
            "</td><td><a id=" +
            i_idorden +
            " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-formula").appendChild(btn);
        }
        creardatatable("#tbformula");
      }
    });
  });


  $('#xbtnguardar').on('click', function () {
    var post = 0;
    var v_idgrupo = $('#xid').val();
    var v_idarea = $('#xarea option:selected').val();
    var v_area = $('#xarea option:selected').text();;
    var i_estado = $('#xestado option:selected').val();
    //Solo validacion        
    if ((v_idarea == 'XXX' || v_idarea == null)) {
      $("#xarea").focus();
      Swal.fire({
        title: "SELECCIONE UNA AREA",
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

    if ((i_estado == 0 || i_estado == null)) {
      $("#xestado").focus();
      Swal.fire({
        title: "SELECCIONE UNA ESTADO",
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
          url: '/pedidos/grupopedido/registro_grupoArea',
          data: {
            post: post,
            v_idgrupo: v_idgrupo,
            v_idarea: v_idarea,
            v_area: v_area,
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

  //#endregion

  $("#btnformula").on("click", function () {
    document.getElementById("titulomodalformula").innerHTML = "AGREGAR FORMULA";
    var frmarea = document.getElementById("frmarea").innerHTML;
    var frmareanombre = document.getElementById("frmareanombre").innerHTML;
    var v_id_grupo = variable1;
    var i_idorden = 0;
    $("#fxidformula").val('Nuevo');
    $("#fxidarea").val(frmarea);
    $("#fxidareanombre").val(frmareanombre);

    if ((frmarea == '' || frmarea == null)) {
      Swal.fire({
        title: "SELECCIONE UNA AREA DESDE (DETALLE DE AREAS Y GRUPOS), COLUMNA VARIABLE",
        timer: 5000,
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
    var v_idarea = frmarea;
    $.ajax({
      type: 'POST',
      url: '/pedidos/grupopedido/Consultar_GrupoFormula',
      data: {
        v_id_grupo: v_id_grupo,
        v_idarea: v_idarea,
        i_idorden: i_idorden,
      },
      success: function (res) {
        if (res.f_monto_sgte > 0) {
          $("#itemquantity1").attr("readonly", true);
          $("#itemquantity2").attr("readonly", false);
        } else {
          $("#itemquantity1").attr("readonly", false);
          $("#itemquantity2").attr("readonly", false);
        }

        $("#fxdescripcion").val('');
        $("#mailfinal").val('');
        $("#itemquantity1").val(res.f_monto_sgte);
        $("#itemquantity2").val('');
        $("#fxcargo").html("");
        $("#fxcargo").append(res.FilascomboCargo);
        $("#mail").val('');
        document.getElementById("customSwitch10").checked = false;
        document.getElementById("customSwitch101").checked = true;
        document.getElementById("customSwitch102").checked = false;
        document.getElementById("customSwitch103").checked = false;
      }
    });
    $("#modal-formula").modal("show");
    $('#modal-formula').on('shown.bs.modal', function () {
      $("#fxdescripcion").focus();
    });
  });

  $('#xfbtncancelar').on('click', function () {
    $("#modal-formula").modal('hide');
  });

  $("#tbformula tbody").on("click", "a.editar", function () {
    document.getElementById("titulomodalformula").innerHTML = "EDITAR FORMULA";
    var v_id_grupo = variable1;
    let i_idorden = $(this).attr("id");
    var frmarea = document.getElementById("frmarea").innerHTML;
    var frmareanombre = document.getElementById("frmareanombre").innerHTML;
    $("#fxidarea").val(frmarea);
    $("#fxidareanombre").val(frmareanombre);
    var v_idarea = frmarea;
    $.ajax({
      type: 'POST',
      url: '/pedidos/grupopedido/Consultar_GrupoFormula',
      data: {
        v_id_grupo: v_id_grupo,
        v_idarea: v_idarea,
        i_idorden: i_idorden,
      },
      success: function (res) {

        if (res.f_valortope_condicion_uno > 0) {
          $("#itemquantity1").attr("readonly", true);
          $("#itemquantity2").attr("readonly", true);
        } else {
          $("#itemquantity1").attr("readonly", false);
          $("#itemquantity2").attr("readonly", false);
        }

        $("#fxidformula").val(res.i_idorden);
        $("#fxdescripcion").val(res.v_descripcion_uno);
        $("#mailfinal").val(res.v_correo_next);
        $("#itemquantity1").val(res.f_valorinicio_condicion_uno);
        $("#itemquantity2").val(res.f_valortope_condicion_uno);
        $("#fxcargo").html("");
        $("#fxcargo").append(res.FilascomboCargo);
        $("#mail").val(res.v_correo);
        document.getElementById("customSwitch10").checked = parseInt(res.v_validar_tope);
        document.getElementById("customSwitch101").checked = parseInt(res.i_btn_aprobar);
        document.getElementById("customSwitch102").checked = parseInt(res.i_btn_rechazar);
        document.getElementById("customSwitch103").checked = parseInt(res.i_btn_modificar);
      }
    });

    $("#modal-formula").modal("show");
    $('#modal-formula').on('shown.bs.modal', function () {
      $("#Descripcion").focus();
    });
  });



  $('#fxbtnguardar').on('click', function () {
    var i_idorden = 0;
    var fxidformula = $('#fxidformula').val();

    if (fxidformula == 'Nuevo') {
      i_idorden = 0;
    } else {
      i_idorden = fxidformula;
    }
    var post = 0;
    var v_idgrupo = $('#fxid').val();
    var v_idarea = $('#fxidarea').val();
    i_idorden = i_idorden;
    var v_descripcion_uno = $('#fxdescripcion').val();
    var v_condicion_uno = '';
    var f_valorinicio_condicion_uno = $('#itemquantity1').val()
    var f_valortope_condicion_uno = $('#itemquantity2').val()
    var v_idcargo = $('#fxcargo option:selected').val();
    var v_aprobador_uno = $('#fxcargo option:selected').text();
    var v_correo = $('#mail').val();
    var v_correo_next = $('#mailfinal').val();
    var v_validar_tope = document.getElementById("customSwitch10").checked;
    var i_btn_aprobar = document.getElementById("customSwitch101").checked;
    var i_btn_rechazar = document.getElementById("customSwitch102").checked;
    var i_btn_modificar = document.getElementById("customSwitch103").checked;

    v_validar_tope = Number(v_validar_tope);
    i_btn_aprobar = Number(i_btn_aprobar);
    i_btn_rechazar = Number(i_btn_rechazar);
    i_btn_modificar = Number(i_btn_modificar);

    var success = document.getElementById("success").innerHTML;

    if (Number(f_valorinicio_condicion_uno) > Number(f_valortope_condicion_uno)) {
      $("#itemquantity1").focus();
      Swal.fire({
        title: "MONTO FINAL NO PUEDE SER MAYOR AL MONTO INICIAL",
        timer: 3000,
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

    //Solo validacion        
    if ((v_idcargo == 'XXX' && f_valorinicio_condicion_uno > 0 && f_valortope_condicion_uno > 0)) {
      $("#fxcargo").focus();
      Swal.fire({
        title: "SELECCIONE UN CARGO, PARA QUE VALIDE LOS MONTOS INGRESADOS",
        timer: 3000,
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

    if ((v_idcargo == 'XXX')) {
      $("#fxcargo").focus();
      Swal.fire({
        title: "SELECCIONE UN CARGO",
        timer: 3000,
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

    if ((v_correo == '' || v_correo == null)) {
      $("#mail").focus();
      Swal.fire({
        title: "INGRESAR CORREO",
        timer: 3000,
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

    // if ((success == '' || success == null)) {
    //   $("#mail").focus();
    //   Swal.fire({
    //     title: "INGRESE CORREO VALIDO",
    //     timer: 3000,
    //     timerProgressBar: true,
    //     showClass: {
    //       popup: 'animate__animated animate__fadeInDown'
    //     },
    //     hideClass: {
    //       popup: 'animate__animated animate__fadeOutUp'
    //     }
    //   })
    //   return;
    // }

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
          url: '/pedidos/grupopedido/registro_grupoFormula',
          data: {
            post: post,
            v_idgrupo: v_idgrupo,
            v_idarea: v_idarea,
            i_idorden: i_idorden,
            v_descripcion_uno: v_descripcion_uno,
            v_condicion_uno: v_condicion_uno,
            f_valorinicio_condicion_uno: f_valorinicio_condicion_uno,
            f_valortope_condicion_uno: f_valortope_condicion_uno,
            v_idcargo: v_idcargo,
            v_aprobador_uno: v_aprobador_uno,
            v_correo: v_correo,
            v_correo_next: v_correo_next,
            v_validar_tope: v_validar_tope,
            i_btn_aprobar: i_btn_aprobar,
            i_btn_rechazar: i_btn_rechazar,
            i_btn_modificar: i_btn_modificar
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


  $('#mail').on('keyup', function () {
    var re = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(this.value);
    // var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(this.value);
    if (!re) {
      $('#error').show();
      document.getElementById("error").innerHTML = 'Correo no valido';
      $('#success').hide();
      document.getElementById("success").innerHTML = '';
    } else {
      $('#error').hide();
      document.getElementById("error").innerHTML = '';
      $('#success').show();
      document.getElementById("success").innerHTML = 'Correo valido';
    }
  })


  $('#mailfinal').on('keyup', function () {
    var re = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(this.value);
    // var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(this.value);
    if (!re) {
      $('#errorfinal').show();
      document.getElementById("errorfinal").innerHTML = 'Correo no valido';
      $('#successfinal').hide();
      document.getElementById("successfinal").innerHTML = '';
    } else {
      $('#errorfinal').hide();
      document.getElementById("errorfinal").innerHTML = '';
      $('#successfinal').show();
      document.getElementById("successfinal").innerHTML = 'Correo valido';
    }
  })

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