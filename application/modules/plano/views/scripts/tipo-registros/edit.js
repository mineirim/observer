Ext.define('ExtZF.view.plano.tiporegistros.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoTipoRegistrosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao'},
	{xtype: 'textfield',name : 'abreviatura',ref: 'abreviatura',fieldLabel: 'Abreviatura'},]}
        ];

        // botões da janela
        this.buttons = [{
            text: 'Salvar',
            iconCls: 'icon-save',
            action: 'salvar'
        },
        {
            text: 'Cancelar',
            iconCls: 'icon-cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});