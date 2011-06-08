Ext.define('ExtZF.view.admin.organizacoes.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.adminOrganizacoesEdit', // nome definido a janela
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

        // botões da janela
        this.buttons = [{
            text: 'Salvar',
            action: 'salvar'
        },
        {
            text: 'Cancelar',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});