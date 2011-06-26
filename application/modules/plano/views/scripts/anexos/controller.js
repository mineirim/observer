Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Anexos', {
    extend: 'Ext.app.Controller',
    stores: ['Anexos'], // Store utilizado no gerenciamento do usuário
    models: ['Anexos'], // Modelo do usuário
     views: [
    'plano.anexos.List',
    'plano.anexos.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoAnexosList'
            },{
                ref:'formPanel',
                selector:'planoAnexosEdit'
            }
        ],
    init: function() {
        this.control(
        {
            'planoAnexosList': {
                itemdblclick: this.editObject
            },
            'planoAnexosList button[action=incluir]': {
                click: this.editObject
            },
            'planoAnexosList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoAnexosEdit button[action=salvar]': {
                click: this.saveObject
            }
        });
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoAnexosEdit');
        view.setTitle('Edição ');
        view.setTitle('Anexo');
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
                        store = this.getAnexosStore();
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
            form.submit({
                        url: '/data/anexos',
                        waitMsg: 'Enviando arquivo...',
                        success: function(fp, o) {
                            Ext.Msg.alert('Success', 'Arquivo enviado: ' );
                            win.close();
                        },
                        error: function(a,b){
                            Ext.Msg.alert('Falha', 'erro')
                        },
                        callback: function(a,b){
                            Ext.Msg.alert('Callback', 'passou no callback')
                        }
                    });
        }
    }
});