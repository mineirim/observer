
 Ext.define('Js.Viewport', {

        extend: 'Ext.container.Viewport',
        id: 'criaLayout',
        alias: 'myviewport',
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items : [
            {
                
                region: 'north',
                 split       : false,
        collapsible : false,
        margins     : '0 0 0 0',
                id: 'ctnTop',
                
                tbar        : {
                    id          : 'basic-statusbar',
                    items       : [
                    '<b>OBSERVER - Sistema </b>',
                    '->',{
                        text    : '',
                         id      : 'text',
                         iconCls : 'silk-user'
                     },
                     'Bem Vindo(a), <span id="main_username" class="username">convidado</span></b>',
                     '-']
                },
                items : {
                         xtype : 'mytoolbar'
                      }
            },
            {
                xtype: 'container',
                region: 'west',
                width: 150,
                layout: 'accordion',
                activeItem: 0,
                id: 'ctnLeft',
                items: [
                    {
                        xtype: 'panel',
                        title: 'Instituições',
                        id: 'pnlInstituicoes'
                    },
                    {
                        xtype: 'panel',
                        title: 'Instrumentos',
                        id: 'pnlInstrumentos'
                    }
                ]
            },
            {
                xtype: 'container',
                region: 'center',
                height: 404,
                id: 'ctnCenter',
                layout: 'fit',
                items :
                    {xtype : 'tabpanel',layout:'fit',id:'ctnPrincipal',items:{html:'Bem vindo',closable : 'true'}}
            },
            {
                xtype: 'container',
                region: 'east',
                width: 100,
                id: 'ctnRight'
            },
            {
                xtype: 'container',
                region: 'south',
                height: 46,
                width: 793,
                id: 'ctnBotton'
            }
        ]
    });

    /*
    items  : [{
        region      : 'north',
        split       : false,
        collapsible : false,
        margins     : '0 0 0 0',
        tbar        : {
            id          : 'basic-statusbar',
            items       : [
            '<b>SCOWEB - Sistema de gerenciamento de imobiliárias</b>',
            '->',{
                text    : '',
                 id      : 'text',
                 iconCls : 'silk-user'
             },
             'Bem Vindo(a), <span id="main_username" class="username">'+(username || 'convidado')+'</span></b>',
             '-',{
                 xtype : 'toolbarClock'
              }]
        }
    },{
        xtype : 'appMenu',
        listeners: {
            'menuItemSelected' : function(tree, view) {

                tabs = Ext.getCmp('app-tabpanel');
                tabs.add({
                    xtype : view,
                    id    : 'tab-'+view
                });
            }
        }
    },{
        region          : 'center',
        xtype           : 'tabpanel',
        id              : 'app-tabpanel',
        enableTabScroll : true,
        defaults        : {autoScroll:true},
        layout          : 'fit'

    }]
*/