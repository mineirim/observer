Ext.define('ExtZF.view.admin.cad-usuarios.Edicao', {
    extend: 'Ext.window.Window',
    alias : 'widget.admiUsuariosEdicao',
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
                xtype: 'textfield',
                name : 'nome',
                ref: 'nome',
                fieldLabel: 'Nome',
                allowBlank: false,
                anchor      :'95%'
            },
            {
                xtype: 'textfield',
                name : 'email',
                ref: 'email',
                fieldLabel: 'Email',
                allowBlank: false,
                vtype: 'email',
                anchor:'95%',
            },
            {
                xtype: 'textfield',
                name : 'usuario',
                ref: 'usuario',
                fieldLabel: 'Login',
                allowBlank: false,
            },
            {   
                xtype: 'combo',
                name        : 'setor_id',
                ref         : 'setor_id',
                fieldLabel  : 'Setor', 
                store       : 'Setores',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor      : '95%',
                allowBlank  : true,
                typeAhead   : true
            },
        
            {   
                xtype: 'combo',
                name        : 'cargo_id',
                ref         : 'cargo_id',
                fieldLabel  : 'Cargo', 
                store       : 'Cargos',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor      : '95%',
                allowBlank  : true,
                typeAhead   : true
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