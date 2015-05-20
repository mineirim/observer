/* global Ext */

Ext.define('ExtZF.view.plano.anexos.Grid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoAnexosGrid', 
    store: 'anexos.ProgramacaoAnexosStore',
    frame: true,
    title: 'Anexos',
    height: 100,
    layout: 'fit',       
    collapsible:true,
    iconCls :   'icon-attach',
    // botões do cabeçalho
    tbar :['->',{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
		{header: 'Nome',  dataIndex: 'nome',  flex: 4},
		{header: 'Tipo',  dataIndex: 'mimetype',  flex: 2},
		{header: 'Inserido por',  dataIndex: 'usuario',  flex: 2},
		{header: 'Data',  dataIndex: 'inclusao_data',  flex: 1,renderer: Ext.util.Format.dateRenderer('d/m/Y')},
		{header: 'Tags',  dataIndex: 'tags',  flex: 2},
            ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Anexos',
        dock: 'bottom',
        displayInfo: true
    }]
});