Ext.define('ExtZF.view.plano.anexos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoAnexosList', 
    store: 'Anexos',
    frame: true,
    title: 'Anexos',
    height: 100,
    layout: 'fit',       
    collapsible:true,
    iconCls :   'icon-attach',
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
		{header: 'Nome',  dataIndex: 'nome',  flex: 1},
		{header: 'Mimetype',  dataIndex: 'mimetype',  flex: 1},
		{header: 'Hash_sum',  dataIndex: 'hash_sum',  flex: 1},
		{header: 'Publicacao_usuario_id',  dataIndex: 'publicacao_usuario_id',  flex: 1},
		{header: 'Publicacao_data',  dataIndex: 'publicacao_data',  flex: 1},
		{header: 'Alteracao_usuario_id',  dataIndex: 'alteracao_usuario_id',  flex: 1},
		{header: 'Alteracao_data',  dataIndex: 'alteracao_data',  flex: 1}],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Anexos',
        dock: 'bottom',
        displayInfo: true
    }]
});