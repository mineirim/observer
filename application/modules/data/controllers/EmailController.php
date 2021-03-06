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
class Data_EmailController extends Zend_Rest_Controller
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
                $emailTable = new Data_Model_DbTable_Email();
                $rows = $emailTable->fetchAll(null, 'id');
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
                $emailTable = new Data_Model_DbTable_Email();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $emailTable->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $row = $emailTable->fetchRow("id=$id");
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
                $formData = json_decode($this->getRequest()->getPost('rows'),true);
                $modelEmail = new Data_Model_Email();               
                unset($formData['id']);
                foreach ($formData as $key => $value) {
                    if($value=='')
                       unset($formData[$key]);
                }
                $row = $modelEmail->sendToOwner($formData);
        
                $this->view->rows = $row;
                $this->view->success= $row['success'];
                if($row['success']){
                    $this->view->message="E-mail enviado com sucesso!";
                }else{
                    $this->view->message = 'Falha ao enviar o email'.PHP_EOL . $row['msg'];
                }
                $this->view->metodo = $this->getRequest()->getMethod();
        
            }  catch (Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->message     = $e->getTraceAsString();
//                echo ($e->getTraceAsString());
//                die;
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
                $emailTable = new Data_Model_DbTable_Email();
                $id = $this->_getParam('id');
                $emailTable->delete('id='.$id);
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

    public function headAction() {
        
    }

}

