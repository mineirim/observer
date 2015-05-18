
/* global Ext */

Ext.define('ExtZF.view.plano.dashboard.Checklist' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.planoDashboardChecklist',    
    width       : '100%',
    height      : 200,
    flex : 0,
    hideHeaders: true,
    store : 'Planejamento',
    columns: [
        {header: 'Instrumento', dataIndex: 'instrumento_id', flex:1,
            renderer: function(value, p, record){
                        var instrumentos = Ext.StoreMgr.get('Instrumentos');
                        var instrumento = instrumentos.findRecord('id',value);
//                        var formatedString = Ext.String.format('<div class="topic"><b>{0}:</b><span class="author"> {1}</span></div>',
//                         instrumento.get('singular'), record.get('menu'));
                        var formatedString = Ext.String.format('<div class="topic"><span class="author"> {0}</span></div>',
                          record.get('menu'));
                        return formatedString;                
           }
        }
    ],
//    plugins: [{
//            ptype: 'rowexpander',
//            rowBodyTpl : [
//                '<p><b>Descrição:</b> {descricao}</p>'
//            ]
//        }],
                
                    
                
    initComponent: function() {
        var me=this;
        Ext.apply(me, {
            viewConfig: {
                getRowClass: function(record, index) {      
                    if(record.get('peso')===null){
                        return 'alert-border alert-no-weight';
                    }
                    var data_inicio = new Date(Date.parse(record.get('data_inicio') + 'T00:00'));
                    var data_prazo = new Date(Date.parse(record.get('data_prazo') + 'T23:59:59'));
                    var agora =  new Date();
                    if(record.get('andamento_id') <  6){
                        if(data_inicio< agora && data_prazo > agora){
                            var percentual = (agora.getTime()-data_inicio.getTime())/(data_prazo.getTime()-data_inicio.getTime());
                            if(percentual>=0.8){
                                return 'alert-border alert-yellow';  
                            }else{
                                return 'alert-border alert-green';
                            }
                        } else if(data_prazo < agora){
                            return 'alert-border alert-red';
                        }else if(data_inicio>agora){
                            return 'alert-border alert-blank';
                        }
                    }else if(record.get('andamento_id')===6){
                        if(record.get('data_encerramento')){
                            return 'alert-border alert-no-date';
                        }
                        var data_encerramento =  new Date(Date.parse(record.get('data_encerramento') + 'T00:00')) ;
                        if(data_encerramento>data_prazo){
                            return 'alert-border alert-dark-blue';
                        }else{
                            return 'alert-border alert-blue';
                        }
                    }
                    return '';
                }
           }
        });
        me.callParent(arguments);
    }
});