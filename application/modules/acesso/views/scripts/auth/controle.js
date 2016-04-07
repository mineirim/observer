Ext.define('ExtZF.view.acesso.auth.Controle', {
    extend: 'Ext.button.Button',
    alias:      'widget.authControle',
    id:         'authMenu',
    text: 'Alterar senha',
                            id: 'btnChange',
                            iconCls : 'icon-change',
                            action : 'change',
                            <?php
                            if(\Zend_Registry::isRegistered('shib_cpf') ){
                                echo 'hidden:\'true\''.PHP_EOL;
                            }
                            ?>
    /**
    initComponent: function() {
        this.items = [
                       {
                            text: 'Alterar senha',
                            id: 'btnChange',
                            iconCls : 'icon-change',
                            action : 'change'
                        },{
                            text: 'Sair',
                            id: 'btnSair',
                            iconCls : 'icon-sair',
                            action : 'logout'
                        }
                    ];
        this.superclass.initComponent.call(this);
    }*/
});
console.log('xxxxxxxxxxxxxxxx');