Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Anexos', {
    extend: 'Ext.app.Controller',
    initiated:false,
    stores: ['Anexos','Tags'], // Store utilizado no gerenciamento do usuário
    models: ['Anexos','Tags'], // Modelo do usuário
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
        var me=this;
        me.control(
        {
            'planoAnexosList': {
                itemdblclick: me.editObject
            },
            'planoAnexosList button[action=incluir]': {
                click: me.editObject
            },
            'planoAnexosList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoAnexosEdit button[action=sendFile]': {
                click: me.sendFile
            },
            'planoAnexosEdit': {
                beforerender          : me.callRender
            },
        });
        
        me.initiated=true;
    },
    callRender : function()
    {
        me=this;
        Etc.log('Renderiza form send file');
        var checkboxconfigs = [];
        var tagRecords = me.getTagsStore();
        tagRecords.load({
                callback : function(records, operation, success) {
                    tagRecords.each(function(t){
                        checkboxconfigs.push({
                            name : 'tags[' + t.get('id') + ']',
                            inputValue : t.get('id'),
                            boxLabel : t.get('tag'),
                            xtype : 'checkbox'
                        });
                    });
                    Ext.getCmp('groupTags').add(checkboxconfigs);
                }
            });
    },
    showEdit : function(parent_record,rec){
        var view = Ext.widget('planoAnexosEdit');
        var record = rec;
        if(!record){
            var opts = {};  
            record = Ext.ModelMgr.create(opts,'ExtZF.model.Anexos');            
        }
        view.down('form').loadRecord(record);
        view.down('#programacao_id').setValue(parent_record.get('id'));
        view.programacao_id = parent_record.get('id');
        view.setTitle('Anexo');
        view.show();
        
    },    
    editObject: function(grid, record) {
        var view = Ext.widget('planoAnexosEdit');
        view.setTitle('Edição ');
        view.setTitle('Anexo');
    },
    deleteObject: function() {
        var me=this;
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
                        store = me.getAnexosStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, this);
    },
    sendFile: function(button) {
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