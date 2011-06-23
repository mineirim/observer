Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.acesso.Auth', {
    extend: 'Ext.app.Controller',
     views: [
    'acesso.auth.Form'
    ],
    refs: [{
                ref:'loginWindow',
                selector:'acessoAuthForm'
            }
        ],
    init: function() {
        win = Ext.widget('acessoAuthForm');
        me=this;
        
        this.control(
        {
           'acessoAuthForm button[action=entrar]': {
                click: this.login
            },
            'acessoAuthForm > form > textfield[itemId=senha]': {
                specialkey: this.onSpecialkey
            }
        });
    },
    onSpecialkey: function(field,event){
        Ext.log("entrou no eent")
        if(event.getKey()==event.ENTER){
        	this.login(field);
        }
    },
    login: function(button) {
        Ext.log('Efetuando o login');
          
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm()
			
	    if (form.isValid()) {
            form.submit({
            	scope: this,
                params: {format: 'json'},
            	url: 'acesso/auth/login',
                success: function(form, action) {
                   window.location.reload();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Erro', action.msg);
                }
            });
        }
    }
});