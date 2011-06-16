Ext.define('ExtZF.view.plano.programacoes.Edit', {
    extend: 'Ext.window.Window',
    store : 'Setores',
    alias : 'widget.planoProgramacoesEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    width : 700,
    minHeight : '690px',
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            padding:'15px',
            items: [
                    {xtype: 'textfield',padding:'15px',name : 'menu',ref: 'menu',fieldLabel: 'Menu',width:730},
                    {xtype: 'htmleditor',
                        name : 'descricao',
                        ref: 'descricao',
                        fieldLabel: 'Descrição', 
                        width:730,height:'140px',padding:'12px'
                    },
                    {xtype: 'combo',
                        width       :   730,
                        minWidth    :   300,
                        padding     : 12,
                        name        : 'responsavel_usuario_id',
                        ref         : 'responsavel_usuario_id',
                        fieldLabel  : 'Responsável', 
                        store       : 'Usuarios',
                        displayField: 'nome',
                        valueField  : 'id',
                        queryMode   : 'local'},
                    {xtype: 'combo',
                        width       :   730,
                        minWidth    :   300,
                        padding     : 8,
                        name        : 'setor_id',
                        ref         : 'setor_id',
                        fieldLabel  : 'Setor', 
                        store       : 'Setores',
                        displayField: 'descricao',
                        valueField  : 'id',
                        queryMode   : 'local'},
                    {xtype: 'hiddenfield',name:'programacao_id',ref:'programacao_id'},
                    {xtype: 'hiddenfield',name:'instrumento_id',ref:'programacao_id'}
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