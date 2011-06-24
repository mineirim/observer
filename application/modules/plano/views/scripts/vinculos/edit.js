Ext.define('ExtZF.view.plano.vinculos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoVinculosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textfield',name : 'operativo_id',ref: 'operativo_id',fieldLabel: 'Operativo_id'},
	{xtype: 'textfield',name : 'depende_operativo_id',ref: 'depende_operativo_id',fieldLabel: 'Depende_operativo_id'},
	{xtype: 'textfield',name : 'justificativa',ref: 'justificativa',fieldLabel: 'Justificativa'},
	{xtype: 'textfield',name : 'observacoes',ref: 'observacoes',fieldLabel: 'Observacoes'},
	{xtype: 'textfield',name : 'pactuado',ref: 'pactuado',fieldLabel: 'Pactuado'},
	{xtype: 'textfield',name : 'pacto_responsavel_id',ref: 'pacto_responsavel_id',fieldLabel: 'Pacto_responsavel_id'},]}
        ];

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