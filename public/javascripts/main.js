/* global Ext, env, baseUrl */
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
            'plano.Despesas',
            'plano.Execucao',
            'Email'
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
            console.log(obj);
        },
        info : function(obj){
            console.info(obj);
        },
        error : function(obj)
        {
            console.log(obj);
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
        },
        Msg : {
            show : function(title,msg,fn,options){
                options=typeof(options)==='undefined' ?{} : options;
                var op=
                        Ext.merge({},options);
                Ext.Msg.show(options);
            },
            error : function(title,msg,fn, options){
                options=typeof(options)==='undefined' ?{} : options;
                var obj = Ext.merge({
                    title: title,
                    msg : msg,
                    fn  : fn,
                    buttons: Ext.MessageBox.OK,
                    icon : Ext.MessageBox.ERROR
                    },options);
                Ext.Msg.show(obj);
            },
            confirm : function(title,msg,fn, options){
                options=typeof(options)==='undefined' ?{} : options;
                var obj = Ext.merge({
                    title: title,
                    msg : msg,
                    fn  : fn,
                    buttons: Ext.Msg.YESNO,
                    icon : Ext.MessageBox.QUESTION
                    },options);
                Ext.Msg.show(obj);
            },
            info : function(title,msg,fn, options){
                options=typeof(options)==='undefined' ?{} : options;
                var obj = Ext.merge({
                    title: title,
                    msg : msg,
                    fn  : fn,
                    buttons: Ext.Msg.OK,
                    icon : Ext.MessageBox.INFO
                    },options);
                Ext.Msg.show(obj);
            },
            warning : function(title,msg,fn, options){
                options=typeof(options)==='undefined' ?{} : options;
                var obj = Ext.merge({
                    title: title,
                    msg : msg,
                    fn  : fn,
                    buttons: Ext.Msg.OK,
                    icon : Ext.MessageBox.WARNING
                    },options);
                Ext.Msg.show(obj);
            },
            
        }
    };
    Etc.Msg.alert = Etc.Msg.warning;
    return Etc;
};
Etc = new Etc();


Ext.util.Format.brMoney = function(v){
return "R$ " + Ext.util.Format.number(v, '0.000,00/i');
};

Ext.util.Format.thousandSeparator = '.';
Ext.util.Format.decimalSeparator = ',';
