Ext.define('ExtZF.view.email.Send', {
    extend: 'Ext.window.Window',
    alias: 'widget.emailSend', // nome definido a janela
    title: 'Edição',
    layout      : {type: 'vbox', align: 'stretch'},
    width: 1000,
    minHeight: 390,
    height: 530,
    maxHeight: 590,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                items: [
                    {xtype: 'displayfield', name: 'mail_to', ref: 'mail_to', fieldLabel: 'Para', flex:1,labelStyle: 'white-space: nowrap;', labelWidth:60, flex:1}, 
                    {name : 'mail_cc', ref: 'mail_cc', fieldLabel: 'Cópia',labelStyle: 'white-space: nowrap;', labelWidth:60, flex:1},
                    {xtype: 'displayfield', name: 'mail_subject', ref: 'mail_subject', fieldLabel: 'Assunto',labelStyle: 'white-space: nowrap;', labelWidth:60, flex:1},
                    {xtype: 'htmleditor', name: 'mail_body', ref: 'avaliacao_andamento',
                        fieldLabel: 'Mensagem',
                        enableFont: false, 
                        frame   : false,
                        height  : 100,
                        resizable : true,
                        anchor: '94%'
                    },
                ],
                buttons : [{
                        text: 'Enviar',
                        iconCls: 'icon-mail',
                        action: 'send'
                    },
                    {
                        text: 'Cancelar',
                        iconCls: 'icon-cancel',
                        scope: this,
                        handler: me.close
                    }]
            }
        ];
        me.callParent(arguments);
    }
});