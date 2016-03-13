Ext.define('ExtZF.view.orcamento.ExecucaoChartStacked', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.orcamentoExecucaoChartStacked',
    width: '100%',
    animate: true,
    store: 'orcamento.Execucao',
    shadow: true,
    title: 'Programação',
    legend: {
        position: 'bottom',
        boxStrokeWidth: 0,
        labelFont: '9px Helvetica'
    },
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['percentual', 'percentual_saldo'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: '%',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['numeracao'],
    }],
    series: [{
        type: 'column',
        axis: 'bottom',
        highlight: true,
        stacked: true,


        title: [
            '% Executado',
            '% Saldo'
            ],
        xField: 'menu',

        yField: [
            'percentual',
            'percentual_saldo',
            ],
        tips: {
            trackMouse: true,
            style: 'background: #FFF',
            height: 20,
            renderer: function(storeItem, item) {
                var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                this.setTitle(browser + ' para ' + storeItem.get('menu') + ': ' + Ext.util.Format.number(storeItem.get(item.yField), '0,000.00'));
            }
        }
    }]
});
