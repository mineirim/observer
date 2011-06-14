// Inclusão da classe para exibição de mensagens de alerta
Ext.require('Ext.window.MessageBox');

// Arquivo que executa as ações do usuário
Ext.define('ExtZF.controller.admin.Cad-usuarios', {
    extend: 'Ext.app.Controller',
  
    stores: ['Usuarios', 'Setores'], // Store utilizado no gerenciamento do usuário
    models: ['Usuarios', 'Setores'], // Modelo do usuário
    views: [
    'admin.cad-usuarios.Lista',
    'admin.cad-usuarios.Edicao'
    ],
    refs: [{
            ref: 'admiUsuariosEdicao',
            selector: 'panel'
    },{
            ref:'usuarioslista',
            selector:'adminUsuariosLista'
    }],


    init: function() {
        this.control(
        {
            // evento duplo click na tela principal(viewport) --> usuariolista(grid)
            'adminUsuariosLista': {
                itemdblclick: this.editarUsuario
            },
            // evento click no botao (definido com action: incluir) da grid definida como usuariolista
            'adminUsuariosLista button[action=incluir]': {
                click: this.editarUsuario
            },
            // evento click no botao (definido com action: excluir) da grid definida como usuariolista
            'adminUsuariosLista button[action=excluir]': {
                click: this.excluirUsuario
            },
            // evento click no botao (definido com action: salvar) do formulario definido como usuarioedicao
            'admiUsuariosEdicao button[action=salvar]': {
                click: this.salvarUsuario
            }
        });
    },
    // Função para popular o formulario
    editarUsuario: function(grid, record) {
        var view = Ext.widget('admiUsuariosEdicao');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Usuarios();
            this.getUsuariosStore().add(record);
            view.setTitle('Cadastro');
        }
      	view.down('form').loadRecord(record);
            
    },

    // Função para popular o formulario
    excluirUsuario: function() {
        var grid = this.getUsuarioslista(); // recupera lista de usuários
        ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas

        if(ids.length === 0){
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }

        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
		function(opt){
			if(opt === 'no')
				return;

			// exibe uma mascará na grid com a mensagem abaixo
			grid.el.mask('Excluindo registro(s)');
                        store = this.getUsuariosStore();
                        store.remove(ids);

                        store.sync();
                        //this.getUsuariosStore().load();
                        grid.el.unmask();
			
		}, this);
    },

    // Função para salvar os registros do usuário
    salvarUsuario: function(button) {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm() // recupera item abaixo(filho) da window do tipo form
           
        if (form.isValid()) {

            r = form.getRecord();
            form.updateRecord(r);

            /*
	     * Aqui fica um problema que não encontrei a solução.
	     * eu gostaria de salvar o registro com o comando abaixo diretamente do record, mas dá um erro que não consegui entender
	     * 
            r.save({
                scope : this.getUsuariosStore(),
                success : function(record, operation) {
                            Ext.Msg.alert('Sucesso');
                            win.close();
                            me.getUsuariosStore().load();

                        }
                    });
             */
            this.getUsuariosStore().sync();
            win.close();
            this.getUsuariosStore().load();
            
        }

    }

});