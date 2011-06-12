Ext.define('ExtZF.view.navigation.MyToolbar', {
    extend: 'Ext.Toolbar',
    alias:      'widget.mytoolbar',
    id:         'tbrMenu',
    initComponent: function() {
        this.items = [
        {
            text: 'Plano',
            id: 'btnInstrumentos',
            iconCls : 'icon-plano',
            menu: [
            {
                text: 'Programa&ccedil;&atilde;o',
                id: 'mniItemI',
                iconCls : 'icon-programacao',
                data        : 'plano.Programacoes',
                action      : "loadController",
                createView  : "planoProgramacoesTreegrid"
            }
            ]
        },
        {
            text: 'Administra&ccedil;&atilde;o',
            id: 'btnAdministracao',
            iconCls : 'icon-config',
            menu: [
            {
                text: 'Usuários',
                data: 'admin.Cad-usuarios',
                action: 'loadController',
                createView : 'adminUsuariosLista',
                iconCls: 'icon-user'
            },
            {
                text: 'Situa&ccedil;&otilde;es',
                data: 'admin.Situacoes',
                action: 'loadController',
                createView : 'adminSituacoesList',
                iconCls: 'x-menu-item-lst'
            },
            {
                text        : 'Organiza&ccedil;&otilde;es',
                iconCls     : 'icon-org',
                data        : 'admin.Organizacoes',
                action      : "loadController",
                createView  : "adminOrganizacoesList"
            },
            {
                text        : 'Setores',
                iconCls     : 'icon-setores',
                data        : 'admin.Setores',
                action      : "loadController",
                createView  : "adminSetoresList"
            },
            {
                text        : 'Instrumentos',
                iconCls     : 'silk-add',
                data        : 'admin.Instrumentos',
                action      : "loadController",
                createView  : "adminInstrumentosList"
            }
            ]

        },{
            text: 'Sair',
            id: 'btnSair',
            iconCls : 'icon-sair',
            action : 'logout'
        }
        ];
        this.superclass.initComponent.call(this);
    }
});