
/* global Ext */

Ext.define('ExtZF.store.Treenav', {
    extend: 'Ext.data.TreeStore',
    alias: 'ExtZF.store.Treenav',
    model: 'ExtZF.model.Treenav',
    autoLoad: true,
    remoteSort: true,
    root: {
        expanded: true
    },
    proxy: {
        simpleSortMode: true,
        type: 'rest',
        url: 'data/treenav',
        appendId: false,
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success'
        }

    }
});