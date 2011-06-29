Ext.define('ExtZF.view.admin.instrumentos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminInstrumentosList', // nome definido para acessar a grid
    store: 'Instrumentos', // store definido em store/Instrumentos.js
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
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, width:20},
		{header: 'Menu',  dataIndex: 'menu',  flex: 2},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 3},
		{header: 'Indicadores',  dataIndex: 'has_indicador',  flex: 1},
		{header: 'Parcerias',  dataIndex: 'has_parceria',  flex: 1},
		{header: 'Planilha operativa',  dataIndex: 'has_operativo',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Instrumentos',
        dock: 'bottom',
        displayInfo: true
    }]
});