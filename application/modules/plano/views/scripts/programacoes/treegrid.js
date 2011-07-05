Ext.define('ExtZF.view.plano.programacoes.Treegrid' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.planoProgramacoesTreegrid', // nome definido para acessar a grid
    //useArrows   : true,
    rootVisible : false,
    lines        :   true,
    store       : 'programacoes.TreeStore', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    
    selModel: {mode: 'SINGLE'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    tbar :[{
                text: 'Novo Macro-Objetivo',
                iconCls: 'icon-new',
                action: 'newRoot'
            },{
                text: 'Incluir',
                iconCls: 'icon-new',
                action: 'incluir',
                hidden   :true
            },"->",{
                text: 'Excluir',
                iconCls: 'icon-delete',
                action: 'excluir'
            }],
    columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0,  hidden:true},
            {header: 'Menu',  dataIndex: 'menu',  flex: 1,xtype: 'treecolumn', 
                renderer: function(value, metaData, record){
                                return '<b>'+ record.get('instrumento').singular + ' - </b>' + value;
                            }
            },
            {header: 'Descricao',  dataIndex: 'descricao',  flex: 1},
            {header: 'Responsável',     dataIndex: 'responsavel_usuario_id',  flex: 1, 
                renderer: function(value, metaData, record){
                                return record.get('responsavel').nome;
                            }
            },
            {header: 'Setor',     dataIndex: 'setor_id',  flex: 1, 
                renderer: function(value, metaData, record){
                                return record.get('setor').nome;
                            }
            }/*,
            {
                xtype:'actioncolumn', 
                width:50,
                items: [{
                    icon: 'images/icons/pencil.png',
                    tooltip: 'Editar',
                    action : 'edit'
                },{
                    icon: 'images/icons/delete.png',
                    tooltip: 'Delete',
                    acton   :   'delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert("Terminate " + rec.get('menu'));
                    }                  
                }]
            }*/
        ],
        initComponent: function() {
            Ext.log({msg:'Inicia o treegrid',level:'info',dump:arguments});
            this.callParent(arguments);
        }
});


Ext.override(Ext.tree.View, {  
    afterRender: function(){
        var me = this,
            listeners;
        Ext.view.View.superclass.afterRender.apply(this, arguments);
        listeners = {
            scope: me,
            click: me.handleEvent,
            mousedown: me.handleEvent,
            mouseup: me.handleEvent,
            dblclick: me.handleEvent,
            contextmenu: me.handleEvent,
            mouseover: me.handleEvent,
            mouseout: me.handleEvent,
            keydown: me.handleEvent
        };
        me.mon(me.getTargetEl(), listeners);
        if (me.store) {
            me.bindStore(me.store, true, this.panel.store);
        }
    },
    bindStore : function(store, initial, maskStore) {
        var me = this;
        if (!initial && me.store) {
            if (store !== me.store && me.store.autoDestroy) {
                me.store.destroy();
            } 
            else {
                me.mun(me.store, {
                    scope: me,
                    datachanged: me.onDataChanged,
                    add: me.onAdd,
                    remove: me.onRemove,
                    update: me.onUpdate,
                    clear: me.refresh
                });
            }
            if (!store) {
                if (me.loadMask) {
                    me.loadMask.bindStore(null);
                }
                me.store = null;
            }
        }
        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            me.mon(store, {
                scope: me,
                datachanged: me.onDataChanged,
                add: me.onAdd,
                remove: me.onRemove,
                update: me.onUpdate,
                clear: me.refresh
            });
            if (me.loadMask && maskStore) {
                me.loadMask.bindStore(maskStore);
            }
        }
        me.store = store;
        // Bind the store to our selection model
        me.getSelectionModel().bind(store);
        if (store) {
            me.refresh(true);
        }
    }
});  