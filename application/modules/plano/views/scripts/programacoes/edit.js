Ext.define('ExtZF.view.plano.programacoes.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoProgramacoesEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textfield',name : 'menu',ref: 'menu',fieldLabel: 'Menu'},
	{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao'},
	{xtype: 'textfield',name : 'ordem',ref: 'ordem',fieldLabel: 'Ordem'},
	{xtype: 'textfield',name : 'instrumento_id',ref: 'instrumento_id',fieldLabel: 'Instrumento_id'},
	{xtype: 'textfield',name : 'programacao_id',ref: 'programacao_id',fieldLabel: 'Programacao_id'},
	{xtype: 'textfield',name : 'setor_id',ref: 'setor_id',fieldLabel: 'Setor_id'},]}
        ];

        // botões da janela
        this.buttons = [{
            text: 'Salvar',
            action: 'salvar'
        },
        {
            text: 'Cancelar',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});