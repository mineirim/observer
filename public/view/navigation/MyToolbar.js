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
                createView  : "planoProgramacoesContainer"
            }
            ]
        },
        {
            text: 'Administra&ccedil;&atilde;o',
            id: 'btnAdministracao',
            iconCls : 'icon-admin',
            menu: [
            {
                text: 'Usuários',
                data: 'admin.Users',
                action: 'loadController',
                createView : 'adminUsersList',
                iconCls: 'icon-user'
            },
            {
                text: 'Cargos',
                data: 'admin.Cargos',
                action: 'loadController',
                createView : 'adminCargosList',
                iconCls: 'icon-cargos'
            },
            
            {
                text        : 'Equipes',
                iconCls     : 'icon-setores',
                data        : 'admin.Setores',
                action      : "loadController",
                createView  : "adminSetoresList"
            },{
                text        : 'Arquivos',
                iconCls     : 'icon-attach',
                data        : 'plano.Anexos',
                action      : "loadController",
                createView  : "planoAnexosList"
            },
            {
                text        : 'Estrutura',
                iconCls     : 'silk-add',
                data        : 'admin.Instrumentos',
                action      : "loadController",
                createView  : "adminInstrumentosList"
            }

            ]

        },'->',{xtype : 'authControle'},'-',{
            text: 'Sair',
            id: 'btnSair',
            iconCls : 'icon-sair',
            action : 'logout'
        }
        ];
        this.superclass.initComponent.call(this);
    }
});