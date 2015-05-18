/* global Ext */

Ext.define('ExtZF.store.Organizacoes', {
    extend: 'Ext.data.Store',
    alias: 'ExtZF.store.Organizacoes',
    model: 'ExtZF.model.Organizacoes',
    autoLoad: true,
    remoteSort: true

});