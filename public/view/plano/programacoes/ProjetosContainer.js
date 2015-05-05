
Ext.define('ExtZF.view.plano.programacoes.ProjetosContainer' ,{
    extend      : 'Ext.Container', 
    alias       : 'widget.planoProgramacoesContainer',
    width: 740,
    height: 700,
    layout: 'border',// {type: 'vbox', align: 'stretch'},
    frame: false,
    items: [
     {
        id: 'gridPanel',
        viewConfig: {
            forceFit: true
        },
        frame: false,
        height: '33%',
        split: true,
        region: 'north',
        xtype : 'planoProgramacoesTreegrid'
    }, 
     {
        id          : 'ctnDetail',
        region      : 'center',
        xtype       : 'container',
        layout      :   {type: 'vbox', align: 'stretch'},
        frame: false,
        items       : [
//                        {
//                            id      : 'ctnAnexos',
//                            xtype   : 'planoProgramacoesAnexos',
//                            flex    : 0,
//                            
//                        },
                        {
                            xtype   : 'tabpanel',
                            id      : 'tabDetailPanel',
                            flex    : 1,
                            layout  : 'fit',
                            autoHeight : true,
                            overflowY : 'auto',
                            frame: false,
                            items   :[
                                    {
                                        id      : 'detailPanel',
                                        xtype   : 'planoProgramacoesDetalhes',
                                        title   : 'Detalhes',
                                        frame: false,
                                        autoScroll: true                                          
                                    },
                                    {
                                        id      : 'ganttPanel',
                                        html    : '<div id="GanttChartDIV"></div>',
                                        title   : 'Gantt',
                                        frame: false
                                    }
                                    ]
                        }
                    ]
        
    }]
});


