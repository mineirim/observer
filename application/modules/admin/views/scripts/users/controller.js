// Inclusão da classe para exibição de mensagens de alerta
Ext.require('Ext.window.MessageBox');

// Arquivo que executa as ações do usuário
Ext.define('ExtZF.controller.admin.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Usuarios', 'Setores', 'Cargos','usuarios.Store4pass'], // Store utilizado no gerenciamento do usuário
    models: ['Usuarios', 'Setores', 'Cargos','usuarios.Model4pass'], // Modelo do usuário
    views: [
    'admin.users.List',
    'admin.users.Edit'
    ],
    refs: [{
            ref: 'panel',
            selector: 'admiUserEdit'
    },{
            ref:'grid',
            selector:'adminUsersList'
    }],


    init: function() {
        console.log('init do user');
        this.control(
        {
            // evento duplo click na tela principal(viewport) --> usuariolista(grid)
            'adminUsersList': {
                itemdblclick: this.editarUsuario
            },
            // evento click no botao (definido com action: reset) da grid definida como usuariolista
            'adminUsersList button[action=reset]': {
                click: this.resetPassword
            },
            // evento click no botao (definido com action: incluir) da grid definida como usuariolista
            'adminUsersList button[action=new]': {
                click: this.editarUsuario
            },
            // evento click no botao (definido com action: excluir) da grid definida como usuariolista
            'adminUsersList button[action=delete]': {
                click: this.excluirUsuario
            },
            // evento click no botao (definido com action: salvar) do formulario definido como usuarioedicao
            'admiUserEdit button[action=save]': {
                click: this.salvarUsuario
            },
            // evento click no botao (definido com action: salvar) do formulario definido como usuarioedicao
            'admiUserEdit button[action=reset]': {
                click: this.resetPassword
            }
        });
    },
    // Função para popular o formulario
    editarUsuario: function(grid, record) {
        var view = Ext.widget('admiUserEdit');
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
			// exibe uma mascará na grid com a mensagem abaixo
			grid.el.mask('Excluindo registro(s)');
                        store = this.getUsuariosStore();
                        store.remove(ids);

                        store.sync();
                        //this.getUsuariosStore().load();
                        grid.el.unmask();
                        Ext.Msg.alert('Exclusão', 'Usuário(s) excluído(s)!');
                        Etc.info("Usuário(s) excluído(s)");
			
		}, this);
    },
 // Função para popular o formulario
    resetPassword: function() {
        var me = this;
        var grid = me.getGrid(); // recupera lista de usuários
        ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas

        if(ids.length === 0){
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }

        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja resetar a senha do(s) registro(s) selecionado(s)?',
		function(opt){
			if(opt === 'no')
				return;
			// exibe uma mascará na grid com a mensagem abaixo
			grid.el.mask('Resetando senha(s)');
                        var store =  me.getUsuariosStore4passStore();
                        for(i=0;i<ids.length;i++){
                            var usuario =store.findRecord('id',ids[i].get('id'));
                            usuario.set('senha','123456');
                            usuario.set('alterar_senha','true');
                            usuario.save({
                                        success: function(a,b){
                                            Ext.log({msg:"Senha alterada com sucesso!",level:"info"});
                                        },
                                        failure:function(a,b){
                                            Ext.log({msg:"Erro ao salvar!",level:"error"});
                                            Ext.Msg.alert('Alteração de senha', 'Erro ao alterar senha!');
                                        }
                                });
                        }
                        
                        store.sync();
                        //this.getUsuariosStore().load();
                        grid.el.unmask();
                        Ext.Msg.alert('Reset', 'Senha(s) alterada(s)!');
                        Etc.info("Senhas(s) alterada(s)");
			
		}, this);
    },

    // Função para salvar os registros do usuário
    salvarUsuario: function(button) {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm(); // recupera item abaixo(filho) da window do tipo form
           
        if (form.isValid()) {

            r = form.getRecord();
            form.updateRecord(r);


            r.save({
                success: function(a,b){
                    Etc.log({msg:"Salvo com sucesso!",level:"info",dump:a});
                    win.close();
                    me.getUsuariosStore().load();
                },
                failure:function(record,b,dados){
                    obj =  eval('(' + b.request.callback.arguments[2].responseText + ')');
                    Ext.Msg.alert('Erro', obj.msg);
                    Etc.error({msg:"Erro ao salvar!",level:"error"});
                }
                });
            
        }

    }

});