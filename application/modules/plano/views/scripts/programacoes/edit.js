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
       var setores_store  = Ext.create('ExtZF.store.Setores')
       var setroes_model = Ext.create('ExtZF.model.Setores')
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            padding:'10px',
            items: [
                    {xtype: 'textfield',name : 'menu',ref: 'menu',fieldLabel: 'Menu',size:70},
                    {xtype: 'htmleditor',
                        name : 'descricao',
                        ref: 'descricao',
                        fieldLabel: 'Descrição', 
                        width:'450px',height:'140px',padding:'12px'
                    },
                    {xtype: 'textfield',name : 'instrumento_id',ref: 'instrumento_id',fieldLabel: 'Instrumento_id'},
                    {xtype: 'textfield',name : 'programacao_id',ref: 'programacao_id',fieldLabel: 'Programacao_id'},
                    {xtype: 'combo',
                        name : 'setor_id',
                        ref: 'setor_id',
                        fieldLabel: 'Setor_id', 
                        store:setores_store,
                        model:setroes_model,
                      displayField: 'descricao',
                                    valueField: 'id'}
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