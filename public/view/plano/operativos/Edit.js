/* global Ext */

Ext.define('ExtZF.view.plano.operativos.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.planoOperativosEdit', // nome definido a janela
    title: 'Edição',
    layout      : {type: 'vbox', align: 'stretch'},
    width: 1000,
    minHeight: 390,
    height: 530,
    maxHeight: 590,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'planoOperativosForm',
            },
            {
                id    : 'historicoOperativos',
                xtype : 'planoOperativosList',
                title : 'Consulta Histórico',
                flex  : 1,
                autoHeight:true,
                minHeight: 150,
                hidden:false,
                autoscroll: true
            }
        ];
        me.callParent(arguments);
    }
});