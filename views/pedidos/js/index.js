$(function () {


  $('#btnagregar').on('click', function () {

    var nombre = $(this).attr("name");

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


    location.href = "https://verdum.com/pedidos/pedidos/realizarpedido/index";
  });



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


  $("#tbpedidos tbody").on("click", "a.editar", function () {
    let nropediodo = $(this).attr("id");
    alert(nropediodo);
  });


  $("#tbpedidos tbody").on("click", "a.observado", function () {
    let observacion = $(this).attr("id");
    $("#notadescripcion").val(observacion);
    $("#modal-observacion").modal("show");
  });

  $("#btncancelaretorno").on("click", function () { //aqui ppto
    $("#modal-observacion").modal('hide');
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