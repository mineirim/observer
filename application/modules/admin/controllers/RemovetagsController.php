<?php

/**
 * Description of Removetags
 *
 * @author marcone
 */
class Admin_RemovetagsController extends Zend_Controller_Action
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addContext('js', array('suffix' => 'js'))
                        ->addActionContext('Controller', array( 'js'))
                        ->addActionContext('List', array( 'js'))
                        ->addActionContext('Edit', array('js'))
                        ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }
    public function indexAction(){
        $this->_helper->viewRenderer->setNoRender(true);
        $classe = $this->getParam('classe');
        if(!$classe){
            throw new Exception( 'passar a classe');
        }
        $coluna = $this->getParam('coluna');
        Data_Model_DatabaseStringFormat::removeFontFormat($classe, $coluna);
//        Data_Model_DatabaseStringFormat::removeFontFormat('Data_Model_DbTable_Operativos', 'avaliacao_andamento');
        echo 'atualizado';
    }
    
}
