/* global Ext */

Ext.define('ExtZF.view.orcamento.Dashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orcamentoDashboard',
    id: 'orcamentoDashboard',
    //    layout: 'anchor',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: { forcefit: true },
    items: [{
        xtype: 'panel',
        flex: 1,
        layout: 'vbox',
        items: [
            { xtype: 'orcamentoExecucao', flex: 1, }, { xtype: 'panel', flex: 1, }
            ]
    }, {
        xtype: 'panel',
        flex: 1,
        layout: 'vbox',
        items: [{ xtype: 'orcamentoMacro', flex: 1, }, { xtype: 'orcamentoMacroChart', flex: 1, }]
    }, ]
});
