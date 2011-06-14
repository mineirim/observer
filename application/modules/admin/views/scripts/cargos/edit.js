Ext.define('ExtZF.view.admin.cargos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.adminCargosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, 
    width    : 500,
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            padding : '15px',
            items: [
	{xtype: 'textfield',name : 'nome',ref: 'nome',fieldLabel: 'Nome',width: 500,padding:'12px'},
	{xtype: 'textarea',
                        name : 'descricao',
                        ref: 'descricao',
                        fieldLabel: 'Descrição', 
                        width: 500,padding:'12px'
                    }]}
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