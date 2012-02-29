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
        this.control(
        {
            'planoDespesasList': {
                itemdblclick: this.editObject
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
        this.initiated=true;
    },
    showEdit : function(parent_record,record){
        
        var view = Ext.widget('planoDespesasEdit');
        options = {single: true};
        // Call the controller init method when the view is rendered
        
        if(!record){
            opts = {programacao_id : parent_record.get('programacao_id'),
                    tipo_registro_id : 1}
                
            record = Ext.ModelMgr.create(opts,'ExtZF.model.Financeiro');
            
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
    }
});