/*
 * código gerado automaticamente pelo template model.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.model.Email', {
            extend         : 'Ext.data.Model',
            fields         : ['id',
                                'from_user',
                                'to_users',
                                'subject',
                                'message',
                                'reference_id',
                                'send_date',
                                'inclusao_data',
                                'inclusao_usuario_id',
                                'alteracao_data',
                                'alteracao_usuario_id',
                                {name:'responsavel', persist:false},
                                {name:'supervisor', persist:false},
                            ],
            proxy          : {
    	    simpleSortMode : true, 
            type           : 'rest',
            url            :   'data/email',
            reader         : {
                              type    : 'json',
                              root    : 'rows',
                              successProperty: 'success'
                            },
            writer         : {
                                root     : 'rows',
                                type     : 'json',
                                encode   : true 
                                }
            }
});

