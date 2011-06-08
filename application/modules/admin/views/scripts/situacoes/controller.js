Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.admin.Situacoes', {
    extend: 'Ext.app.Controller',
    stores: ['Situacoes'], // Store utilizado no gerenciamento do usuário
    models: ['Situacoes'], // Modelo do usuário
     views: [
    'admin.situacoes.List',
    'admin.situacoes.Edit'
    ],
    refs: [{
            ref: 'formPanel',
            selector: 'adminSituacoesEdit'
    },{
            ref:'grid',
            selector:'adminSituacoesList'
    }],
    init: function() {

       
        this.control(
        {
            'adminSituacoesList': {
                itemdblclick: this.editObject
            },
            'adminSituacoesList button[action=incluir]': {
                click: this.editObject
            },
            'adminSituacoesList button[action=excluir]': {
                click: this.deleteObject
            },
            'adminSituacoesEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('adminSituacoesEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Situacoes();
            this.getSituacoesStore().add(record);
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
                        store = this.getSituacoesStore();
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
            this.getSituacoesStore().sync();
            win.close();
            this.getSituacoesStore().load();
        }
    }
});