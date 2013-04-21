Ext.define('ExtZF.view.plano.despesas.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoDespesasList', 
    id    : 'planoDespesasList',
    store: 'Despesas', 
    title : 'Lista',
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
//    tbar :[{
//    	text: 'Incluir',
//        iconCls: 'icon-new',
//    	action: 'incluir' // action identificada para executar na camada controller
//    },'->',{
//    	text: 'Excluir',
//        iconCls: 'icon-delete',
//    	action: 'excluir'
//    }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 4, width: 150},
		{header: 'Origem Recurso',   dataIndes : 'financeiro', width: 150 ,
                   renderer : function(value, metaData, record){
                        return record.get('financeiro').descricao;
                    },                               
                   flex: 2},
		{header: 'Valor',  dataIndex: 'valor',  flex: 2, align : 'right',width: 80, xtype: 'numbercolumn'}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Despesas',
        dock: 'bottom',
        displayInfo: true
    }]
});