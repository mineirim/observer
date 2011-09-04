Ext.define('ExtZF.view.admin.setores.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.adminSetoresEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    width : 740,
    height  :450,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            bodyPadding: 13,
            padding:8,
            items: [
	{xtype: 'textfield',name : 'nome',ref: 'nome',fieldLabel: 'Nome', anchor :'98%'},
	{xtype: 'textfield',name : 'sigla',ref: 'sigla',fieldLabel: 'Sigla', anchor :'98%'},
	{xtype: 'htmleditor',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao', anchor :'98%',height :270},]}
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