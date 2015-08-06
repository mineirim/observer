/* global Ext */
Ext.define('ExtCustom.form.field.HtmlEditor', {
     extend: 'Ext.form.field.HtmlEditor'
    ,alias: 'widget.customhtmleditor'
    
    /**
     * @overriden method
     * Initialize the events
     */
    ,initEvents: function () {
        var me = this;

        me.callParent(arguments);

        me.on({
            scope: me,
            initialize: me.onInitializeHtmlEditor
        });
    }

    /**
     * Attach the custom events
     */
    ,onInitializeHtmlEditor: function () {
        var me = this,
            frameWin = me.getWin(),
            fnBlur = Ext.bind(me.onHtmlEditorBlur, me);

        if (frameWin.attachEvent) {
            frameWin.addEventListener('blur', fnBlur);
        }
        else {
            frameWin.addEventListener('blur', fnBlur, false);
        }
    }

    /**
     * Method which will fire the event "blur"
     */
    ,onHtmlEditorBlur: function (event) {
        this.fireEvent('blur', this);
    }
});
Ext.define('ExtZF.view.plano.operativos.Form', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.planoOperativosForm',
    id      : 'planoOperativosForm',  
    layout: {
        type: 'anchor',
        align: 'stretch',
    },
    items: [
        {
            xtype: 'fieldset',
            defaultType: 'textfield',
            anchor: '100% 10%',
            margin: '0 0 0 0',
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'start',
            },
            items: [
                {xtype: 'displayfield', name: 'peso', ref: 'peso', fieldLabel: 'Peso', flex: 1, labelStyle: 'white-space: nowrap;', labelWidth: 60, flex:1},
                {xtype: 'displayfield', name: 'data_inicio', ref: 'data_inicio', fieldLabel: 'Inicio', labelStyle: 'white-space: nowrap;', labelWidth: 60, flex: 1,
                    renderer: Ext.util.Format.dateRenderer('d/m/y')
                },
                {xtype: 'displayfield', name: 'data_prazo', ref: 'data_prazo', fieldLabel: 'Término', flex: 1, labelStyle: 'white-space: nowrap;', labelWidth: 60,
                    renderer: Ext.util.Format.dateRenderer('d/m/y')
                }]
        },
        {
            xtype: 'fieldset',
            defaultType: 'textfield',
            anchor: '100% 10%',
            margin: '0 0 0 0',
            
            layout: {
                type: 'hbox',
                pack: 'start',
//                align: 'stretch'
                align: 'middle'
            },
            items: [
                    {xtype: 'combo', name: 'andamento_id', ref: 'andamento_id', id: 'andamento_id', 
                        fieldLabel: 'Andamento',
                        store: 'Andamentos',
                        displayField: 'descricao',
                        valueField: 'id',
                        queryMode: 'local',
                        typeAhead: true,
                        flex: 4,
                        listConfig: {
                            itemTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div style="clear: both; border: 1px solid white; width: 98%;" class="andamento-{id}">',
                                    '<div style="text-align: left; clear: both;" class="andamento-{id}"><b>{descricao}</b></div>',
                                    '<div style="text-align: left; clear: both;font-size:0.9em;font-style: italic;" class="andamento-{id}">{conceito}</div>',
                                    '</div>',
                                    '</tpl>'
                                    )
                        }
                    },                
                    {xtype: 'sliderfield', name: 'percentual_execucao',
                    ref: 'percentual_execucao',
                    id: 'percentual_execucao',
                    fieldLabel: ' % de execução', 
                    increment: 1,
                    minValue: 0,
                    maxValue: 100,
                    tipText: function (thumb) {
                        return String(thumb.value) + '%';

                    },
                    flex: 3,
                    padding : '0 5 0',
                },
                {xtype: 'datefield', name: 'data_encerramento', ref: 'data_encerramento', id: 'data_encerramento',
                    fieldLabel: 'Data de encerramento', labelWidth: 145,
                    format: 'd/m/Y',
                    flex: 2,
                    labelStyle: 'white-space: nowrap;',
                }
                
            ]
        },
        {xtype: 'customhtmleditor', name: 'avaliacao_andamento', ref: 'avaliacao_andamento',
            id : 'avaliacao_andamentoHtmlEditor',
            fieldLabel: 'Avaliação do andamento',
            enableFont: false,
            frame: false,
            resizable: true,
            anchor: '100% 80%' 
        },
    ],
    buttons : [
    {
        text: 'Salvar',
        iconCls: 'icon-save',
        action: 'salvar'
    },  
    {
        text: 'Salvar e enviar e-mail',
        action: 'salvar',
//                        xtype : 'checkbox',
//                        boxLabel : 'Salvar e enviar e-mail',
        iconCls: 'icon-email',
        itemId : 'sendmail'
    }]
});