
Ext.define('ExtZF.view.plano.dashboard.Checklist' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.planoDashboardChecklist',    
    width       : '100%',
    height      : 200,
    flex : 0,
    hideHeaders: true,
    columns: [
        {header: 'Instrumento', dataIndex: 'instrumento_id', flex:1,
            renderer: function(value, p, record){
                        var instrumentos = Ext.StoreMgr.get('Instrumentos');
                        var instrumento = instrumentos.findRecord('id',value);
                        var formatedString = Ext.String.format('<div class="topic"><b>{0}:</b><span class="author"> {1}</span></div>',
                         instrumento.get('singular'), record.get('menu'));
                        return formatedString;                
           }
        }
    ],
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl : [
                '<p><b>Company:</b> {menu}</p><br>',
                '<p><b>Summary:</b> {descricao}</p>'
            ]
        }],
    initComponent: function() {
        var me=this;
//        Ext.apply(me, {
//            viewConfig: {
//               plugins: [{
//                   pluginId: 'preview',
//                   ptype: 'preview',
//                   bodyField: 'descricao',
//                   expanded: false
//               }]
//           }
//        });
        me.callParent(arguments);
    }
});