Ext.Loader.setConfig({
enabled: true,
paths :{
'Js'    : './view'
}

});

Ext.application({
    name: 'ExtZF', // nome da aplica��o
    appFolder: baseUrl,
    autoCreateViewport :false,
    controllers: [
        'Navigation'
    ],
    // Fun��o chamada ap�s o carregamento completo da p�gina
    launch: function() {
         // Cria o componente principal da aplica��o
         Ext.create('Js.Viewport');
    }

});
