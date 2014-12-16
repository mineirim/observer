Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.Navigation', {
    extend      : 'Ext.app.Controller',
    stores      : ['Treenav','Programacoes','Instrumentos','Operativos','Vinculos', 'Usuarios' ],
    models      :['Treenav','Programacoes','Instrumentos','Operativos','Vinculos', 'Usuarios' ],
    views       :   [
                    'navigation.MyToolbar',
                    'navigation.TreePanel',
                    'plano.programacoes.Edit'
                    ],
    constructor : function() 
    {
            this.ref({
                    ref: 'viewport',
                    selector: 'viewport'
                },{
                    ref: 'ctnPrincipal',
                    selector: 'principal'
                });

            this.callParent(arguments);
    },
    init        : function() 
    {
        var me=this;
        //st = this.getStore('programacoes.TreeStore');
        this.control(
        {
            'menuitem[action=loadController]': {click: me.loadControllerFromMenu},
            'navigationTreePanel':{
                        itemclick       : me.loadTreeController,
                        itemcontextmenu : me.itemContextMenu
                    },
            '[action=logout]': {click: me.logout}
            
        });
        me.application.on('openEditForm' , me.openEditForm);
    },
    
    logout      : function() 
    {
        Ext.Ajax.request({
            url: baseUrl+'/acesso/auth/logout',
            params : {format : 'json'},
            success: function(response){
                window.location.reload();
            }
        });
    },
    loadTreeController : function (view, record, item, index, e, options)
    {
        param_id = record.get('id');
        if(Ext.isNumeric(param_id)){
   
        }else{
            arr_params= param_id.split('-');
            if(arr_params[0]==='financeiro'){
                // TODO criar abertura condicional
            }
        }
        var obj = { text: 'Programa&ccedil;&atilde;o',
                    id: 'testeId',
                    data        : 'plano.Programacoes',
                    action      : "loadController",
                    iconCls     : "icon-programacao",
                    createView  : "planoProgramacoesContainer"
                  };
        this.loadController(obj,record);
        this.getController('ExtZF.controller.plano.Programacoes').changeButtonAction();
        
              
    },
    
    openEditForm : function(args)
     {
        if(typeof(args.controller) === 'undefined')
            return;
        var controller = this.getController(args.controller);
        controller.showEdit(args.parent_record);
        if(!controller.initiated)
            controller.init();
       
    },
   
    loadControllerFromMenu : function(obj)
    {
        this.loadController(obj);
    },
    loadController : function(a,record,c,createView)
    {
         var view ="",
            screen = Ext.getCmp('ctnPrincipal'),
            titulo = a.text;
        
        screen.el.mask('Carregando....');
        var novaAba = screen.items.findBy(
            function( aba )
            { 
                return aba.title === titulo; 
            }
        ); 

        // cria nova aba no centro da aplicação
        if(!novaAba){
            view = this.criaView(a);
            view.title = titulo;
            view.iconCls = a.iconCls;
            view.closable=true;
            novaAba = screen.add(view);
        }
        
         if(record){
            var store = Ext.StoreManager.get('programacoes.TreeStore');
            store.setRootNode({id:record.data.id,text:record.data.menu, desc:'descricao', instrumento:record.data.instrumento});
            root_id = ''+record.get('id');
            if(root_id.split('-').length <=1){
                this.getController('ExtZF.controller.plano.Programacoes').rootNodeSelected = record;
            }else{
                this.getController('ExtZF.controller.plano.Programacoes').rootNodeSelected =false;
            }
            
        }else{
             this.getController('ExtZF.controller.plano.Programacoes').rootNodeSelected =false;
        };

        screen.setActiveTab(novaAba);
        screen.el.unmask();
               
    },
    criaView :function(a){
        var controller = ExtZF.app.getController(a.data);
        var args = Array.prototype.slice.call(arguments, 1);
        
        //controller.init.apply(controller, args);        
        var view = Ext.widget(a.createView);       

        var options = {single: true};

//        // Call the controller init method when the view is rendered
//        view.mon(view, 'render', function() {
//                Etc.info('executing init on Controller ' + controller.id + ' passing: ', args);
//                controller.init.apply(controller, args);
//                 
//        }, this, options);
//
//        // Remove the controller and destroy the view when the view component is deactivated
//        
//        view.mon(view, 'destroy', function(view) {
//                        window.console.info('removing controller ' + controller.id + ' & destroying controller ' + view.id);
//                        view.destroy();
//                       // Ext.destroy(this.application.controllers.remove(this));
//                }, this, options);
        
        return view;

    },   
    
    newRoot: function(instrumento_id) {
        /**
         * TODO pegar automaticamente o root do instrumento(quando mais de um instrumento)     */     
        var obj = { text: 'Programa&ccedil;&atilde;o',
                    id          : 'testeId',
                    data        : 'plano.Programacoes',
                    action      : "loadController",
                    iconCls     : "icon-programacao",
                    createView  : "planoProgramacoesEdit"
                  };        
        
        var options = {single: true};

        var view = this.criaView(obj);
        view.setTitle('Inserir');        
        var options={instrumento_id :instrumento_id};
        record = Ext.ModelMgr.create(options,'ExtZF.model.Programacoes');
      	view.down('form').loadRecord(record);
        return view;
    },
    itemContextMenu :  function( view, record, item, index, event, options){
        event.stopEvent();        
        var me= this;
        screen = Ext.getCmp('criaLayout');
        var programacoesController = this.getController('ExtZF.controller.plano.Programacoes');
        programacoesController.init.apply(programacoesController);
        var items = [];
        if(record.get('parentId')==="root"){
            var id = record.get('id').split("-")[1];
            st = Ext.getStore("Instrumentos");
            var instrumento = st.findRecord('instrumento_id',id);
            id = instrumento.get('id');
            Etc.log(instrumento);
                items.push({
                    text: 'Adicionar ' + instrumento.get('singular'),// + instrumento.get('singular'), //@todo(adicionar singular
                    handler:  function(){
                        me.newRoot(id);
                    } 
                });
                items.push('-');
        }else{
            var programacaoRecord = me.getProgramacoesStore().findRecord('id',record.get('id'));
            var instrumento_filho = this.getInstrumentosStore().findRecord('instrumento_id',programacaoRecord.get('instrumento_id'));
            
            items.push({text: 'Editar',
                        handler : function(){
                            programacoesController.editarProgramacao(programacaoRecord);
                        }
                    });
                items.push('-');
            if(instrumento_filho){
                items.push({
                    text:"Adicionar "+instrumento_filho.get('singular'),
                    handler: function(){
                        programacoesController.novaProgramacao(programacaoRecord);
                    } 
                });
            }                    
        }
        var menu = Ext.create('Ext.menu.Menu',{
        items: items
        });
        menu.showAt(event.xy);
    }

});