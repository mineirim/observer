Ext.define('ExtZF.view.plano.grupodespesas.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoGrupoDespesasList', // nome definido para acessar a grid
    store: 'GrupoDespesas', // store definido em store/GrupoDespesas.js
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
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
		{header: 'Descricao',  dataIndex: 'descricao',  flex: 1},
		{header: 'Abreviatura',  dataIndex: 'abreviatura',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'GrupoDespesas',
        dock: 'bottom',
        displayInfo: true
    }]
});