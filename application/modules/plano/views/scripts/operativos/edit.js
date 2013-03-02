Ext.define('ExtZF.view.plano.operativos.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.planoOperativosEdit', // nome definido a janela
    title: 'Edição',
    layout: 'fit',
    width: 840,
    minHeight: 390,
    height: 400,
    maxHeight: 590,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        // Itens da janela
        this.items = [{
                xtype: 'form',
                items: [
                    {xtype: 'displayfield', name: 'peso', ref: 'peso', fieldLabel: 'Peso'},
                    {xtype: 'displayfield', name: 'data_inicio', ref: 'data_inicio', fieldLabel: 'Inicio',
                        renderer: Ext.util.Format.dateRenderer('d/m/y')
                    },
                    {xtype: 'displayfield', name: 'data_prazo', ref: 'data_prazo', fieldLabel: 'Prazo',
                        renderer: Ext.util.Format.dateRenderer('d/m/y')
                    },
//                    {xtype: 'combo', name: 'andamento_id', ref: 'andamento_id', fieldLabel: 'Andamento',
//                        store: 'Andamentos',
//                        displayField: 'descricao',
//                        valueField: 'id',
//                        queryMode: 'local',
//                        anchor: '50%',
//                        typeAhead: true
//                    },
                    {xtype: 'datefield', name: 'data_encerramento', ref: 'data_encerramento', fieldLabel: 'Data de encerramento'},
                    {xtype: 'htmleditor', name: 'avaliacao_andamento', ref: 'avaliacao_andamento', fieldLabel: 'Avaliacao do andamento'},
                    {xtype: 'sliderfield', name: 'percentual_execucao', ref: 'percentual_execucao', fieldLabel: 'Percentual de execucao',
                        increment: 1,
                        minValue: 0,
                        maxValue: 100,
                        tipText: function(thumb) {
                            return String(thumb.value) + '%';

                        },
                        anchor: '95%'
                    }
                ]}
        ];

        // botões da janela
        this.buttons = [{
                text: 'Salvar',
                iconCls: 'icon-save',
                action: 'salvar'
            },
            {
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
    }
});