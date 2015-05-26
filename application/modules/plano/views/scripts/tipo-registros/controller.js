/* global Ext */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.TipoRegistros', {
    extend: 'Ext.app.Controller',
    stores: ['TipoRegistros'], // Store utilizado no gerenciamento do usuário
    models: ['TipoRegistros'], // Modelo do usuário
     views: [
    'plano.tiporegistros.List',
    'plano.tiporegistros.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoTipoRegistrosList'
            },{
                ref:'formPanel',
                selector:'planoTipoRegistrosEdit'
            }
        ],
    init: function() {
        this.control(
        {
            'planoTipoRegistrosList': {
                itemdblclick: this.editObject
            },
            'planoTipoRegistrosList button[action=incluir]': {
                click: this.editObject
            },
            'planoTipoRegistrosList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoTipoRegistrosEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoTipoRegistrosEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.TipoRegistros();
            this.getTipoRegistrosStore().add(record);
            view.setTitle('Cadastro');
        }
      	view.down('form').loadRecord(record);
    },
    deleteObject: function() {
        var grid = this.getGrid(); // recupera lista de usuários
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
                        var store = this.getTipoRegistrosStore();
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
                    Ext.log({msg:"Salvo com sucesso!",level:"info"});
                    win.close();
                    me.getTipoRegistrosStore().load();
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    }
});