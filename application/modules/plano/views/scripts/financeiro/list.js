Ext.define('ExtZF.view.plano.financeiro.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoFinanceiroList', // nome definido para acessar a grid
    store: 'Financeiro', // store definido em store/Financeiro.js
    title : 'Lista',
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'incluir' // action identificada para executar na camada controller
    },{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, width: '20'},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1},
		{header: 'Grupo_despesa_id',  dataIndex: 'grupo_despesa_id',  flex: 1},
		{header: 'Tipo_registro_id',  dataIndex: 'tipo_registro_id',  flex: 1},
		{header: 'Programacao_id',  dataIndex: 'programacao_id',  flex: 1},
		{header: 'Valor',  dataIndex: 'valor',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Financeiro',
        dock: 'bottom',
        displayInfo: true
    }]
});