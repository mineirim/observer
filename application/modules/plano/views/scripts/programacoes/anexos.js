
Ext.define('ExtZF.view.plano.programacoes.Anexos' ,{
    extend      : 'Ext.view.View', 
    alias       : 'widget.planoProgramacoesAnexos',
    frame: true,
    title: 'Anexos',
    height: 100,
    layout: 'fit',
    store : 'Tags',
    collapsible:true,
    collapsed : true,
    iconCls :   'icon-attach',
    tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" >',
                        '<span class="x-editable">{tag}</span>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
//    items : [{
//        xtype: 'component',
//        autoEl: {
//            tag: 'a',
//            href: 'http://www.example.com/',
//            html: 'Example.com'
//        }
//    },
//    {
//        xtype: 'component',
//        autoEl: {
//            tag: 'a',
//            href: 'http://www.example.com/',
//            html: 'Example.com'
//        }
//    }
//],
//    lbar:[{xtype:'button',
//          iconCls:'icon-attach-file',
//          action    : 'attach',
//          text      : 'Adicionar'
//      }]
});


