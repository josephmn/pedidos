$(function () {


  creardatatable('#tbpedidos');

  var post = 0;
  $.ajax({
    type: "POST",
    url: "/pedidos/dashboard/NumeroPedidos",
    data: {
      post: post
    },
    success: function (res) {
      var json = JSON.parse("[" + res + "]");
      DibujarGrafico1(json[0]);
    },
  });


  $.ajax({
    type: "POST",
    url: "/pedidos/dashboard/SolesPedidos",
    data: {
      post: post
    },
    success: function (res) {
      console.log(res);
      var json = JSON.parse("[" + res + "]");
      DibujarGrafico2(json[0]);
    },
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


function DibujarGrafico1(datos) {
  // Create the chart
  Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      align: 'center',
      // text: 'NUMERO DE PEDIDOS POR AREA'
      text: "<h5 class='form-label font-weight-bold text-center'  style='background:#62BB3E;font-weight:bold'><b><i class='fa-solid fa-file fa-bounce'></i>&nbsp;&nbsp;NUMERO DE PEDIDOS POR AREA</b></h5>"
    },
    subtitle: {
      align: 'center',
      text: ''
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Numero de pedidos por Area'
      }

    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: 'Pedidos. {point.y:.0f}'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> total<br/>'
    },

    series: [
      {
        name: "Pedidos",
        colorByPoint: true,
        data: datos,
      }
    ],




  });
}



function DibujarGrafico2(datos) {
  Highcharts.chart('container1', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      // text: 'TOTAL EN SOLES DE PEDIDOS POR AREA'
      text: "<h5 class='form-label font-weight-bold text-center'  style='background:#62BB3E;font-weight:bold'><b><i class='fa-solid fa-file fa-bounce'></i>&nbsp;&nbsp;TOTAL EN SOLES DE PEDIDOS POR AREA</b></h5>"
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '#'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y:.1f}'
        }
      }
    },
    series: [{
      name: '',
      colorByPoint: true,
      data: datos,

      // data: [{
      //   name: 'Chrome',
      //   y: 61.41,
      //   sliced: true,
      //   selected: true
      // }, {
      //   name: 'Internet Explorer',
      //   y: 11.84
      // }, {
      //   name: 'Firefox',
      //   y: 10.85
      // }, {
      //   name: 'Edge',
      //   y: 4.67
      // }, {
      //   name: 'Safari',
      //   y: 4.18
      // }, {
      //   name: 'Sogou Explorer',
      //   y: 1.64
      // }, {
      //   name: 'Opera',
      //   y: 1.6
      // }, {
      //   name: 'QQ',
      //   y: 1.2
      // }, {
      //   name: 'Other',
      //   y: 2.61
      // }]
    }]
  });
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