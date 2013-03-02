Ext.override(Ext.window.Window, { 
    modal: true
});
Ext.Loader.setConfig({
    enabled: true,
    paths :{
    'Js'    : './view',
    'Ext.ux'    : './ux'
    }
});

Ext.require(['Ext.ux.TextMaskPlugin']);
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
         _myAppGlobal = this;
   
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


Ext.util.Format.brMoney = function(v){
return "R$ " + Ext.util.Format.number(v, '0.000,00/i');
}

Ext.util.Format.thousandSeparator = '.';
Ext.util.Format.decimalSeparator = ',';