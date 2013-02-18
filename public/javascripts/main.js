Ext.Loader.setConfig({
    enabled: true,
    paths :{
    'Js'    : './view',
    'Ext.ux'    : './ux'
    }
});

Ext.require(['Ext.ux.TextMaskPlugin'])
if(env==='production'){
    Ext.Loader.setConfig('disableCaching',false);
}

Ext.application({
    name: 'ExtZF', 
    appFolder: baseUrl,
    autoCreateViewport :false,
    controllers: [
        'Navigation',
        'acesso.Auth',
        'plano.Dashboard',
        'plano.Financeiro',
        'plano.Despesas'
    ],
    
    launch: function() {
         Ext.create('Js.Viewport');
    }

});


var Etc = function(){
    Etc = {
        log : function(obj){
            window.console.log(obj);
        },
        info : function(obj){
            window.console.info(obj);
        },
        error : function(obj)
        {
            window.console.error(obj);
        }
    };
    return Etc;
};
Etc = new Etc();