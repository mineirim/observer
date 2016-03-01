
/* global Ext */

Ext.define('ExtZF.view.orcamento.Dashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orcamentoDashboard',
    id: 'orcamentoDashboard',
    //    layout: 'anchor',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: { forcefit: true },
    items: [
        { xtype: 'orcamentoExecucao', flex: 1, },
        { xtype: 'orcamentoExecucaoChart', flex: 1, }
     ]
});
