Ext.define('ExtZF.view.navigation.TreePanel' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.navigationTreePanel', 
    useArrows   : true,
    rootVisible : false,
    lines       : true,
    store       : 'Treenav', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    hideHeaders : true,
    id          : 'treeNavPanel',
//    frame   : false,
    
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
        Etc.log({
            msg:'Inicia o treegrid',
            level:'info',
            dump:arguments
        });
        this.callParent(arguments);
    }
});

