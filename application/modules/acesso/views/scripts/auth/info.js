    Ext.define('ExtZF.view.acesso.auth.Form',{
    extend :'Ext.window.Window',
     alias : 'widget.acessoAuthForm',
    iconCls : 'icon-cadeado'
    ,bodyStyle : 'padding:10px;'
    ,title : 'Acesso restrito'
    ,labelAlign : 'right'
    ,closable : false
    ,constrain : true
    ,width : 600
    ,height : 155
    ,labelWidth : 45
    ,minHeight : 155
    ,minWidth : 220
    ,autoShow : true
    ,items:[{
        xtype: 'form',
        id  : 'frmLogin',
        items : [
            {
              xtype: 'component',
              autoEl: {
                tag: 'div',
                html: '<h3>O seu usuário ainda não em acesso ao sistema SISPLAN</h3> Uma solicitação foi enviada automaticamente para o administrador do sistema e você receberá a confirmação de liberação através do e-mail <?php echo $this->email?>'
              }
            },
        ]

    }]


 
});
