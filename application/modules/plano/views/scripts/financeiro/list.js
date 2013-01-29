Ext.define('ExtZF.view.plano.financeiro.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoFinanceiroList', // nome definido para acessar a grid
    store: 'Financeiro', // store definido em store/Financeiro.js
    title : 'Lista',
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    programacao_id:0,
    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'incluir',
        id: 'btnIncluir'
    },{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, width: '20', hidden:true},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 5},
		{header: 'Valor Programado',  dataIndex: 'valor',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Financeiro',
        dock: 'bottom',
        displayInfo: true
    }]
});