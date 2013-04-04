Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.acesso.Auth', {
    extend: 'Ext.app.Controller',
    stores: ['usuarios.Store4pass'],
    models: ['usuarios.Model4pass'],
     views: [
    'acesso.auth.Form',
    'acesso.auth.Changepassword',
    'acesso.auth.Controle'
    ],
    refs: [{
                ref:'loginWindow',
                selector:'acessoAuthForm'
            },
            {
                ref:'changeWindow',
                selector:'acessoAuthChangepassword'
            }
        ],
    init: function() {
        me=this;
        this.control(
        {
           'acessoAuthForm button[action=entrar]': {
                click: this.login
            },
            'acessoAuthChangepassword button[action=change]': {
                click: this.change
            },
            'acessoAuthForm > form > textfield[itemId=senha]': {
                specialkey: this.onSpecialkey
            },
            'authControle': {
                click: this.changeClick
            }
        });

        if(typeof usuario!='undefined' && usuario.length>0){
            if(typeof forceChange!='undefined' && forceChange){
                this.createChangeWindow();
            }
           
        }else{
            win = Ext.widget('acessoAuthForm');

        }
    },
    changeClick: function() {
        cont = Ext.widget('acessoAuthChangepassword');
    },
    change: function(button){
        me=this;
        var win = button.up('window');
        senha_atual = win.down('#senha_atual');
        senha_nova  = win.down('#senha_nova');
        senha_confirma = win.down('#senha_confirma');
        if(senha_nova.value != senha_confirma.value){
            Ext.Msg.alert('Alteração de senha', 'Senha não confere. Tente novamente!');
            return;
        }
        var store =  me.getUsuariosStore4passStore();
        store.remoteFilter = false;
        store.clearFilter();
        store.remoteFilter = true;
        store.filter('usuario',usuario);
        Ext.Ajax.request({
            url: baseUrl+'/acesso/auth/checklogin',
            params: {
                format: 'json',
                usuario : usuario,
                senha   : senha_atual.value,
                onlyCheck : true
            },
            success: function(response){
                obj = Ext.decode(response.responseText);
                if(obj.success){
                    record = store.findRecord('usuario',usuario);
                    record.set('senha',senha_nova.value);
                    record.save({
                            success: function(a,b){
                                Ext.log({msg:"Senha alterada com sucesso!",level:"info"});
                                
                                win.close();
                                if(typeof me.forceChange!='undefined'){
                                    window.location.reload();
                                }

                            },
                            failure:function(a,b){
                                Ext.log({msg:"Erro ao salvar!",level:"error"});
                                Ext.Msg.alert('Alteração de senha', 'Erro ao alterar senha!');
                            }
                    })
                }else{
                    Ext.Msg.alert('Alteração de senha', 'Erro na autenticação. Senha atual não confere!');
                }
            },
            failure: function(){
                Ext.Msg.alert('Alteração de senha', 'Erro na autenticação!');
            }
        });
                
    },
    createChangeWindow: function(){
        me = this;
        var store =  me.getUsuariosStore4passStore();
        store.remoteFilter = false;
        store.clearFilter();
        store.remoteFilter = true;
        store.filter('usuario',usuario);        
        win = Ext.widget('acessoAuthChangepassword');
    },
    onSpecialkey: function(field,event){
        if(event.getKey()==event.ENTER){
        	this.login(field);
        }
    },
    login: function(button) {
        me=this;
          
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm()
			
	    if (form.isValid()) {
            form.submit({
            	scope: this,
                params: {format: 'json'},
            	url: baseUrl+'/acesso/auth/login',
                success: function(form, action) {
                    if(action.result.forceChange){
                        me.createChangeWindow();
                        me.forceChange = true
                        usuario = action.result.usuario;
                        var store =  me.getUsuariosStore4passStore();
                        store.remoteFilter = false;
                        store.clearFilter();
                        store.remoteFilter = true;
                        store.filter('usuario',usuario);                        
                    }else{
                        window.location.reload();
                    }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Erro', action.msg);
                }
            });
        }
    }
});