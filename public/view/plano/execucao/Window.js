/* global Ext */

Ext.define('ExtZF.view.plano.execucao.Window', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoExecucaoWindow', // nome definido a janela
    id          : 'planoExecucaoWindow',
    title       : 'Execução',
    width       : 1000,
    minHeight   : 390,
    height      : 530,
    maxHeight   : 590,
    autoShow    : true, 
    layout      : 'fit',
    items       : [{ xtype  : 'tabpanel',
                    items   : [{ xtype :'panel',
                                title : 'Físico',
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
                                    items : [
                                            {
                                                xtype: 'planoFinanceiroList', 
                                                title :'Programado',
                                                dockedItems:[],
                                                forceFit    : true,
                                                autoShow    :false,
                                                flex        : 5,
                                                minHeight   : 220                 
                                            },
                                            {
                                                dockedItems:[],
                                                flex      : 7, 
                                                title       :'Execução',
                                                forceFit    : true,
                                                autoShow    :false,
                                                minHeight   : 280
                                            }
                                    ]
                                }
                            ]
    }],
});