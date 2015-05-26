/* global Ext, Etc */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.admin.Instrumentos', {
    extend: 'Ext.app.Controller',
    stores: ['Instrumentos'], // Store utilizado no gerenciamento do usuário
    models: ['Instrumentos'], // Modelo do usuário
     views: [
    'admin.instrumentos.List',
    'admin.instrumentos.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'adminInstrumentosList'
            },{
                ref:'formPanel',
                selector:'adminInstrumentosEdit'
            }
        ],
    init: function() {
        this.control(
        {
            'adminInstrumentosList': {
                itemdblclick: this.editObject
            },
            'adminInstrumentosList button[action=incluir]': {
                click: this.editObject
            },
            'adminInstrumentosList button[action=excluir]': {
                click: this.deleteObject
            },
            'adminInstrumentosEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('adminInstrumentosEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Instrumentos();
            this.getInstrumentosStore().add(record);
            view.setTitle('Cadastro');
        }
      	view.down('form').loadRecord(record);
    },
    deleteObject: function() {
        var me =this;
        var grid = me.getGrid(); // recupera lista de usuários
        var ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas
        if(ids.length === 0){
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }
        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
		function(opt){
			if(opt !== 'yes')
				return;
			grid.el.mask('Excluindo registro(s)');
                        var store = me.getInstrumentosStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, this);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window'), 
            form   = win.down('form').getForm();
        if (form.isValid()) {
            var r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(a,b){
                    Etc.log({msg:"Salvo com sucesso!",level:"info",dump:a});
                    Ext.Msg.alert('Salvo', "Registro salvo com sucesso");
                    win.close();
                    me.getInstrumentosStore().load();
                },
                failure:function(a,b){
                    var obj =  eval('(' + b.request.callback.arguments[2].responseText + ')');
                    Ext.Msg.alert('Erro', obj.msg);
                    Etc.error({msg:"Erro ao salvar!",level:"error"});
                }
                });
            
        }
    }
});