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
            },
            {
                xtype: 'textfield',
                name : 'usuario',
                ref: 'usuario',
                fieldLabel: 'Login',
                allowBlank: false
            },
            {   
                xtype: 'combo',
                name        : 'setor_id',
                ref         : 'setor_id',
                fieldLabel  : 'Setor', 
                store       : 'Setores',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local'
            },
        
            {   
                xtype: 'combo',
                name        : 'cargo_id',
                ref         : 'cargo_id',
                fieldLabel  : 'Cargo', 
                store       : 'Cargos',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local'
            },
    


]}
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