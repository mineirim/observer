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
            '<h2><b>OBSERVER - Sistema de Planejamento e Monitoramento da UNASUS</b></h2>',
            '->',{
                text    : '',
                id      : 'text',
                iconCls : 'silk-user'
            },
            'Bem Vindo(a), <span id="main_username" class="username">'+usuario+'</span></b>',
            '-']
        },
        items : {
            xtype : 'mytoolbar'
        }
    },
    {
        
        region      : 'west',
        collapsed   :false,
        width       : 200,
        layout      : 'accordion',
        activeItem  : 0,
        id          : 'ctnLeft',
        collapsible     :true,
        split           :true,
        collapseMode    : 'mini',
        items       : [

                        {
                            xtype   : 'panel',
                            title   : 'Instrumentos',
                            id      : 'pnlInstrumentos',
                            layout  : 'fit',
                            items   : [{
                                xtype:'navigationTreePanel'
                            }]
                        },{
                            xtype: 'panel',
                            title: 'Organizações',
                            id: 'pnlOrganizacoes'
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
            items:{
                html:'Bem vindo',
                title:'Home',
                iconCls:'icon-home',
                closable : 'true'
            }
        }
    },
    {
        region      : 'east',
        width       : 100,
        id          : 'ctnRight',
        collapsible : true,
        collapsed  : true,
        split       : false
    },
    {
        xtype       : 'container',
        region      : 'south',
        height      : 16,
        id          : 'ctnBotton',
        collapsible  : true
    }
    ]
});