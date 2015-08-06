/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.plano.tipoindicador.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoTipoIndicadorList', 
    store: 'TipoIndicador',
    title : 'Lista',
    selModel: {mode: 'MULTI'}, 
    
    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'incluir'
    },{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [
                  {header: 'Id.',  dataIndex: 'id',  flex: 0, width: '20'},
		  {header: 'Id',  dataIndex: 'id',  flex: 1},
		  {header: 'Descricao',  dataIndex: 'descricao',  flex: 1}
                 ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'TipoIndicador',
        dock: 'bottom',
        displayInfo: true
    }]
});