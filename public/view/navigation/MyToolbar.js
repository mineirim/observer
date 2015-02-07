Ext.define('ExtZF.view.navigation.MyToolbar', {
    extend: 'Ext.Toolbar',
    alias   : 'widget.mytoolbar',
    id      : 'tbrMenu',
    frame   : false,
    frameHeader : false,
    initComponent: function() {
        var me = this;
        me.items = [
        adminMenu,'->',{xtype : 'authControle'},'-',{
            text: 'Sair',
            id: 'btnSair',
            iconCls : 'icon-sair',
            action : 'logout'
        }
        ];
        me.superclass.initComponent.call(me);
    }
});