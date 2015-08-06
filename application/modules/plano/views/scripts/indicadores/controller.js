/*
 * código gerado automaticamente pelo template "js/controller.tpl" 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

/* global Ext */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Indicadores', {
    extend: 'Ext.app.Controller',
    stores: ['Indicadores','TipoIndicador'], // Store utilizado no gerenciamento do usuário
    models: ['Indicadores','TipoIndicador'], // Modelo do usuário
     views: [
    'plano.indicadores.List',
    'plano.indicadores.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoIndicadoresList'
            },{
                ref:'formPanel',
                selector:'planoIndicadoresEdit'
            }
        ],
    init: function() {
        var me = this;
        me.control(
        {
            'planoIndicadoresList': {
                itemdblclick: this.editObject
            },
            'planoIndicadoresList button[action=incluir]': {
                click: this.editObject
            },
            'planoIndicadoresList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoIndicadoresEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
        me.application.on({
            createIndicador: me.createIndicador, 
            scope: this
        });
        me.application.on({
            editIndicador: me.editIndicador, 
            scope: this
        });
    },
    createIndicadorForm : function(programacao){
        
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoIndicadoresEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Indicadores();
            this.getIndicadoresStore().add(record);
            view.setTitle('Cadastro');
        }
      	view.down('form').loadRecord(record);
    },
    deleteObject: function() {
        var me=this;
        var grid = this.getGrid(); // recupera lista de usuários
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
                        var store = this.getIndicadoresStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, me);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window');
        var form   = win.down('form').getForm();
        if(form.isValid()) {
            var r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(a,b){
                    Etc.log({msg:"Salvo com sucesso!",level:"info"});
                    win.close();
                    me.getIndicadoresStore().load();
                },
                failure:function(a,b){
                    Etc.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    }
});