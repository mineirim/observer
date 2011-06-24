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
                        store = this.getInstrumentosStore();
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
                    Ext.log({msg:"Salvo com sucesso!",level:"info",dump:a});
                    win.close();
                    me.getInstrumentosStore().load();
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
                });
            
        }
    }
});