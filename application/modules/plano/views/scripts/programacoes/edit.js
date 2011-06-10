Ext.define('ExtZF.view.plano.programacoes.Edit', {
    extend: 'Ext.window.Window',
    store : 'Setores',
    alias : 'widget.planoProgramacoesEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    width : '740px',
    minHeight : '690px',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            padding:'15px',
            items: [
                    {xtype: 'textfield',padding:'15px',name : 'menu',ref: 'menu',fieldLabel: 'Menu',size:70},
                    {xtype: 'htmleditor',
                        name : 'descricao',
                        ref: 'descricao',
                        fieldLabel: 'Descrição', 
                        width:'450px',height:'140px',padding:'12px'
                    },
                    {xtype: 'combo',
                        width       :   300,
                        minWidth    :   300,
                        padding     :   '15px',
                        name        : 'setor_id',
                        ref         : 'setor_id',
                        fieldLabel  : 'Setor', 
                        store       : 'Setores',
                        displayField: 'descricao',
                        valueField  : 'id',
                        queryMode   : 'local'},
                    {xtype: 'hiddenfield',name:'programacao_id',ref:'programacao_id'}
                ]}
                    ];

        // botões da janela
        this.buttons = [{
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