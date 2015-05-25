/* global Ext */

Ext.define('Js.Viewport', {

    extend: 'Ext.container.Viewport',
    id: 'criaLayout',
    alias: 'myviewport',
    frame: false,
    defaults : {
        frame:false,
        frameHeader : false,
    },
    layout: {
        type: 'border',
        padding: 0
    },
    items : [
    {
                
        region: 'north',
        split       : false,
        collapsible : false,
        height      : 78,
        margins     : '0 0 0 0',
        id: 'ctnTop',
        frame: false,       
        tbar        : {
            id          : 'basic-statusbar',
             layoutConfig : {
                align : 'stretch'
            },
            defaults : {
                top : 0  
            },
            height: 50,
            items       : [
                {xtype: 'tbtext', width:'140px',text: '<div width="130px" height="42px"><img src="images/logo_sisplan.png" height="40px" ></span>'},
                ' ',
                '<span style="font-size:1.4em"> <b>SISPLAN UNA-SUS</b></span>',
                {xtype: 'tbseparator'},
                '<span style="font-size:0.7em"><b>' + tag_version + '</b></span>',
                '->' ,{
                    text    : '',
                    id      : 'text',
                    iconCls : 'silk-user'
                },
                'Bem vindo(a), <span id="main_username" class="username">'+nomeUsuario+'</span></b>'
            ]
        },
        bbar    :{frame:false,xtype : 'mytoolbar', padding: '0 2 2 0'},
        
    },
    {
        
        region      : 'west',
        collapsed   : false,
        width       : 200,
        layout      :  {
                        type: 'accordion',
                        animate: true,
                        activeOnTop: true
                    },
        activeItem  : 0,
        id          : 'ctnLeft',
        collapsible     :true,
        split           :true,
        collapseMode    : 'header',
        hideCollapseTool: true,
        padding         :'0 4 0 0',
        frame: false,
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
                            xtype: 'navigationProjetosTreePanel',
                            title: 'Projetos',
                            layout  : 'fit',
                            id: 'pnlProjetos'
                        }
                        ]
    },
    {
        xtype: 'container',
        region: 'center',
        id: 'ctnCenter',
        layout: 'fit',
        frame:false,
        items :
        {
            xtype : 'tabpanel',
            layout:'fit',
            id:'ctnPrincipal',
            frame:false,            
            frameHeader : false,
            defaults: {
                hideMode: 'offsets'
            },
            items:[{
                    xtype    : "planoDashboardPainel",                    
                    closable : false,
                    frame:false,
                    frameHeader : false,
                    title    : "Dashboard",
                    iconCls  : "icon-dashboard"
                }]
        }
    }
    ]
});
