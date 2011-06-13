Ext.define('ExtZF.view.admin.setores.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.adminSetoresEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textfield',name : 'nome',ref: 'nome',fieldLabel: 'Nome'},
	{xtype: 'textfield',name : 'sigla',ref: 'sigla',fieldLabel: 'Sigla'},
	{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao'},]}
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