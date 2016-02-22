Ext.define('ExtZF.view.orcamento.ExecucaoChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.orcamentoExecucaoChart',
    width: '100%',
    animate: true,
    store: 'orcamento.Execucao',
    shadow: true,

    legend: {
        position: 'bottom',
        boxStrokeWidth: 0,
        labelFont: '12px Helvetica'
    },
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['valor_alocado', 'valor_executado'],
        //fields: ['valor_alocado', 'valor_executado'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Valor',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['numeracao'],
        title: 'Programação'
    }],
    series: [{
        type: 'column',
        axis: 'bottom',
        highlight: true,
        // stacked: true,
        title: [
            'Valor Alocado',
            'Valor Executado',
            'Saldo'],
        /*
        title: [
            '% Executado',
            '% Saldo'
            ],
        xField: 'menu',
*/
        yField: [
            'valor_alocado',
            'valor_executado',
            'saldo'
            ],
/*
        yField: [
            'percentual',
            'percentual_saldo',
            ],
*/
        tips: {
            trackMouse: true,
            style: 'background: #FFF',
            height: 20,
            renderer: function(storeItem, item) {
                var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                this.setTitle(browser + ' para ' + storeItem.get('menu') + ': ' + storeItem.get(item.yField));
            }
        }
    }]
});
