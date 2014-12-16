    Ext.define('ExtZF.view.acesso.auth.Form',{
    extend :'Ext.window.Window',
     alias : 'widget.acessoAuthForm',
    iconCls : 'icon-cadeado'
    ,bodyStyle : 'padding:10px;'
    ,title : 'Autenticação'
    ,labelAlign : 'right'
    ,closable : false
    ,constrain : true
    ,width : 300
    ,height : 155
    ,labelWidth : 45
    ,minHeight : 155
    ,minWidth : 220
    ,autoShow : true
    ,items:[{
        xtype: 'form',
        id  : 'frmLogin',
        items : [
            {xtype: 'textfield'
            ,fieldLabel : 'Usuário'
            ,emptyText  : 'Informe seu login'
            ,msgTarget  : 'side'
            ,itemId     : 'usuario'
            ,inputId    : 'usuario'
            ,allowBlank : false
            ,selectOnFocus : true
            ,enableKeyEvents: true}
        ,{
            xtype : 'textfield'
            ,inputType : 'password'
            ,fieldLabel : 'Senha'
            ,emptyText : '*senha*'
            ,msgTarget : 'side'
            ,itemId     : 'senha'
            ,inputId    : 'senha'
            ,allowBlank : false
            ,selectOnFocus : true
            ,enableKeyEvents: true
        }
        ]

    }]
    ,buttons: [{
            xtype : 'button'
            ,id     : 'entrar'
            ,text : 'Entrar'
            ,iconCls: 'icon-entrar'
            ,action : 'entrar'
            }]


 
});
