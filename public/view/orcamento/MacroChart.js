
Ext.define('ExtZF.view.orcamento.MacroChart' ,{
    extend      : 'Ext.chart.Chart',
    alias       : 'widget.orcamentoMacroChart',
    width       : '100%',
    animate: true,
    store: 'orcamento.GrupoDespesas',
    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 25,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        field: 'vlr_programado',
        showInLegend: true,
        highlight: {
          segment: {
            margin: 20
          }
        },
        label: {
            field: 'grupo_despesas',
            contrast: true,
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
        },
        animate: true
    }]
});