/*
 * código gerado automaticamente pelo template "js/controller.tpl"
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

/* global Etc, Ext */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Projetos', {
    extend: 'Ext.app.Controller',
    stores: ['Projetos', 'Organizacoes', 'Financiadores', ],
    models: ['Projetos', 'Organizacoes'],
     views: [
    'plano.projetos.List',
    'plano.projetos.Edit',
    'plano.projetos.Form'
    ],
    refs: [{
                ref:'grid',
                selector:'planoProjetosList'
            },{
                ref:'formPanel',
                selector:'planoProjetosEdit'
            }
        ],
    init: function() {
        var me = this;
        me.control(
        {
            'planoProjetosList': {
                itemdblclick: me.editObject
            },
            'planoProjetosList button[action=incluir]': {
                click: me.editObject
            },
            'planoProjetosList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoProjetosEdit button[action=salvar]': {
                click: me.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var me = this;
        var view = Ext.widget('planoProjetosEdit');
        if(!record.data){
            record = new ExtZF.model.Projetos();
            me.getProjetosStore().add(record);
            view.setTitle('Cadastro');
        }

        me.getStore('Financiadores').load({
            scope: me,
            params : {projeto_id:record.data.id},
            callback: function(r,option,success){
                var values = [];
                me.getStore('Financiadores').each(function(financiador){
                    values.push(financiador.get('id'));
                });
                var financiadoresField=Ext.getCmp('financiadores-field');
                financiadoresField.setValue(values);
            }
        });
        view.setTitle('Edição ');
      	view.down('form').loadRecord(record);
    },
    deleteObject: function() {
        var me=this;
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
                        var store = this.getProjetosStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, me);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window');
        var form   = win.down('form').getForm();
        if (form.isValid()) {
            var method = 'POST';
            var param_id = '';
            if(form.getFieldValues().id !==""){
                method = 'PUT';
                param_id='/' +form.getFieldValues().id;
            }
            form.submit({
                method: method,
                url: baseUrl + '/data/projetos' +param_id,
                waitMsg: 'Salvando projeto...',
                success: function(fp, o) {
                    Ext.Msg.alert('Success', 'Projeto salvo ' );
                    win.close();
                    me.getProjetosStore().load();
                },
                error: function(a,b){
                    Ext.Msg.alert('Falha', 'erro');
                },
                callback: function(a,b){
                    Ext.Msg.alert('Callback', 'passou no callback');
                }
            });
        }
    }
});