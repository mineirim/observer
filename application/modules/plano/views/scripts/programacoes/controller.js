Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Programacoes', {
    extend: 'Ext.app.Controller',
    id      : 'controllerPlanoProgramacoes',
    stores: ['programacoes.TreeStore', 'Programacoes' ,'Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Financeiro', 'GrupoDespesas'], // Store utilizado no gerenciamento do usuário
    models: ['programacoes.Model4tree', 'Programacoes' ,'Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Financeiro', 'GrupoDespesas'], // Modelo do usuário
    views: [
        'plano.programacoes.List',
        'plano.programacoes.Treegrid',
        'plano.programacoes.Edit',
        'plano.programacoes.Container',
        'plano.programacoes.Anexos',
        'plano.programacoes.Detalhes',
        'plano.vinculos.Edit',
        'plano.anexos.Edit',
        'plano.programacoes.GridFinanceiro'
        ],
    /**
     *nó selecionado na navegação à esquerda
     */
    rootNodeSelected : false,
    
    /** @var selectNewRecord registro a ser selecionado após criação*/
    selectNewRecord  : false,
    refs: [{
                ref:'treegrid',
                selector:'planoProgramacoesTreegrid'
            },{
                ref:'grid',
                selector:'planoProgramacoesList'
            },{
                ref:'formPanel',
                selector:'planoProgramacoesEdit'
            }
        ],
    init: function() {
        me = this;
        this.control(
        {
            'planoProgramacoesList': {
                itemdblclick: this.editDblClick
            },
            'planoProgramacoesList button[action=incluir]': {
                click: this.newObject
            },
            'planoProgramacoesList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoProgramacoesEdit button[action=save]': {
                click: this.saveObject
            },
            'planoProgramacoesEdit button[action=saveAndClose]': {
                click: this.saveAndClose
            },
            'planoProgramacoesEdit button[action=addVlrProgramado]':{
                click: this.showFinanceiro
            },
            'planoProgramacoesEdit button[action=addDespesas]':{
                click: this.showDespesasForm
            },
            'planoProgramacoesTreegrid': {
                itemdblclick    : this.editDblClick,
                itemclick       : this.changeButtonAction,
                itemcontextmenu : this.itemContextMenu,
                render          : this.callRender
            },
            'planoProgramacoesTreegrid button[action=incluir]': {
                click: this.newObject
            },
            'planoProgramacoesTreegrid button[action=newRoot]': {
                click: this.newRoot
            },
            'planoProgramacoesTreegrid button[action=excluir]': {
                click: this.deleteObject
            },
            'planoProgramacoesAnexos button[action=attach]': {
                click: this.attachFile
            },
            'planoProgramacoesTreegrid button[action=vincular]': {
                click: this.linkInstrumento
            },
            'planoVinculosEdit button[action=salvar]':{
                click: this.saveLinkObject
            },
            'planoVinculosEdit depende_programacao_id':{
                change: this.verificaResponsavel
            }
            
            
            
        });
        
    },
    showDespesasForm : function(button){
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('#frmDefault').getForm();

        var rec = form.getRecord();
        form.updateRecord(rec);
        
        var args ={};
        args.parent_record = rec;
        args.controller = 'plano.Despesas';
        this.application.fireEvent('openEditForm', args);
        view.doLayout();
    }
    ,
    showFinanceiro : function(button){
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('#frmDefault').getForm();

        var rec = form.getRecord();
        form.updateRecord(rec);
        
        var args ={};
        args.parent_record = rec;
        args.controller = 'plano.Financeiro';
        this.application.fireEvent('openEditForm', args);
        view.doLayout();
    },
    itemContextMenu :  function( view, record, item, index, event, options){
        event.stopEvent();
        var me= this;
        instrumento_filho = this.getInstrumentosStore().findRecord('instrumento_id',record.get('instrumento_id'));
        items = [];
        mycontroller = this.getController('ExtZF.controller.plano.Programacoes');
        myStore = Ext.StoreManager.get('programacoes.TreeStore');
        rootRecord = this.getProgramacoesStore().findRecord('id',myStore.getRootNode().get('id') );
        items.push({text: 'Editar',
                    handler : function(){
                        me.editarProgramacao(record);
                    }
                });
        
        if(mycontroller.rootNodeSelected){
            rootInstrumento = this.getInstrumentosStore().findRecord('instrumento_id',rootRecord.get('instrumento_id'));
            items.push({
                text: 'Adicionar '+ rootInstrumento.get('singular'),
                handler:  function(){
                    me.novaProgramacao(rootRecord);
                } 
            });
            items.push('-');
        }
        
        if(instrumento_filho){
            items.push({
                text:"Adicionar "+instrumento_filho.get('singular'),
                handler: function(){
                    me.novaProgramacao(record);
                } 
            });
        }
        if (record.get('instrumento').has_operativo){
            items.push('-');
            items.push({
                text:"Adicionar Vínculo",
                data: {record: record},
                handler: this.addVinculo 
            });
        }        
        var menu = Ext.create('Ext.menu.Menu',{
        items: items
        });
        menu.showAt(event.xy);
    },
    novaProgramacao: function(parent){; 
        var view = Ext.widget('planoProgramacoesEdit');
        view.setTitle('Inserir');
        var options ={instrumento_id: ''};
        if( typeof(parent)!=='undefined'){
            parent_id  = parent.get('id');
            options.programacao_id = parent_id;
            instrumento = this.getInstrumentosStore().findRecord('instrumento_id',parent.get('instrumento_id'));
            options.instrumento_id =instrumento.get('id');
        }
        this.configuraForm(view,false,instrumento);
        record = Ext.ModelMgr.create(options,'ExtZF.model.Programacoes');
      	view.down('form').loadRecord(record);
        
    },
    editarProgramacao : function(rec){
        var view = Ext.widget('planoProgramacoesEdit');
        view.setTitle('Edição ');
        //TODO buscar record de um outro store(não tree)
        var store =  this.getProgramacoesStore();
        var record = store.getById(rec.get('id'));
        Etc.info("Carregando registro para edição"); 
        view.down('form').loadRecord(record);
        instrumento = this.getInstrumentosStore().findRecord('id',record.get('instrumento_id'));
        this.configuraForm(view, record, instrumento);
     
    },
    configuraForm : function(view, record, instrumento){
        if (instrumento.get('has_operativo')==="true") {
            var operativo={};
            view.criaDetail();
            if(record){
                operativo = record.get('operativo')[0];
                if (!operativo)
                    operativo = {};
            }
            rr = Ext.ModelMgr.create(operativo,'ExtZF.model.Operativos');
            view.down('#frmDetail').getForm().loadRecord(rr);
            view.doLayout();
        }
        // TODO : transformar a execução em uma lista com mais de um tipo de financiamento (material perm, pessoal, etc)
        if (instrumento.get('has_vlr_programado')==="true") {
            if(instrumento.get('has_vlr_executado')==="true"){
                // se existir valor executado, deverá ser apresentado um grid para programação...
                var idrecord = null;
                if(record)
                    idrecord =record.get('id');
                this.getFinanceiroStore().remoteFilter = false;
                this.getFinanceiroStore().clearFilter();
                this.getFinanceiroStore().remoteFilter = true;
                this.getFinanceiroStore().filter('programacao_id',idrecord);
                
                view.showGridProgramacao(idrecord);
                    
                
            }else{
                //... se não existir valor executado, significa que é um item de despesa e deverá ser exibido apenas um campo com valor
                view.showVlrProgramado();
                if(record){
                    recFinanceiro = this.getFinanceiroStore().findRecord('programacao_id',record.get('id'));
                    if (typeof(recFinanceiro)=== 'undefined' || recFinanceiro ===null ){
                        financeiro = {};
                        recFinanceiro = Ext.ModelMgr.create(financeiro,'ExtZF.model.Financeiro');
                    }
                }else{
                    financeiro = {};
                    recFinanceiro = Ext.ModelMgr.create(financeiro,'Financeiro');
                }
                view.down('#frmVlrProgramado').getForm().loadRecord(recFinanceiro);
            }
            
            
            view.doLayout();

        }
        if (instrumento.get('has_vlr_executado')==="true") {
            view.showBtnDespesas();
        }
        var responsavel = instrumento.get('has_responsavel');
        if (responsavel==="true") {
            view.down('#responsavel_usuario_id').show();
        }        
        var supervisor = instrumento.get('has_supervisor');
        if (supervisor==="true") {
            view.down('#supervisor_usuario_id').show();
        }        
        var equipe = instrumento.get('has_equipe');
        if (equipe==="true") {
            view.down('#setor_id').show();
        }
    },
    verificaResponsavel: function(){
      //verifica se o record selecionado pertence ao usuário atual  
      alert('xxx');
    },
    handlerEdit: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        alert("Edit " + rec.get('menu'));
    },
    attachFile  : function(){
        var view = Ext.widget('planoAnexosEdit');
        view.setTitle('Anexar arquivo');
    },
    
    linkInstrumento  : function(){
        var view = Ext.widget('planoVinculosEdit');
        view.setTitle('Vincular Atividades');
        var grid = this.getTreegrid(); 
        selected = grid.getSelectionModel().getSelection()[0]; 
        options={programacao_id : selected.get('id'),  atividade : selected.get('menu')};
        record = Ext.ModelMgr.create(options,'ExtZF.model.Vinculos');
      	view.down('form').loadRecord(record);
    },
    /**
     * Metodo salvar copiado do controller:
     * ExtZF.controller.plano.Vinculos
     * até que seja resolvido o carregamento deste
     * @param button
     */
    saveLinkObject: function(button) {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm(); // recupera item abaixo(filho) da window do tipo form
        if (form.isValid()) {
            r = form.getRecord();
            form.updateRecord(r);
            r.save({
                success: function(a,b){
                    Etc.info("Salvo com sucesso!");
                    win.close();
                    me.getVinculosStore().load();
                },
                failure:function(a,b){
                    Etc.error("Erro ao salvar!");
                }
            });
        }
    },    
    
    newRoot: function() {
        var view = Ext.widget('planoProgramacoesEdit');
        view.setTitle('Inserir');
        /**
         * TODO pegar automaticamente o root do instrumento(quando mais de um instrumento)
         */     
        var options={instrumento_id :2};
        
        record = Ext.ModelMgr.create(options,'ExtZF.model.Programacoes');
      	view.down('form').loadRecord(record);
    },
    newObject: function() {
        var grid = this.getTreegrid(); 
        var parent = grid.getSelectionModel().getSelection()[0]; 
        this.novaProgramacao(parent);
        
        
    },
    editDblClick :function(grid, rec) {
        var store =  this.getProgramacoesStore();
        var record = store.getById(rec.get('id'));
        this.editarProgramacao(rec);  
    },
    deleteObject:function() {
        var grid = this.getGrid(); // recupera lista de usuários
        var ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas
        if(ids.length === 0){
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }
        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
		function(opt){
			if(opt === 'no')
				return;
			grid.el.mask('Excluindo registro(s)');
                        store = this.getProgramacoesStore();
                        store.remove(ids);
                        store.sync();
                        this.getProgramacoesTreeStoreStore().load();
                        grid.el.unmask();
		}, this);
    },
    saveAndClose: function(button) 
    {
        Etc.info('Save and Close');
        var me = this;
        win =me.saveObject(button);
        if(win!==false)
            win.close();
    },
    saveObject: function(button) 
    {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            formDefault   = win.down('#frmDefault').getForm(),
            formDetail   = win.down('#frmDetail');
            if (formDetail !== null)
                formDetail = formDetail.getForm();

            frmVlrProgramado   = win.down('#frmVlrProgramado');
            if (frmVlrProgramado !== null)
                frmVlrProgramado = frmVlrProgramado.getForm();


        if (formDefault.isValid()) {
            r = formDefault.getRecord();
            formDefault.updateRecord(r);
            r.save({
                success: function(a,b){
                    Etc.info("Salvo com sucesso!");
                    /**
                     * TODO selecionar o objeto salvo/cridado
                     */
                    if (formDetail){
                        rd = formDetail.getRecord();
                        formDetail.updateRecord(rd);
                        rd.set('programacao_id',a.get('id'));
                        rd.save({
                            success: function(c,d){
                               Etc.info("Detalhes salvos com sucesso!");                                
                            }
                        });
                    }
                    if (frmVlrProgramado){
                        var recProgramado = frmVlrProgramado.getRecord();
                        frmVlrProgramado.updateRecord(recProgramado);
                        recProgramado.set('programacao_id',a.get('id'));
                        recProgramado.save({
                            success: function(c,d){
                               Etc.info("Orçamento salvo com sucesso!");         
                            }
                        });
                        me.getFinanceiroStore().load();
                    }
                    me.getProgramacoesTreeStoreStore().load();
                    me.getProgramacoesStore().load();
                    var treePanelLeft = Ext.getCmp('treeNavPanel');
                    var treePanelStore= treePanelLeft.getStore();
                    var prog_id = r.get('programacao_id');
                 
                    if(prog_id!==null){
                        var node = treePanelStore.getNodeById(prog_id);
                        treePanelStore.load({node:node});
                    }else{
                        var inst_id = parseInt(r.get('instrumento_id',10)) - 1;
                        var node = treePanelStore.getNodeById('instrumentoId-' + inst_id);
                        treePanelStore.load({node:node});
                    }
                
                    Etc.info("Salvo com sucesso!");
                    
                    Ext.MessageBox.show({
			title: 'Salvar'
			,buttons: Ext.MessageBox.OK
			,icon: Ext.MessageBox.INFO
			,msg: 'Registro salvo com sucesso!'
                    });
                },
                failure:function(a,b){
                    Etc.error("Erro ao salvar!");
                    
                    Ext.MessageBox.show({
			title: 'Salvar'
			,buttons: Ext.MessageBox.OK
			,icon: Ext.MessageBox.ERROR
			,msg: 'Erro ao salvar registro!'
                    });
                    return false;
                }
        });
        this.selectNewRecord = r; 
            
        }
        return win;
    },
    changeButtonAction: function(view, record, item, index, e, options)
    {
         var detailPanel = Ext.getCmp('detailPanel');
         if( !record){
             detailPanel.hide();
             return;
         }
         detailPanel.show();
         
         var instrumento = this.getInstrumentosStore().findRecord('instrumento_id',record.get('instrumento_id'));
         var button = Ext.ComponentQuery.query('planoProgramacoesTreegrid button[action=incluir]')[0];
         var buttonVincular = Ext.ComponentQuery.query('planoProgramacoesTreegrid button[action=vincular]')[0];
         if(instrumento){
             button.show();
             button.setText('Adicionar '+instrumento.get('singular'));
             buttonVincular.hide();
         }else if (record.get('instrumento').has_operativo){
             buttonVincular.show();
             buttonVincular.setText('Adicionar Vínculo');
             button.hide();
         } else {
             button.hide();
             buttonVincular.hide();
         }
         
        var bookTplMarkup = ['<div class="tplDetail"><b>Descrição: </b>{descricao}<br/></div>'];
        var bookTpl = Ext.create('Ext.XTemplate', bookTplMarkup);
        var showDetail = Ext.getCmp('showDetail');
        bookTpl.overwrite(showDetail.body, record.data);         

        if(record.get('instrumento').has_operativo){
             if(record.get('operativo').length>0){
                 operativo = record.get('operativo')[0];
                 var tpl_operativo = new Ext.XTemplate([
                                '<br/><br/><b>Definições:</b><br/>',
                                '<ul class="tplDetail">',
                                    '<tpl for=".">',
                                        '<li>Peso: {peso}</li>',
                                        '<li>Início: {data_inicio:date("d/m/Y")}</li>',
                                        '<li>Prazo: {data_prazo:date("d/m/Y")}</li>',
                                        '<li>Encerramento: {data_encerramento}</li>',
                                    '</tpl>',
                                '</ul>']);
                 tpl_operativo.append(showDetail.body, operativo);
             }
        }
        
        if(record.get('instrumento').has_vlr_programado){            
            planilhaOrcamentaria = detailPanel.child("#planilhaOrcamentaria");
            planilhaOrcamentaria.show();
        }else{
            planilhaOrcamentaria = detailPanel.child('#planilhaOrcamentaria');
            if(planilhaOrcamentaria) 
                planilhaOrcamentaria.hide();
        }
        this.getGantt(record.get('id'));
        
        this.getFinanceiroStore().remoteFilter = false;
        this.getFinanceiroStore().suspendEvents();
        this.getFinanceiroStore().clearFilter();
        this.getFinanceiroStore().resumeEvents();
        this.getFinanceiroStore().remoteFilter = true;
        this.getFinanceiroStore().filter('programacao_id',record.get('id'));
    },
    getGantt : function(id){
        var g = new JSGantt.GanttChart('g',document.getElementById('GanttChartDIV'), 'month');
        g.setShowRes(0); // Show/Hide Responsible (0/1)
        // define a quantidade de caracteres que aparecerão na descrição
        g.setMaxLengthDescription(50);
        g.setShowDur(1); // Show/Hide Duration (0/1)
        g.setShowComp(1); // Show/Hide % Complete(0/1)

        g.setDateInputFormat("yyyy-mm-dd");
        g.setFormatArr("day","week","month");
        g.setCaptionType('None');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)

        g.setShowStartDate(0); // Show/Hide Start Date(0/1)
        g.setShowEndDate(0); // Show/Hide End Date(0/1)
        g.setDateDisplayFormat('dd/mm/yyyy'); // Set format to display dates ('mm/dd/yyyy', 'dd/mm/yyyy', 'yyyy-mm-dd')

      //var gr = new Graphics();

      if( g ) {
          params = typeof(id) !== 'undefined' ?'&node_id='+id:'';
          JSGantt.parseXML(baseUrl+'/data/gantt?format=xml'+params,g);
          g.Draw();
          g.DrawDependencies();
      }else{
        alert("not defined");
      }
    },
    selectRecord : function(me)
    {        
        Etc.log('entrou no refresh. this.selectNewRecord='+this.selectNewRecord);
        if ( this.selectNewRecord===false || typeof(this.selectNewRecord)==='undefined');
            return;
        

        me.getSelectionModel().select(this.selectNewRecord);
        //Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);
    }   , 
    callRender : function(me)
    {
        Etc.log('entrou no render');
        me.getView().on('refresh', this.selectRecord);
    }
});