
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
        items       : [
            /**{
                            id      : 'ctnAnexos',
                            xtype   : 'planoProgramacoesAnexos',
                            flex    : 0
                        },*/
                        {
                            xtype   : 'tabpanel',
                            flex    : 1,
                            layout  : 'fit',
                            items   :[
                                    {
                                        id      : 'detailPanel',
                                        xtype   : 'planoProgramacoesDetalhes',
                                        title   : 'Detalhes'

                                    },
                                    {
                                        id      : 'ganttPanel',
                                        html    : '<div id="GanttChartDIV"></div>',
                                        title   : 'Gantt'
                                    }
                                    ]
                        }
                    ]
        
    }]
});


