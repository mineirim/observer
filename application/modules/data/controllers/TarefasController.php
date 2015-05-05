<?php

class Data_TarefasController extends Zend_Rest_Controller
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                        ->addActionContext('put', array( 'json', 'xml'))
                        ->addActionContext('post', array('json', 'xml'))
                        ->addActionContext('get', array('json', 'xml'))
                        ->addActionContext('delete', array( 'json', 'xml'))
                        ->addActionContext('search', array( 'json', 'xml'))
                        ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }
    public function headAction()
    {
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function indexAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        try{
            $tarefasModel = new Data_Model_Tarefas();
            if($this->_hasParam('get_my')) // filtro por supervisor e responsável
            {
                $column = $this->getParam('owntype').'_usuario_id';
                $where=false;
                if($this->getParam('projeto_id')){
                    $where = ' AND projeto_id=' .$this->getParam('projeto_id');
                }
                $this->view->rows = $tarefasModel->getBy($column, $where);
            }
            $this->view->success= true;
            $this->getResponse()->setHttpResponseCode(200);
        }catch(Exception $e){
            echo $e->getMessage();die;
            $this->getResponse()->setHttpResponseCode(502);
            $this->view->success=false;
            $this->view->msg = $e->getMessage();
        }
    }
    

    public function getAction() 
    {
        if($this->_hasParam('node'))
                return $this->_forward('index');
        $programacoes_table = new Data_Model_Programacoes();
        $rows = $programacoes_table->getProgramacao($this->_getParam('id'), true);
        $this->_helper->viewRenderer->setNoRender(true);
        $this->view->success=true;
        $this->view->rows= $rows;
        $this->getResponse()->setHttpResponseCode(200);
    }
    public function putAction() 
    {
        //TODO retirar os campos que não são da tabela
        //gerado automaticamente
        if(($this->getRequest()->isPut())){
            try{
                $programacoes_table = new Data_Model_DbTable_Programacoes();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                if($formData['programacao_id']=="")
                    unset($formData['programacao_id']);
                $programacoes_table->update($formData, "id=$id");
                
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $programacoes_table->fetchRow("id=$id");
                $this->view->rows = $obj->toArray();
                $this->view->success=true;
                $this->getResponse()->setHttpResponseCode(200);
        
            }  catch (Exception $e){
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->dados =$formData;
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>".$e->getMessage() ."<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function postAction() 
    {
        //gerado automaticamente
        if($this->getRequest()->isPost()){
            try{
        
                $programacoes_table = new Data_Model_DbTable_Programacoes();
                $formData = $this->getRequest()->getPost('rows');
                $formData = json_decode($formData,true);
                unset($formData['id']);
                foreach ($formData as $key => $value) {
                    if($value=='')
                       unset($formData[$key]);
                }
                $id = $programacoes_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $programacoes_table->fetchRow("id=$id");
                $this->view->rows = $obj->toArray();
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
                $this->getResponse()->setHttpResponseCode(200);
        
            }  catch (Exception $e){
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>".$e->getMessage()."<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function deleteAction() 
    {
        if($this->getRequest()->isDelete()){
            try{
                $programacoes_table = new Data_Model_Programacoes();
                $id = $this->_getParam('id');
                $programacoes_table->delete((int)$id);
                $this->view->success=true;
                $this->view->msg="Dados apagados com sucesso!";
                $this->getResponse()->setHttpResponseCode(204);
            }  catch (Exception $e){
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->success=false;
                $this->view->msg = "Erro ao apagar o registro<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método delete";
            $this->view->parametros = $this->_getAllParams();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }


}
