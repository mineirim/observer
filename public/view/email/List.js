/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view..email.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.EmailList', 
    store: 'Email',
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
		  {header: '',  dataIndex: '',  flex: 1}
                 ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Email',
        dock: 'bottom',
        displayInfo: true
    }]
});