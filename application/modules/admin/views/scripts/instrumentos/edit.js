Ext.define('ExtZF.view.admin.instrumentos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.adminInstrumentosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textfield',name : 'menu',ref: 'menu',fieldLabel: 'Menu'},
	{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao'},
	{xtype: 'textfield',name : 'ordem',ref: 'ordem',fieldLabel: 'Ordem'},
        {xtype: 'checkbox',fieldLabel: 'Indicador',name: 'has_indicador',id: 'has_indicador'},
        {xtype: 'checkbox',fieldLabel: 'Parceria',name: 'has_parceria',id: 'has_parceria'},
        {xtype: 'checkbox',fieldLabel: 'Planilha Operativa',name: 'has_operativo',id: 'has_operativo'},
	{xtype: 'textfield',name : 'instrumento_id',ref: 'instrumento_id',fieldLabel: 'Instrumento_id'},
        {xtype: 'textfield',name : 'singular',ref: 'singular',fieldLabel: 'Singular'},]}
        ];

        this.buttons = [{
            text: 'Salvar',
            action: 'salvar',
            iconCls: 'icon-save'
        },
        {
            text: 'Cancelar',
            scope: this,
            handler: this.close,
            iconCls : 'icon-cancel'
        }];

        this.callParent(arguments);
    }
});