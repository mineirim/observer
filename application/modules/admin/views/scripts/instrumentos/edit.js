Ext.define('ExtZF.view.admin.instrumentos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.adminInstrumentosEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    width   :740,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
    	// Itens da janela
        this.items = [{
            xtype: 'form',
            items: [
                {xtype: 'textfield',name : 'menu',ref: 'menu',fieldLabel: 'Menu', anchor:'98%'},
                {xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao', anchor:'98%'},
                {xtype: 'textfield',name : 'singular',ref: 'singular',fieldLabel: 'Singular', anchor:'98%'},
                {xtype: 'textfield',name : 'ordem',ref: 'ordem',fieldLabel: 'Ordem'},
//                {xtype: 'checkbox',fieldLabel: 'Indicador',name: 'has_indicador',id: 'has_indicador'},
//                {xtype: 'checkbox',fieldLabel: 'Parceria',name: 'has_parceria',id: 'has_parceria'},
                {xtype: 'checkbox',fieldLabel: 'Projetos',name: 'has_projetos',id: 'has_projetos'},
                {xtype: 'checkbox',fieldLabel: 'Planilha Operativa',name: 'has_operativo',id: 'has_operativo'},
                {xtype: 'checkbox',fieldLabel: 'Responsável',name: 'has_responsavel',id: 'has_responsavel'},
                {xtype: 'checkbox',fieldLabel: 'Supervisor',name: 'has_supervisor',id: 'has_supervisor'},
                {xtype: 'checkbox',fieldLabel: 'Equipe',name: 'has_equipe',id: 'has_equipe'},
                {xtype: 'checkbox',fieldLabel: 'Valor Programado',name: 'has_vlr_programado',id: 'has_vlr_programado'},
                {xtype: 'checkbox',fieldLabel: 'Valor Programado',name: 'has_vlr_programado',id: 'has_vlr_programado'},
                {
                    xtype: 'combo',
                    name        : 'instrumento_id',
                    ref         : 'instrumento_id',
                    fieldLabel  : 'Nível Pai', 
                    store       : 'Instrumentos',
                    displayField: 'menu',
                    valueField  : 'id',
                    queryMode   : 'local', anchor:'98%'

                }
            ]}
        ];

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