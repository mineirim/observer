/*
 * código gerado automaticamente pelo template "js/controller.tpl" 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.Email', {
    extend: 'Ext.app.Controller',
    stores: ['Email'], // Store utilizado no gerenciamento do usuário
    models: ['Email'], // Modelo do usuário
     views: [
    '.email.List',
    '.email.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'EmailList'
            },{
                ref:'formPanel',
                selector:'EmailEdit'
            },
            {
                ref:'sendMail',
                selector:'emailSend'
            },
        ],
    init: function() {
        var me=this;
        me.control(
        {
            'EmailList': {
                itemdblclick: me.editObject
            },
            'EmailList button[action=incluir]': {
                click: me.editObject
            },
            'EmailList button[action=excluir]': {
                click: me.deleteObject
            },
            'EmailEdit button[action=salvar]': {
                click: me.saveObject
            },
            'emailSend button[action=send]': {
                click: me.sendMail
            },
        });
        me.initiated=true;
    },
    showEdit : function(parentRecord,rec){
        var view = Ext.widget('EmailEdit');
        var record = rec;
        if(!record){
            var subject = parentRecord.get('instrumento')['singular'] + ' - ' + parentRecord.get('menu');
            var opts = {'reference_id':parentRecord.get('id'),
                        'responsavel' : parentRecord.get('responsavel')['nome'],
                        'subject': subject
            };  
            record = Ext.ModelMgr.create(opts,'ExtZF.model.Email');            
        }
        view.down('form').loadRecord(record);
        view.setTitle('Enviar e-mail');
        view.show();
        
    },     
    editObject: function(grid, record) {
        var view = Ext.widget('EmailEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Email();
            this.getEmailStore().add(record);
            view.setTitle('Cadastro');
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
                        store = this.getEmailStore();
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
            r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(a,b){
                    Ext.log({msg:"Salvo com sucesso!",level:"info"});
                    win.close();
                    me.getEmailStore().load();
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    }
});

