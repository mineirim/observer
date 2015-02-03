Ext.define('ExtZF.view.plano.dashboard.Painel' ,{
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.planoDashboardPainel', 
    id          : 'planoDashboardPainel',
//    layout: 'anchor',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults    : {forcefit:true},
    initComponent: function() {
        var me=this;
        me.callParent(arguments);
    },
    tbar        :[{
                    text: 'Clique para carregar o Dashboard',
                    iconCls: 'icon-new',
                    action: 'reload',
                    id: 'btnReload'
                }],
    items: [
        {xtype:'planoDashboardChecklist', flex:1, id:'my_responsability'},
        {xtype:'planoDashboardChecklist', flex:1, id:'my_supervision'},
        {xtype:'planoDashboardChecklist', flex:1, id:'not_approved'},
    ]
});