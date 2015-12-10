/* global Ext */

Ext.define('ExtZF.view.orcamento.Dashboard' ,{
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.orcamentoDashboard',
    id          : 'orcamentoDashboard',
//    layout: 'anchor',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    tbar        :[{
                     xtype: 'combo',
                    id: 'cmbProjetosFiltro',
                    ref: 'cmbProjetosFiltro',
                    store : 'Projetos',
                    fieldLabel: 'Filtrar por projeto',
                    displayField: 'nome',
                    valueField: 'id',
//                    anchor: '35%',
                    labelWidth: 145,
                    allowBlank: false,
                    typeAhead: true,
                    width: "100%",
                    mode: 'remote',
                }
            ],
    defaults    : {forcefit:true},
    items: [
        {xtype:'panel', flex:1, layout:'vbox', items:[{xtype:'orcamentoGrupoChart',flex:1,},{xtype:'panel',flex:1,}]},
        {xtype:'panel', flex:1, layout:'vbox', items:[{xtype:'orcamentoMacro',flex:1,},{xtype:'orcamentoMacroChart',flex:1,}]},
    ]
});