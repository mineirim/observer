/* global Ext */

Ext.define('ExtZF.view.plano.financeiro.Edit', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoFinanceiroEdit', // nome definido a janela
    title       : 'Edição',
    layout      : 'fit',
    width       : 1000,
    minHeight   : 280,
    height      : 300,
    maxHeight   :590,      
    autoShow    : true, 
      
    initComponent: function() {
        var me=this;
        me.items = [{xtype:'planoFinanceiroForm'}];
        // botões da janela
        me.buttons = [
                        {
                            text: 'Salvar',
                            action: 'salvar',
                            iconCls: 'icon-save'
                        },
                        {
                            text: 'Cancelar',
                            scope: me,
                            handler: me.close,
                            iconCls : 'icon-cancel'
                        }];

        me.callParent(arguments);
    }
});
 