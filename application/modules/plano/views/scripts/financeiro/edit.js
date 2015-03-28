Ext.define('ExtZF.view.plano.financeiro.Edit', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoFinanceiroEdit', // nome definido a janela
    title       : 'Edição',
    layout      : 'fit',
    width       : 720,
    minHeight   : 390,
    height      : 400,
    maxHeight   :590,      
    autoShow    : true, 
   
    initComponent: function() {
        var me=this;
        var frmFinanceiro =  Ext.create('Ext.form.Panel', {
            id          : 'frmFinanceiro',
            padding     :8,
            bodyPadding : 12,
            items       : [
                         {
                            xtype       : 'combo',
                            id          : 'cmb_fonte',
                            ref         : 'cmb_fonte',
                            fieldLabel  : 'Fonte', 
                            displayField: 'menu',
                            valueField  : 'id',
                            anchor      : '95%',
                            hidden      : false,
                            allowBlank  : false,
                            typeAhead   : true,
                            width       : 650,
                            mode        : 'remote',
                            
                            allQuery    : ' AND instrumento_id=8 '
                        },{
                            xtype       : 'combo',
                            id          : 'cmb_grupo_despesas',
                            ref         : 'cmb_grupo_despesas',
                            fieldLabel  : 'Grupo de despesas',
                            displayField: 'menu',
                            valueField  : 'id',
                            anchor      : '95%',
                            hidden      : false,
                            allowBlank  : false,
                            typeAhead   : true,
                            width       : 650,
                            mode        : 'remote',
                            
                            allQuery    : ' AND instrumento_id=9 '
                        },{
                            xtype       : 'combo',
                            id          : 'origem_recurso_id',
                            name        : 'origem_recurso_id',
                            ref         : 'origem_recurso_id',
                            fieldLabel  : 'Origem do recurso', 
                            store       : 'programacoes.OrcamentoStore',
                            displayField: 'menu',
                            valueField  : 'id',
                            anchor      : '95%',
                            hidden      : false,
                            allowBlank  : false,
                            typeAhead   : true,
                            width       : 650,
                            mode        : 'remote',
                            queryParam  : 'get_all_itens',
                            allQuery    : 'get_all'
                        },

                        {
                            xtype   : 'textfield',
                            plugins : 'textmask',
                            mask    : 'R$ #9.999.990,00',
                            money   : true,
                            name    : 'valor',
                            id      : 'vlr_financeiro',
                            ref     : 'valor',
                            fieldLabel: 'Valor Previsto'
				
                        },
                        {
                            xtype: 'htmleditor',
                            name : 'descricao',
                            ref: 'descricao',
                            fieldLabel: 'Item de Despesa',
                            anchor:'95%'

                        },
                        {
                            xtype: 'hiddenfield',
                            name:'programacao_id',
                            ref:'programacao_id'
                        },

                        {
                            xtype: 'hiddenfield',
                            name:'id',
                            ref:'id'
                        }
                    ]            
            
        });                     

        me.items = [frmFinanceiro];
        // botões da janela
        me.buttons = [
                        {
                            text: 'Salvar',
                            action: 'salvar',
                            iconCls: 'icon-save'
                        },
                        {
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close,
                            iconCls : 'icon-cancel'
                        }];

        me.callParent(arguments);
    }
});
 