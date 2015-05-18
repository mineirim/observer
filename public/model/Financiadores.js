/* global Ext */

Ext.define('ExtZF.model.Financiadores', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nome', 'sigla', 'descricao','projeto_id'],
    proxy: {
        simpleSortMode: true,
        type: 'rest',
        url: 'data/financiadores',
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success'
        },
        writer: {
            root: 'rows',
            type: 'json',
            encode: true
        }
    }
});