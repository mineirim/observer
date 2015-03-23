<?php
/**
 *
 * @author marcone
 */
class Data_Model_Email
{
    
    public function getMailBody() {
        return $this->_mailBody;
    }

    public function setMailBody($mailBody) {
        $this->_mailBody = $mailBody;
        return $this;
    }

        
    private $_db_table;
    private $_programacaoId,  $_fromUser, $_subject, $_message, $_mailBody;
    private $_toUsers = [];
    public function getProgramacaoId() {
        return $this->_programacaoId;
    }
    /**
     * 
     * @param type $returnType ('string','array')
     * @return type
     */
    public function getToUsers($returnType='string') {
        if($returnType==='string'){
            return implode(',', $this->_toUsers);
        }else{
            return $this->_toUsers;
        }
    }

    public function getFromUser() {
        return $this->_fromUser;
    }

    public function getSubject() {
        return $this->_subject;
    }

    public function getMessage() {
        return $this->_message;
    }

    public function setProgramacaoId($programacaoId) {
        $this->_programacaoId = $programacaoId;
        return $this;
    }

    public function setToUsers($toUsers) {
        $this->_toUsers[]=  $toUsers;
        return $this;
    }
    public function addToUser($user){
        if(is_array($user)){
            $this->_toUsers=array_merge($this->_toUsers,$user);
        }else{
            $this->_toUsers[]= $user;
        }
        return $this;
    }
    public function setFromUser($fromUser) {
        $this->_fromUser = $fromUser;
        return $this;
    }

    public function setSubject($subject) {
        $this->_subject = $subject;
        return $this;
    }

    public function setMessage($message) {
        $this->_message = $message;
        return $this;
    }

    public function __construct() {
        
    }
    public function sendToOwner($postParams){
        $programacaoDbTable = new Data_Model_DbTable_Programacoes;
        $this->setProgramacaoId($postParams['reference_id']);
        $programacao = $programacaoDbTable->fetchRow('id='.$this->getProgramacaoId());
        $responsavel =$programacao->findParentRow('Data_Model_DbTable_Usuarios');
        if($responsavel){
//            $this->setToUsers($responsavel->email);
        }
        if($postParams['to_users']){
            $this->addToUser(explode(',', $postParams['to_users']));
        }
        $this->setSubject($postParams['subject'])
            ->setMessage($postParams['message']);
        if (Zend_Auth::getInstance()->hasIdentity()){
            $this->_idUsuario = Zend_Auth::getInstance()->getStorage()->read()->id;
        }
        $usuariosDbTable = new Data_Model_DbTable_Usuarios();
        /* @var $fromUser Data_Model_DbTable_Row_Usuario*/
        $fromUser = $usuariosDbTable->fetchRow('id='.$this->_idUsuario);
        $this->setFromUser($fromUser->email);
        
        $this->createBodyMessage($programacao);
        $data = $this->getArray();
        $msg = [];
        if($this->sendMail()){
            $data['send_date'] = date('Y-m-d H:i:s');
            $msg['success']=true;
        }else{
            $msg['success']=false;
            $msg['msg'] = $this->_errorMsg;
        }
        $id = $this->getEmailDBTable()->insert($data);
        $row = $this->getEmailDBTable()->fetchRow("id=$id");
        return array_merge($msg,$row->toArray());
    }
    private function getArray(){
        return ['from_user'=>  $this->getFromUser(),
                'to_users' => $this->getToUsers('string'),
                'subject'=> $this->getSubject(),
                'message'=> $this->getMailBody(),
                'reference_id' => $this->getProgramacaoId()
                ];
    }
    private function sendMail(){
        $mail = new \Zend_Mail('UTF-8');
        $mail->setFrom('sisplan@unasus.gov.br', 'Sistema de Planejamento');
        $mail->setBodyText(strip_tags($this->getMailBody()));
        $mail->setBodyHtml($this->getMailBody());
        foreach ($this->getToUsers('array') as $usermail){
            $mail->addTo($usermail);
        }
        $mail->setSubject('SISPLAN UNA-SUS -' .  $this->getSubject());        
        $config = array(
            'auth' => 'login',
                'username' => 'sisplan@unasus.gov.br',
                'password' => 'Unasu52014',
                'ssl' => 'tls',
                'port' => '587'
            );
        $transport = new Zend_Mail_Transport_Smtp('outlook.unasus.gov.br', $config);
        
        try {
                $mail->send($transport);
                
        } catch (\Exception $e) {
            $this->_errorMsg = $e->getMessage();
            return false;
        }
        return true;
    }
    public function getEmailDBTable(){
        if(!$this->_db_table)
            $this->_db_table = new Data_Model_DbTable_Email();
        return $this->_db_table;
    }
    /**
     * 
     * @param Data_Model_DbTable_Row_Programacao $programacao
     * @param string $message
     */
    private function createBodyMessage($programacao){
        $instrumento = $programacao->getInstrumento();
        $details = '<p><span>'.$instrumento->singular.'</span>' . $programacao->menu . '</ṕ>';
        $details .= '<p>' . $programacao->descricao;
        $msg =  '<html>
                <head>
                  <script type="application/ld+json">
                  {
                    "@context":       "http://schema.org",
                    "@type":          "EmailMessage",
                    "description":    "Ver no sistema",
                    "action": {
                      "@type": "ViewAction",
                      "url":   "http://sisplan.unasus.gov.br"
                    }
                  }
                  </script>
                    <title>Sisplan UNA-SUS</title>
                </head>
                <body>
                    <h4>SISPLAN / UNA-SUS</h4>
                    
                  <p>
                    '. $this->getMessage() .'.
                  </p>
                    <p>Esta é uma msg enviada autmoaticamente pelo sistema SISPLAN. Utilize "Responder a todos" para dar continuidade.</p>
                    <h3> RESUMO DO ÍTEM </h3>
                  ' . file_get_contents($this->attachReport()) . 
                '</body>
              </html>';
        $this->setMailBody($msg);
        
    }
    private function attachReport(){
        $basicReport = new \Etc\Reports\Basic();  
        $params = ['id' => $this->getProgramacaoId()];
        $basicReport->init($params);
        
//        $this->getResponse()->setHttpResponseCode(200);
        return $basicReport->saveHTML();
    }
    
}
