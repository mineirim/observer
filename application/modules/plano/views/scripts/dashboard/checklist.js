Ext.define('ExtZF.view.plano.dashboard.Checklist' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.planoDashboardChecklist',
    
    width       : '100%',
    height      : 200,
    flex : 0,
    columns: [
        {header: 'Instrumento', dataIndex: 'instrumento_id', flex:1,renderer: function(value){
                                                                    instrumentos = Ext.StoreMgr.get('Instrumentos');
                                                                    instrumento = instrumentos.findRecord('id',value);
                                                                    return instrumento.get('singular');
                                                                }},
        {header: 'Menu',  dataIndex: 'menu', flex:6}
    ],
    initComponent: function() {
        Etc.log({msg:'Inicia o checklist',level:'info',dump:arguments});


        this.callParent(arguments);
    }
    });