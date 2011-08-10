Ext.define('ExtZF.view.plano.vinculos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoVinculosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    width : 740,
    minHeight : '690px',    
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        // Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
            {
                xtype: 'hiddenfield',
                name        : 'programacao_id',
                ref         : 'programacao_id'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Atividade',
                name: 'atividade',
                anchor:'95%'
            },
            
            {
                xtype: 'combo',
                name        : 'depende_programacao_id',
                ref         : 'depende_programacao_id',
                fieldLabel  : 'Dependência', 
                store       : 'Programacoes',
                valueField  : 'id',
                displayField: 'menu',
                minChars :  0,
                queryMode: 'remote',
                anchor:'95%',
                typeAhead: true,
                loadingText: 'Pesquisando...',
                pageSize:10,
                hideTrigger:false
                
            },
            
            
            {
                xtype: 'htmleditor',
                name : 'justificativa',
                ref: 'justificativa',
                fieldLabel: 'Justificativa'
            },

            {
                xtype: 'htmleditor',
                name : 'observacoes',
                ref: 'observacoes',
                fieldLabel: 'Observações'
            },]
            }
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