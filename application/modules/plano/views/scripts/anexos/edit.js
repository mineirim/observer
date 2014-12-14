Ext.define('ExtZF.view.plano.anexos.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.planoAnexosEdit', // nome definido a janela
    title   : 'Edição',
    layout  : 'fit',
    iconCls : 'icon-attach-file',
    width   : 700,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        var me=this;
    	// Itens da janela
        me.items = [{
            xtype: 'form',
             fileUpload: false ,
            items: [
                    {
                        xtype: 'fileuploadfield',
                        id: 'form-file',
                        emptyText: 'Selecione o arquivo para importar',
                        fieldLabel: 'Arquivo',
                        name: 'nome',
                        width:600,
                        buttonText: 'Navegar',
                        buttonConfig: {
                            iconCls: 'icon-upload'
                        }
                    },
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Tags',
                        id : 'groupTags',
                        cls: 'x-check-group',
                        columns: 3,
                        vertical:true,
                        items: [
                        ]
                    },
                                    {
                        xtype: 'hiddenfield',
                        name:'programacao_id',
                        id:'programacao_id',
                        ref:'programacao_id'
                    }
                ]
                }];

        // botões da janela
        me.buttons = [{
            text: 'Enviar',
            iconCls: 'icon-upload-send',
            action  : 'sendFile',
            id      : 'btnSendFile'
        },
        {
            text: 'Cancelar',
            iconCls: 'icon-cancel',
            scope: me,
            handler: me.close
        }];

        me.callParent(arguments);
    }
});