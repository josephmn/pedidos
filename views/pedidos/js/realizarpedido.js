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


  if (variable1 != null) {
    var nu_correla = variable1;
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/MostrarPedido',
      data: { nu_correla: nu_correla },
      success: function (res) {
        console.log(res.data);
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

        if (Number(res.i_idorden_aprobacion) != 0) {
          document.getElementById("btnguardar").disabled = true;
          document.getElementById("btnsendpedido").disabled = true;
        } else {
          document.getElementById("btnguardar").disabled = false;
          document.getElementById("btnsendpedido").disabled = false;
        }


        $("#moneda").html("");
        $("#moneda").append(res.FilasMoneda);


        document.getElementById('resumentotal').innerHTML = res.f_importotal;
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

          let fila =
            "<tr><td class='text-center'>" +
            id +
            "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(66,222,10)'></span>" +

            "</td><td class='text-left'>" +
            item +
            "</td><td class='text-left'>" +
            nombre +
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
            " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-aci").appendChild(btn);
          myArray.push({ id: id, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });
        }
        creardatatable("#example2");


        // alert('des');
        // $("#tbproducto").find("input,button,textarea,select").attr("disabled", true);


        datosaci.splice(0, datosaci.length);
        datosaci = myArray;
        console.log(datosaci);
        document.getElementById('monedaimporte').innerHTML = $('#moneda option:selected').text();
      }
    });
  }

  document.getElementById('fecharesumen').innerHTML = 'RESUMEN DEL PEDIDO (' + output + ')';
  document.getElementById("nropedido").style.color = "red";
  document.getElementById('nropedido').innerHTML = "NUEVO";
  document.getElementById('resumentotal').innerHTML = "0";

  creardatatable("#example2");
  creardatatable("#tbarchivo");
  creardatatable("#tbpptopedido");
  document.getElementById('monedaimporte').innerHTML = $('#moneda option:selected').text();


  var datosppto = [];
  var codmes = "";
  var nombremes = "";
  var monto = 0;

  //Array general par manejos de datos
  var countaci = 1;
  var datosaci = [];


  //#region                                               (OPCION 1 DESDE LISTADO DE PRODUCTOS)
  var tbprod = $("#tbproducto").DataTable({
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
      [10, 25, 50, -1],
      ["10", "25", "50", "Todo"],
    ],
  });

  $("#tbproducto tbody").on("click", "a.agregar", function () {
    $("#descripcion").html("");
    $("#unidad").html("");
    document.getElementById("cantidad").value = null;
    document.getElementById("precio").value = null;
    document.getElementById("importe").value = null;
    var v_invtid = $(this).attr("id");

    var btrue = new Boolean(false);
    $('#example2 tr').each(function () {
      var codprod = $(this).find("td").eq(2).html();
      if (codprod == v_invtid) {
        btrue = true
      }
    });

    if ((btrue == true)) {
      Swal.fire({
        icon: "error",
        title: "YA AGREGO ESTE PRODUCTO" + '  ' + '(' + v_invtid + ')',
        text: "Para volver a añadir quitar del detalle!",
        timer: 4000,
        timerProgressBar: true,
      })
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/buscar_producto',
      data: { v_invtid: v_invtid },
      success: function (res) {
        $('#unidad').val(res.v_undmedida);
        $("#descripcion").html(v_invtid + "-" + res.v_nombreproducto);
        document.getElementById("codproducto").value = v_invtid
        document.getElementById("nombreproduco").value = res.v_nombreproducto;
      }
    });
    $("#myModal").modal("show");

    $('#myModal').on('shown.bs.modal', function () {
      $("#cantidad").focus();
    });


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

  $("#insertar").on("click", function () {
    $('#resumentotal').val('');
    let item = document.getElementById("codproducto").value;
    let nombre = document.getElementById("nombreproduco").value;
    let qty = $("#cantidad").val();
    let price = $("#precio").val();
    let importe = $("#importe").val();
    let v_unidad = $("#unidad").val();

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
    // document.getElementById("resumen").remove();
    $("#example2").dataTable().fnDestroy();

    let fila =
      "<tr><td class='text-center'>" +
      countaci +
      "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(3,164,90)'></span>" +
      "</td><td class='text-left'>" +
      item +
      "</td><td class='text-left'>" +
      nombre +
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
    datosaci.push({ id: countaci, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });
    console.log(datosaci);
    countaci = countaci + 1;
    creardatatable("#example2");


    $("#myModal").modal('hide');
    //CALCULAR
    var resumentotal = 0;

    $('#example2 tr').each(function () {
      var total = $(this).find("td").eq(7).html();
      if ((parseFloat(total)) > 0) {
        resumentotal = (parseFloat(resumentotal) + parseFloat(total));
      }
    });

    document.getElementById('resumentotal').innerHTML = resumentotal;

    // document.getElementById('resumentotalsol').innerHTML = ImporteTotalSol;
    // document.getElementById('resumentotaldol').innerHTML = ImporteTotalDol;
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

  $("#additem").on("click", function () {
    $('#resumentotal').val('');
    let item = countaci.toString()
    let nombre = document.getElementById("descripcionitem").value;
    let qty = $("#cantidaditem").val();
    let price = $("#precioitem").val();
    let importe = $("#totalitem").val();
    let v_unidad = $("#unidaditem").val();

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

    $("#example2").dataTable().fnDestroy();

    let fila =
      "<tr><td class='text-center'>" +
      countaci +
      "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(3,164,90)'></span>" +

      "</td><td class='text-left'>" +
      item +
      "</td><td class='text-left'>" +
      nombre +
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
    datosaci.push({ id: countaci, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });
    console.log(datosaci);
    countaci = countaci + 1;
    creardatatable("#example2");

    var resumentotal = 0;

    $('#example2 tr').each(function () {
      var total = $(this).find("td").eq(7).html();
      if ((parseFloat(total)) > 0) {
        resumentotal = (parseFloat(resumentotal) + parseFloat(total));
      }
    });
    document.getElementById('resumentotal').innerHTML = resumentotal;

    document.getElementById("descripcionitem").value = null;
    document.getElementById("precioitem").value = null;
    document.getElementById("cantidaditem").value = null;
    document.getElementById("totalitem").value = null;
  });
  //#endregion

  //#region                                               (ACCIONES EN LA TABLA DETALLE DEL PEDIDO)
  $("#example2 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    Swal.fire({
      title: "ESTAS SEGURO DE ELIMINAR LA FILA ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        var post = 0;
        var nu_correla = document.getElementById("nropedido").innerHTML;
        let i_item = parseInt(id);
        if (nu_correla != "NUEVO") {
          $.ajax({
            type: "POST",
            url: '/pedidos/pedidos/eliminar_fila',
            data: { post: post, nu_correla: nu_correla, i_item: i_item },
            success: function (res) {
              if (res.respuesta == 1) {
                $.ajax({
                  type: 'POST',
                  url: '/pedidos/pedidos/MostrarPedido',
                  data: { nu_correla: nu_correla },
                  success: function (res) {
                    console.log(res.data);
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
                      let fila =
                        "<tr><td class='text-center'>" +
                        id +
                        "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(66,222,10)'></span>" +

                        "</td><td class='text-left'>" +
                        item +
                        "</td><td class='text-left'>" +
                        nombre +
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
                        " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";


                      let btn = document.createElement("tr");
                      btn.innerHTML = fila;
                      document.getElementById("tablita-aci").appendChild(btn);

                      myArray.push({ id: id, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });
                    }
                    creardatatable("#example2");
                    datosaci.splice(0, datosaci.length);
                    datosaci = myArray;
                    console.log(datosaci);
                  }
                });
              } else {
                let valor = id;
                $('#resumentotal').val('');
                $("#example2").dataTable().fnDestroy();
                let index = datosaci.findIndex((item) => item.id === valor);
                datosaci.splice(index, 1);
                // quitamos las lineas
                $("#tablita-aci").children().remove();

                let myArray = [];
                let contador = 1;
                for (const property in datosaci) {
                  let item = datosaci[property].Item;
                  let nombre = datosaci[property].Descripcion;
                  let v_unidad = datosaci[property].v_unidad;
                  let qty = datosaci[property].Cantidad;
                  let price = datosaci[property].Precio;
                  let importe = datosaci[property].Total;

                  let fila =
                    "<tr><td class='text-center'>" +
                    contador +
                    "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(3,164,90)'></span>" +

                    "</td><td class='text-left'>" +
                    item +
                    "</td><td class='text-left'>" +
                    nombre +
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

                  myArray.push({ id: contador, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });

                  contador = contador + 1;

                  //CALCULAR
                  var resumentotal = 0;
                  // var ImporteTotalSol = 0;
                  // var ImporteTotalDol = 0;

                  $('#example2 tr').each(function () {
                    var total = $(this).find("td").eq(7).html();
                    if ((parseFloat(total)) > 0) {
                      resumentotal = (parseFloat(resumentotal) + parseFloat(total));
                    }
                    // var tipocambio = $('#tipocambio').val();
                    // var moneda = $('#moneda option:selected').text();
                    // ImporteTotalSol = 0;
                    // ImporteTotalSol = parseFloat(importet).toFixed(2);
                    // if (moneda == 'DOL') {
                    //   ImporteTotalDol = 0;
                    //   ImporteTotalDol = parseFloat(parseFloat(importet).toFixed(2) * tipocambio).toFixed(2);
                    // } else {
                    //   ImporteTotalDol = 0;
                    // }
                  });

                  document.getElementById('resumentotal').innerHTML = ImporteTotalSol;
                  // document.getElementById('resumentotaldol').innerHTML = ImporteTotalDol;
                  // document.getElementById('resumentotaldol').innerHTML = ImporteTotalDol;
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

          let valor = id;
          $('#resumentotal').val('');
          $("#example2").dataTable().fnDestroy();
          let index = datosaci.findIndex((item) => item.id === valor);
          datosaci.splice(index, 1);
          // quitamos las lineas
          $("#tablita-aci").children().remove();

          let myArray = [];
          let contador = 1;
          for (const property in datosaci) {
            let item = datosaci[property].Item;
            let nombre = datosaci[property].Descripcion;
            let v_unidad = datosaci[property].v_unidad;
            let qty = datosaci[property].Cantidad;
            let price = datosaci[property].Precio;
            let importe = datosaci[property].Total;

            let fila =
              "<tr><td class='text-center'>" +
              contador +
              "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(3,164,90)'></span>" +

              "</td><td class='text-left'>" +
              item +
              "</td><td class='text-left'>" +
              nombre +
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
              " class='btn btn-indo btn-sm text-white file'><span class='fa-solid fa-file-arrow-up fa-beat'><b></b></span></a></td>" +
              "</td><td><a id=" +
              contador +
              " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

            let btn = document.createElement("tr");
            btn.innerHTML = fila;
            document.getElementById("tablita-aci").appendChild(btn);

            myArray.push({ id: contador, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });

            contador = contador + 1;

            //CALCULAR
            var resumentotal = 0;
            // var ImporteTotalSol = 0;
            // var ImporteTotalDol = 0;

            $('#example2 tr').each(function () {
              var total = $(this).find("td").eq(7).html();
              if ((parseFloat(total)) > 0) {
                resumentotal = (parseFloat(resumentotal) + parseFloat(total));
              }
              // var tipocambio = $('#tipocambio').val();
              // var moneda = $('#moneda option:selected').text();
              // ImporteTotalSol = 0;
              // ImporteTotalSol = parseFloat(importet).toFixed(2);
              // if (moneda == 'DOL') {
              //   ImporteTotalDol = 0;
              //   ImporteTotalDol = parseFloat(parseFloat(importet).toFixed(2) * tipocambio).toFixed(2);
              // } else {
              //   ImporteTotalDol = 0;
              // }
            });
            document.getElementById('resumentotal').innerHTML = resumentotal;
            // document.getElementById('resumentotaldol').innerHTML = ImporteTotalDol;
            // document.getElementById('resumentotaldol').innerHTML = ImporteTotalDol;
          }

          creardatatable("#example2");
          datosaci.splice(0, datosaci.length);
          datosaci = myArray;
          countaci = contador;
          console.log(datosaci);
        }
      }
    });

  });

  $("#example2 tbody").on("click", "a.file", function () {
    let id = $(this).attr("id");
    var post = 0;
    var nropedido = document.getElementById("nropedido").innerHTML;
    document.getElementById('codprodnote').innerHTML = id;
    var codprodnote = id
    var v_nombre_file = "";


    if ((nropedido == "NUEVO")) {
      $("#namepedido").focus();
      Swal.fire({
        title: "PRIMERO DEBE GUARAR PARA AGREGAR ARCHIVOS",
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

    $("#tbarchivo").dataTable().fnDestroy();
    $("#tablita-nota").children().remove();


    $("#modal-nota").modal("show");

    let count = 0;
    // alert(count);
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
    var v_nombrepedido = $('#namepedido').val();

    // alert(d_fechaentrega);


    console.log(datosaci);


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
      confirmButtonText: "Si, Procesar!",
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
            datosaci: datosaci
          },
          success: function (res) {
            var nu_correla = res.vtext

            $.ajax({
              type: 'POST',
              url: '/pedidos/pedidos/MostrarPedido',
              data: { nu_correla: nu_correla },
              success: function (res) {
                console.log(res.data);


                if (Number(res.i_idorden_aprobacion) != 0) {
                  document.getElementById("btnguardar").disabled = true;
                  document.getElementById("btnsendpedido").disabled = true;
                } else {
                  document.getElementById("btnguardar").disabled = false;
                  document.getElementById("btnsendpedido").disabled = false;
                }


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

                  let fila =
                    "<tr><td class='text-center'>" +
                    id +
                    "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(66,222,10)'></span>" +

                    "</td><td class='text-left'>" +
                    item +
                    "</td><td class='text-left'>" +
                    nombre +
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
                    " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";

                  let btn = document.createElement("tr");
                  btn.innerHTML = fila;
                  document.getElementById("tablita-aci").appendChild(btn);
                  myArray.push({ id: id, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });
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
              clearInterval(id);
            }, res.itimer);

          }
        });
      }
    });
  });




  $('#btnsendpedido').on('click', function () {
    var post = 0;
    var nu_correla = document.getElementById("nropedido").innerHTML;

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
              location.href = "http://localhost:8080/pedidos/pedidos/index";
            }, res.itimer);

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
    document.getElementById('importepedido').innerHTML = resumentotal;
    document.getElementById('nropedidoppto').innerHTML = nu_correla;
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

            $("#tbpptopedido").dataTable().fnDestroy();
            $("#tablita-ppto").children().remove();

            let myArray = [];
            for (const property in res.data) {
              let nu_correla = res.data[property].nu_correla;
              let v_idlinea = res.data[property].v_idlinea;
              let v_idppto = res.data[property].v_idppto;
              let v_idpartida = res.data[property].v_idpartida;
              let v_idmes = res.data[property].v_idmes;
              let v_nombremes = res.data[property].v_nombremes;
              let f_monto = res.data[property].f_monto;
              let v_centrocosto = res.data[property].v_centrocosto;

              let fila =
                "<tr><td class='text-center'>" +
                nu_correla +
                "</td><td class='text-left'>" +
                v_idppto +
                "</td><td class='text-left'>" +
                v_idpartida +
                "</td><td class='text-left'>" +
                v_idmes +
                "</td><td class='text-left'>" +
                v_nombremes +
                "</td><td class='text-left'>" +
                f_monto +
                "</td><td class='text-left'>" +
                v_centrocosto +
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
        for (const property in res.data) {
          let v_codigo = res.data[property].v_codigo;
          let v_idpartida = res.data[property].v_idpartida;
          let v_codmes = res.data[property].v_codmes;
          let v_nombremes = res.data[property].v_nombremes;
          let f_saldo = res.data[property].f_saldo;
          let v_namesaldomes = res.data[property].v_namesaldomes;
          let v_disabled = res.data[property].v_disabled;

          $("#div-mes").append(
            " <div class='col-sm-4'>\<div class='business-item'>\
                  <div class='d-flex align-items-center justify-content-between'>\
                    <div class='custom-control custom-checkbox'>\
                      <input type='checkbox'  onclick='onToggle()' class='custom-control-input' id=" + v_nombremes + " " + v_disabled + " = " + v_disabled + ">\
                        <label class='custom-control-label badge badge-light-danger' id="+ v_nombremes + " for=" + v_nombremes + ">" + v_nombremes + "</label>\
                    </div>\
                    <div class='badge badge-light-success' id="+ v_namesaldomes + ">" + f_saldo + "</div>\
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
        for (const property in res.data) {
          let v_codigo = res.data[property].v_codigo;
          let v_idpartida = res.data[property].v_idpartida;
          let v_codmes = res.data[property].v_codmes;
          let v_nombremes = res.data[property].v_nombremes;
          let f_saldo = res.data[property].f_saldo;
          let v_namesaldomes = res.data[property].v_namesaldomes;
          let v_disabled = res.data[property].v_disabled;

          $("#div-mes").append(
            " <div class='col-sm-4'>\<div class='business-item'>\
                  <div class='d-flex align-items-center justify-content-between'>\
                    <div class='custom-control custom-checkbox'>\
                      <input type='checkbox'  onclick='onToggle()' class='custom-control-input' id=" + v_nombremes + " " + v_disabled + " = " + v_disabled + ">\
                        <label class='custom-control-label badge badge-light-danger' id="+ v_nombremes + " for=" + v_nombremes + ">" + v_nombremes + "</label>\
                    </div>\
                    <div class='badge badge-light-success' id="+ v_namesaldomes + ">" + f_saldo + "</div>\
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

    console.log(cantidadx);
    console.log(montox);

    if (cantidadx > montox) {
      $("#montolleva").focus();
      $('#montolleva').val(monto);

      Swal.fire({
        title: 'MONTO ES MAYOR AL SALDO DEL MES SELECCIONADO',
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

  $("#agregarppto").on("click", function () {
    var post = 0;
    var nu_correla = document.getElementById("nropedido").innerHTML;
    var v_idppto = $('#idppto  option:selected').val();
    var v_idpartida = $('#idpartida  option:selected').val();
    var v_centrocosto = $('#idcentrocosto  option:selected').val();

    var cantidad = $('#montolleva').val();
    var cantidadx = parseFloat(cantidad);
    var montox = parseFloat(monto);


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


    if (v_centrocosto == "XXXXXXXXXX" || v_centrocosto == null) {
      $("#idcentrocosto").focus();
      Swal.fire({
        title: 'SELECCIONE CENTRO DE COSTO',
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
      title: "Estas seguro de procesar en el Sistema?",
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
          url: '/pedidos/pedidos/registro_pedido_ppto',
          data: {
            post: post,
            nu_correla: nu_correla,
            v_idppto: v_idppto,
            v_idpartida: v_idpartida,
            codmes: codmes,
            nombremes: nombremes,
            cantidadx: cantidadx,
            v_centrocosto: v_centrocosto,
          },
          success: function (res) {

            $.ajax({
              type: 'POST',
              url: '/pedidos/pedidos/Mostrar_pedido_ppto',
              data: { nu_correla: nu_correla },
              success: function (res) {

                $("#tbpptopedido").dataTable().fnDestroy();
                $("#tablita-ppto").children().remove();

                let myArray = [];
                for (const property in res.data) {
                  let nu_correla = res.data[property].nu_correla;
                  let v_idlinea = res.data[property].v_idlinea;
                  let v_idppto = res.data[property].v_idppto;
                  let v_idpartida = res.data[property].v_idpartida;
                  let v_idmes = res.data[property].v_idmes;
                  let v_nombremes = res.data[property].v_nombremes;
                  let f_monto = res.data[property].f_monto;
                  let v_centrocosto = res.data[property].v_centrocosto;

                  let fila =
                    "<tr><td class='text-center'>" +
                    nu_correla +
                    "</td><td class='text-left'>" +
                    v_idppto +
                    "</td><td class='text-left'>" +
                    v_idpartida +
                    "</td><td class='text-left'>" +
                    v_idmes +
                    "</td><td class='text-left'>" +
                    v_nombremes +
                    "</td><td class='text-left'>" +
                    f_monto +
                    "</td><td class='text-left'>" +
                    v_centrocosto +
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
              // location.reload();
              clearInterval(id);
            }, res.itimer);


          }
        });
      }
    });

  });

  $("#tbpptopedido tbody").on("click", "a.delete", function () {
    let v_idlinea = $(this).attr("id");
    // var nropedido = document.getElementById("nropedido").innerHTML;
    var nu_correla = document.getElementById("nropedido").innerHTML;

    Swal.fire({
      title: "Estas seguro de eliminar la Fila?",
      text: "Se eliminar la fila del Ppto",
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
          url: '/pedidos/pedidos/eliminar_fila_ppto',
          data: { nu_correla: nu_correla, v_idlinea: v_idlinea },
          success: function (res) {

            if (res.respuesta == 1) {
              $.ajax({
                type: 'POST',
                url: '/pedidos/pedidos/Mostrar_pedido_ppto',
                data: { nu_correla: nu_correla },
                success: function (res) {

                  $("#tbpptopedido").dataTable().fnDestroy();
                  $("#tablita-ppto").children().remove();

                  let myArray = [];
                  for (const property in res.data) {
                    let nu_correla = res.data[property].nu_correla;
                    let v_idlinea = res.data[property].v_idlinea;
                    let v_idppto = res.data[property].v_idppto;
                    let v_idpartida = res.data[property].v_idpartida;
                    let v_idmes = res.data[property].v_idmes;
                    let v_nombremes = res.data[property].v_nombremes;
                    let f_monto = res.data[property].f_monto;
                    let v_centrocosto = res.data[property].v_centrocosto;

                    let fila =
                      "<tr><td class='text-center'>" +
                      nu_correla +
                      "</td><td class='text-left'>" +
                      v_idppto +
                      "</td><td class='text-left'>" +
                      v_idpartida +
                      "</td><td class='text-left'>" +
                      v_idmes +
                      "</td><td class='text-left'>" +
                      v_nombremes +
                      "</td><td class='text-left'>" +
                      f_monto +
                      "</td><td class='text-left'>" +
                      v_centrocosto +
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

      }
    });
  });

  //#endregion

  //#region                                               (ACCIONES EN LA TABLA DETALLE DE ARCHIVOS)
  $('#close_pedido').on('click', function () {
    var nu_correla = document.getElementById("nropedido").innerHTML;
    $.ajax({
      type: 'POST',
      url: '/pedidos/pedidos/MostrarPedido',
      data: { nu_correla: nu_correla },
      success: function (res) {
        console.log(res.data);

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

          let fila =
            "<tr><td class='text-center'>" +
            id +
            "</td><td><span class='fa-solid fa-truck fa-beat'  style='color:rgb(66,222,10)'></span>" +

            "</td><td class='text-left'>" +
            item +
            "</td><td class='text-left'>" +
            nombre +
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
            " class='btn btn-danger btn-sm text-white delete'><span class='fa-solid fa-trash-can'><b></b></span></a></td></tr>";
          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-aci").appendChild(btn);

          myArray.push({ id: id, Item: item, Descripcion: nombre, Unidad: v_unidad, Cantidad: qty, Precio: price, Total: importe });
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
  // location.reload();
  // clearInterval(id);
  location.href = "http://localhost:8080/pedidos/pedidos/realizarpedido/index";
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