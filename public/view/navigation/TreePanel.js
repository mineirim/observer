/* global Etc, Ext */

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
    frame   : false,
    frameHeader : false,
    selModel: {
        mode: 'SINGLE'
    }, 
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
        var me = this;
        me.callParent(arguments);
    }
});

