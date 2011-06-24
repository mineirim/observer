Ext.define('ExtZF.view.plano.operativos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoOperativosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textfield',name : 'programacao_id',ref: 'programacao_id',fieldLabel: 'Programacao_id'},
	{xtype: 'textfield',name : 'peso',ref: 'peso',fieldLabel: 'Peso'},
	{xtype: 'textfield',name : 'responsavel_id',ref: 'responsavel_id',fieldLabel: 'Responsavel_id'},
	{xtype: 'textfield',name : 'data_inicio',ref: 'data_inicio',fieldLabel: 'Data_inicio'},
	{xtype: 'textfield',name : 'data_prazo',ref: 'data_prazo',fieldLabel: 'Data_prazo'},
	{xtype: 'textfield',name : 'data_encerramento',ref: 'data_encerramento',fieldLabel: 'Data_encerramento'},
	{xtype: 'textfield',name : 'andamento_id',ref: 'andamento_id',fieldLabel: 'Andamento_id'},
	{xtype: 'textfield',name : 'avaliacao_andamento',ref: 'avaliacao_andamento',fieldLabel: 'Avaliacao_andamento'},
	{xtype: 'textfield',name : 'percentual_execucao',ref: 'percentual_execucao',fieldLabel: 'Percentual_execucao'},
	{xtype: 'textfield',name : 'situacao_id',ref: 'situacao_id',fieldLabel: 'Situacao_id'},]}
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