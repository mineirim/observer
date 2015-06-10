Ext.define('ExtZF.view.plano.vinculos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoVinculosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',    
    width : 740,
    minHeight : 390,    
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        // Itens da janela
        this.items = [{
            xtype: 'form',
            labelWidth: 350,
            items: [
            {
                xtype: 'hiddenfield',
                name        : 'programacao_id',
                ref         : 'programacao_id'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Adicionar vínculo à ',
                labelWidth : 120,
                name: 'menu',
                ref : 'menu',
                anchor:'95%',
                labelStyle: 'white-space: nowrap;'
            },
            
            {
                xtype: 'combo',
                name        : 'depende_programacao_id',
                id          : 'depende_programacao_id',
                ref         : 'depende_programacao_id',
                fieldLabel  : 'Dependência', 
                store       : 'Programacoes',
                valueField  : 'id',
                displayField: 'menu',
                minChars    :  0,
                queryMode   : 'remote',
                anchor      :'95%',
                typeAhead   : true,
                loadingText : 'Pesquisando...',
                pageSize    :10,
                hideTrigger :false
                
            },
            
            
            {
                xtype: 'htmleditor',
                name : 'justificativa',
                id   : 'justificativa',
                ref  : 'justificativa',
                fieldLabel: 'Justificativa',
                anchor:'95%',
                enableFont : false,
                enableFontSize: true
            },{
                xtype: 'radiogroup',
                fieldLabel: 'Pactuado',
                id  : 'pactuado_group',
                columns: 1,
                hidden: true,
                defaults:{name:'pactuado', xtype:'radio'},
                items: [
                    {boxLabel: 'Sim', name: 'pactuado', inputValue: 'true'},
                    {boxLabel: 'Não', name: 'pactuado', inputValue: 'false', checked:'true'}
                
                ]
            },
            {
                xtype: 'htmleditor',
                name : 'observacoes',
                id   : 'observacoes',
                ref: 'observacoes',
                fieldLabel: 'Observações',
                anchor:'95%',
                enableFont : false,
                enableFontSize: true
            }]
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