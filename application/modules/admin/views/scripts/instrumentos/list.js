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
    },'->',{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0,  hidden:true},
		{header: 'Menu'         , dataIndex: 'menu',  flex: 2},
		{header: 'Descricao'    , dataIndex: 'descricao',  flex: 3},
//		{header: 'Indicadores'  , xtype: 'booleancolumn', trueText: 'S',falseText: 'N',dataIndex: 'has_indicador',  flex: 1},
//		{header: 'Parcerias'    , xtype: 'booleancolumn', trueText: 'S',falseText: 'N',dataIndex: 'has_parceria',  flex: 1},
		{header: 'Planilha operativa', xtype: 'booleancolumn', trueText: 'S',falseText: 'N', dataIndex: 'has_operativo',  flex: 1},
                {header: 'Responsável'  , xtype: 'booleancolumn', trueText: 'S',falseText: 'N', dataIndex: 'has_responsavel',  flex: 1},
                {header: 'Supervisor'   , xtype: 'booleancolumn', trueText: 'S',falseText: 'N', dataIndex: 'has_supervisor',  flex: 1},
                {header: 'Equipe'       , xtype: 'booleancolumn', trueText: 'S',falseText: 'N', dataIndex: 'has_equipe',  flex: 1},
                {header: 'Vlr Prog'      , xtype: 'booleancolumn', trueText: 'S',falseText: 'N', dataIndex: 'has_vlr_programado',  flex: 1},
                {header: 'Vlr Exec'      , xtype: 'booleancolumn', trueText: 'S',falseText: 'N', dataIndex: 'has_vlr_executado',  flex: 1}
            ],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Instrumentos',
        dock: 'bottom',
        displayInfo: true
    }]
});