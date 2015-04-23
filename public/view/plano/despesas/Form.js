/* global Ext */
Ext.define('ExtZF.view.plano.despesas.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.planoDespesasForm',
    id: 'planoDespesasForm',
    padding:8,
    bodyPadding : 12,
    items: [
        {xtype: 'textareafield',
            name: 'descricao',
            ref: 'descricao',
            fieldLabel: 'Descricao',
            labelWidth: 150,
            width: 650,
            anchor: '95%'},
        {
            name: 'financeiro_id', ref: 'financeiro_id',
            xtype: 'combo',
            id: 'financeiro_id',
            fieldLabel: 'Item de despesa',
            labelWidth: 150,
            store: 'Financeiro',
            displayField: 'descricao',
            valueField: 'id',
            anchor: '95%',
            hidden: false,
            allowBlank: false,
            typeAhead: true,
            width: 650,
            mode: 'remote',
            queryParam: 'getOrcamento',
            allQuery: ' ',
        },
        {xtype: 'textfield',
            name: 'valor',
            ref: 'valor',
            fieldLabel: 'valor',
            labelWidth: 150,
            plugins: 'textmask',
            mask: 'R$ #9.999.990,00',
            money: true
        }
    ],
//    buttons : [{
//                text: 'Salvar',
//                iconCls: 'icon-save',
//                action: 'salvar'
//            },
//            ]
});