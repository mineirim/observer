
Ext.define('ExtZF.view.plano.programacoes.Container' ,{
    extend      : 'Ext.Container', 
    alias       : 'widget.planoProgramacoesContainer',
    width: 740,
    height: 700,
    layout: 'border',// {type: 'vbox', align: 'stretch'},
    items: [
     {
        id: 'gridPanel',
        viewConfig: {
            forceFit: true
        },
        height:210,
        split: true,
        region: 'north',
        xtype : 'planoProgramacoesTreegrid'
    }, 
     {
        id          : 'baixo',
        region      : 'center',
        xtype       : 'container',
        layout      :   {type: 'vbox', align: 'stretch'},
        items       : [{
                            id      : 'ctnAnexos',
                            xtype   : 'planoProgramacoesAnexos',
                            flex    : 0
                        },
                        {
                            id      : 'detailPanel',
                            xtype   : 'planoProgramacoesDetalhes',
                            flex    : 1
                        }
                    ]
        
    }]
});


