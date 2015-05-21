/* global Ext, _myAppGlobal */

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
                {
                    text: ' ',
                    align: 'center',
                    xtype: 'actioncolumn',
                    items: [
                        {
                           xtype: 'button',
                           text: null,
                           scale: 'small',
                           scope: this,                           
                           iconCls: 'icon-download',
                           action: 'download',
                           handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                _myAppGlobal.fireEvent('downloadFileLine',this,rec);
                           }
                        },'-',
                        {
                           xtype: 'button',
                           text: 'Apagar',
                           scope: this,                           
                           iconCls: 'icon-delete',
                           scale: 'small',
                           action: 'delete',
                           handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                               _myAppGlobal.fireEvent('deleteFileLine',this,rec);
                           }
                        }
                    ]
                }
            ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Anexos',
        dock: 'bottom',
        displayInfo: true
    }]
});