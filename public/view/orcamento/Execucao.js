Ext.define('ExtZF.view.orcamento.Execucao' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.orcamentoExecucao',
    width       : '100%',
    store       : 'orcamento.Execucao',
    title       : 'Planilha Orçamentária',
    height      : 200,
    layout      : 'fit',   
    columns     : [
                    {header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
                    {header: 'Item',  dataIndex: 'menu',  flex: 4},
                    {header: 'Valor Alocado',  dataIndex: 'valor_alocado',  flex: 1, align : 'right', xtype: 'numbercolumn'},
                    {header: 'Valor Executado', dataIndex: 'valor_executado',  flex: 1, align : 'right', xtype:'numbercolumn'}
                 ],

    initComponent: function() {
        var me=this;
        me.callParent(arguments);
    }
});