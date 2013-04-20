Ext.define('ExtZF.view.acesso.auth.Changepassword',{
    extend :'Ext.window.Window',
     alias : 'widget.acessoAuthChangepassword',
    iconCls : 'icon-cadeado'
    ,bodyStyle : 'padding:10px;'
    ,title : 'Alterar senha'
    ,labelAlign : 'right'
    ,width : 300
    ,height : 180
    ,labelWidth : 45
    ,minHeight : 180
    ,minWidth : 320
    ,autoShow : true,
    initComponent: function() {
        this.items =[{
            xtype: 'form',
            id  : 'frmChangepassword',
            items : [
                {xtype: 'textfield'
                ,inputType : 'password'
                ,vtype       : 'alphanum'
                ,fieldLabel : 'Senha atual'
                ,emptyText  : 'Informe a senha atual'
                ,msgTarget  : 'side'
                ,itemId     : 'senha_atual'
                ,inputId    : 'senha_atual'
                ,allowBlank : false
                ,selectOnFocus : true
                ,enableKeyEvents: true}
            ,{
                xtype : 'textfield'
                ,inputType : 'password'
                ,vtype       : 'alphanum'
                ,fieldLabel : 'Nova senha'
                ,emptyText : 'Informe a nova senha'
                ,msgTarget : 'side'
                ,itemId     : 'senha_nova'
                ,inputId    : 'senha_nova'
                ,allowBlank : false
                ,selectOnFocus : true
                ,enableKeyEvents: true
            },{
                xtype : 'textfield'
                ,inputType : 'password'
                ,vtype       : 'alphanum'
                ,fieldLabel : 'Confirme'
                ,emptyText : 'Confirme a nova senha'
                ,msgTarget : 'side'
                ,itemId     : 'senha_confirma'
                ,inputId    : 'senha_confirma'
                ,allowBlank : false
                ,selectOnFocus : true
                ,enableKeyEvents: true
            }
            ]

        }];
        this.buttons = [{
                xtype : 'button'
                ,id     : 'alterar'
                ,text : 'Alterar'
                ,iconCls: 'icon-alterar'
                ,action : 'change'
                }]
        this.callParent(arguments);
    }

 
});
