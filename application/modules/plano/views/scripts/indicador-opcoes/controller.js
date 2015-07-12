/*
 * código gerado automaticamente pelo template "js/controller.tpl" 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.IndicadorOpcoes', {
    extend: 'Ext.app.Controller',
    stores: ['IndicadorOpcoes'], // Store utilizado no gerenciamento do usuário
    models: ['IndicadorOpcoes'], // Modelo do usuário
     views: [
    'plano.indicadoropcoes.List',
    'plano.indicadoropcoes.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoIndicadorOpcoesList'
            },{
                ref:'formPanel',
                selector:'planoIndicadorOpcoesEdit'
            }
        ],
    init: function() {
        var me = this;
        me.control(
        {
            'planoIndicadorOpcoesList': {
                itemdblclick: this.editObject
            },
            'planoIndicadorOpcoesList button[action=incluir]': {
                click: this.editObject
            },
            'planoIndicadorOpcoesList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoIndicadorOpcoesEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoIndicadorOpcoesEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.IndicadorOpcoes();
            this.getIndicadorOpcoesStore().add(record);
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
                        var store = this.getIndicadorOpcoesStore();
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
                    me.getIndicadorOpcoesStore().load();
                },
                failure:function(a,b){
                    Etc.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    }
});