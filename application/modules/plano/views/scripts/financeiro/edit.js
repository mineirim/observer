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
         var frmFinanceiro =  Ext.create('Ext.form.Panel', {
            id          : 'frmFinanceiro',
            padding     :8,
            bodyPadding : 12,
            items       : [
                         {
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
                            queryParam  : 'getOrcamento',
                            allQuery    : ' '
                        },  
//                        {
//                            xtype       : 'combo',
//                            id          : 'grupo_despesa_id',
//                            name        : 'grupo_despesa_id',
//                            ref         : 'grupo_despesa_id',
//                            fieldLabel  : 'Grupo de despesas', 
//                            store       : 'GrupoDespesas',
//                            displayField: 'descricao',
//                            valueField  : 'id',
//                            anchor      : '95%',
//                            hidden      : false,
//                            allowBlank  : false,
//                            typeAhead   : true,
//                            width       : 650,
//                            mode        : 'remote',
//                            queryParam  : 'getOrcamento',
//                            allQuery    : ' '
//                        },
                        {
                            xtype   : 'textfield',
                            name    : 'valor',
                            id      :  'vlr_financeiro',
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

        this.items = [frmFinanceiro];
        // botões da janela
        this.buttons = [
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

        this.callParent(arguments);
    }
});
 