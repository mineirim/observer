/*
 * código gerado automaticamente pelo template model.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.model.Sistemas', {
            extend         : 'Ext.data.Model',
            fields         : ['id','id','nome','chave','situacao_id','inclusao_data','inclusao_usuario_id','alteracao_data','alteracao_usuario_id'],
            proxy          : {
    	    simpleSortMode : true, 
            type           : 'rest',
            url            :   'data/sistemas',
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