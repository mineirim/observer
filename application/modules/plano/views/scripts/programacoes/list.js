Ext.define('ExtZF.view.plano.programacoes.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoProgramacoesList', // nome definido para acessar a grid
    store: 'Programacoes', // store definido em store/Programacoes.js
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
		{header: 'Instrumento_id',  dataIndex: 'instrumento_id',  flex: 1},
		{header: 'Programacao_id',  dataIndex: 'programacao_id',  flex: 1},
		{header: 'Setor_id',  dataIndex: 'setor_id',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Programacoes',
        dock: 'bottom',
        displayInfo: true
    }]
});