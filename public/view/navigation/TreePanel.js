Ext.define('ExtZF.view.navigation.TreePanel' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.navigationTreePanel', // nome definido para acessar a grid
    useArrows   : true,
    rootVisible  : false,
    lines       :true,
    store       : 'Treenav', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    collapsible : true,
    hideHeaders : true,
    
    
    selModel: {
        mode: 'SINGLE'
    }, // Permite selecionar mais de uma linha da grid
    columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0,  hidden:true},
            {
                header: 'Menu',  
                dataIndex: 'menu',  
                flex: 1,
                iconCls : 'x-tree-noicon',
                xtype: 'treecolumn'
            }
            ],
    initComponent: function() {
        Ext.log({
            msg:'Inicia o treegrid',
            level:'info',
            dump:arguments
        });
        this.callParent(arguments);
    }
});

