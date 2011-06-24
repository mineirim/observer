Ext.define('ExtZF.view.admin.situacoes.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminSituacoesList', // nome definido para acessar a grid
    store: 'Situacoes', // store definido em store/Situacoes.js
    title : 'Lista Situações',
//    closable : 'true',
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    tbar :[{
    	text: 'Incluir',
    	action: 'incluir' // action identificada para executar na camada controller
    },{
    	text: 'Excluir',
    	action: 'excluir'
    }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 1},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Situacoes',
        dock: 'bottom',
        displayInfo: true
    }]
});