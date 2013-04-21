Ext.define('ExtZF.view.plano.financeiro.List' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.planoFinanceiroList', // nome definido para acessar a grid
    id          : 'planoFinanceiroList',
    store       : 'Financeiro', // store definido em store/Financeiro.js
    title       : 'Lista',
    selModel    : {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    programacao_id:0,
    tbar        :[{
                    text: 'Alocação',
                    iconCls: 'icon-new',
                    action: 'incluir',
                    id: 'btnIncluir'
                },'->',{
                    text: 'Excluir',
                    iconCls: 'icon-delete',
                    action: 'excluir'
                }],
    columns     : [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
		   {header: 'Descricao',  dataIndex: 'descricao',  flex: 5},
		   {header: 'Valor Programado',  dataIndex: 'valor',  flex: 1, align : 'right', xtype: 'numbercolumn'},
		   {header: 'Valor Executado',  dataIndex: 'valor_executado', align : 'right',  flex: 1, xtype: 'numbercolumn'}],
    // Paginação
    dockedItems : [{
                    xtype: 'pagingtoolbar',
                    store: 'Financeiro',
                    dock: 'bottom',
                    displayInfo: true
                }]
});