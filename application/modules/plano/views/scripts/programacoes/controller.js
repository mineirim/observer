Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.plano.Programacoes', {
    extend: 'Ext.app.Controller',
    stores: ['programacoes.TreeStore', 'Programacoes' ,'Setores','Usuarios','Instrumentos','Operativos','Vinculos'], // Store utilizado no gerenciamento do usuário
    models: ['programacoes.Model4tree', 'Programacoes' ,'Setores','Usuarios','Instrumentos','Operativos','Vinculos'], // Modelo do usuário
     views: [
    'plano.programacoes.List',
    'plano.programacoes.Treegrid',
    'plano.programacoes.Edit',
    'plano.programacoes.Container',
    'plano.programacoes.Anexos',
    'plano.programacoes.Detalhes',
    'plano.vinculos.Edit',
    'plano.anexos.Edit'
    ],
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
                itemdblclick: this.editObject
            },
            'planoProgramacoesList button[action=incluir]': {
                click: this.newObject
            },
            'planoProgramacoesList button[action=excluir]': {
                click: this.deleteObject
            },
            'planoProgramacoesEdit button[action=salvar]': {
                click: this.saveObject
            },
            'planoProgramacoesTreegrid': {
                itemdblclick    : this.editObject,
                itemclick       : this.changeButtonAction
            },
            
            'planoProgramacoesTreegrid button[action=incluir]': {
                click: this.newObject
            },
            'planoProgramacoesTreegrid > [action=edit]': {
                handler: this.editObj
            },
            'planoProgramacoesTreegrid button[action=newRoot]': {
                click: this.newRoot
            },
            'planoProgramacoesTreegrid button[action=excluir]': {
                click: this.deleteObject
            }
            ,
            'planoProgramacoesAnexos button[action=attach]': {
                click: this.attachFile
            }
            ,
            'planoProgramacoesTreegrid button[action=vincular]': {
                click: this.linkInstrumento
            }
            ,'planoVinculosEdit button[action=salvar]':{
                click: this.saveLinkObject
            }
            ,'planoVinculosEdit depende_programacao_id':{
                change: this.verificaResponsavel
            }
            
        });
        
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
        view.setTitle('Anexar arquivo')
    },
    
    linkInstrumento  : function(){
        var view = Ext.widget('planoVinculosEdit');
        view.setTitle('Vincular Atividades')
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
     */
    saveLinkObject: function(button) {
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
                    me.getVinculosStore().load();
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
            });
        }
    },    
    
    newRoot: function() {
        var grid = this.getTreegrid(); 
        
        var view = Ext.widget('planoProgramacoesEdit');
        view.setTitle('Inserir');
        /**
         * TODO pegar automaticamente o root do instrumento(quando mais de um instrumento)
         */
     
        options={instrumento_id :2};
        
        record = Ext.ModelMgr.create(options,'ExtZF.model.Programacoes');
      	view.down('form').loadRecord(record);
    },
    newObject: function() {
        var grid = this.getTreegrid(); 
        var view = Ext.widget('planoProgramacoesEdit');
        view.setTitle('Inserir');
        parent = grid.getSelectionModel().getSelection()[0]; 
        options ={instrumento_id: ''}
        if( parent!=undefined){
            parent_id  = parent.get('id');
            options.programacao_id = parent_id;
            
            instrumento = this.getInstrumentosStore().findRecord('instrumento_id',parent.get('instrumento_id'));
            options.instrumento_id =instrumento.get('id');
            var operativo = instrumento.get('has_operativo');
            if (operativo=="true") {
                view.criaDetail();
                rr = Ext.ModelMgr.create({},'ExtZF.model.Operativos');
                view.down('#frmDetail').getForm().loadRecord(rr);

            }        
            
        }
        
        record = Ext.ModelMgr.create(options,'ExtZF.model.Programacoes');
      	view.down('form').loadRecord(record);
        
        
    },
    editObject :function(grid, rec) {
        var view = Ext.widget('planoProgramacoesEdit');
        view.setTitle('Edição ');
        //TODO buscar record de um outro store(não tree)
        store =  this.getProgramacoesStore();
        record = store.getById(rec.get('id'));
        

        Ext.log({msg:"Carregando registro para edição",level:'info'});
        view.down('form').loadRecord(record);

//            var parent = record.get('parent');
//            var instrumentoStore = this.getInstrumentosStore();
//            var parent_intrumento = instrumentoStore.findRecord('id',parent.instrumento_id)
//            
//            var div1 = Ext.get('frmDefault');
//            cabecalho = div1.down('#cabecalho');
//            cabecalho.setValue('Cadsatro de Atividade<br>'+parent_intrumento.get('singular') + ' - '  + parent.menu);
//            


        var instrumento = record.get('instrumento');
        if (instrumento.has_operativo) {

            view.criaDetail();
            var operativo = record.get('operativo')[0];
            if (operativo == undefined)
                operativo = {};
            rr = Ext.ModelMgr.create(operativo,'ExtZF.model.Operativos');
            view.down('#frmDetail').getForm().loadRecord(rr);
            view.doLayout();
            
        }                      
                
        
      	
    },
    deleteObject:function() {
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
                        store = this.getProgramacoesStore();
                        store.remove(ids);
                        store.sync();
                        this.getProgramacoesTreeStoreStore().load();
                        grid.el.unmask();
		}, this);
    },
    saveObject: function(button) 
    {
        Ext.log({msg:'Entrou no save',level:'info'});
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            formDefault   = win.down('#frmDefault').getForm(),
            formDetail   = win.down('#frmDetail')
            if (formDetail != null)
                formDetail = formDetail.getForm();
        if (formDefault.isValid()) {
            r = formDefault.getRecord();
            formDefault.updateRecord(r);
            r.save({
                success: function(a,b){
                    Ext.log({msg:"Salvo com sucesso!",level:"info"});
                    /**
                     * TODO selecionar o objeto salvo/cridado
                     */
                    if (formDetail != undefined){
                        rd = formDetail.getRecord();
                        formDetail.updateRecord(rd);
                        rd.set('programacao_id',a.get('id'));
                        rd.save({
                            success: function(c,d){
                               Ext.log({msg:"Salvo com sucesso!",level:"info",dump:c});
                                
                            }
                        })
                    }
                    win.close();
                    me.getProgramacoesTreeStoreStore().load();
                    me.getProgramacoesStore().load();
                    
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
        });
            
            
        }
    },
    changeButtonAction: function(view, record, item, index, e, options)
    {
         instrumento = this.getInstrumentosStore().findRecord('instrumento_id',record.get('instrumento_id'));
         button = Ext.ComponentQuery.query('planoProgramacoesTreegrid button[action=incluir]')[0];
         buttonVincular = Ext.ComponentQuery.query('planoProgramacoesTreegrid button[action=vincular]')[0];
         if(instrumento){
             button.show();
             button.setText('Adicionar '+instrumento.get('singular'));
             buttonVincular.hide();
         }else if (record.get('instrumento').has_operativo){
             buttonVincular.show()
             buttonVincular.setText('Adicionar Vínculo');
             button.hide();
         } else {
             button.hide();
             buttonVincular.hide();
         }
         
        var bookTplMarkup = ['<div class="tplDetail"><b>Descrição: </b>{descricao}<br/></div>'];
        var bookTpl = Ext.create('Ext.XTemplate', bookTplMarkup);
        var detailPanel = Ext.getCmp('detailPanel');
        bookTpl.overwrite(detailPanel.body, record.data);         

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
                 tpl_operativo.append(detailPanel.body, operativo);
             }
        }
        this.getGantt(record.get('id'))
    },
    getGantt : function(id){
        g = new JSGantt.GanttChart('g',document.getElementById('GanttChartDIV'), 'month');
        g.setShowRes(0); // Show/Hide Responsible (0/1)
        // define a quantidade de caracteres que aparecerão na descrição
        g.setMaxLengthDescription(50)
        g.setShowDur(1); // Show/Hide Duration (0/1)
        g.setShowComp(1); // Show/Hide % Complete(0/1)

        g.setDateInputFormat("yyyy-mm-dd");
        g.setFormatArr("day","week","month");
        g.setCaptionType('None');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)

        g.setShowStartDate(0); // Show/Hide Start Date(0/1)
        g.setShowEndDate(0); // Show/Hide End Date(0/1)
        g.setDateDisplayFormat('dd/mm/yyyy') // Set format to display dates ('mm/dd/yyyy', 'dd/mm/yyyy', 'yyyy-mm-dd')

      //var gr = new Graphics();

      if( g ) {
          params = id!= undefined ?'&node_id='+id:'';
          JSGantt.parseXML(baseUrl+'/data/gantt?format=xml'+params,g)
          g.Draw();
          g.DrawDependencies();
      }else{
        alert("not defined");
      }
    }
});