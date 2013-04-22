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
                {header: 'Alteração',  dataIndex: 'alteracao_data',flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/y')},        
		{header: 'Peso',  dataIndex: 'peso',  flex: 1},
		{header: 'Prev. início',  dataIndex: 'data_inicio',  flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                {header: 'Prev. fim',  dataIndex: 'data_prazo',  flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/y')},
		{header: 'Andamento',  dataIndex: 'andamento_id',  flex: 3, 
                    renderer: function(value, metaData, record){
                                var st = Ext.StoreMgr.get('Andamentos');
                                var andamento = st.getById(parseInt(value,10))
                                return andamento.get('descricao');
                            }
                },
		{header: 'Avaliacao do andamento',  dataIndex: 'avaliacao_andamento',  flex: 6},
		{header: '% execucao',  dataIndex: 'percentual_execucao',  flex: 1},
		{header: 'Encerramento',  dataIndex: 'data_encerramento',  flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/y')}
                ]
});