/*
 * código gerado automaticamente pelo template model.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.model.Projetos', {
            extend         : 'Ext.data.Model',
            fields         : ['id','nome','coordenador_usuario_id','situacao_id', 'apresentacao', 'data_inicio', 'data_fim'],
            proxy          : {
    	    simpleSortMode : true, 
            type           : 'rest',
            url            :   'data/projetos',
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