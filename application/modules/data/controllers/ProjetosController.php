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
class Data_ProjetosController extends Zend_Rest_Controller
{

    public function init()
    {
        /**código gerado automaticamente pelo template init.tpl*/
        
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                        ->addActionContext('put', array( 'json', 'xml'))
                        ->addActionContext('post', array('json', 'xml'))
                        ->addActionContext('get', array('json', 'xml'))
                        ->addActionContext('delete', array( 'json', 'xml'))
                        ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
        /**código gerado automaticamente */
                $projetosTable = new Data_Model_DbTable_Projetos();
                $rows = $projetosTable->fetchAll(null, 'id');
                $this->_helper->viewRenderer->setNoRender(true);
                $this->view->rows= $rows->toArray();
                $this->view->total = count($rows);
    }

    public function getAction()
    {
        // action body
    }

    public function putAction()
    {
        /**código gerado automaticamente pelo template put.tpl*/
        
        if(($this->getRequest()->isPut())){
            try{
                $projetosTable = new Data_Model_Projetos();                
                
                $formData = $this->getRequest()->getParams();
                
                $row = $projetosTable->update($formData);
                if ($formData) {
                    $this->view->msg = "Dados atualizados com sucesso!";
                }
                $this->view->rows = $row->toArray();
                $this->view->success=true;
        
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>".$e->getMessage();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod()."<br> Esperado PUT";
        }
    }

    public function postAction()
    {        
        if($this->getRequest()->isPost()){
            try{
                $projetosTable = new Data_Model_Projetos();
                $formData = $this->getRequest()->getPost();
                $row = $projetosTable->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
                $this->view->rows = $row->toArray();
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
        
            }  catch (Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>" .$e->getMessage();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod()."<br>Esperado POST";
        }
    }

    public function deleteAction()
    {
        /**código gerado automaticamente pelo template delete.tpl*/
        
        if($this->getRequest()->isDelete()){
            try{
                $projetosTable = new Data_Model_DbTable_Projetos();
                $id = $this->_getParam('id');
                $projetosTable->delete('id='.$id);
                $this->view->success=true;
                $this->view->msg="Dados apagados com sucesso!";
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->msg = "Erro ao apagar o registro<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->parametros = $this->_getAllParams();
        }
    }

    public function headAction()
    {
        $this->getResponse()->setHttpResponseCode(200);
    }

}

