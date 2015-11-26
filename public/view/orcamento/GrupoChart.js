
Ext.define('ExtZF.view.orcamento.GrupoChart' ,{
    extend      : 'Ext.chart.Chart',
    alias       : 'widget.orcamentoGrupoChart',
    width       : '100%',
    animate: true,
    store: 'orcamento.GrupoDespesas',
    shadow: true,
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['vlr_programado', 'vlr_alocado', 'vlr_executado'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Valor',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['grupo_despesas'],
        title: 'Grupo de Despesas'
    }],
    series: [{
        type: 'column',
        axis: 'bottom',
        highlight: true,
        xField: 'grupo_despesas',
        yField: ['vlr_programado', 'vlr_alocado', 'vlr_executado']
    }]
});