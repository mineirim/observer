/* global Ext, Etc */

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
            'planoDashboardPainel  combo[ref=cmbProjetos]': {
               select : me.selectComboProjetos
            },
            'planoAnexosList button[action=incluir]': {
                click: me.editObject
            },
            'planoAnexosList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoAnexosEdit button[action=salvar]': {
                click: me.saveObject
            },
            '#my_responsability':{
               itemcontextmenu : me.itemContextMenu 
            },
            '#my_supervision':{
               itemcontextmenu : me.supContextMenu 
            },
            '#not_approved':{
               itemcontextmenu : me.aprovarContextMenu 
            }
        });
        var programacoesController = me.getController('ExtZF.controller.plano.Programacoes');
        programacoesController.init();
        var operativosController = me.getController('ExtZF.controller.plano.Operativos');
        operativosController.init();
        
        var vinculos_controller = me.getController('ExtZF.controller.plano.Vinculos');
            vinculos_controller.init();
    },
    
    selectComboProjetos    : function(cmb,records){
        var me = this;
        var record  =records[0];
        me.filterByProjetoId(record.get('id'));
    },
    filterByProjetoId    : function(projetoId){
        var mycheck = Ext.getCmp('my_responsability');
        var mycheckStore = mycheck.getView().getStore();
        var mycheckParams = Ext.merge(mycheckStore.getProxy().extraParams,{projeto_id: projetoId});
        mycheckStore.getProxy().extraParams =mycheckParams;
        mycheckStore.load({
            callback: function(r,option,success){
                mycheck.getView().refresh();
            }
        });
        var mysup = Ext.getCmp('my_supervision');
        var mysupStore = mysup.getView().getStore();
        var mysupParams =  Ext.merge(mysupStore.getProxy().extraParams,{projeto_id: projetoId});
        mysupStore.getProxy().extraParams =mysupParams;
        mysupStore.load({
            callback: function(r,option,success){
                mysup.getView().refresh();
            }
        });
        if(Etc.getLoggedUser().get('is_su')==="true"){            
            var pendentes = Ext.getCmp('not_approved');
            pendentes.show();
            var pendentesStore = pendentes.getView().getStore();
            var pendentesParams = Ext.merge(pendentesStore.getProxy().extraParams,{projeto_id: projetoId})
            pendentesStore.getProxy().extraParams =pendentesParams;
            pendentesStore.load({
                callback: function(r,option,success){
                    pendentes.getView().refresh();
                    pendentes.ownerCt.doLayout();
                }
            });
        }
        
    }
    ,aprovarContextMenu : function( view, record, item, index, event, options){
        event.stopEvent();
        var me= this;
        var items = [];
        var mycontroller = me.getController('ExtZF.controller.plano.Programacoes');
        if(record.get('situacao_id')===3 && mycontroller.isInSupervisores(record)){
            items.push({text: 'Aprovar programação',
                        handler : function(){
                            mycontroller.aprovarProgramacao(record);
                        }
                    });
        }       
        var itensDefault = me.defaultContextMenu(record);
        var newMenu = items.concat(itensDefault);
        var menu = Ext.create('Ext.menu.Menu',{
        items: newMenu
        });
        menu.showAt(event.xy);
    }
    ,itemContextMenu : function( view, record, item, index, event, options){
        event.stopEvent();
        var me= this;
        var items = [];
        var mycontroller = me.getController('ExtZF.controller.plano.Programacoes');
        items.push({text: 'Editar',
                    handler : function(){
                        mycontroller.editarProgramacao(record);
                    }
                });
        
        items.push({text: 'Execução',
                    handler : function(){
                        me.application.fireEvent('showExecutionWindow',record);
                    }
                });
        
       

            items.push('-');

           
        items.push({
            text:"Anexo",
            data: {record: record},
            iconCls : 'icon-attach-file',
            handler: function(){
                    mycontroller.attachFile(record);
                }
        });
        items.push('-');


        items.push({
                text: 'Relatórios',
                iconCls: 'icon-report',
                menu : {
                    items:
                    [
                    {
                        text:"Resultados",
                        data: {record: record},
                        handler: function(){
                                mycontroller.showReport(record,1);
                            }
                    },
                    {
                        text:"Relatório Execução Física",
                        data: {record: record},
                        handler: function(){
                                mycontroller.showReport(record,2);
                            }
                    },
                    {
                        text:"Relatório Físico/Financeiro",
                        data: {record: record},
                        handler: function(){
                                mycontroller.showReport(record,3);
                            }
                    },
                    ]
                }
            });
//        items.push({
//           text: 'Enviar e-mail' ,
//           data : {record: record},
//           handler : function(){
//                    var args ={};
//                    args.parent_record = record;
//                    args.controller = 'Email';
//                    _myAppGlobal.fireEvent('openEditForm', args);
//                }
//        });
        var menu = Ext.create('Ext.menu.Menu',{
        items: items
        });
        menu.showAt(event.xy);
    }
    ,defaultContextMenu : function(record){
        var me =this;
        var items = [];
        var mycontroller = me.getController('ExtZF.controller.plano.Programacoes');
        items.push({text: 'Editar',
                    handler : function(){
                        mycontroller.editarProgramacao(record);
                    }
                });
        items.push('-');
        items.push({
            text:"Anexo",
            data: {record: record},
            iconCls : 'icon-attach-file',
            handler: function(){
                    mycontroller.attachFile(record);
                }
        });
        items.push('-');
        items.push({
                text: 'Relatórios',
                iconCls: 'icon-report',
                menu : {
                    items:
                    [
                    {
                        text:"Resultados",
                        data: {record: record},
                        handler: function(){
                                mycontroller.showReport(record,1);
                            }
                    },
                    {
                        text:"Relatório Execução Física",
                        data: {record: record},
                        handler: function(){
                                mycontroller.showReport(record,2);
                            }
                    },
                    {
                        text:"Relatório Físico/Financeiro",
                        data: {record: record},
                        handler: function(){
                                mycontroller.showReport(record,3);
                            }
                    },
                    ]
                }
            });
//        items.push({
//           text: 'Enviar e-mail' ,
//           data : {record: record},
//           handler : function(){
//                    var args ={};
//                    args.parent_record = record;
//                    args.controller = 'Email';
//                    _myAppGlobal.fireEvent('openEditForm', args);
//                }
//        });

        return items;   
    }
    ,supContextMenu : function( view, record, item, index, event, options){
        event.stopEvent();
        var me= this;
        var items = me.defaultContextMenu(record);
        var menu = Ext.create('Ext.menu.Menu',{
        items: items
        });
        menu.showAt(event.xy);
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
        if(Etc.getLoggedUser().get('is_su')==="true"){            
            var pendentes = Ext.getCmp('not_approved');
            pendentes.show();
            pendentes.getView().getStore().load({
                callback: function(r,option,success){
                    pendentes.getView().refresh();
                    pendentes.ownerCt.doLayout();
                }
            });
        }
        
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
        myStore.getProxy().extraParams = {get_my:true, 'owntype': 'responsavel'};
//        myStore.proxy.url=myStore.proxy.url ;
        var mycheck = Ext.getCmp('my_responsability');
        mycheck.getView().bindStore(myStore);
        mycheck.setTitle("Sob minha responsabilidade");
        return mycheck;
    },
    checkSupervisor : function(){
       
        var myStore = Ext.create('ExtZF.store.Tarefas',{id:'supItemsStore'});
        myStore.getProxy().extraParams = {get_my:true, 'owntype': 'supervisor'};
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