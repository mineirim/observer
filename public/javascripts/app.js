Ext.Loader.setConfig({
enabled: true,
paths :{
'Js'    : './view'
}

});

Ext.application({
    name: 'ExtZF',
    appFolder: baseUrl,
    autoCreateViewport :false,
    controllers: [
        'acesso.Auth'
    ],
    launch: function() {
         // Cria o componente principal da aplica��o
         Ext.create('Ext.container.Viewport',{
                 layout: {
                    type: 'fit',
                    padding: 5
                },
                defaults: {
                    split: true
        }
         });
    }

});
