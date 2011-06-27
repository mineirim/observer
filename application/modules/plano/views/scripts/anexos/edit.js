Ext.define('ExtZF.view.plano.anexos.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.planoAnexosEdit', // nome definido a janela
    title   : 'Edição',
    layout  : 'fit',
    iconCls : 'icon-attach-file',
    width   : 700,
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
                    emptyText: 'Selecione o arquivo para importar',
                    fieldLabel: 'Arquivo',
                    name: 'nome',
                    width:600,
                    buttonText: 'Navegar',
                    buttonConfig: {
                        iconCls: 'icon-upload'
                    }},
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Tags',
                        cls: 'x-check-group',
                        // Distribute controls across 3 even columns, filling each row
                        // from left to right before starting the next row
                        columns: 3,
                        items: [
                            {boxLabel: 'TR', name: 'cb-horiz-1'},
                            {boxLabel: 'PT', name: 'cb-horiz-2'},
                            {boxLabel: 'Relatório', name: 'cb-horiz-3'},
                            {boxLabel: 'Comprovante', name: 'cb-horiz-4'},
                            {boxLabel: 'Passagem', name: 'cb-horiz-5'}
                        ]
                    }
                ]
                }];

        // botões da janela
        this.buttons = [{
            text: 'Enviar',
            iconCls: 'icon-upload-send',
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