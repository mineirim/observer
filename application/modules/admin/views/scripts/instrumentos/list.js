Ext.define('ExtZF.view.admin.instrumentos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminInstrumentosList', // nome definido para acessar a grid
    store: 'Instrumentos', // store definido em store/Instrumentos.js
    title : 'Lista',
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
		{header: 'Menu',  dataIndex: 'menu',  flex: 1},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1},
		{header: 'Ordem',  dataIndex: 'ordem',  flex: 1},
		{header: 'Has_indicador',  dataIndex: 'has_indicador',  flex: 1},
		{header: 'Has_intersecao',  dataIndex: 'has_intersecao',  flex: 1},
		{header: 'Instrumento_id',  dataIndex: 'instrumento_id',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Instrumentos',
        dock: 'bottom',
        displayInfo: true
    }]
});