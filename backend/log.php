<?php
	const LOG_FILES = [
		"error" => ["filename" => "logs/error.log"],
	];
	if(!file_exists("logs")) {
		if(!mkdir("logs", 0770, true)) {
			reportError(-52, false);
		}
	}
	function logData($what, $data) {
		if(!error_log(rawurlencode($what), 3, "error.log")) {
			reportError(-53);
		}
	}
?>