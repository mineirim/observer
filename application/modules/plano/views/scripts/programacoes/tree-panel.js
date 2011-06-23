Ext.define('ExtZF.view.plano.programacoes.TreePanel' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.planoProgramacoesTreePanel', // nome definido para acessar a grid
    useArrows   : true,
    rootVisible  : false,
    lines       :true,
    store       : 'programacoes.TreeStore', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    collapsible : true,
    //hideHeaders : true,
    preventHeader :true,
    
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

