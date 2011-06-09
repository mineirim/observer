<?php

class Data_ProgramacoesController extends Zend_Rest_Controller
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
                        ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
        $programacoes_table = new Data_Model_DbTable_Programacoes();
        $rows = $programacoes_table->fetchAll("programacao_id is null", 'id');
        $this->_helper->viewRenderer->setNoRender(true);
               
        $this->view->text = ".";
        $arr_root=array();
        foreach ($rows as $key => $value) {
            
            $child = array(
                        'id'=>$value->id,
                        'menu'=>$value->menu,
                        'descricao'=>$value->descricao,
                        'ordem'=>$value->ordem,
                        'instrumento_id'=>$value->instrumento_id,
                        'programacao_id'=>$value->programacao_id,
                        'setor_id'=>$value->setor_id,
                        'expanded'=>true
                );
                
            $child_rows =  $programacoes_table->fetchAll('instrumento_id ='.$value->id, 'id');
            if($child_rows){
                $child['children']=array();
                foreach ($child_rows as $key => $value) {
            
                    $childr = array('expanded'=> true,
                                'id'=>$value->id,
                                'menu'=>$value->menu,
                                'descricao'=>$value->descricao,
                                'ordem'=>$value->ordem,
                                'instrumento_id'=>$value->instrumento_id,
                                'programacao_id'=>$value->programacao_id,
                                'setor_id'=>$value->setor_id,
                                'leaf'=>true
                        );
                        array_push($child['children'],$childr);
                }
            }
                
            $arr_root[] = $child;
        }
        $this->view->children= $arr_root;
    }

    public function getAction()
    {
        // action body
    }

    public function putAction()
    {
        //gerado automaticamente
        if(($this->getRequest()->isPut())){
            try{
                $programacoes_table = new Data_Model_DbTable_Programacoes();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $programacoes_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $programacoes_table->fetchRow("id=$id");
                $this->view->record = $obj->toArray();
                $this->view->success=true;
        
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>".$e->getMessage() ."<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
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
                $this->view->record = $obj;
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
        
            }  catch (Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>".$e->getMessage()."<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }

    public function deleteAction()
    {
        if($this->getRequest()->isDelete()){
            try{
                $programacoes_table = new Data_Model_DbTable_Programacoes();
                $id = $this->_getParam('id');
                $programacoes_table->delete('id='.$id);
                $this->view->success=true;
                $this->view->msg="Dados apagados com sucesso!";
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->msg = "Erro ao apagar o registro<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método delete";
            $this->view->parametros = $this->_getAllParams();
        }
    }


}

