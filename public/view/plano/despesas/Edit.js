Ext.define('ExtZF.view.plano.despesas.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.planoDespesasEdit',
    title: 'Despesas',
    layout: 'fit',
    bodyPadding: 20,
    width: 1000,
    minHeight: 290,
    height: 300,
    autoShow: false,
    programacao_id: null,
    initComponent: function () {
        var me = this;
        // Itens da janela
        me.items = [{
                xtype: 'planoDespesasForm',
            }
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