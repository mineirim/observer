Ext.define('ExtZF.view.plano.dashboard.Painel' ,{
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.planoDashboardPainel', 
    layout: 'anchor',
//    layout: {
//        type: 'hbox',
//        pack: 'start',
//        align: 'stretch'
//    },
    defaults    : {forcefit:true},
        initComponent: function() {
            Etc.log({msg:'Inicia o treegrid',level:'info',dump:arguments});
            
            
            
            this.callParent(arguments);
        },
        items: [
    {xtype:'planoDashboardChecklist', flex:1},
    {xtype:'planoDashboardChecklist', flex:1},
    {xtype:'planoDashboardChecklist', flex:1},
]
    });