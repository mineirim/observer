Ext.define('ExtZF.view.admin.setores.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminSetoresList', // nome definido para acessar a grid
    store: 'Setores', // store definido em store/Setores.js
    title : 'Lista',
    closable : 'true',
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
		{header: 'Nome',  dataIndex: 'nome',  flex: 1},
		{header: 'Sigla',  dataIndex: 'sigla',  flex: 1},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Setores',
        dock: 'bottom',
        displayInfo: true
    }]
});