$(function () {
  var table = $("#tbusuario").DataTable({
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

  //Para Nuevo Ingreso
  $('#btnagregar').on('click', function () {
    document.getElementById("titulomodal").innerHTML = "CREAR USUARIO:";
    let v_dni = "";
    $.ajax({
      type: 'POST',
      url: '/pedidos/usuario/Consultar_Usuario',
      data: {
        v_dni: v_dni
      },
      success: function (res) {
        if (res.estado == 1) {
          document.getElementById("titulomodal").innerHTML = "EDITAR USUARIO:";
          $('#xdni').val(res.v_dni.replace("&Ntilde;", "Ñ"));
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));
          $('#xpassword').val(v_dni);

          $('#xidgenero').val(res.i_persexo);
          $('#xgenero').val(res.v_persexo_nombre);

          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);

          $("#xidusersolomon").html("");
          $("#xidusersolomon").append(res.FilascomboUsuarioSolomon);



        } else {
          document.getElementById("titulomodal").innerHTML = "CREAR USUARIO:";
          $('#xdni').val(res.v_dni.replace("&Ntilde;", "Ñ"));
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));

          $('#xidgenero').val(res.i_persexo);
          $('#xgenero').val(res.v_persexo_nombre);


          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);

          $("#xidusersolomon").html("");
          $("#xidusersolomon").append(res.FilascomboUsuarioSolomon);


          document.getElementById("customSwitch10").disabled = true;
        }

      }
    });


    $("#modal-agregar").modal("show");
    $('#modal-agregar').on('shown.bs.modal', function () {
      $("#xdni").focus();
    });
  });


  $("#xdni").change(function () {
    var v_dni = $(this).val();
    $.ajax({
      type: 'POST',
      url: '/pedidos/usuario/Consultar_Usuario',
      data: {
        v_dni: v_dni
      },
      beforeSend: function () {
        $("#div-load").html("");
        $("#div-load").append(
          "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        $("#div-load").html("");
        if (res.estado == 1) {
          document.getElementById("customSwitch10").disabled = false;
          document.getElementById("titulomodal").innerHTML = "EDITAR USUARIO:";
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));
          $('#xpassword').val(v_dni);
          $('#xidgenero').val(res.i_persexo);
          $('#xgenero').val(res.v_persexo_nombre);



          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);

          $("#xidusersolomon").html("");
          $("#xidusersolomon").append(res.FilascomboUsuarioSolomon);

        } else {
          $.ajax({
            type: 'POST',
            url: '/pedidos/usuario/Consultar_Persona',
            data: {
              v_dni: v_dni
            },
            success: function (res) {
              switch (res.estado) {
                case 1:
                  document.getElementById("titulomodal").innerHTML = "CREAR USUARIO:";
                  $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
                  $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
                  $('#xpassword').val(v_dni);
                  $('#xidgenero').val(res.i_persexo);
                  $('#xgenero').val(res.v_persexo_nombre);



                  break;
                case 0:
                  Swal.fire({
                    title: "DOCUMENTO NO EXISTE EN NUESTRA BD.",
                    timer: 2400,
                    timerProgressBar: true,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                  $("#xdni").val("");
                  $('#xpassword').val("");
                  $('#xidgenero').val("");
                  $('#xgenero').val("");



                  return;
                  break;
              }
            }
          });
          document.getElementById("customSwitch10").disabled = true;
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));

          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);

          $("#xidusersolomon").html("");
          $("#xidusersolomon").append(res.FilascomboUsuarioSolomon);
        }

      }
    });
  });


  $("#tbusuario tbody").on("click", "a.editar", function () {
    let v_dni = $(this).attr("id");
    $.ajax({
      type: 'POST',
      url: '/pedidos/usuario/Consultar_Usuario',
      data: {
        v_dni: v_dni
      },

      beforeSend: function () {
        $("#div-load").html("");
        $("#div-load").append(
          "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },

      success: function (res) {
        $("#div-load").html("");
        if (res.estado == 1) {
          document.getElementById("customSwitch10").disabled = false;
          document.getElementById("titulomodal").innerHTML = "EDITAR USUARIO:";
          $('#xdni').val(res.v_dni.replace("&Ntilde;", "Ñ"));
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));
          $('#xpassword').val(v_dni);


          $('#xidgenero').val(res.i_persexo);
          $('#xgenero').val(res.v_persexo_nombre);

          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);

          $("#xidusersolomon").html("");
          $("#xidusersolomon").append(res.FilascomboUsuarioSolomon);

        } else {
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));




          $('#xidgenero').val(res.i_persexo);
          $('#xgenero').val(res.v_persexo_nombre);

          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);

          $("#xidusersolomon").html("");
          $("#xidusersolomon").append(res.FilascomboUsuarioSolomon);
        }

      }
    });

    $("#modal-agregar").modal("show");
    $('#modal-agregar').on('shown.bs.modal', function () {
      $("#xdni").focus();
    });
  });

  $('#btnconsultar').on('click', function () {
    var v_dni = $('#xdni').val();
    $.ajax({
      type: 'POST',
      url: '/pedidos/usuario/Consultar_Usuario',
      data: {
        v_dni: v_dni
      },
      beforeSend: function () {
        $("#div-load").html("");
        $("#div-load").append(
          "<div id='div-load'>\<div class='d-flex justify-content-center my-1'>\<div class='spinner-border text-danger' role='status' aria-hidden='true'></div>\</div>\ </div>"
        );
      },
      success: function (res) {
        $("#div-load").html("");
        if (res.estado == 1) {
          document.getElementById("customSwitch10").disabled = false;
          document.getElementById("titulomodal").innerHTML = "EDITAR USUARIO:";
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));
          $('#xpassword').val(v_dni);

          $('#xidgenero').val(res.i_persexo);
          $('#xgenero').val(res.v_persexo_nombre);

          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);

        } else {
          $.ajax({
            type: 'POST',
            url: '/pedidos/usuario/Consultar_Persona',
            data: {
              v_dni: v_dni
            },
            success: function (res) {
              switch (res.estado) {
                case 1:
                  document.getElementById("titulomodal").innerHTML = "CREAR USUARIO:";
                  $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
                  $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
                  $('#xpassword').val(v_dni);

                  $('#xidgenero').val(res.i_persexo);
                  $('#xgenero').val(res.v_persexo_nombre);


                  break;
                case 0:
                  Swal.fire({
                    title: "DOCUMENTO NO EXISTE EN NUESTRA BD.",
                    timer: 2400,
                    timerProgressBar: true,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                  $("#xdni").val("");
                  $('#xpassword').val("");
                  $('#xidgenero').val("");
                  $('#xgenero').val("");
                  return;
                  break;
              }
            }
          });
          document.getElementById("customSwitch10").disabled = true;
          $('#xnombres').val(res.v_nombres.replace("&Ntilde;", "Ñ"));
          $('#xapellidos').val(res.v_apellidos.replace("&Ntilde;", "Ñ"));
          $('#xcorreo').val(res.v_correo.replace("&Ntilde;", "Ñ"));

          $("#xperfil").html("");
          $("#xperfil").append(res.FilascomboPerfil);

          $("#xcargo").html("");
          $("#xcargo").append(res.FilascomboCargo);

          $("#xarea").html("");
          $("#xarea").append(res.FilascomboArea);

          $("#xlocal").html("");
          $("#xlocal").append(res.FilascomboLocal);
        }

      }
    });
  });



  $('#xbtnguardar').on('click', function () {
    var post = 0;
    var v_dni = $('#xdni').val();
    var v_nombres = $('#xnombres').val();
    var v_apellidos = $('#xapellidos').val();
    var v_correo = $('#xcorreo').val();

    var i_estado = 1;
    var i_perfil = $('#xperfil  option:selected').val();
    var v_id_cargo = $('#xcargo  option:selected').val();
    var v_id_local = $('#xlocal  option:selected').val();
    var v_id_area = $('#xarea  option:selected').val();

    var v_clave = '';
    //Solo validacion        
    var customSwitch10 = document.getElementById("customSwitch10").checked;
    if ((customSwitch10 == true)) {
      v_clave = $('#xpassword').val();
    } else {
      v_clave = '';
    }
    var i_persexo = $('#xidgenero').val();
    var v_persexo_nombre = $('#xgenero').val();
    var v_usuario_solomon = $('#xidusersolomon  option:selected').val();


    if ((v_dni == null || v_dni == '')) {
      $("#xdni").focus();
      Swal.fire({
        title: 'INGRESAR NUMERO DE DNI',
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

    if ((v_correo == null || v_correo == '')) {
      $("#xcorreo").focus();
      Swal.fire({
        title: 'INGRESAR CORREO',
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

    

 



    Swal.fire({
      title: "Estas seguro de guardar en el Sistema?",
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
          url: '/pedidos/usuario/registro_usuario',
          data: {
            post: post,
            v_dni: v_dni,
            v_nombres: v_nombres,
            v_apellidos: v_apellidos,
            v_correo: v_correo,
            v_clave: v_clave,
            i_estado: i_estado,
            i_perfil: i_perfil,
            v_id_cargo: v_id_cargo,
            v_id_local: v_id_local,
            v_id_area: v_id_area,
            i_persexo: i_persexo,
            v_persexo_nombre: v_persexo_nombre,
            v_usuario_solomon: v_usuario_solomon
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