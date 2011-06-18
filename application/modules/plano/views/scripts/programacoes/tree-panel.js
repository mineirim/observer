Ext.define('ExtZF.view.plano.programacoes.TreePanel' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.planoProgramacoesTreePanel', // nome definido para acessar a grid
    title       : 'Programação',
    //useArrows   : true,
    rootVisible  : true,
    lines        :   true,
    store       : 'programacoes.TreeStore', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    
    selModel: {mode: 'SINGLE'}, // Permite selecionar mais de uma linha da grid
    columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0,  hidden:true},
            {header: 'Menu',  dataIndex: 'menu',  flex: 1,xtype: 'treecolumn', 
                renderer: function(value, metaData, record){
                                return '<b>'+ record.get('instrumento').singular + ' - </b>' + value;
                            }
            }
        ],
        initComponent: function() {
            Ext.log({msg:'Inicia o treegrid',level:'info',dump:arguments});
            this.callParent(arguments);
        }
});

