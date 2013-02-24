Ext.define('ExtZF.view.plano.operativos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoOperativosList', // nome definido para acessar a grid
    store: 'Operativos', // store definido em store/Operativos.js
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
		{header: 'Peso',  dataIndex: 'peso',  flex: 1},
		{header: 'Responsavel_id',  dataIndex: 'responsavel_id',  flex: 1},
		{header: 'Data_inicio',  dataIndex: 'data_inicio',  flex: 1},
		{header: 'Data_prazo',  dataIndex: 'data_prazo',  flex: 1},
		{header: 'Data_encerramento',  dataIndex: 'data_encerramento',  flex: 1},
		{header: 'Andamento_id',  dataIndex: 'andamento_id',  flex: 1},
		{header: 'Avaliacao_andamento',  dataIndex: 'avaliacao_andamento',  flex: 1},
		{header: 'Percentual_execucao',  dataIndex: 'percentual_execucao',  flex: 1},
		{header: 'Situacao_id',  dataIndex: 'situacao_id',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Operativos',
        dock: 'bottom',
        displayInfo: true
    }]
});