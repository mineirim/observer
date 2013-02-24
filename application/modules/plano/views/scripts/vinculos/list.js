Ext.define('ExtZF.view.plano.vinculos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoVinculosList', // nome definido para acessar a grid
    store: 'Vinculos', // store definido em store/Vinculos.js
    title : 'Lista',
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'incluir' // action identificada para executar na camada controller
    },'->',{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, width: '20'},
		{header: 'Programacao_id',  dataIndex: 'programacao_id',  flex: 1},
		{header: 'Depende_programacao_id',  dataIndex: 'depende_programacao_id',  flex: 1},
		{header: 'Justificativa',  dataIndex: 'justificativa',  flex: 1},
		{header: 'Observacoes',  dataIndex: 'observacoes',  flex: 1},
		{header: 'Pactuado',  dataIndex: 'pactuado',  flex: 1},
		{header: 'Pacto_responsavel_id',  dataIndex: 'pacto_responsavel_id',  flex: 1},
		{header: 'Situacao_id',  dataIndex: 'situacao_id',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Vinculos',
        dock: 'bottom',
        displayInfo: true
    }]
});