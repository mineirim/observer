Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Dashboard', {
    extend: 'Ext.app.Controller',
    stores: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Tarefas', 'Planejamento'], 
    models: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Tarefas', 'Planejamento'], 
     views: [
    'plano.dashboard.Painel',
    'plano.dashboard.Pendentes',
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
            },
            'planoDashboardPainel button[action=reload]': {
               click : me.reloadDashboard
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
            }
        });
        var mysup = Ext.getCmp('my_supervision');
        mysup.getView().getStore().load({
            callback: function(r,option,success){
                mysup.getView().refresh();
            }
        });
        var pendentes = Ext.getCmp('not_approved');
        pendentes.getView().getStore().load({
            callback: function(r,option,success){
                pendentes.getView().refresh();
                pendentes.ownerCt.doLayout();
            }
        });
        
    }
    ,checkList : function(){
        var me = this;
        me.checkMyItems();
        me.checkSupervisor();
        me.checkPendentes();
        var dashboard = me.getPainel();
        dashboard.doLayout();
//        dashboard.add(me.checkMyItems());
//        dashboard.add(me.checkSupervisor());
//        dashboard.add(me.checkPendentes());
        
    },
    
    checkMyItems : function(){  
        
        var myStore = Ext.create('ExtZF.store.Tarefas',{id:'myItemsStore'});
        myStore.getProxy().extraParams = {get_my:true, 'owntype': 'responsavel'}
//        myStore.proxy.url=myStore.proxy.url ;
        var mycheck = Ext.getCmp('my_responsability');
        mycheck.getView().bindStore(myStore);
        mycheck.setTitle("Sob minha responsabilidade");
        return mycheck;
    },
    checkSupervisor : function(){
       
        var myStore = Ext.create('ExtZF.store.Tarefas',{id:'supItemsStore'});
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



//        Ext.create('Ext.data.Store', {
//            id:'supItemsStore',
//            fields    :  ['id',
//                            'menu',
//                            'descricao',
//                            'ordem',
//                            {name:'instrumento_id', type: 'int'},
//                            'programacao_id',
//                            'setor_id',
//                            'responsavel_usuario_id',
//                            'supervisor_usuario_id'
//                        ],
//            proxy     : {
//                        type           : 'rest',
//                        url            :   'data/programacoes',
//                        extraParams    : {get_my:true},
//                        reader         : {
//                                type    : 'json',
//                                root    : 'rows',
//        			successProperty: 'success'
//                        }
//            },
//            autoLoad :true,
//            filters : {property: 'supervisor_usuario_id',
//                        value:1}
//        });
//        var checklist = Ext.create('ExtZF.view.plano.dashboard.Checklist',{store: Ext.data.StoreManager.lookup('supItemsStore')});
//        checklist.title = "Sob minha supervisão";
//        return checklist;