/* global Ext */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.admin.Organizacoes', {
    extend: 'Ext.app.Controller',
    stores: ['Organizacoes'], 
    models: ['Organizacoes'],
     views: [
    'admin.organizacoes.List',
    'admin.organizacoes.Edit'
    ],
    refs: [{
            ref:'grid',
            selector:'adminOrganizacoesList'
    }],
    init: function() {
        this.control(
        {
            'adminOrganizacoesList': {
                itemdblclick: this.editObject
            },
            'adminOrganizacoesList button[action=incluir]': {
                click: this.editObject
            },
            'adminOrganizacoesList button[action=excluir]': {
                click: this.deleteObject
            },
            'adminOrganizacoesEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('adminOrganizacoesEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Organizacoes();
            this.getOrganizacoesStore().add(record);
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
                        var store = this.getOrganizacoesStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, this);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window'), 
            form   = win.down('form').getForm() ;
        if (form.isValid()) {
            var r = form.getRecord();
            form.updateRecord(r);
            me.getOrganizacoesStore().sync();
            win.close();
            me.getOrganizacoesStore().load();
        }
    }
});