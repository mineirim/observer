Ext.define('ExtZF.view.plano.tags.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoTagsList', // nome definido para acessar a grid
    store: 'Tags', // store definido em store/Tags.js
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
	columns: [{header: 'Id.',  dataIndex: 'id', width: 20},
		{header: 'Tag',  dataIndex: 'tag',  flex: 1},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Tags',
        dock: 'bottom',
        displayInfo: true
    }]
});