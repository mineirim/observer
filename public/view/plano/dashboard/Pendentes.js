
Ext.define('ExtZF.view.plano.dashboard.Pendentes' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.planoDashboardPendentes',    
    width       : '100%',
    height      : 200,
    flex : 0,
    hideHeaders: true,
    store : 'Planejamento',
    columns: [
        {header: 'Instrumento', dataIndex: 'instrumento_id', flex:1,
            renderer: function(value, p, record){
                        var instrumentos = Ext.StoreMgr.get('Instrumentos');
                        var instrumento = instrumentos.findRecord('id',value);
//                        var formatedString = Ext.String.format('<div class="topic"><b>{0}:</b><span class="author"> {1}</span></div>',
//                         instrumento.get('singular'), record.get('menu'));
                        var formatedString = Ext.String.format('<div class="topic"><span class="author"> {0}</span></div>',
                          record.get('menu'));
                        return formatedString;                
           }
        }
    ],
//    plugins: [{
//            ptype: 'rowexpander',
//            rowBodyTpl : [
//                '<p><b>Descrição:</b> {descricao}</p>'
//            ]
//        }],
                
                    
                
    initComponent: function() {
        var me=this;
        me.callParent(arguments);
    }
});