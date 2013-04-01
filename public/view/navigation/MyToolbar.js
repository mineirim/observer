Ext.define('ExtZF.view.navigation.MyToolbar', {
    extend: 'Ext.Toolbar',
    alias:      'widget.mytoolbar',
    id:         'tbrMenu',
    initComponent: function() {
        
        this.items = [
        adminMenu,'->',{xtype : 'authControle'},'-',{
            text: 'Sair',
            id: 'btnSair',
            iconCls : 'icon-sair',
            action : 'logout'
        }
        ];
        this.superclass.initComponent.call(this);
    }
});