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
    name: 'ExtZF', // nome da aplica��o
    appFolder: baseUrl,
    autoCreateViewport :false,
    controllers: [
        'Navigation',
        'plano.Programacoes',
        'acesso.Auth',
        'plano.Dashboard'
    ],
    
    launch: function() {
         // Cria o componente principal da aplica��o
         Ext.create('Js.Viewport');
    }

});
