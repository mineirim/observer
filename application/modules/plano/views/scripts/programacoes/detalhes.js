
Ext.define('ExtZF.view.plano.programacoes.Detalhes' ,{
    extend      : 'Ext.Panel', 
    alias       : 'widget.planoProgramacoesDetalhes',
    frame       : true,
    border      : false,
    forceFit    : true,
    bodyPadding : 0,
    bodyStyle   : "background: #ffffff;", 
    layout      : {type: 'vbox', align: 'stretch'},
    items       : [{
                    bodyPadding : 7,
                    id      : 'showDetail',
                    alias   : 'widget.planoProgramacoesDetalhesDisplay',
                    html    : ' ',
                    flex    : 2,
                    autoScroll:true,
                        tbar :[{
                                text    : 'Registrar Execução',
                                name    : 'btnExecucao',
                                iconCls : 'icon-new',
                                action  : 'execucao', // action identificada para executar na camada controller
                                hidden  :   true
                            }]
                    },{
                      id    : 'planilhaOrcamentaria',
                      xtype : 'planoProgramacoesGridFinanceiro',
                      flex  : 1,
                      hidden:true,
                      autoscroll: true
                  }]
});


