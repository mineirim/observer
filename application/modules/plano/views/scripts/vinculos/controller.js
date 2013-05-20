Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Vinculos', {
    extend: 'Ext.app.Controller',    
    is_initialized   : false,
    stores: ['Vinculos'], // Store utilizado no gerenciamento do usuário
    models: ['Vinculos'], // Modelo do usuário
     views: [
    'plano.vinculos.List',
    'plano.vinculos.Edit'
    ],
    refs: [{
                ref:'grid',
                selector:'planoVinculosList'
            },{
                ref:'formPanel',
                selector:'planoVinculosEdit'
            }
        ],
    init: function() {
        var me = this        
        if(me.is_initialized===true)
            return;
        this.control(
        {
            'planoVinculosList': {
                itemdblclick: me.editObject
            },
            'planoVinculosList button[action=incluir]': {
                click: me.editObject
            },
            'planoVinculosList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoVinculosEdit button[action=salvar]': {
                click: me.saveObject
            },
            'planoVinculosEdit combo[id="depende_programacao_id"]':{
                select : me.verificaResponsavel,
                scope  : this
            }
        });
        
        me.application.on({
            'planoProgramacaoVinculo.add': me.addVinculo, 
            scope: this
        });
    },
    addVinculo : function(selected){

        var view = Ext.widget('planoVinculosEdit');
        view.setTitle('Configurar Vínculo');
        options={programacao_id : selected.get('id'),  menu : selected.get('menu'), pactuado:'false'};
        record = Ext.ModelMgr.create(options,'ExtZF.model.Vinculos');
      	view.down('form').loadRecord(record);
        var observacoes = Ext.getCmp('observacoes');
        observacoes.hide();
    },
    pactuaVinculo : function(record){

        var view = Ext.widget('planoVinculosEdit');
        view.setTitle('Pactuar Vínculo');
      	view.down('form').loadRecord(record);
        var observacoes = Ext.getCmp('observacoes');
        observacoes.show();
        Ext.getCmp('justificativa').setReadOnly(true);
        Ext.getCmp('pactuado_group').show();
    },
    editObject: function(grid, record) {
        var view = Ext.widget('planoVinculosEdit');
        view.setTitle('Edição ');
        if(!record.data){
            record = new ExtZF.model.Vinculos();
            this.getVinculosStore().add(record);
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
                        store = this.getVinculosStore();
                        store.remove(ids);
                        store.sync();
                        grid.el.unmask();
		}, this);
    },
    saveObject: function(button) {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm(); // recupera item abaixo(filho) da window do tipo form
        if (form.isValid()) {
            r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(a,b){
                    Etc.log({msg:"Vínculo salvo com sucesso!",level:"info"});
                    win.close();
                    me.getVinculosStore().load();
                },
                failure:function(a,b){
                    Etc.log({msg:"Erro ao salvar!",level:"error", data : r});
                }
            });
        }
    }, 
    verificaResponsavel : function(combo, record, index){
        if(Etc.getLoggedUser().get('id')===record[0].get('responsavel_usuario_id')){
            var pactuado = Ext.getCmp('pactuado_group');
            pactuado.setValue({pactuado:'true'});
        }
    }
});