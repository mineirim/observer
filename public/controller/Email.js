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
        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
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
            'EmailEdit button[action=send]': {
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
    sendMail: function(button) {
        var me=this;
        var win    = button.up('window'); 
        var form   = win.down('form').getForm(); 
        if (form.isValid()) {
            r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(_rec,_op){
                    win.close();
                    me.getEmailStore().load();
                    Ext.MessageBox.show({
                        title: 'E-mail'
                        ,buttons: Ext.MessageBox.OK
                        ,icon: Ext.MessageBox.INFO
                        ,msg: 'E-mail enviado com sucesso!'
                    });
                },
                failure:function(_records,_op){
                    var readerData = _op.request.scope.reader.jsonData;
                    Ext.MessageBox.show({
                        title: 'E-mail'
                        ,buttons: Ext.MessageBox.OK
                        ,icon: Ext.MessageBox.ERROR
                        ,msg: 'Erro ao enviar e-mail!<br> Entre em contato com o suporte e informe o seguinte erro:<br>' + readerData.message
                                + '<br>ref:' + readerData.rows.id
                    });
                }
            });
        }
    }
});

