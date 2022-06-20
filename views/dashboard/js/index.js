$(function () {

  var table = $("#example2").DataTable({
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

  DibujarGrafico1()

  // Grafico 8 - Ausentismo remunerado
  // $.ajax({
  //   type: "POST",
  //   url: "/verdum/dashboard/VentasSede",
  //   success: function (res) {

  //     console.log(res);

  //     var json = JSON.parse("[" + res + "]");
  //     // console.log(json[0]);
  //     DibujarGrafico1(json[0]);
  //     // DibujarGrafico1()
  //     DibujarGrafico2()
  //   },
  // });
});


function DibujarGrafico1(datos) {
  // Create the chart
  Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      align: 'left',
      text: 'Browser market shares. January, 2018'
    },
    subtitle: {
      align: 'left',
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
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
        text: 'Total percent market share'
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
          format: '# {point.y:.1f}'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Chrome",
            y: 62.74,
            drilldown: "Chrome"
          },
          {
            name: "Firefox",
            y: 10.57,
            drilldown: "Firefox"
          },
          {
            name: "Internet Explorer",
            y: 7.23,
            drilldown: "Internet Explorer"
          },
          {
            name: "Safari",
            y: 5.58,
            drilldown: "Safari"
          },
          {
            name: "Edge",
            y: 4.02,
            drilldown: "Edge"
          },
          {
            name: "Opera",
            y: 1.92,
            drilldown: "Opera"
          },
          {
            name: "Other",
            y: 7.62,
            drilldown: null
          }
        ]
      }
    ],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right'
        }
      },
      series: [
        {
          name: "Chrome",
          id: "Chrome",
          data: [
            [
              "v65.0",
              0.1
            ],
            [
              "v64.0",
              1.3
            ],
            [
              "v63.0",
              53.02
            ],
            [
              "v62.0",
              1.4
            ],
            [
              "v61.0",
              0.88
            ],
            [
              "v60.0",
              0.56
            ],
            [
              "v59.0",
              0.45
            ],
            [
              "v58.0",
              0.49
            ],
            [
              "v57.0",
              0.32
            ],
            [
              "v56.0",
              0.29
            ],
            [
              "v55.0",
              0.79
            ],
            [
              "v54.0",
              0.18
            ],
            [
              "v51.0",
              0.13
            ],
            [
              "v49.0",
              2.16
            ],
            [
              "v48.0",
              0.13
            ],
            [
              "v47.0",
              0.11
            ],
            [
              "v43.0",
              0.17
            ],
            [
              "v29.0",
              0.26
            ]
          ]
        },
        {
          name: "Firefox",
          id: "Firefox",
          data: [
            [
              "v58.0",
              1.02
            ],
            [
              "v57.0",
              7.36
            ],
            [
              "v56.0",
              0.35
            ],
            [
              "v55.0",
              0.11
            ],
            [
              "v54.0",
              0.1
            ],
            [
              "v52.0",
              0.95
            ],
            [
              "v51.0",
              0.15
            ],
            [
              "v50.0",
              0.1
            ],
            [
              "v48.0",
              0.31
            ],
            [
              "v47.0",
              0.12
            ]
          ]
        },
        {
          name: "Internet Explorer",
          id: "Internet Explorer",
          data: [
            [
              "v11.0",
              6.2
            ],
            [
              "v10.0",
              0.29
            ],
            [
              "v9.0",
              0.27
            ],
            [
              "v8.0",
              0.47
            ]
          ]
        },
        {
          name: "Safari",
          id: "Safari",
          data: [
            [
              "v11.0",
              3.39
            ],
            [
              "v10.1",
              0.96
            ],
            [
              "v10.0",
              0.36
            ],
            [
              "v9.1",
              0.54
            ],
            [
              "v9.0",
              0.13
            ],
            [
              "v5.1",
              0.2
            ]
          ]
        },
        {
          name: "Edge",
          id: "Edge",
          data: [
            [
              "v16",
              2.6
            ],
            [
              "v15",
              0.92
            ],
            [
              "v14",
              0.4
            ],
            [
              "v13",
              0.1
            ]
          ]
        },
        {
          name: "Opera",
          id: "Opera",
          data: [
            [
              "v50.0",
              0.96
            ],
            [
              "v49.0",
              0.82
            ],
            [
              "v12.1",
              0.14
            ]
          ]
        }
      ]
    }
  });
}




function DibujarGrafico2() {
  Highcharts.chart('container1', {
    chart: {
      polar: true
    },
    title: {
      text: 'Highcharts Polar Chart'
    },

    subtitle: {
      text: 'Also known as Radar Chart'
    },

    pane: {
      startAngle: 0,
      endAngle: 360
    },

    xAxis: {
      tickInterval: 45,
      min: 0,
      max: 360,
      labels: {
        format: '{value}°'
      }
    },

    yAxis: {
      min: 0
    },

    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 45
      },
      column: {
        pointPadding: 0,
        groupPadding: 0
      }
    },

    series: [{
      type: 'column',
      name: 'Column',
      data: [8, 7, 6, 5, 4, 3, 2, 1],
      pointPlacement: 'between'
    }, {
      type: 'line',
      name: 'Line',
      data: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
      type: 'area',
      name: 'Area',
      data: [1, 8, 2, 7, 3, 6, 4, 5]
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