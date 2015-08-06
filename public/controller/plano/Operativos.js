/* global Ext,Etc */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Operativos', {
    extend: 'Ext.app.Controller',
    stores: ['Programacoes','Operativos','OperativosHistorico','Situacoes','Andamentos'], // Store utilizado no gerenciamento do usuário
    models: ['Programacoes','Operativos','OperativosHistorico','Situacoes','Andamentos'], // Modelo do usuário
     views: [
    'plano.operativos.List',
    'plano.operativos.Edit',
    'plano.operativos.Form'
    ],
    refs: [{
                ref:'grid',
                selector:'planoOperativosList'
            },{
                ref:'editPanel',
                selector:'planoOperativosEdit'
            },{
                ref:'formPanel',
                selector:'planoOperativosForm'
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
            'planoOperativosForm button[action=salvar]': {
                click: me.saveObject
            },
            'planoOperativosForm [name=andamento_id]': {
                change: me.checkFinished
            },
        });
        me.application.on({
            filtrarHistoricoPorOperativo: me.filtrarHistoricoPorOperativo, 
            scope: me
        });
        me.application.on({
            openExecution: me.openExecution, 
            scope: me
        });
        me.initiated=true;
    },
    openExecution : function(record){
        var me = this;
        me.editObject(null,record);
    },
    checkFinished : function(combo,newValue,oldValue){
        var me=this;
        var percentual = Ext.getCmp('percentual_execucao');
        if(newValue===6){
            me.percentualOldValue = percentual.getValue();
            percentual.setValue(100);
            percentual.setDisabled(true); 
            var dataEncerramento = Ext.getCmp('data_encerramento');
            dataEncerramento.onTriggerClick();
        }else if(newValue===1){
            combo.setValue(oldValue);
        }else{
            if(typeof(me.percentualOldValue)!=='undefined'){
                percentual.setValue(me.percentualOldValue);
                delete me.percentualOldValue;
            }
            percentual.setDisabled(false);
        }
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
        var me = this;
        var grid = me.getGrid(); // recupera lista de usuários
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
                        var store = me.getOperativosStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, this);
    },
    chengeHtmlFontSize : function(){
        var avaliacaoEditor =Ext.getCmp('avaliacao_andamentoHtmlEditor');
        avaliacaoEditor.focus(true);
        avaliacaoEditor.relayCmd('FontSize',2);
    },
    saveObject: function(button) {
        var me=this;
        me.chengeHtmlFontSize();
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm(); // recupera item abaixo(filho) da window do tipo form
        if (form.isValid()) {
            var r = form.getRecord();
            form.updateRecord(r);
            me.getOperativosStore().sync();
            win.close();
            Ext.Msg.alert('Salvo', 'Registro salvo com sucesso',{duration:500});
            me.getOperativosStore().load();
            if(button.itemId==='sendmail'){
                var programacoesStore = me.getProgramacoesStore();
                programacoesStore.remoteFilter = false;
                programacoesStore.suspendEvents();
                programacoesStore.clearFilter();
                programacoesStore.resumeEvents();
                programacoesStore.filter('id',r.get('programacao_id'));
                programacoesStore.remoteFilter = true;
                programacoesStore.load({
                    callback : function(records, operation, success) {
//                        var programacaoRecord = programacoesStore.findRecord('id',parseInt(r.get('id'),10));
                        me.application.fireEvent('sendMailToSupervisor', records[0]);
                    }
                });
            }
        }else{
            Etc.alert('formulário inválido');
        }
    }
});