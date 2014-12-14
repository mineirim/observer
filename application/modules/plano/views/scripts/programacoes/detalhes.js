Ext.define('ExtZF.view.plano.programacoes.Detalhes' ,{
    extend      : 'Ext.Panel', 
    alias       : 'widget.planoProgramacoesDetalhes',
    id          : 'detalhes_id',
    frame       : true,
    border      : false,
    forceFit    : true,
    bodyPadding : 0,
    bodyStyle   : "background: #ffffff;", 
    layout      : {type: 'vbox', align: 'stretch'},
    autoScroll :true,
    items       : [{
                        bodyPadding : 7,
                        id      : 'showDetail',
                        alias   : 'widget.planoProgramacoesDetalhesDisplay',
                        html    : ' ',
                        flex    : 1,
                        autoScroll:true,
                        autoHeight:true,
                        minHeight: 150,
                        tbar :[{
                                text    : 'Registrar Execução',
                                name    : 'btnExecucao',
                                iconCls : 'icon-new',
                                action  : 'execucao', 
                                hidden  :   true
                            }]
                    },{
                      id    : 'planilhaOperativa',
                      xtype : 'planoOperativosList',
                      title : 'Planilha Operativa',
                      flex  : 2,
                      autoHeight:true,
                      minHeight: 150,
                      hidden:true,
                      autoscroll: true
                  },{
                      id    : 'planilhaOrcamentaria',
                      xtype : 'planoProgramacoesGridFinanceiro',
                      flex  : 2,
                      autoHeight:true,
                      minHeight: 150,
                      hidden:true,
                      autoscroll: true
                  }]
});


