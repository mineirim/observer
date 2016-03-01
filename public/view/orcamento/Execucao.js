Ext.define('ExtZF.view.orcamento.Execucao' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.orcamentoExecucao',
    width       : '100%',
    store       : 'orcamento.Execucao',
    height      : 200,
    layout      : 'fit',   
    features : [ {
       ftype : 'summary'
    } ],
    columns     : [
                    {header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
                    {header: 'Item',  dataIndex: 'menu',  flex: 4,summaryType : 'count',
                           summaryRenderer : function(
                                   value,
                                   summaryData,
                                   dataIndex) {
                            return Ext.String.format('Total');
                           }
                    },
                    {header: 'Valor Alocado',  dataIndex: 'valor_alocado',  flex: 1, align : 'right', xtype: 'numbercolumn', summaryType : 'sum'},
                    {header: 'Valor Executado', dataIndex: 'valor_executado',  flex: 1, align : 'right', xtype:'numbercolumn', summaryType : 'sum'},
                    {header: '% Execução', dataIndex: 'percentual',  flex: 1, align : 'right', xtype:'numbercolumn'},
                    {header: 'Saldo', dataIndex: 'saldo',  flex: 1, align : 'right', xtype:'numbercolumn', summaryType : 'sum'}
                 ],

    initComponent: function() {
        var me=this;
        me.callParent(arguments);
    }
});