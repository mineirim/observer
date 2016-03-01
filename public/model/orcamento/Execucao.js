Ext.define('ExtZF.model.orcamento.Execucao', {
        extend         : 'Ext.data.Model',
        fields         : [
                            'id',
                            'menu',
                            {name:'valor_alocado', type : 'float'},
                            {name:'valor_executado', type: 'float'},
                            {
                                name: 'numeracao',
                                type: 'string',
                                convert: function( v, record ) {
                                    var str =record.get('menu');
                                    return str.substr(0,str.indexOf(' '));
                                }
                            },
                            {
                                name: 'saldo',
                                type: 'float',
                                convert: function( v, record ) {
                                    var valor_alocado =record.get('valor_alocado') ;
                                    var valor_executado = record.get('valor_executado') ;
                                    valor_alocado =  isNaN(valor_alocado) || valor_alocado==null ? 0 : parseFloat(valor_alocado);
                                    valor_executado = isNaN(valor_executado) || valor_executado==null ? 0 : parseFloat(valor_executado);
                                    return valor_alocado-valor_executado;
                                }
                            },
                            {
                                name: 'percentual',
                                type: 'float',
                                convert: function( v, record ) {
                                    var valor_alocado =record.get('valor_alocado') ;
                                    var valor_executado = record.get('valor_executado') ;
                                    valor_alocado =  isNaN(valor_alocado) || valor_alocado==null ? 0 : parseFloat(valor_alocado);
                                    valor_executado = isNaN(valor_executado) || valor_executado==null ? 0 : parseFloat(valor_executado);
                                    return (valor_executado/valor_alocado)*100;
                                }
                            },
                            {
                                name: 'percentual_saldo',
                                type: 'float',
                                convert: function( v, record ) {
                                    var valor_alocado =record.get('valor_alocado') ;
                                    var valor_executado = record.get('valor_executado') ;
                                    valor_alocado =  isNaN(valor_alocado) || valor_alocado==null ? 0 : parseFloat(valor_alocado);
                                    valor_executado = isNaN(valor_executado) || valor_executado==null ? 0 : parseFloat(valor_executado);
                                    return ((valor_alocado-valor_executado)/valor_alocado)*100;
                                }
                            },


                        ],
        proxy          : {
                simpleSortMode : true, 
                type           : 'rest',
                url            :   'data/orcamento',
                extraParams: {
                        data_to: 'execucao',
                    },
                                reader         : {
                                        type    : 'json',
                                        root    : 'rows',
                                        successProperty: 'success'
                                },
                                        writer   : {
                                        root     : 'rows',
                                        type     : 'json',
                                        encode   : true 
                                }
                },
});