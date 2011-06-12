Ext.define('ExtZF.view.admin.cad-usuarios.Edicao', {
    extend: 'Ext.window.Window',
    alias : 'widget.admiUsuariosEdicao',
    title : 'Edição de Usuário',
    layout: 'fit',
    autoShow: true, 

    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [{
                xtype: 'textfield',
                name : 'nome',
                ref: 'nome',
                fieldLabel: 'Nome',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name : 'email',
                ref: 'email',
                fieldLabel: 'Email',
                allowBlank: false,
                vtype: 'email'
            }]}
        ];

        // bot�es da janela
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