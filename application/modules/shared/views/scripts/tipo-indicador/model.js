/*
 * código gerado automaticamente pelo template model.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.model.TipoIndicador', {
            extend         : 'Ext.data.Model',
            fields         : ['id','id','descricao'],
            proxy          : {
    	    simpleSortMode : true, 
            type           : 'rest',
            url            :   'data/tipoindicador',
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