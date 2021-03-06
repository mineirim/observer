/*
 * código gerado automaticamente pelo template "js/controller.tpl" 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

/* global Ext, _myAppGlobal */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.Email', {
    extend: 'Ext.app.Controller',
    stores: ['Email','Usuarios'], // Store utilizado no gerenciamento do usuário
    models: ['Email','Usuarios'], // Modelo do usuário
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
            'EmailEdit button[action=send]': {
                click: me.sendMail
            },
        });
//        _myAppGlobal.on({
//            'sendMailToOwner': me.sendMailToOwner, 
//            scope: me
//        });
        _myAppGlobal.on({
            'sendMailToSupervisor': me.sendMailToSupervisor, 
            scope: me
        });
        me.initiated=true;
    },
    sendMailToSupervisor : function(programacao){
        var me = this;
        if(programacao){
            var supervisores = Ext.create('ExtZF.store.Usuarios',{id:'user_supervisores'});
    //            supervisores.getProxy().extraParams = {'owntype': 'responsavel'};
            supervisores.filter('id',programacao.get('supervisor_usuario_id'));
            supervisores.remoteFilter = true;
            supervisores.load({callback:function(records){
                    
                    var view = Ext.widget('EmailEdit');

                    var subject = programacao.get('instrumento')['singular'] + ' - ' + programacao.get('menu');
                    var opts = {'reference_id':programacao.get('id'),
                                'responsavel' : records[0].get('nome'),
                                'to_users'  : records[0].get('email'),
                                'subject': subject
                    };  
                    var record = Ext.ModelMgr.create(opts,'ExtZF.model.Email');            

                    view.down('form').loadRecord(record);
                    view.setTitle('Enviar e-mail');
                    view.show();        

                }
            });
        }
    },
    showEdit : function(parentRecord,rec){
        var me = this;
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
			if(opt !== 'yes')
				return;
			grid.el.mask('Excluindo registro(s)');
                        var store = this.getEmailStore();
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
            var r = form.getRecord();
            form.updateRecord(r);
            var wcomp =Ext.MessageBox.show({
               msg: 'Enviando e-mail, aguarde...',
               progressText: 'Enviando...',
               width:500,
               wait:true,
               animateTarget: 'waitButton'
            });
            r.save({
                success: function(_rec,_op){
                    wcomp.close();
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
                    wcomp.close();
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

