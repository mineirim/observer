Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.GrupoDespesas', {
    extend: 'Ext.app.Controller',
    stores: ['GrupoDespesas'], // Store utilizado no gerenciamento do usuário
    models: ['GrupoDespesas'], // Modelo do usuário
     views: [
    'plano.grupodespesas.List',
    'plano.grupodespesas.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoGrupoDespesasList'
            },{
                ref:'formPanel',
                selector:'planoGrupoDespesasEdit'
            }
        ],
    init: function() {
        this.control(
        {
            'planoGrupoDespesasList': {
                itemdblclick: this.editObject
            },
            'planoGrupoDespesasList button[action=incluir]': {
                click: this.editObject
            },
            'planoGrupoDespesasList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoGrupoDespesasEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoGrupoDespesasEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.GrupoDespesas();
            this.getGrupoDespesasStore().add(record);
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
                        store = this.getGrupoDespesasStore();
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
                    me.getGrupoDespesasStore().load();
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    }
});