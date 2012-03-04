Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Dashboard', {
    extend: 'Ext.app.Controller',
    stores: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos'], 
    models: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos'], 
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
        this.control(
        {
            'planoDashboardPainel': {
               //render: this.checkList
            },
            'planoAnexosList button[action=incluir]': {
                click: this.editObject
            },
            'planoAnexosList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoAnexosEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
         
    }
    ,checkList : function(){
        
        dashboard = this.getPainel();
        
        dashboard.add(this.checkMyItems());
        dashboard.add(this.checkSupervisor());
        dashboard.add(this.checkPendentes());
        
    },
    
    checkMyItems : function(){       
        Ext.create('Ext.data.Store', {
            id:'myItemsStore',
            fields    :  ['id',
                            'menu',
                            'descricao',
                            'ordem',
                            {name:'instrumento_id', type: 'int'},
                            'programacao_id',
                            'setor_id',
                            'responsavel_usuario_id',
                            'supervisor_usuario_id'
                        ],
            proxy     : {
                        type           : 'rest',
                        url            :   'data/programacoes',
                        reader         : {
                                type    : 'json',
                                root    : 'rows',
        			successProperty: 'success'
                        }
            },
            autoLoad :true,
            filters : {property: 'responsavel_usuario_id',
                        value:1}
        });
        checklist = Ext.create('ExtZF.view.plano.dashboard.Checklist',{store: Ext.data.StoreManager.lookup('myItemsStore')});
        checklist.title = "Sob minha responsabilidade"
        return checklist;
    },
    checkSupervisor : function(){
       
        Ext.create('Ext.data.Store', {
            id:'supItemsStore',
            fields    :  ['id',
                            'menu',
                            'descricao',
                            'ordem',
                            {name:'instrumento_id', type: 'int'},
                            'programacao_id',
                            'setor_id',
                            'responsavel_usuario_id',
                            'supervisor_usuario_id'
                        ],
            proxy     : {
                        type           : 'rest',
                        url            :   'data/programacoes',
                        reader         : {
                                type    : 'json',
                                root    : 'rows',
        			successProperty: 'success'
                        }
            },
            autoLoad :true,
            filters : {property: 'supervisor_usuario_id',
                        value:1}
        });
        checklist = Ext.create('ExtZF.view.plano.dashboard.Checklist',{store: Ext.data.StoreManager.lookup('supItemsStore')});
        checklist.title = "Sob minha supervisão"
        return checklist;
    },
    checkPendentes : function(){
       
        Ext.create('Ext.data.Store', {
            id:'pendenciasItemsStore',
            fields    :  ['id',
                            'menu',
                            'descricao',
                            'ordem',
                            {name:'instrumento_id', type: 'int'},
                            'programacao_id',
                            'setor_id',
                            'responsavel_usuario_id',
                            'supervisor_usuario_id'
                        ],
            proxy     : {
                        type           : 'rest',
                        url            :   'data/programacoes',
                        extraParams    : {pendentes:true},
                        reader         : {
                                type    : 'json',
                                root    : 'rows',
        			successProperty: 'success'
                        }
            },
            autoLoad :true
        });
        checklist = Ext.create('ExtZF.view.plano.dashboard.Checklist',{store: Ext.data.StoreManager.lookup('pendenciasItemsStore')});
        checklist.title = "Ítens pendentes de aprovação"
        return checklist;
    }
});



