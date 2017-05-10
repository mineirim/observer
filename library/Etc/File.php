<?php

/**
 * Definição da Classe File
 *
 * @version $Revision$
 * @author $Author$
 * @since $Date$
 */

namespace Etc;


class File {

	/**
	 * MimeType do arquivo
	 * @var string
	 */
	private $mimeType;

	/**
	 * Extensão do arquivo
	 * @var string
	 */
	private $extension;

	/**
	 * Nome do arquivo
	 * @var string
	 */
	private $name;

	/**
	 * Caminho do arquivo
	 * @var string
	 */
	private $path;

	/**
	 * Arquivo original
	 * @var string
	 */
	private $_originalFile;

	/**
	 * Arquivo via Web
	 * @var boolean
	 */
	private $_isHttp = false;

	/**
	 * Conteúdo do arquivo
	 * @var mixed
	 */
	private $_content;

	/**
	 * Cabeçalho da requisição do arquivo
	 * @var mixed
	 */
	private $_headers = array();

	/**
	 * Construtor da classe
	 * 
	 * @param string $file
	 */
	public function __construct($file) {
		$this->_originalFile = $file;

		$this->_content = @file_get_contents($file);
		if (substr($file, 0, 4) == 'http') {
			$this->_isHttp = true;
			$this->_headers = $http_response_header;
		}

		$this->setName($file);
		$this->setPath($file);
		$this->setExtension($file);
		$this->setMimeType($this->getExtension());
	}

	/**
	 * Funcao que seta a extensao do arquivo
	 * 
	 * @param string $ext
	 * @return \Pcs\File
	 */
	public function setMimeType($ext) {
		switch (strtolower($ext)) {
			case 'dwg':
			case 'pdf':
				$this->mimeType = 'application/' . $ext;
				break;
			case 'jpg':
			case 'jpeg':
			case 'bmp':
			case 'gif':
			case 'png':
			case 'svg':
			case 'wmf':
				$this->mimeType = 'image/' . $ext;
				break;
		}
		return $this;
	}

	/**
	 * Funcao devolve o tamanho do arquivo
	 * 
	 * @return int
	 */
	public function getFileSize() {
		if ($this->_isHttp) {
			return mb_strlen($this->_content);
		}
		return filesize($this->_originalFile);
	}

	/**
	 * Funcao que devolve a extensao do arquivo
	 * 
	 * @return string
	 */
	public function getMimeType() {
		return strtolower($this->mimeType);
	}

	/**
	 * Seta a extensão do arquivo
	 * 
	 * @param string $name
	 * @return \Pcs\File
	 */
	public function setExtension($name) {
		if ($this->_isHttp) {
			$value = $this->getHeader('Content-Type');
			$xpl = explode(';', $value);
			$this->extension = str_replace(array('application/', 'image/'), '', trim($xpl[0]));
		} else {
			$fileData = explode('.', $name);
			$this->extension = array_pop($fileData);
		}
		return $this;
	}

	/**
	 * Retorna a extensão do arquivo
	 * @return string
	 */
	public function getExtension() {
		return $this->extension;
	}

	/**
	 * Retorna o conteúdo do arquivo
	 * @return mixed
	 */
	public function getContent() {
		return $this->_content;
	}

	/**
	 * Seta o nome do arquivo
	 * @param string $name
	 * @return \Pcs\File
	 */
	public function setName($name) {
		if ($this->_isHttp) {
			$header = $this->getHeader('Content-disposition');
			$data = explode('filename="', $header);
			if ($data > 1) {
				$filename = $data[1];
				if (substr($filename, -1) == '"') {
					$filename = substr($filename, 0, -1);
				}
				$this->name = $filename;
			} else {
				$this->name = $name;
			}
		} else {
			if (strpos($this->_originalFile, DIRECTORY_SEPARATOR) !== false) {
				$dirdata = explode(DIRECTORY_SEPARATOR, $name);
				$name = array_pop($dirdata);
			}
			$this->name = $name;
		}
		return $this;
	}

	/**
	 * Retorna o nome do arquivo
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Seta o caminho do arquivo
	 * @param string $path
	 * @return \Pcs\File
	 */
	public function setPath($path) {
		if (!$this->_isHttp) {
			$path = basename($path);
		}
		$this->path = $path;
		return $this;
	}

	/**
	 * Retorna um item do cabeçalho da requisição do arquivo
	 * 
	 * @param string $name
	 * @return string
	 */
	public function getHeader($name) {
		$value = null;
		foreach ($this->_headers as $header) {
			$xpl = explode(':', $header);
			$nameFrom = strtolower($xpl[0]);
			if (strtolower($name) == $nameFrom) {
				$value = trim($xpl[1]);
				break;
			}
		}
		return $value;
	}

}
