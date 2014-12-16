Ext.define('Js.Viewport', {

    extend: 'Ext.container.Viewport',
    id: 'criaLayout',
    alias: 'myviewport',
    layout: {
        type: 'border',
        padding: 5
    },
    items : [
    {
                
        region: 'north',
        split       : false,
        collapsible : false,
        height      : 57,
        margins     : '0 0 0 0',
        id: 'ctnTop',
                
        tbar        : {
            id          : 'basic-statusbar',
            items       : [
            '<span style="font-size:1.3em"><b>Sistema de Planejamento, Programa&ccedil;&atilde;o e Monitoramento - SPPM </b></span>',
            '|','<span style="font-size:0.8em"><b>' + tag_version + '</b></span>',
            '->' ,{
                text    : '',
                id      : 'text',
                iconCls : 'silk-user'
            },
            'Bem vindo(a), <span id="main_username" class="username">'+nomeUsuario+'</span></b>']
        },
        items : {
            xtype : 'mytoolbar'
        }
    },
    {
        
        region      : 'west',
        collapsed   : false,
        width       : 200,
        layout      : 'fit',
        activeItem  : 0,
        id          : 'ctnLeft',
        collapsible     :true,
        split           :true,
        collapseMode    : 'header',
        hideCollapseTool: true,
        padding         :'0 4 0 0',
        items       : [
                        {
                            xtype   : 'panel',
                            title   : 'Instrumentos',
                            id      : 'pnlInstrumentos',
                            layout  : 'fit',
                            items   : [{
                                xtype:'navigationTreePanel'
                            }]
                        }
                        ]
    },
    {
        xtype: 'container',
        region: 'center',
        id: 'ctnCenter',
        layout: 'fit',
        items :
        {
            xtype : 'tabpanel',
            layout:'fit',
            id:'ctnPrincipal',
            items:[{
                    xtype    : "planoDashboardPainel",                    
                    closable : false,
                    title    : "Dashboard",
                    iconCls  : "icon-dashboard"
                }]
        }
    }
    ]
});