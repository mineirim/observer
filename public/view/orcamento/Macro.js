
Ext.define('ExtZF.view.orcamento.Macro' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.orcamentoMacro',
    width       : '100%',
    height      : 200,
    flex : 0,
    store : 'orcamento.ResumoMacro',
    columns: [
        {header: 'Macro Objetivo', dataIndex: 'menu', flex:1,},
        {header: 'Valor Alocado', dataIndex: 'vlr_alocado', flex:1,},
        {header: 'Valor Executado', dataIndex: 'vlr_executado', flex:1,},
    ],

    initComponent: function() {
        var me=this;
        me.callParent(arguments);
    }
});