/* global Ext, Etc */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Despesas', {
    initiated:false,
    extend: 'Ext.app.Controller',
    stores: ['Despesas'], // Store utilizado no gerenciamento do usuário
    models: ['Despesas'], // Modelo do usuário
     views: [
    'plano.despesas.List',
    'plano.despesas.Edit',
    'plano.despesas.Form'
    ],
    refs: [{
                ref:'grid',
                selector:'planoDespesasList'
            },{
                ref:'formPanel',
                selector:'planoDespesasEdit'
            }
        ],
    init: function() {
        var me = this;
        me.control(
        {
            'planoDespesasList': {
                itemdblclick: me.editObject,
                itemcontextmenu : me.itemContextMenu
            },
            'planoDespesasList button[action=despesa]': {
                click: me.editObject
            },
            'planoDespesasList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoDespesasEdit button[action=salvar]': {
                click: me.saveObject
            }
        });
        me.initiated=true;
        
        me.application.on({
            filterDespesasByProgramacao: me.filterStore, 
            scope: me
        });
    },
    itemContextMenu :  function( view, record, item, index, event, options){
        event.stopEvent();
        var me= this;
        var items = [];
        items.push({text: 'Editar',
                    handler : function(){
                        me.editObject(view,record);
                    }
                });
        items.push({text: 'Excluir',
                    handler : function(){
                        me.deleteObject();
                    }
                });
        var menu = Ext.create('Ext.menu.Menu',{
        items: items
        });
        menu.showAt(event.xy);
    },
            
    showEdit : function(parent_record,record){
        
        var view = Ext.widget('planoDespesasEdit');
        var options = {single: true};
        // Call the controller init method when the view is rendered
        
        if(!record){
//            opts = {programacao_id : parent_record.get('programacao_id'),
//                    tipo_registro_id : 1}
            var opts = {}    
            record = Ext.ModelMgr.create(opts,'ExtZF.model.Despesas');
            
        }
        view.down('form').loadRecord(record);
        view.programacao_id = parent_record.get('id');
        view.setTitle('Grupo de despesas');
        view.show();
        
    },
    editObject: function(grid, record) {
        var me = this;
        var programacao_id=grid.up('panel').programacao_id;
        var view = Ext.widget('planoDespesasEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Despesas();
            me.getDespesasStore().add(record);
            view.setTitle('Cadastro');
        }
      	view.down('form').loadRecord(record);
        view.programacao_id=programacao_id;
        view.show();
    },
    deleteObject: function() {
        var me = this;
        var grid = me.getGrid(); // recupera lista de usuários
        var programacaoId=grid.programacao_id;
        var ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas
        if(ids.length === 0){
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }
        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
		function(opt){
			if(opt === 'no')
				return;
			grid.el.mask('Excluindo registro(s)');
                        var store = me.getDespesasStore();
                        store.remove(ids);
                        store.sync({success : function(){
                                if(typeof(programacaoId) !== 'undefined'){
                                    me.application.fireEvent('planoProgramacaoFinanceiro.filterByProgramacao', programacaoId);
                                }
                            }
                        });
                        grid.el.unmask();
                        
		}, me);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window'),
            form   = win.down('form').getForm();
        if(form.isValid()){
            var r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(a,b){
                    win.close();
                    me.getDespesasStore().load();
                    me.application.fireEvent('planoProgramacaoFinanceiro.filterByProgramacao', win.programacao_id);
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    },
    filterStore : function(record_id){
        var me = this;
        me.getDespesasStore().remoteFilter = false;
        me.getDespesasStore().suspendEvents();
        me.getDespesasStore().clearFilter();
        me.getDespesasStore().resumeEvents();
        me.getDespesasStore().remoteFilter = true;
        me.getDespesasStore().filter('programacao_id',record_id);
    }
    
});