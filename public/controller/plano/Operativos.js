Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Operativos', {
    extend: 'Ext.app.Controller',
    stores: ['Operativos','OperativosHistorico','Situacoes','Andamentos'], // Store utilizado no gerenciamento do usuário
    models: ['Operativos','OperativosHistorico','Situacoes','Andamentos'], // Modelo do usuário
     views: [
    'plano.operativos.List',
    'plano.operativos.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoOperativosList'
            },{
                ref:'formPanel',
                selector:'planoOperativosEdit'
            }
        ],
    init: function() {
        var me = this;
        if(typeof(ExtZF.app.controllers.map['ExtZF.controller.plano.Operativos'])==='object'
                && me.initiated===true){
            return;
        }
        me.control(
        {
            'planoOperativosList': {
//                itemdblclick: me.editObject
            },
            'planoOperativosList button[action=incluir]': {
                click: me.editObject
            },
            'planoOperativosList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoOperativosEdit button[action=salvar]': {
                click: me.saveObject
            }
        });
        me.application.on({
            filtrarHistoricoPorOperativo: me.filtrarHistoricoPorOperativo, 
            scope: me
        });
        me.initiated=true;
    },
    filtrarHistoricoPorOperativo: function(operativo_id){
        var me = this;   
        me.getOperativosHistoricoStore().remoteFilter = false;
        me.getOperativosHistoricoStore().suspendEvents();
        me.getOperativosHistoricoStore().clearFilter();
        me.getOperativosHistoricoStore().resumeEvents();
        me.getOperativosHistoricoStore().remoteFilter = true;
        me.getOperativosHistoricoStore().filter('operativo_id',operativo_id);
        
    },
    editObject: function(grid, record) {
        var me = this;
        var view = Ext.widget('planoOperativosEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Operativos();
            me.getOperativosStore().add(record);
            view.setTitle('Cadastro');
        }
        if(parseInt(record.get('andamento_id'),10)===1){
            record.set('andamento_id',2);
            me.getOperativosStore().sync();
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
                        store = this.getOperativosStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, this);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm(); // recupera item abaixo(filho) da window do tipo form
        if (form.isValid()) {
            r = form.getRecord();
            form.updateRecord(r);
            me.getOperativosStore().sync();
            win.close();
            Ext.Msg.alert('Salvo', 'Registro salvo com sucesso',{duration:500});
            me.getOperativosStore().load();
        }else{
            Etc.alert('formulário inválido');
        }
    }
});