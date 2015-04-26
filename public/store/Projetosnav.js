/* global Ext */

Ext.define('ExtZF.store.Projetosnav', {
    extend: 'Ext.data.TreeStore',
    alias: 'ExtZF.store.Projetosnav',
    model: 'ExtZF.model.Treenav',
    autoLoad: true,
    remoteSort: true,
    root: {
        expanded: true

    },
    proxy: {
        simpleSortMode: true,
        type: 'rest',
        url: 'data/projetos-navigation',
        appendId: false,
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success'
        }

    },
    listeners: {
        beforeload: function (store, operation, eOpts) {
            var node = operation.node;
            if (node.get('projeto_id')!== '') {
                var projetoId = node.get("projeto_id");
                operation.params.projetoId = projetoId;
            }
        }
    }
});