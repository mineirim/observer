/* global Ext, env */
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
    Ext.Loader.setConfig('disableCaching',true);

Ext.application({
    name: 'ExtZF', 
    appFolder: ' ' + baseUrl,
    autoCreateViewport :false,
    controllers: [
            'Navigation',
            'acesso.Auth',
            'plano.Programacoes',
            'plano.Dashboard',
            'plano.Financeiro',
            'plano.Despesas'
    ],
    init : function(){
        _myAppGlobal = this;
    },
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
        },
        getLoggedUser : function(){
            var _user, _store;
            _store = Ext.StoreMgr.get('Usuarios');
            _user = _store.findRecord('usuario',usuario);
            return _user;
        },
        cloneStore : function(source,alias){
            var obj= {model: source.model};
            if(typeof(alias)!=='undefined'){
                obj.alias = alias;
            }
            var target = Ext.create ('Ext.data.Store',obj);

            Ext.each (source.getRange (), function (record) {
                var newRecordData = Ext.clone (record.copy().data);
                var model = new source.model (newRecordData, newRecordData.id);

                target.add (model);
            });

            return target;
        }
    };
    return Etc;
};
Etc = new Etc();


Ext.util.Format.brMoney = function(v){
return "R$ " + Ext.util.Format.number(v, '0.000,00/i');
};

Ext.util.Format.thousandSeparator = '.';
Ext.util.Format.decimalSeparator = ',';