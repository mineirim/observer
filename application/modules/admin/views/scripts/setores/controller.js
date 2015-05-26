/* global Ext */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.admin.Setores', {
    extend: 'Ext.app.Controller',
    stores: ['Setores'], // Store utilizado no gerenciamento do usuário
    models: ['Setores'], // Modelo do usuário
     views: [
    'admin.setores.List',
    'admin.setores.Edit'
    ],
    refs: [{
            ref: 'formPanel',
            selector: 'adminSetoresEdit'
    },{
            ref:'grid',
            selector:'adminSetoresList'
    }],
    init: function() {
        this.control(
        {
            'adminSetoresList': {
                itemdblclick: this.editObject
            },
            'adminSetoresList button[action=incluir]': {
                click: this.editObject
            },
            'adminSetoresList button[action=excluir]': {
                click: this.deleteObject
            },
            'adminSetoresEdit button[action=salvar]': {
                click: this.saveObject
            }
        });

    },
    editObject: function(grid, record) {
        var view = Ext.widget('adminSetoresEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Setores();
            this.getSetoresStore().add(record);
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
                        var  store = this.getSetoresStore();
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
            me.getSetoresStore().sync();
            win.close();
            me.getSetoresStore().load();
        }
    }
});