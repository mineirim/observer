/* global Ext */

Ext.define('ExtZF.view.plano.execucao.Window', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoExecucaoWindow', // nome definido a janela
    id          : 'planoExecucaoWindow',
    title       : 'Execução',
    width       : 1000,
    minHeight   : 500,
    height      : 600,
    maxHeight   : 620,
    autoShow    : true, 
    layout      : 'fit',
    forcefit:true,
    items       : [{ xtype  : 'tabpanel',
                    forcefit:true,
                    items   : [{ xtype :'panel',
                                title : 'Físico',
                                forcefit:true,
                                layout : {align: 'stretch', type: 'vbox',},
                                items : [
                                        {xtype: 'planoOperativosForm'},
                                        {
                                            id    : 'historicoOperativos',
                                            xtype : 'planoOperativosList',
                                            title : 'Consulta Histórico',
                                            flex  : 1,
                                            autoHeight:true,
                                            minHeight: 150,
                                            hidden:false,
                                            autoscroll: true
                                        }
                                        ]
                                },
                                {
                                    xtype :'panel',
                                    title : 'Financeiro',
                                    forcefit:true,
                                    layout : {align: 'stretch', type: 'vbox',},
                                    items : [
                                            {
                                                xtype       : 'planoFinanceiroList', 
                                                title       :'Programado',
                                                id          : 'planoFinanceiroList',
                                                programacao_id : null,
                                                dockedItems:[],
                                                forceFit    : true,
                                                flex        : 3,       
                                            },
                                            {
                                                xtype       : 'planoDespesasList', 
                                                id          : 'planoDespesasList',
                                                dockedItems :[],
                                                programacao_id : null,
                                                flex        : 5, 
                                                title       :'Execução',
                                                forceFit    : true,
                                            }
                                    ]
                                }
                            ]
    }],
});