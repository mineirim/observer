Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.admin.Organizacoes', {
    extend: 'Ext.app.Controller',
    stores: ['Organizacoes'], // Store utilizado no gerenciamento do usuário
    models: ['Organizacoes'], // Modelo do usuário
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
        ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas
        if(ids.length === 0){
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }
        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
		function(opt){
			if(opt === 'no')
				return;
			grid.el.mask('Excluindo registro(s)');
                        store = this.getOrganizacoesStore();
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
            this.getOrganizacoesStore().sync();
            win.close();
            this.getOrganizacoesStore().load();
        }
    }
});