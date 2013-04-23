Ext.define('ExtZF.view.plano.programacoes.Edit', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.planoProgramacoesEdit', // nome definido a janela
    id          : 'planoProgramacoesEdit',
    title       : 'Edição',
    layout      : 'fit',
    width       : 1020,
    minHeight   : 390,
    height      : 600,
    maxHeight   : 590,
    
    
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    showVlrProgramado   : function(){
        var me = this;
              //####### FORM DE VALORES 
       
       //this.down('#btnVlrProgramado').show(); 
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
        var andamento =  Ext.create('Ext.data.Store', {
            fields: ['id', 'descricao'],
            data : [
                {"id":"1", "descricao":"Iniciado"},
                {"id":"2", "descricao":"Parado"},
                {"id":"3", "descricao":"Concluído"}
            ]
        });


        var formDetail =  Ext.create('Ext.form.Panel', {
            id: 'frmDetail',
            padding:8,
            title:  'Prazo/peso',
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
                xtype: 'datefield',
                name : 'data_inicio',
                ref: 'data_inicio',
                fieldLabel: 'Data Início',
                format: 'd/m/Y'
            },
            {
                xtype: 'datefield',
                name : 'data_prazo',
                ref: 'data_prazo',
                fieldLabel: 'Data Prazo',
                format: 'd/m/Y'
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
                
            }
            ]            
            
        });
        this.progTab.add(formDetail);
    },
    initComponent: function() {
        
        var formDefault = Ext.create('Ext.form.Panel', {
            id: 'frmDefault',
            title : 'Programação',
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
                enableFont : false,
                enableFontSize: false,  
                name : 'descricao',
                ref: 'descricao',
                fieldLabel: 'Descrição',
                anchor:'95%'

            }, //só exibir se has_responsavel= true
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
            },//só exibir se has_supervisor=true
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
            }
            ]            
        });
        
        this.progTab = Ext.create('Ext.tab.Panel',
                {
                    id  : 'progTab',
                    height:300, 
                    items:[formDefault]});
        this.items = [this.progTab];
        // botões da janela
        this.buttons = [{
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
            scope: this,
            handler: this.close,
            iconCls : 'icon-cancel'
        }];

        this.callParent(arguments);
    },
    showGridProgramacao   : function(progId){
        this.down('#btnDespesas').show(); 
        //this.down('#btnVlrProgramado').show(); 
        var gridProgramacao =  Ext.create('ExtZF.view.plano.financeiro.List',
                                    {dockedItems:[],
                                        title       :'Programação',
                                        forceFit    : true,
                                        programacao_id : progId,
                                        autoShow    :false,
                                        flex        : 5
                                    }
                                );
        gridProgramacao.down("#btnIncluir").programacao_id=progId;
        


        var gridDespesas =  Ext.create('ExtZF.view.plano.despesas.List',
                                    {dockedItems:[],
                                        flex      : 7, 
                                        title       :'Execução',
                                        forceFit    : true,
                                        financeiro_id : progId,
                                        autoShow    :false
                                    }
                                );
         
         
         orcamentoPanel = Ext.create('Ext.panel.Panel',
                {
                    id  : 'panel_orcamento',
                    title : 'Planilha Orçamentária',
                    autoScroll:true,
                    autoWidth:true,
                    height:500, 
                    items:[gridProgramacao, gridDespesas]});
         this.progTab.add(orcamentoPanel);
    }
});