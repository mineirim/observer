Ext.define('ExtZF.view.admin.users.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminUsersList',
    store: 'Usuarios', 
    title : '<?php echo $this->title; ?>', // exemplo do título da view passado via PHP
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    
    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'new' // action identificada para executar na camada controller
    },'->',{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'delete'
    }],
	columns: [
        {header: 'Id.' ,  dataIndex: 'id'      , flex: 0, hidden:true},
	{header: 'Nome' ,  dataIndex: 'nome'    , flex: 3},
        {header: 'E-Mail', dataIndex: 'email'   , flex: 3},
        {header: 'Login',  dataIndex: 'usuario', flex: 1},
        {header: 'S.U.', dataIndex: 'is_su' , flex: 0, width:'38px',
                renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                    
                    if(value){
                        metaData.tdCls = 'icon-su';
                    }
                     
                     return '';
                 }
        }
    ],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Usuarios',
        dock: 'bottom',
        displayInfo: true
    }]
    
    
});