Ext.define('ExtZF.view.admin.organizacoes.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminOrganizacoesList', // nome definido para acessar a grid
    store: 'Organizacoes', // store definido em store/Organizacoes.js
    title : 'Organizações',
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
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
		{header: 'Nome',  dataIndex: 'nome',  flex: 1},
		{header: 'Sigla',  dataIndex: 'sigla',  flex: 1},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Organizacoes',
        dock: 'bottom',
        displayInfo: true
    }]
});