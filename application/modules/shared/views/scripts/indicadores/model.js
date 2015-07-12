/*
 * código gerado automaticamente pelo template model.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.model.Indicadores', {
            extend         : 'Ext.data.Model',
            fields         : ['id','id','programacao_id','descricao','tipo_indicador_id'],
            proxy          : {
    	    simpleSortMode : true, 
            type           : 'rest',
            url            :   'data/indicadores',
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