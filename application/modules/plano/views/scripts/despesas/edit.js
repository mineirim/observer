Ext.define('ExtZF.view.plano.despesas.Edit', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoDespesasEdit', 
    title       : 'Despesas',
    layout      : 'fit',    
    bodyPadding : 20,
    width       : 720,
    minHeight   : 390,
    height      : 400,
    autoShow    : false, 
    programacao_id : null, 
    initComponent: function() {
        var me=this;
    	// Itens da janela
        me.items = [{
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
            fieldLabel  : 'Ítem de despesa', 
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
        me.buttons = [{
            text: 'Salvar',
            iconCls: 'icon-save',
            action: 'salvar'
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