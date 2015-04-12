/* global Ext */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Despesas', {
    initiated:false,
    extend: 'Ext.app.Controller',
    stores: ['Despesas'], // Store utilizado no gerenciamento do usuário
    models: ['Despesas'], // Modelo do usuário
     views: [
    'plano.despesas.List',
    'plano.despesas.Edit'
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
        this.control(
        {
            'planoDespesasList': {
                itemdblclick: this.editObject,
                itemcontextmenu : me.itemContextMenu
            },
            'planoDespesasList button[action=incluir]': {
                click: this.editObject
            },
            'planoDespesasList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoDespesasEdit button[action=salvar]': {
                click: this.saveObject
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
        items = [];
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
            opts = {}    
            record = Ext.ModelMgr.create(opts,'ExtZF.model.Despesas');
            
        }
        view.down('form').loadRecord(record);
        view.programacao_id = parent_record.get('id');
        view.setTitle('Grupo de despesas');
        view.show();
        
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoDespesasEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Despesas();
            this.getDespesasStore().add(record);
            view.setTitle('Cadastro');
        }
      	view.down('form').loadRecord(record);
        view.show();
    },
    deleteObject: function() {
        var grid = this.getGrid(); // recupera lista de usuários
        ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas
        if(ids.length === 0){
        	Etc.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }
        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
		function(opt){
			if(opt === 'no')
				return;
			grid.el.mask('Excluindo registro(s)');
                        store = this.getDespesasStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, this);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm() // recupera item abaixo(filho) da window do tipo form
        if (form.isValid()) {
            r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(a,b){
                    Ext.log({msg:"Salvo com sucesso!",level:"info"});
                    win.close();
                    me.getDespesasStore().load();
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