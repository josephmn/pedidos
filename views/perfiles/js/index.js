$(function () {
  creardatatable("#tbperfil");

  $('#btnagregar').on('click', function () {
    document.getElementById("titulomodal").innerHTML = "CREAR PERFIL";
    var i_idperfil = 0;
    $.ajax({
      type: 'POST',
      url: '/pedidos/perfiles/Consultar_perfil',
      data: {
        i_idperfil: i_idperfil
      },
      success: function (res) {
        if (res.estado == 1) {
          document.getElementById("titulomodal").innerHTML = "EDITAR PERFIL";
          $('#xid').val(res.i_id.replace("&Ntilde;", "Ñ"));
          $('#xnombre').val(res.v_nombre.replace("&Ntilde;", "Ñ"));
          $('#xdescripcion').val(res.v_descripcion.replace("&Ntilde;", "Ñ"));
          $("#xestado").html("");
          $("#xestado").append(res.FilascomboEstado);

        } else {
          document.getElementById("titulomodal").innerHTML = "CREAR PERFIL";
          $('#xid').val(res.i_id.replace("&Ntilde;", "Ñ"));
          $('#xnombre').val(res.v_nombre.replace("&Ntilde;", "Ñ"));
          $('#xdescripcion').val(res.v_descripcion.replace("&Ntilde;", "Ñ"));
          $("#xestado").html("");
          $("#xestado").append(res.FilascomboEstado);
        }
      }
    });

    $("#modal-perfil").modal("show");
    $('#modal-perfil').on('shown.bs.modal', function () {
      $("#xnombre").focus();
    });
  });

  $('#xbtnguardar').on('click', function () {
    var post = 0;
    var i_idperfil;
    var titulomodal = document.getElementById("titulomodal").innerHTML;
    if (titulomodal == 'CREAR PERFIL') {
      i_idperfil = 0;
    } else {
      i_idperfil = $('#xid').val();
    }

    var v_nombre = $('#xnombre').val();
    var v_descripcion = $('#xdescripcion').val();
    var i_estado = $('#xestado  option:selected').val();

    if ((xnombre == null || xnombre == '')) {
      $("#xnombre").focus();
      Swal.fire({
        title: 'INGRESAR UN NOMBRE DE PERFIL',
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }

    if ((v_descripcion == null || v_descripcion == '')) {
      $("#xdescripcion").focus();
      Swal.fire({
        title: 'INGRESAR DESCRIPCION PARA EL PERFIL',
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
      title: "Seguro de guardar en el Sistema?",
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
          url: '/pedidos/perfiles/registro_perfil',
          data: {
            post: post,
            i_idperfil: i_idperfil,
            v_nombre: v_nombre,
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


  $("#tbperfil tbody").on("click", "a.editar", function () {
    let v_dni = $(this).attr("id");
    document.getElementById("titulomodal").innerHTML = "EDITAR PERFIL";
    var i_idperfil = v_dni;
    $.ajax({
      type: 'POST',
      url: '/pedidos/perfiles/Consultar_perfil',
      data: {
        i_idperfil: i_idperfil
      },
      success: function (res) {

 

        if (res.estado == 1) {
          document.getElementById("titulomodal").innerHTML = "EDITAR PERFIL";
          $('#xid').val(res.i_id.replace("&Ntilde;", "Ñ"));
          $('#xnombre').val(res.v_nombre.replace("&Ntilde;", "Ñ"));
          $('#xdescripcion').val(res.v_descripcion.replace("&Ntilde;", "Ñ"));
          $("#xestado").html("");
          $("#xestado").append(res.FilascomboEstado);

        } else {
          document.getElementById("titulomodal").innerHTML = "CREAR PERFIL";
          $('#xid').val(res.i_id.replace("&Ntilde;", "Ñ"));
          $('#xnombre').val(res.v_nombre.replace("&Ntilde;", "Ñ"));
          $('#xdescripcion').val(res.v_descripcion.replace("&Ntilde;", "Ñ"));
          $("#xestado").html("");
          $("#xestado").append(res.FilascomboEstado);
        }
      }
    });

    $("#modal-perfil").modal("show");
    $('#modal-perfil').on('shown.bs.modal', function () {
      $("#xnombre").focus();
    });
  });
  $('#xbtncancelar').on('click', function () {
    $("#modal-perfil").modal('hide');
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
