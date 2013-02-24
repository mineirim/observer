Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.Navigation', {
    extend      : 'Ext.app.Controller',
    stores      : ['Treenav','Programacoes','Instrumentos','Operativos','Vinculos' ],
    models      :['Treenav','Programacoes','Instrumentos','Operativos','Vinculos' ],
    views       :   [
                    'navigation.MyToolbar',
                    'navigation.TreePanel'
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
            'navigationTreePanel': {itemclick: me.loadTreeController},
            '[action=logout]': {click: me.logout}
            
        });
        this.application.on('openEditForm' , this.openEditForm);
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
            if(arr_params[0]=='financeiro'){
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
              
    },
    
    openEditForm : function(args)
     {
        if(typeof(args.controller) == 'undefined')
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
    loadController : function(a,record,c)
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
            store.setRootNode({id:record.data.id,text:record.data.menu, desc:'descricao'});
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
        var controller = this.getController(a.data),
            args = Array.prototype.slice.call(arguments, 1);
        
        //controller.init.apply(controller, args);        
        var view = Ext.widget(a.createView);       

        var options = {single: true};

        // Call the controller init method when the view is rendered
        view.mon(view, 'render', function() {
                Etc.info('executing init on Controller ' + controller.id + ' passing: ', args);
                controller.init.apply(controller, args);
                 
        }, this, options);

        // Remove the controller and destroy the view when the view component is deactivated
        
        view.mon(view, 'destroy', function(view) {
                        window.console.info('removing controller ' + controller.id + ' & destroying controller ' + view.id);
                        view.destroy();
                       // Ext.destroy(this.application.controllers.remove(this));
                }, this, options);
        
        return view;

    }

});