/* global Etc, Ext */

Ext.define('ExtZF.view.navigation.ProjetosTreePanel' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.navigationProjetosTreePanel', 
    useArrows   : true,
    rootVisible : false,
    lines       : true,
    store       : 'Projetosnav', 
    singleExpand: true,
     singleClickExpand  : true,
    hideHeaders : true,
    id          : 'projetosTreePanel',
    frame   : false,
    frameHeader : false,
    selModel: {
        mode: 'SINGLE'
    }, 
    //@todo adicionar id combinado com o código do projeto para evitar problema na expansão da tree
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

