<?php

/**
 * Classe gerada automaticamente
 *
 * Gerada automaticamente pelo script ExtCRUD.
 *
 * @version $Rev:$
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
 */
class Shared_SistemasController extends Zend_Controller_Action
{

    public function init()
    {
        /**código gerado automaticamente pelo template init.tpl*/
        
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addContext('js', array('suffix' => 'js'))
                        ->addActionContext('Store', array( 'js'))
                        ->addActionContext('Model', array('js'))
                        ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }

    public function storeAction()
    {
        // action body
    }

    public function modelAction()
    {
        // action body
    }


}

