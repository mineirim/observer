Ext.define('ExtZF.view.plano.dashboard.Painel' ,{
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.planoDashboardPainel', 
    layout      : 'anchor',
    defaults    : {forcefit:true},
        initComponent: function() {
            Ext.log({msg:'Inicia o treegrid',level:'info',dump:arguments});
            
            
            
            this.callParent(arguments);
        }
    });