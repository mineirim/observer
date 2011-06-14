Ext.define('ExtZF.view.admin.cargos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminCargosList', // nome definido para acessar a grid
    store: 'Cargos', // store definido em store/Cargos.js
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
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, width: 20},
		{header: 'Nome',  dataIndex: 'nome',  flex: 1},
		{header: 'Descrição',  dataIndex: 'descricao',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Cargos',
        dock: 'bottom',
        displayInfo: true
    }]
});