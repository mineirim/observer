Ext.define('ExtZF.view.plano.anexos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoAnexosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
             fileUpload: false ,
            items: [
                {
                    xtype: 'fileuploadfield',
                    id: 'form-file',
                    emptyText: 'Select a File to import',
                    fieldLabel: 'Arquivo',
                    name: 'nome',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'icon-upload'
                    }
                }
                ]
                }];

        // botões da janela
        this.buttons = [{
            text: 'Salvar',
            iconCls: 'icon-save',
            action: 'salvar'
        },
        {
            text: 'Cancelar',
            iconCls: 'icon-cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});