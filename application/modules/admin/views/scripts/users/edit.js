/* global Ext */

Ext.define('ExtZF.view.admin.users.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.admiUserEdit',
    title : 'Edição de Usuário',
    layout: 'fit',
    autoShow: true, 
    width : 740, 
    requires: [
        'Ext.ux.form.ItemSelector',
    ],
    
    initComponent: function() {
        var me=this;
    	// Itens da janela
        me.items = [{
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
                },
                {
                    xtype: 'itemselector',
                    id: 'setores',
                    ref : 'setores',
                    name: 'setores',
                    fieldLabel: 'Equipes',
                    store: 'Setores',
                    displayField: 'nome',
                    valueField: 'id',
                    allowBlank: false,
                    msgTarget: 'side',
                    frame:false,
                    buttons : [  'add', 'remove',  ],
                    minHeight : 70,
        //            fromTitle : 'Instituições',
        //            toTitle : 'Financiadoras'
                }
            ]}
        ];

        me.buttons = [{
            text: 'Salvar',
            action: 'save',
            iconCls: 'icon-save'
        },
        {
            text: 'Cancelar',
            scope: me,
            handler: me.close,
            iconCls : 'icon-cancel'
        },
        {
            text: 'Resetar Senha',
            action : 'reset',
            iconCls : 'icon-cancel'
        }];

        me.callParent(arguments);
    }
});