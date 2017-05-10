<?php

class Data_Model_Anexos {

	/**
	 * @var Data_Model_DbTable_Programacoes $_model
	 */
	private $_model;
	/**
	 * @var Zend_File_Transfer_Adapter_Http
	 */
	private $_fileTransfer;

	/**
	 * @var array
	 */
	private $_formData;

	/**
	 * @var mixed
	 */
	private $_isCKEditorFile;

	/**
	 * @param $formData
	 */
	public function __construct($formData) {
		$this->_formData     = $formData;
		$this->_model        = new Data_Model_DbTable_Anexos();
		$this->_fileTransfer = new Zend_File_Transfer_Adapter_Http();
	}

	/**
	 * @param $isCk
	 */
	public function setCKEditorFile($isCk = true) {
		$this->_isCKEditorFile = $isCk;
	}
	/**
	 * @return mixed
	 */
	public function isCKEditorFile() {
		return $this->_isCKEditorFile;
	}
	/**
	 * @param $data
	 * @param $id
	 * @return mixed
	 */
	public function save($data, $id = null) {
		if ($id) {
			$this->_model->update($data, 'id=' . $id);
		} else {

			$id = $this->_model->insert($data);
		}
		return $this->_model->fetchRow('id='.$id);
	}
	/**
	 * return Data_Model_DbTable_Row_Anexo
	 */
	public function fileExists() {
		return $this->_model->fetchRow('hash_sum=' . $this->_fileTransfer->getHash('sha1'));
	}
	/**
	 * @param $destination
	 */
	public function upload($destination = 'files') {

		$logger       = Zend_Registry::get('logger');
		$this->_fileTransfer->setDestination(APPLICATION_PATH . '/../' . $destination);
		if ($this->_fileTransfer->receive()) {
			$data = ['nome' => $this->_fileTransfer->getFileName(null, false),
				'caminho' => $destination,
				'mimetype' => $this->_fileTransfer->getMimeType(),
				'file_size' => $this->_fileTransfer->getFileSize(),
				'hash_sum' => $this->_fileTransfer->getHash(),
			];
			$anexo       = $this->save($data);
			$id          = $anexo->id;
			$newFilename = str_pad($id, '5', '0', STR_PAD_LEFT) . '-' . $this->_fileTransfer->getFileName(null, false);
			$newName     = $this->_fileTransfer->getDestination() . '/' . $newFilename;
			rename($this->_fileTransfer->getFileName(), $newName);
			$anexo = $this->save(['nome' => $newFilename], $id);
			if (isset($this->_formData['tags'])) {
				$anexoTags = new Data_Model_DbTable_AnexoTags();
				foreach ($this->_formData['tags'] as $value) {
					$anexoTags->insert(['anexo_id' => $id, 'tag_id' => $value]);
				}
			}

			if(isset($this->_formData['programacao_id'])){
				$programacaoAnexosTable = new Data_Model_DbTable_ProgramacaoAnexos();
				$programacaoAnexosTable->insert(['programacao_id' => $this->_formData['programacao_id'], 'anexo_id' => $id]);
			}
			return ['success'=>true, 'anexo'=>$anexo];
		} else {
			$messages                        = $this->_fileTransfer->getMessages();
			$logger->log($this->_fileTransfer, Zend_Log::ALERT);
			return ['success'=>false, 'msg'=>implode("\n", $messages) ];
		}
	}
}