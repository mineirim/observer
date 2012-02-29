Ext.define('ExtZF.view.plano.despesas.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoDespesasEdit', // nome definido a janela
    title : 'Despesas',
    layout: 'fit',    
    width : 720,
    minHeight : 690,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    programacao_id : null, //código da programação utilizado para filtrar o combo
    initComponent: function() {
        me=this;
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao'},
	{
            name : ' financeiro_id',ref: ' financeiro_id',
            xtype       : 'combo',
            id          : 'financeiro_id',
            fieldLabel  : 'Grupo de despesas', 
            store       : 'Financeiro',
            displayField: 'descricao',
            valueField  : 'id',
            anchor      : '95%',
            hidden      : false,
            allowBlank  : false,
            typeAhead   : true,
            width       : 650,
            mode        : 'remote',
            queryParam  : 'getOrcamento',
            allQuery    : ' ',
            listeners   : {
                            render : function(obj,eopts){
                                obj.store.filter('programacao_id', me.programacao_id)
                            }
                          }
        },
	{xtype: 'textfield',name : ' valor',ref: ' valor',fieldLabel: ' valor'},]}
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