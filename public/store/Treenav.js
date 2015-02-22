
Ext.define('ExtZF.store.Treenav', {
    extend: 'Ext.data.TreeStore',
    alias : 'ExtZF.store.Treenav',
    model: 'ExtZF.model.Treenav',
    autoLoad: false,
    remoteSort: true ,
root                : {
        
        expanded        : true
        
    }
});