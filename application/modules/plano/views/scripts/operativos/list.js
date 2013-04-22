Ext.define('ExtZF.view.plano.operativos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoOperativosList', // nome definido para acessar a grid
    id    : 'planoOperativosList',
    store : 'OperativosHistorico', // store definido em store/Operativos.js
    title : 'Lista',
    height      : 150,
    layout      : 'fit', 
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
  
    columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
		{header: 'Peso',  dataIndex: 'peso',  flex: 1},
		{header: 'Data de início',  dataIndex: 'data_inicio',  flex: 1},
		{header: 'Previsão de conclusão',  dataIndex: 'data_prazo',  flex: 1},
		{header: 'Encerramento',  dataIndex: 'data_encerramento',  flex: 1},
		{header: 'Andamento',  dataIndex: 'andamento_id',  flex: 1},
		{header: 'Avaliacao do andamento',  dataIndex: 'avaliacao_andamento',  flex: 1},
		{header: '% de execucao',  dataIndex: 'percentual_execucao',  flex: 1}
                ]
});