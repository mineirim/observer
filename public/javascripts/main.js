Ext.Loader.setConfig({
    enabled: true,
    paths :{
    'Js'    : './view',
    'Ext.ux'    : '../extjs/examples/ux'
    }
});
if(env=='production'){
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
