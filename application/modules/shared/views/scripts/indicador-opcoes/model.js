/*
 * código gerado automaticamente pelo template model.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.model.IndicadorOpcoes', {
            extend         : 'Ext.data.Model',
            fields         : ['id','id','indicador_id','descritivo','selecionado'],
            proxy          : {
    	    simpleSortMode : true, 
            type           : 'rest',
            url            :   'data/indicador-opcoes',
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