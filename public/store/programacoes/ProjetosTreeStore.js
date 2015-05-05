/* global Ext */

Ext.define('ExtZF.store.programacoes.ProjetosTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'ExtZF.store.programacoes.ProjetosTreeStore',
    storeId: 'programacoesProjetosTreeStore',
    model: 'ExtZF.model.programacoes.Model4tree',
    autoLoad: false,
    // bug in extjs4.1 autoLoad is ignored
    // specifying "loaded: true" resolves the problem
    root: {
        expanded: true,
        text: 'Root',
        menu: 'menu',
//        loaded: true,    
    },
    proxy: {
        type: 'rest',
        url: 'data/programacoes',
        extraParams: {toTree: true},
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'id',
            successProperty: 'success',
            expanded: true
        },
        writer: {
            root: 'rows',
            //type     : 'json',
            encode: true
        }
    },
    listeners: {
        beforeload: function (store, operation, eOpts) {
            var node = operation.node;
            if (node.get('projeto_id')!== '') {
                var projetoId = node.get("projeto_id");
                operation.params.projetoId = projetoId;
            }
        },
        load: function (sender, node, records) {
//           node.data.menu = node.raw.text;
            node.expand();
        }
    }
});