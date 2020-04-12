<?php
	require_once("dependencies.php");
	$dependencies = array("log");
	loadDependencies($dependencies);
	const STATUS_CODES = [
		-40 => [ "responseCode" => 403, "info" => "this endpoint does not cover this service" ],
		-41 => [ "responseCode" => 400, "info" => "session id is in wrong format!" ],
		-50 => [ "responseCode" => 503, "info" => "unknown internal dependency was requested" ],
		-51 => [ "responseCode" => 503, "info" => "dependency file requested does not exist" ],
		-52 => [ "responseCode" => 503, "info" => "creating an internal log folder failed" ],
		-53 => [ "responseCode" => 503, "info" => "writing to an internal log file failed" ]
	];
	function reportError($errorID, $reportToAdmins) {
		http_response_code(STATUS_CODES[$errorID]["responseCode"]);
		header("Content-Type: application/json");
		$response = ["status" => $errorID, "data" => STATUS_CODES[$errorID]];
		if($reportToAdmins) {
			logData("error", $errorID);
		}
		exit(json_encode($response));
	}
?>