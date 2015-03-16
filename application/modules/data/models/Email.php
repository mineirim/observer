<?php
/**
 *
 * @author marcone
 */
class Data_Model_Email
{
    private $_db_table;
    private $_programacaoId, $_toUsers, $_fromUser, $_subject, $_message;
    public function getProgramacaoId() {
        return $this->_programacaoId;
    }

    public function getToUsers() {
        return $this->_toUsers;
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
        $this->_toUsers = $toUsers;
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
    public function sendToOwner($id,$message){
        $this->setMessage($message);
        $programacaoDbTable = new Data_Model_DbTable_Programacoes;
        $programacao = $programacaoDbTable->fetchRow('id='.$id);
        $responsavel =$programacao->findParentRow('Data_Model_DbTable_Usuarios');
        $this->setToUsers($responsavel->email);

        if (Zend_Auth::getInstance()->hasIdentity()){
            $this->_idUsuario = Zend_Auth::getInstance()->getStorage()->read()->id;
        }
        $usuariosDbTable = new Data_Model_DbTable_Usuarios();
        /* @var $fromUser Data_Model_DbTable_Row_Usuario*/
        $fromUser = $usuariosDbTable->fetchRow('id='.$this->_idUsuario);
        $this->setFromUser($fromUser->email);
        $mailBody = $this->createMessage($programacao, $message);
        $mail = new \Zend_Mail('UTF-8');
        $mail->setFrom('sisplan@unasus.gov.br', 'Sistema de Planejamento');
//        $mail->setBodyText(strip_tags($mailBody));
        $mail->setBodyHtml($mailBody);
        $mail->addTo('conca@marconecosta.com.br', 'Marcone Costa');
        $mail->addTo('ingridnascimento@unasus.gov.br', 'Ingrid');
        $mail->setSubject('SISPLAN UNA-SUS');
        
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
                var_dump($e->getMessage());
                $retorno = false;
        }
        
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
    private function createMessage($programacao,$message){
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
                    <p>Esta é uma msg enviada autmoaticamente pelo sistema SISPLAN</p>
                    
                  <p>
                    '. $message .'.
                  </p>
                  ' . $details . 
                '</body>
              </html>';
        return $msg;
        
    }
    
}
