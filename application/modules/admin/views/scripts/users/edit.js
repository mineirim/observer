Ext.define('ExtZF.view.admin.users.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.admiUserEdit',
    title : 'Edição de Usuário',
    layout: 'fit',
    autoShow: true, 
    width : 740,
    
    initComponent: function() {
    	// Itens da janela
        this.items = [{
                xtype: 'form',
                bodyPadding: 13,
                padding:8,
                items: [{
                    xtype       : 'textfield',
                    name        : 'nome',
                    ref         : 'nome',
                    fieldLabel  : 'Nome',
                    allowBlank  : false,
                    anchor      :'95%'
                },
                {
                    xtype       : 'textfield',
                    name        : 'email',
                    ref         : 'email',
                    fieldLabel  : 'Email',
                    allowBlank  : false,
                    vtype       : 'email',
                    anchor      :'95%'
                },
                {
                    xtype       : 'textfield',
                    name        : 'usuario',
                    ref         : 'usuario',
                    fieldLabel  : 'Login',
                    allowBlank  : false,
                    vtype       : 'alphanum'
                    //regex: /[a-zA-Z0-9]+/
                },
                {
                    xtype       : 'checkbox',
                    name        : 'is_su',
                    ref         : 'is_su',
                    fieldLabel  : 'Super-usuário(administrador)',
                    allowBlank  : false,
                    anchor      :'95%',
                    labelWidth  : 200,
                    labelStyle  : 'white-space: nowrap;'
                }
            ]}
        ];

        this.buttons = [{
            text: 'Salvar',
            action: 'save',
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