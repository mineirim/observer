Ext.define('ExtZF.view.plano.despesas.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoDespesasList', 
    id    : 'planoDespesasList',
    store: 'Despesas', 
    title : 'Lista',
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
        tbar    :[{
                    text: 'Registrar Despesa',
                    iconCls: 'icon-new',
                    action: 'despesa',
                    id: 'btnDespesa'
                },
                {
                    width: 400,
                    fieldLabel: 'Filtrar',
                    labelWidth: 50,
                    xtype: 'textfield',
                    action: 'searchText'
                },
                '->',
                {
                    text: 'Excluir',
                    iconCls: 'icon-delete',
                    action: 'excluir'
                }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
		{header: 'Descrição',  dataIndex: 'descricao',  flex: 4, width: 150},
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