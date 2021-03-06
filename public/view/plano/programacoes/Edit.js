/* global Ext */

Ext.define('ExtZF.view.plano.programacoes.Edit', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoProgramacoesEdit', // nome definido a janela
    id          : 'planoProgramacoesEdit',
    title       : 'Edição',
    layout      : 'fit',
    width       : 1020,
    minHeight   : 390,
    height      : 550,
    maxHeight   : 590,
    
    
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    showVlrProgramado   : function(){
        var me = this;
              //####### FORM DE VALORES 
       
        var fromProgramado =  Ext.create('Ext.form.Panel', {
            id: 'frmVlrProgramado',
            title:  'Orçamento',
            padding:8,
            height      : 150, 
            items: [
                            {
                    xtype   : 'textfield',
                    name    : 'valor',
                    id      :  'vlr_financeiro',
                    ref     : 'valor',
                    fieldLabel: 'Valor Programado',                    
                    plugins : 'textmask',
                    mask    : 'R$ #9.999.990,00',
                    money   : true
                },
                {
                    xtype: 'hiddenfield',
                    name:'programacao_id',
                    ref:'programacao_id'
                },

                {
                    xtype: 'hiddenfield',
                    name:'id',
                    ref:'id'
                }
            ]            
            
        });
    
       
        me.progTab.add(fromProgramado);

    },
    showBtnDespesas  : function(){
        this.down('#btnDespesas').show(); 
    },
    criaDetail : function(){
        var me=this;
        var progPanel =Ext.getCmp('progPanel');
        progPanel.add(me.getFormDetail());
    },
    getFormDetail : function(){
        var me =this;
        var formDetail =  Ext.create('Ext.form.Panel', {
            id: 'frmDetail',
            padding:8,
            items: [
            {
                width: 400,
                increment: 1,
                minValue: 0,
                maxValue: 100,
                xtype: 'sliderfield',
                tipText: function(thumb){
                    return String(thumb.value) + '%';
                }, 
                name : 'peso',
                ref: 'peso',
                fieldLabel: 'Peso',
                anchor:'95%'
            },
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
                    {
                        xtype: 'datefield',
                        name : 'data_inicio',
                        ref: 'data_inicio',
                        fieldLabel: 'Início',
                        format: 'd/m/Y'
                    },
                    {
                        xtype: 'datefield',
                        name : 'data_prazo',
                        ref: 'data_prazo',
                        fieldLabel: 'Término',
                        format: 'd/m/Y'
                    },
                ]
            },
            {
                xtype: 'combo',
                name        : 'responsavel_id',
                ref         : 'responsavel_id',
                fieldLabel  : 'Responsável', 
                store       : 'Usuarios',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                hidden      : true
                
            },
            {
                xtype       : 'combo',
                id          : 'sistema_id',
                name        : 'sistema_id',
                ref         : 'sistema_id',
                fieldLabel  : 'Alimentado pelo sistema',
                store       : 'Sistemas',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor      : '95%',
                allowBlank  : true,
                typeAhead   : true,
            },
            ]            
            
        });
        return formDetail;
    },
    showIndicadorForm : function(indicadorStore){
        var me=this;
        var items = [];

        indicadorStore.each(function(record,idx) {
            var indicador = {
                xtype: 'fieldset',
                columnWidth: .8,
                title: '',
                defaultType: 'textfield',
                defaults: {
                    anchor: '94%',
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'middle'
                },
                items: [
                    {xtype: 'displayfield', name: 'descricao', value: record.get('descricao'), fieldLabel: 'Indicador', flex: 1, labelStyle: 'white-space: nowrap;', labelWidth: 60, flex:1},
                    {xtype: 'combo',
                        name: 'indicador_opcao'+record.get('id') ,
                        ref: 'indicador_opcao'+record.get('id'),
                        id: 'indicador_opcao'+record.get('id'),
                        fieldLabel: 'Valor',
                        store: 'IndicadorOpcoes',
                        displayField: 'descritivo',
                        valueField: 'id',
                        typeAhead: true,
                    },
                ]
            };
            items.push(indicador);
        });
        var indicadorForm= Ext.create('Ext.form.Panel', {
            id: 'frmDetail',
            padding:8,
            items: items
        });
        var progPanel =Ext.getCmp('progPanel');
        progPanel.add(indicadorForm);
    },
    initComponent: function() {
        var me=this;
        
        var formDefault = Ext.create('Ext.form.Panel', {
            id: 'frmDefault',
            bodyPadding: 12,
            padding:8,
            items: [
            {                
                xtype: 'textfield',
                name : 'menu',
                ref: 'menu',
                fieldLabel: 'Menu',
                anchor:'95%'
            },
            {
                xtype: 'htmleditor',
                id: 'descricaoHtmlEditor',
                enableFont : false,
                enableFontSize: true, 
                height:130,
                name : 'descricao',
                ref: 'descricao',
                fieldLabel: 'Descrição',
                anchor:'95%'

            }, 
            {
                xtype       : 'combo',
                id          : 'projeto_id',
                name        : 'projeto_id',
                ref         : 'projeto_id',
                fieldLabel  : 'Projeto', 
                store       : 'Projetos',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor      : '95%',
                hidden      : true,
                allowBlank  : true,
                typeAhead   : true
            },
            {
                xtype: 'combo',
                id          : 'responsavel_usuario_id',
                name        : 'responsavel_usuario_id',
                ref         : 'responsavel_usuario_id',
                fieldLabel  : 'Responsável', 
                store       : 'Usuarios',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor      : '95%',
                hidden      : true,
                allowBlank  : true,
                typeAhead   : true
            },
            {
                xtype: 'combo',
                id          : 'supervisor_usuario_id',
                name        : 'supervisor_usuario_id',
                ref         : 'supervisor_usuario_id',
                fieldLabel  : 'Supervisor', 
                store       : 'Usuarios',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor      : '95%',
                hidden      : true,
                typeAhead   : true
            },//só exibir se has_equipe=true
            {
                xtype: 'combo',
                id          : 'setor_id',
                name        : 'setor_id',
                ref         : 'setor_id',
                fieldLabel  : 'Equipe', 
                store       : 'Setores',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor      :'95%',
                hidden      : true,
                typeAhead   : true
            },
            {
                xtype: 'hiddenfield',
                name:'programacao_id',
                ref:'programacao_id'
            },
            {
                xtype: 'hiddenfield',
                name:'instrumento_id',
                ref:'instrumento_id'
            },
            
            ]            
        });
        var mainPanel= Ext.create('Ext.panel.Panel', {id:'progPanel', title: 'Programação',items:[formDefault]});
        
        me.progTab = Ext.create('Ext.tab.Panel',
                {
                    id  : 'progTab',
                    height:300, 
                    items:[mainPanel]});
        me.items = [me.progTab];
        // botões da janela
        me.buttons = [
            {
            text    : 'Orçamento',
            action  : 'addVlrProgramado',
            iconCls : 'icon-save',
            hidden  : true,
            id      : 'btnVlrProgramado'
        },{
            text    : 'Registrar despesa',
            action  : 'addDespesas',
            iconCls : 'icon-save',
            hidden  : true,
            id      : 'btnDespesas'
        },
        '-',
        {
            text: 'Salvar',
            action: 'save',
            iconCls: 'icon-save'
        },
        {
            text: 'Salvar e fechar',
            action: 'saveAndClose',
            iconCls: 'icon-save-close'
        },
        {
            text: 'Cancelar',
            scope: me,
            handler: me.close,
            iconCls : 'icon-cancel'
        }];

        me.callParent(arguments);
    },
    showGridProgramacao   : function(progId){
        var me = this;
        me.down('#btnDespesas').show(); 
        //this.down('#btnVlrProgramado').show(); 
        var gridProgramacao =  Ext.create('ExtZF.view.plano.financeiro.List',
                                    {dockedItems:[],
                                        title       :'Programação',
                                        forceFit    : true,
                                        programacao_id : progId,
                                        autoShow    :false,
                                        flex        : 5,
                                        minHeight   : 220 
                                    }
                                );
        gridProgramacao.down("#btnIncluir").programacao_id=progId;
        


        var gridDespesas =  Ext.create('ExtZF.view.plano.despesas.List',
                                    {dockedItems:[],
                                        flex      : 7, 
                                        title       :'Execução',
                                        forceFit    : true,
                                        financeiro_id : progId,
                                        autoShow    :false,
                                        minHeight   : 280
                                    }
                                );
         
         
         var orcamentoPanel = Ext.create('Ext.panel.Panel',
                {
                    id  : 'panel_orcamento',
                    title : 'Planilha Orçamentária',
                    autoScroll:true,
                    autoWidth:true,
                    height:500, 
                    items:[gridProgramacao, gridDespesas]});
         me.progTab.add(orcamentoPanel);
    }
});