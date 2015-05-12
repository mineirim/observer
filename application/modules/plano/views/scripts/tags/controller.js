/* global Etc, Ext */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Tags', {
    extend: 'Ext.app.Controller',
    stores: ['Tags'], // Store utilizado no gerenciamento do usuário
    models: ['Tags'], // Modelo do usuário
     views: [
    'plano.tags.List',
    'plano.tags.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoTagsList'
            },{
                ref:'formPanel',
                selector:'planoTagsEdit'
            }
        ],
    init: function() {
        this.control(
        {
            'planoTagsList': {
                itemdblclick: this.editObject
            },
            'planoTagsList button[action=incluir]': {
                click: this.editObject
            },
            'planoTagsList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoTagsEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoTagsEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Tags();
            this.getTagsStore().add(record);
            view.setTitle('Cadastro');
        }
      	view.down('form').loadRecord(record);
    },
    deleteObject: function() {
        var me = this;
        var grid = me.getGrid(); // recupera lista de usuários
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
                        var store = this.getTagsStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, me);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window'); // recupera um item acima(pai) do button do tipo window
        var form   = win.down('form').getForm(); // recupera item abaixo(filho) da window do tipo form
        if(form.isValid()) {
            var r = form.getRecord();
            form.updateRecord(r);            
            r.save({
                success: function(a,b){
                    win.close();
                    me.getTagsStore().load();
                    Etc.log({msg:"Salvo com sucesso!",level:"info"});
                },
                failure:function(a,b){
                    Etc.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    }
});