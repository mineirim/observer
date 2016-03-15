/* global Ext, Etc, _myAppGlobal, gantt, gantt */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Programacoes', {
    extend: 'Ext.app.Controller',
    //id      : 'controllerPlanoProgramacoes',
    stores: ['programacoes.TreeStore',  'Programacoes' ,'Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Financeiro', 'GrupoDespesas', 'OperativosHistorico', 'anexos.ProgramacaoAnexosStore', 'Projetos','Indicadores', 'IndicadorOpcoes','Sistemas'],
    models: ['programacoes.Model4tree', 'Programacoes' ,'Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Financeiro', 'GrupoDespesas', 'OperativosHistorico', 'anexos.ProgramacaoAnexosModel', 'Projetos','Indicadores', 'IndicadorOpcoes','Sistemas'],
    views: [
        'plano.programacoes.List',
        'plano.programacoes.Treegrid',
        'plano.programacoes.Edit',
        'plano.programacoes.Container',
        'plano.programacoes.Anexos',
        'plano.programacoes.Detalhes',
        'plano.programacoes.GridFinanceiro',
        'plano.operativos.List'
        ],
    /**
     *nó selecionado na navegação à esquerda
     */
    rootNodeSelected : false,
//    is_initialized   : false,
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
        var me = this;
        if(typeof(ExtZF.app.controllers.map['ExtZF.controller.plano.Programacoes'])==='object')
            return;

        me.control(
        {
            'planoProgramacoesList': {
                itemdblclick: me.editDblClick
            },
            'planoProgramacoesList button[action=incluir]': {
                click: me.newObject
            },
            'planoProgramacoesList button[action=excluir]': {
                click: me.deleteObject
            },
            'planoProgramacoesEdit button[action=save]': {
                click: me.saveObject
            },
            'planoProgramacoesEdit button[action=saveAndClose]': {
                click: me.saveAndClose
            },
            'planoProgramacoesEdit button[action=addVlrProgramado]':{
                click: me.showFinanceiro
            },
            'planoProgramacoesEdit button[action=addDespesas]':{
                click: me.showDespesasForm
            },
            'planoProgramacoesTreegrid': {
                itemdblclick    : me.editDblClick,
                itemclick       : me.changeButtonAction,
                itemcontextmenu : me.itemContextMenu,
                render          : me.callRender
            },
            'planoProgramacoesTreegrid button[action=incluir]': {
                click: me.newObject
            },
            'planoProgramacoesTreegrid button[action=newRoot]': {
                click: me.newRoot
            },
            'planoProgramacoesTreegrid button[action=grid]': {
                'click' : me.buttonActions
            },
            'planoProgramacoesTreegrid menuitem[action=grid]': {
                'click' : me.buttonActions
            },

            'planoProgramacoesDetalhes button[action=execucao]' : {
                 click : me.clickOnDetailsButton
            }

        });
        var operativosController = _myAppGlobal.getController('ExtZF.controller.plano.Operativos');
        operativosController.init();

        var vinculos_controller = _myAppGlobal.getController('ExtZF.controller.plano.Vinculos');
            vinculos_controller.init();

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
        me.application.fireEvent('openEditForm', args);
//        view.doLayout();
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
        me.application.fireEvent('openEditForm', args);
//        view.doLayout();
    },
    aprovarProgramacao : function(r4tree){
        var me=this;
        var record =  me.getStore('Programacoes').findRecord('id',r4tree.get('id'))
        record.set('situacao_id',1);
        record.save({
            success: function(c,d){
                               Etc.info("Aprovado com sucesso!");
                            }
        });
    },
    itemContextMenu :  function( view, record, item, index, event, options){
        event.stopEvent();
        var me= this;
        if(record.get('parentId')===null)
            return;
        var instrumento_filho = me.getStore('Instrumentos').findRecord('instrumento_id',record.get('instrumento_id'));
        var items = [];
        var mycontroller = me.getController('ExtZF.controller.plano.Programacoes');
        var myStore = Ext.StoreManager.get('programacoes.TreeStore');
        var rootRecord = me.getStore('Programacoes').findRecord('id',myStore.getRootNode().get('id') );
        if(record.get('situacao_id')===3 && me.isInSupervisores(record)){
            items.push({text: 'Aprovar programação',
                        handler : function(){
                            me.aprovarProgramacao(record);
                        }
                    });
        }
        items.push({text: 'Editar',
                    handler : function(){
                        me.editarProgramacao(record);
                    }
                });

        if(mycontroller.rootNodeSelected){
            try{
                var rootInstrumento = me.getStore('Instrumentos').findRecord('instrumento_id',rootRecord.get('instrumento_id'));
                items.push({
                    text: 'Adicionar '+ rootInstrumento.get('singular'),
                    handler:  function(){
                        me.novaProgramacao(rootRecord);
                    }
                });
                items.push('-');
            }catch(err){
                console.log(err);
            }
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
                handler: me.linkInstrumento
            });
        }
        items.push({
            text:"Anexo",
            data: {record: record},
            iconCls : 'icon-attach-file',
            handler: function(){
                    me.attachFile(record);
                }
        });
        items.push('-');
        items.push({
                text: 'Relatórios',
                iconCls: 'icon-report',
                menu : {
                    items:
                    [
                    {
                        text:"Resultados",
                        data: {record: record},
                        handler: function(){
                                me.showReport(record,1);
                            }
                    },
                    {
                        text:"Relatório Execução Física",
                        data: {record: record},
                        handler: function(){
                                me.showReport(record,2);
                            }
                    },
                    {
                        text:"Relatório Físico/Financeiro",
                        data: {record: record},
                        handler: function(){
                                me.showReport(record,3);
                            }
                    },
                    ]
                }
            });

        var menu = Ext.create('Ext.menu.Menu',{
        items: items
        });
        menu.showAt(event.xy);
    },
    showReport : function(record, reportType){

        var filterProjeto = record.get("filter_projeto_id") !==""
            && (typeof(record.get("filter_projeto_id")) !== 'undefined' )
            ? "/projeto_id/"+record.get("filter_projeto_id") : "";
        var reportType = typeof(reportType)!=='undefinded' ? '/report_type/' + reportType :'';
        window.open("relatorio/index/index/id/"+record.get('id') + filterProjeto + reportType, "relatório");
    },
    novaProgramacao: function(parent){
        var me=this;
        var record;
        var options ={instrumento_id: ''};
        if( typeof(parent)!=='undefined'){
            var parent_id  = parent.get('id');
            if(parent_id.toString().split('-').length > 1){
                var instrumento = me.getStore('Instrumentos').findRecord('instrumento_id', parent_id.split('-')[1]);
                options.instrumento_id =instrumento.get('id');
                var view = Ext.widget('planoProgramacoesEdit');
                view.setTitle('Inserir');
                me.configuraForm(view,false,instrumento);
                record = Ext.ModelMgr.create(options,'ExtZF.model.Programacoes');
                view.down('form').loadRecord(record);
            }else{
                var store = me.filterProgramacoes('id',parent.get('id'));
                store.load( function(){
                    var programacao = me.getStore('Programacoes').findRecord('id',parent.get('id'));
                    if(programacao !== null && programacao.get('locked') && !me.checkPermission(programacao)){
                        Ext.Msg.alert('Atenção', 'Você não tem permissão para criar novo registro!');
                        return;
                    }
                    options.programacao_id = parent_id;
                    var instrumento = me.getStore('Instrumentos').findRecord('instrumento_id',parent.get('instrumento_id'));
                    options.instrumento_id =instrumento.get('id');
                    var view = Ext.widget('planoProgramacoesEdit');
                    view.setTitle('Novo ' + instrumento.get('singular'));
                    me.configuraForm(view,false,instrumento);
                    record = Ext.ModelMgr.create(options,'ExtZF.model.Programacoes');
                    view.down('form').loadRecord(record);
                });
            }
        }
    },
    configuraForm : function(view, record, instrumento){
        var me=this;
        if (instrumento.get('has_indicador')==="true" ) {
            var indicadorStore =me.getIndicadoresStore()
            indicadorStore.remoteFilter=false;
            indicadorStore.clearFilter();
            indicadorStore.remoteFilter=true;
            indicadorStore.filter('programacao_id',record.get('id'));
            view.showIndicadorForm(indicadorStore);
        }
        if (instrumento.get('has_operativo')==="true") {
            view.criaDetail();
            if(record){
               var operativoStore = me.getOperativosStore();
               operativoStore.remoteFilter=false;
               operativoStore.clearFilter();
               operativoStore.filter('programacao_id',parseInt(record.get('id'),10));
               operativoStore.remoteFilter=true;
               operativoStore.load(function(){
                    var operativo = me.getStore('Operativos').findRecord('programacao_id',parseInt(record.get('id'),10));
                        if (!operativo){
                            var rec = {};
                            operativo = Ext.ModelMgr.create(operativo,'ExtZF.model.Operativos');
                        }
                        view.down('#frmDetail').getForm().loadRecord(operativo);
                });

            }else{
                var rec = {};
                operativo = Ext.ModelMgr.create(rec,'ExtZF.model.Operativos');
                view.down('#frmDetail').getForm().loadRecord(operativo);
            }
            view.doLayout();
        }
        // TODO : transformar a execução em uma lista com mais de um tipo de financiamento (material perm, pessoal, etc)
        if (instrumento.get('has_vlr_programado')==="true") {
            if(instrumento.get('has_vlr_executado')==="true"){
                // se existir valor executado, deverá ser apresentado um grid para programação...
                var idrecord = false;
                if(record){
                    idrecord =record.get('id');
                    me.application.fireEvent('planoProgramacaoFinanceiro.filterByProgramacao', idrecord);
                }
                if(idrecord !==false && typeof(idrecord)!=='undefined'){
                    view.showGridProgramacao(idrecord);
                }
                me.application.fireEvent('filterDespesasByProgramacao', idrecord);

            }else{
                //... se não existir valor executado, significa que é um item de despesa e deverá ser exibido apenas um campo com valor
                view.showVlrProgramado();
                if(record){
                    recFinanceiro = me.getStore('Financeiro').findRecord('programacao_id',record.get('id'));
                    if (typeof(recFinanceiro)=== 'undefined' || recFinanceiro ===null ){
                        financeiro = {};
                        recFinanceiro = Ext.ModelMgr.create(financeiro,'ExtZF.model.Financeiro');
                    }
                }else{
                    financeiro = {};
                    recFinanceiro = Ext.ModelMgr.create(financeiro,'ExtZF.model.Financeiro');
                }
                view.down('#frmVlrProgramado').getForm().loadRecord(recFinanceiro);
            }
            view.doLayout();
        }
        if (instrumento.get('has_vlr_executado')==="true") {
            view.showBtnDespesas();
        }
        var projeto = instrumento.get('has_projetos');
        if (projeto==="true") {
            view.down('#projeto_id').show();
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
    checkPermission: function(record,field){
      if(typeof(field)==='undefined'){
          field='responsavel_usuario_id';
      }

      if(Etc.getLoggedUser().get('id')===record.get(field))
          return true;

      var setores =Etc.getLoggedUser().get('setores');
      return setores.indexOf(parseInt(record.get('setor_id'),10))>=0;
    },
    isInSupervisores : function(record){
        if(typeof(record.get('supervisores'))==='undefined')
            return false;
        return (!!~record.get('supervisores').split(',').map(Number).indexOf(Etc.getLoggedUser().get('id')));
    },
    handlerEdit: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        alert("Edit " + rec.get('menu'));
    },
    attachButtonAction: function(btn, ev) {
        var me = this;
        var grid = me.getTreegrid();
        var selected = grid.getSelectionModel().getSelection();
        if(selected.length === 0){
        	Ext.Msg.alert('Atenção', 'Selecione um registro para editar');
        	return ;
        }
        me.editarProgramacao(selected[0]);
    },
    attachFile  : function(rec){
        var me=this;
        var args ={};
        args.parent_record = rec;
        args.controller = 'plano.Anexos';
        me.application.fireEvent('openEditForm', args);
    },

    linkInstrumento  : function(record){
        var me = this;
        var selected;
        if(me.id ==="plano.Programacoes"){
            var grid = me.getTreegrid();
            selected = grid.getSelectionModel().getSelection()[0];
        }else if(typeof(record)!=='undefined'){
            selected=record;
        }else{
            selected = me.data.record;
        }
        _myAppGlobal.fireEvent('planoProgramacaoVinculo.add', selected);
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
    buttonActions: function(btn, ev) {
        var me = this;
        var grid = me.getTreegrid();
        var selected = grid.getSelectionModel().getSelection();
        if(selected.length === 0 || (selected[0].isRoot() && btn.name !=='report')){
        	Ext.Msg.alert('Atenção', 'Necessário selecionar um registro');
        	return ;
        }
        switch(btn.name){
            case "edit" :
                me.editarProgramacao(selected[0]);
                break;
            case "delete":
                me.deleteObject(selected[0]);
                break;
            case "link" :
                _myAppGlobal.fireEvent('planoProgramacaoVinculo.add', selected);
                break;
            case "attach" :
                me.attachFile(selected[0]);
                break;
            case "report" :
                me.showReport(selected[0], btn.reportType);
                break;
            case "sendmail" :
                me.sendMail(selected[0]);
                break;
        }
    },
    sendMail : function(record){
        var me=this;
        var args ={};
        args.parent_record = record;
        args.controller = 'Email';
        me.application.fireEvent('openEditForm', args);
    },
    editDblClick :function(view, record) {
        var me= this;
        if(record.isRoot() || record.get('parentId')===null){
            return;
        }
        me.editarProgramacao(record);
    },
    filterProgramacoes : function(field,value,calback){
        var me = this;
        var store =  me.getStore('Programacoes');
        store.remoteFilter=false;
        store.clearFilter();
        store.filter(field,value);
        store.remoteFilter=true;
        return store;
    },
    editarProgramacao : function(rec){
        var me = this;
        //TODO buscar record de um outro store(não tree)
        var store = me.filterProgramacoes('id',rec.get('id'));
        store.load(function(){
            var record = store.getById(rec.get('id'));
            if(record.get('locked') && !me.isInSupervisores(rec) && !me.checkPermission(rec)){
                Ext.Msg.alert('Atenção', 'Você não tem permissão para editar o registro!');
                return;
            }
            var view = Ext.widget('planoProgramacoesEdit');
            view.setTitle('Edição ');
            view.down('form').loadRecord(record);
            var instrumento = me.getStore('Instrumentos').findRecord('id',record.get('instrumento_id'));
            me.configuraForm(view, record, instrumento);
        });

    },

    deleteObject:function(r) {
        var  me=this;
        var grid = me.getTreegrid();
        var ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas
        if(ids.length === 0){
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }
        var store = me.filterProgramacoes('id', r.get('id'));
        store.load(function(){
            var record = store.findRecord('id', r.get('id'));
            if(typeof(record)==='undefined'){
                Ext.Msg.alert('Atenção', 'Erro ao excluir o registro!');
                return;
            }
            if(record.get('locked')){
                Ext.Msg.alert('Atenção', 'Você não tem permissão para excluir o registro!');
                return;
            }
            Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
                    function(opt){
                            if(opt !== 'yes')
                                    return;
                            grid.el.mask('Excluindo registro(s)');
                            var prog_id = record.get('programacao_id');
                            store.remove(record);
                            store.sync();

                            if(prog_id!==null){
                                var currnode = me.getProgramacoesTreeStoreStore().getNodeById(prog_id);
                                if(typeof(currnode)!=='undefined'){
                                    me.getProgramacoesTreeStoreStore().load({node:currnode});
                                }
                            }
                            grid.el.unmask();
                    }, me);
                });
    },
    saveAndClose: function(button)
    {
        Etc.info('Save and Close');
        var me = this;
        var win =me.saveObject(button,true);

    },
    changeHtmlFontSize : function(){
        var descricao =Ext.getCmp('descricaoHtmlEditor');
        descricao.focus(true);
        descricao.relayCmd('FontSize',2);
    },
    saveObject: function(button, closes)
    {
        var me=this;
        me.changeHtmlFontSize();
        var recordSelected;
        var win    = button.up('window');
        var formDefault   = win.down('#frmDefault').getForm();
        var formDetail   = win.down('#frmDetail');
        if (formDetail !== null)
            formDetail = formDetail.getForm();

        var frmVlrProgramado   = win.down('#frmVlrProgramado');
        if (frmVlrProgramado !== null)
            frmVlrProgramado = frmVlrProgramado.getForm();


        if (formDefault.isValid()) {
            recordSelected = formDefault.getRecord();
            formDefault.updateRecord(recordSelected);
            var check_programacao = typeof(recordSelected.get('id'))==='undefined';
            var instrumento = me.getStore('Instrumentos').getById(parseInt(recordSelected.get('instrumento_id'),10));
            recordSelected.save({
                success: function(a,b){
                    var numSubforms=0;
                    var checkSave= function(){
                        if(numSubforms===0){
                            if(closes===true){
                                if(win!==false)
                                    win.close();
                            }
                        }
                    };
                    Etc.info("Salvo com sucesso!");
                    /**
                     * TODO selecionar o objeto salvo/cridado
                     */
                    if (formDetail){
                        numSubforms=numSubforms+1;
                        var rd = formDetail.getRecord();
                        formDetail.updateRecord(rd);
                        rd.set('programacao_id',a.get('id'));
                        rd.save({
                            success: function(rec,op){
                                numSubforms=numSubforms-1;
                                checkSave();
                                // formDetail.loadRecord(rec);
                               Etc.info("Detalhes salvos com sucesso!");
                            }
                        });
                    }
                    if (frmVlrProgramado){
                        numSubforms=numSubforms+1;
                        var recProgramado = frmVlrProgramado.getRecord();
                        frmVlrProgramado.updateRecord(recProgramado);
                        recProgramado.set('programacao_id',a.get('id'));
                        recProgramado.save({
                            success: function(c,d){
                                numSubforms=numSubforms-1;
                                checkSave();
                               Etc.info("Orçamento salvo com sucesso!");
                            }
                        });
                        me.getStore('Financeiro').load();
                    }
                    if(check_programacao){
                        if(instrumento.get('has_vlr_programado')==="true" &&
                            instrumento.get('has_vlr_executado')==="true"){
                                var programacoesEdit = Ext.getCmp('planoProgramacoesEdit');
                                programacoesEdit.showGridProgramacao(parseInt(a.get('id'),10));
                                programacoesEdit.doLayout();
                                me.application.fireEvent('filterDespesasByProgramacao', recordSelected.get('id'));
                            }
                    }
//                    me.getProgramacoesTreeStoreStore().load();
                    var treePanelLeft = Ext.getCmp('treeNavPanel');
                    var treePanelStore= treePanelLeft.getStore();
                    var prog_id = recordSelected.get('programacao_id');

                    if(prog_id!==null){
                        var currnode = me.getProgramacoesTreeStoreStore().getNodeById(prog_id);
                        if(typeof(currnode)!=='undefined'){
                            me.getProgramacoesTreeStoreStore().load({node:currnode});
                        }
                        var node = treePanelStore.getNodeById(prog_id);
                        if(typeof(node)!== 'undefined'){
                            treePanelStore.load({'node':node});
                        }
                    }else{
                        var rootn =me.getProgramacoesTreeStoreStore().getRootNode();
                        if(typeof(rootn)!=='undefined'){
                            me.getProgramacoesTreeStoreStore().load({node:rootn});
                        }
                        var inst_id = parseInt(recordSelected.get('instrumento_id',10)) - 1;
                        var node = treePanelStore.getNodeById('instrumentoId-' + inst_id);
                        if(typeof(node)!== 'undefined'){
                            treePanelStore.load({'node':node});
                        }
                    }
                    checkSave();
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
        me.selectNewRecord = recordSelected;

        }
        return win;
    },
    changeButtonAction: function(view, record, item, index, e, options)
    {
        var me = this;
         var detailPanel = Ext.getCmp('detailPanel');
         var btnExecucao = detailPanel.down('button[action=execucao]');
         var showDetail = Ext.getCmp('showDetail');
         btnExecucao.hide();
         btnExecucao.value =null;
         var button = Ext.ComponentQuery.query('planoProgramacoesTreegrid button[action=incluir]')[0];
         var buttonVincular = Ext.ComponentQuery.query('planoProgramacoesTreegrid button[name=link]')[0];
         if( !record ){
             var tpl = ['<div class="tplDetail"><b>Selecione para exibir detalhes </b><br/></div>'];
             var clearTpl = Ext.create('Ext.XTemplate', tpl);
             clearTpl.overwrite(showDetail.body, []);
             showDetail.doLayout();
             button.hide();
             var planilhaOrcamentaria = detailPanel.child('#planilhaOrcamentaria');
             if(typeof(planilhaOrcamentaria)!=='undefined' || planilhaOrcamentaria !== null)
                planilhaOrcamentaria.hide();
             return;
         }
        var store = me.filterProgramacoes('id', record.get('id'));
        store.load(function(){
            detailPanel.show();
            var instrumento =undefined;
            if(record.isRoot()){
                var rootId = record.get('id');
                if(record.get('id')>0){
                    var rootRecord = me.getStore('Programacoes').findRecord('id',record.get('id'));
                    instrumento= me.getStore('Instrumentos').findRecord('instrumento_id',rootRecord.get('instrumento_id'));
                }else if( rootId.split('-').length > 1 ){
                    instrumento= me.getStore('Instrumentos').findRecord('instrumento_id',rootId.split('-')[1]);
                }
            }else{
                instrumento = me.getStore('Instrumentos').findRecord('instrumento_id',record.get('instrumento_id'));
            }

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

           showDetail.doLayout();
           bookTpl.overwrite(showDetail.body, record.data);
           if(record.get('instrumento').has_responsavel){
                if(typeof(record.get('responsavel')) !== 'undefined'){
                    var responsavel = record.get('responsavel');
                    var tpl_responsavel = new Ext.XTemplate([
                                   '<div class="tplDetail"><b>Responsável: </b>{nome}<br/></div>']);
                    tpl_responsavel.append(showDetail.body, responsavel);
                }
           }
           if(record.get('instrumento').has_supervisor){
                if(typeof(record.get('supervisor')) !== 'undefined'){
                    var supervisor = record.get('supervisor');
                    var tpl_supervisor = new Ext.XTemplate([
                                   '<div class="tplDetail"><b>Supervisor: </b>{nome}<br/></div>']);
                    tpl_supervisor.append(showDetail.body, supervisor);
                }
           }
           if(record.get('instrumento').has_equipe){
                if(typeof(record.get('setor')) !== 'undefined'){
                    var equipe = record.get('setor');
                    var tpl_equipe = new Ext.XTemplate([
                                   '<div class="tplDetail"><b>Equipe: </b>{nome}<br/></div>']);
                    tpl_equipe.append(showDetail.body, equipe);
                }
           }

          var anexosStore = me.getStore('anexos.ProgramacaoAnexosStore');
           anexosStore.getProxy().setExtraParam('programacao_id',record.get('id'));
           anexosStore.load();

           var planilhaOperativa = detailPanel.child("#planilhaOperativa");
           if(record.get('instrumento').has_operativo){
               var operativoStore = me.getStore('Operativos');
               operativoStore.remoteFilter=false;
               operativoStore.clearFilter();
               operativoStore.filter('programacao_id',parseInt(record.get('id'),10));
               operativoStore.remoteFilter=true;
               operativoStore.load(function(){
                    var operativo = me.getStore('Operativos').findRecord('programacao_id',parseInt(record.get('id'),10));
                     if(operativo){
                         btnExecucao.show();
                         btnExecucao.value = operativo.get('id');
                         me.application.fireEvent('filtrarHistoricoPorOperativo', operativo.get('id'));
                         planilhaOperativa.show();
                    }else{
                        planilhaOperativa.hide();
                    }
                });
           }else{
               planilhaOperativa.hide();
           }
           if(record.get('instrumento').has_vlr_programado===true &&
                   (
                   !record.get('locked') || me.isInSupervisores(record) || me.checkPermission(record)
                   )){
               if(record.get('instrumento').has_vlr_executado===true){
                   planilhaOrcamentaria = detailPanel.child("#planilhaOrcamentaria");
                   planilhaOrcamentaria.show();

               }else{
                   var restUrl = 'data/financeiro/' + record.get('id');
                   Ext.Ajax.request({
                       url: restUrl,
                       success: function(response, opts) {
                           var obj = Ext.decode(response.responseText);
                           var tpl_orcamento = new Ext.XTemplate([
                                   '<br/><b>Execução Orçamentária:</b><br>',
                                   '<tpl for=".">',
                                       '<table class="tplDetail">',
                                               '<tr><td class="tplDetail">Programado: </td><td  align="right" > {programado}</td></tr>',
                                               '<tr><td class="tplDetail">Executado: </td><td align="right" > {executado}</td></tr>',
                                               '<tr><td class="tplDetail">Saldo: </td><td align="right" > {saldo}</td></tr>',
                                       '</table>',
                                   '</tpl>'
                               ]);
                           tpl_orcamento.append(showDetail.body, obj,true);
                       },
                       failure: function(response, opts) {
                           console.log('server-side failure with status code ' + response.status);
                       }
                   });


               }
           }else{
               planilhaOrcamentaria = detailPanel.child('#planilhaOrcamentaria');
               if(planilhaOrcamentaria)
                   planilhaOrcamentaria.hide();
           }
           //this.getGantt(record.get('id'));
           me.showGantt(record.get('id'));
           me.application.fireEvent('planoProgramacaoFinanceiro.filterByProgramacao', record.get('id'));

           showDetail.doLayout();
       });
    },
    /**
     * executa ação de botões na view detalhes
     */
    clickOnDetailsButton : function(button, event)
    {
        var me = this;
        var target = event.getTarget();
        if(button.action === "execucao")
        {
            var controller = _myAppGlobal.getController('ExtZF.controller.plano.Operativos');
            controller.init();
            var programacao, record;
            if(typeof(button.programacao) ==='undefined'){
                var record = controller.getStore('Operativos').findRecord('id',button.value);
                programacao  = me.getStore('Programacoes').findRecord('id',record.get('programacao_id'));
            }else{
                programacao  = button.programacao;
                var record = controller.getStore('Operativos').findRecord('programacao_id',programacao.get('id'));
            }
            if(!me.checkPermission(programacao)){
                    Ext.Msg.alert('Atenção', 'Você não é o responsável pela execução da etapa!');
                    return;
            }
            me.application.fireEvent('showExecutionWindow',programacao);
//            controller.editObject(null, record);

        }
    },
    showGantt : function(id){
        if(document.getElementById('ganttPanel-innerCt')===null){
            var tabDetail = Ext.getCmp('tabDetailPanel');
            var activeTab= tabDetail.getActiveTab();
            tabDetail.setActiveTab(2);
            tabDetail.setActiveTab(activeTab);
            if(document.getElementById('ganttPanel-innerCt')===null)
                return;
        }

        gantt.config.xml_date = "%Y-%m-%d";
        gantt.config.date_grid = "%d/%m/%Y";
        gantt.config.scale_unit = "month";
        gantt.config.step = 1;
        gantt.config.open_tree_initially = false;
        gantt.config.drag_links = false;
        gantt.config.drag_resize = false;
        gantt.config.drag_move = false;
        gantt.config.drag_progress = false;
        gantt.config.grid_width = 400;
        gantt.config.readonly = true;
        gantt.config.date_scale = "%m/%Y";
        gantt.config.columns =  [
                                    {name:"text",      tree:true, width:'*' },
                                    {name:"start_date", align: "center"},
                                    {name:"duration", align: "center"},
                                ];
                                        gantt.init('ganttPanel-innerCt');
        gantt.clearAll();
        var params = typeof(id) !== 'undefined' ?'&node_id='+id:'';
        gantt.load('/data/gantt?format=xml'+params,'xml');
    },
    selectRecord : function(treeview)
    {
        //Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);
        if ( this.selectNewRecord===false || typeof(this.selectNewRecord)==='undefined');
            return;
        treeview.getSelectionModel().select(this.selectNewRecord);

    }   ,
    callRender : function(gridPanel)
    {
        var me=this;
        gridPanel.getView().on('refresh', me.selectRecord);

    }

});