Ext.define('ExtZF.view.plano.despesas.Edit', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoDespesasEdit', 
    title       : 'Despesas',
    layout      : 'fit',    
    bodyPadding : 20,
    width       : 720,
    minHeight   : 390,
    height      : 400,
    autoShow    : false, // exibir a janela automaticamente ao chamá-la
    programacao_id : null, //código da programação utilizado para filtrar o combo
    initComponent: function() {
        var me=this;
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
	{xtype: 'textareafield',
            name : 'descricao',
            ref: 'descricao',
            fieldLabel: 'Descricao',            
            width       : 650,
            anchor    : '95%'},
	{
            name : 'financeiro_id',ref: 'financeiro_id',
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
	{   xtype: 'textfield',
            name : 'valor',
            ref: 'valor',
            fieldLabel: 'valor',    
            plugins : 'textmask',
            mask    : 'R$ #9.999.990,00',
            money   : true
        }
        ]}
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