Ext.define('ExtZF.view.plano.programacoes.Treegrid' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.planoProgramacoesTreegrid', // nome definido para acessar a grid
    title : 'treegrid programacao',
    useArrows: true,
    rootVisible: false,
    store: 'Programacoes', // store definido em store/Programacoes.js
    ac: true,
    singleExpand: true,
    
    selModel: {mode: 'SINGLE'}, // Permite selecionar mais de uma linha da grid
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
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 1, xtype: 'treecolumn'},
		{header: 'Menu',  dataIndex: 'menu',  flex: 1},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1},
		{header: 'Ordem',  dataIndex: 'ordem',  flex: 1},
		{header: 'Instrumento_id',  dataIndex: 'instrumento_id',  flex: 1},
		{header: 'Programacao_id',  dataIndex: 'programacao_id',  flex: 1},
		{header: 'Setor_id',  dataIndex: 'setor_id',  flex: 1}]
});

