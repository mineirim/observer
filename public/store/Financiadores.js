/* global Ext */

Ext.define('ExtZF.store.Financiadores', {
    extend: 'Ext.data.Store',
    alias: 'ExtZF.store.Financiadores',
    model: 'ExtZF.model.Organizacoes',
    autoLoad: true,
    remoteSort: true

});