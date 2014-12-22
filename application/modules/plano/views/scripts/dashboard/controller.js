Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Dashboard', {
    extend: 'Ext.app.Controller',
    stores: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Planejamento'], 
    models: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Planejamento'], 
     views: [
    'plano.dashboard.Painel',
    'plano.dashboard.Checklist'
    ],
    refs: [{
                ref:'painel',
                selector:'planoDashboardPainel'
            },{
                ref:'checklist',
                selector:'planoDashboardChecklist'
            }
        ],
    init: function() {
        var me = this;
        me.control(
        {
            'planoDashboardPainel': {
               afterrender: me.checkList,
               afterlayout : me.reloadDashboard
            },
            'planoAnexosList button[action=incluir]': {
                click: me.editObject
            },
            'planoAnexosList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoAnexosEdit button[action=salvar]': {
                click: me.saveObject
            }
        });
         
    }
    ,reloadDashboard : function(){
        var mycheck = Ext.getCmp('my_responsability');
        mycheck.getView().getStore().load({
            callback: function(r,option,success){
                mycheck.getView().refresh();
                mycheck.reconfigure();
            }
        });
        mysup = Ext.getCmp('my_supervision');
        mysup.getView().getStore().load({
            callback: function(r,option,success){
                mysup.reconfigure();
                mysup.getView().refresh();
            }
        });
        pendentes = Ext.getCmp('not_approved');
        pendentes.getView().getStore().load({
            callback: function(r,option,success){
                pendentes.reconfigure();
                pendentes.getView().refresh();
            }
        });
        
    }
    ,checkList : function(){
        var me = this;
        me.checkMyItems();
        me.checkSupervisor();
        me.checkPendentes();
//        var dashboard = me.getPainel();
//        dashboard.add(me.checkMyItems());
//        dashboard.add(me.checkSupervisor());
//        dashboard.add(me.checkPendentes());
        
    },
    
    checkMyItems : function(){  
        
        var myStore = Ext.create('ExtZF.store.Planejamento',{id:'myItemsStore'});
        myStore.getProxy().extraParams = {get_my:true, 'owntype': 'responsavel'}
        myStore.proxy.url=myStore.proxy.url + '?xxxxxxxxxxxxxxxxxx=xxxxxxxxx'
        var mycheck = Ext.getCmp('my_responsability');
        mycheck.getView().bindStore(myStore);
        mycheck.setTitle("Sob minha responsabilidade");
        return mycheck;
    },
    checkSupervisor : function(){
       
        var myStore = Ext.create('ExtZF.store.Planejamento',{id:'supItemsStore'});
        myStore.getProxy().extraParams = {get_my:true, 'owntype': 'supervisor'}
        var mycheck = Ext.getCmp('my_supervision');
        mycheck.getView().bindStore(myStore);
        mycheck.setTitle("Sob minha supervisão");
        return mycheck;        
    },
    checkPendentes : function(){
        var myStore = Ext.create('ExtZF.store.Planejamento',{id:'pendenciasItemsStore'});
        myStore.getProxy().extraParams =  {pendentes:true};
        var mycheck = Ext.getCmp('not_approved');
        mycheck.getView().bindStore(myStore);
        mycheck.setTitle("Ítens pendentes de aprovação");
        return mycheck;   
  
    }
});



