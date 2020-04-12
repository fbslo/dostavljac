<?php
	require_once("dependencies.php");
	$dependencies = array("apiservices", "errors");
	loadDependencies($dependencies);
	ini_set("session.use_cookies", 0); // we don't want cookies because of CSRF!
	ini_set("session.use_only_cookies", 0);
	ini_set('html_errors', false); // we don't want any XSS
	ini_set('session.gc_maxlifetime', 604800); // one week of inactivity
	ignore_user_abort(true); // maybe critical stuff is going on, we don't want race conditions
	set_time_limit(69);
	
	$servicesHere = [
		"register" => ["arguments" => ["fullName", "email", "phone", "dateOfBirth"]],
		"login" => ["arguments" => ["userID", "password"]],
		"getUserId" => ["arguments" => ["email", "phone", "fullName"]],
		"resetPassword" => ["arguments" => ["userID", "dateOfBirth", "phone", "email"]],
		"getUserInfo" => ["arguments" => ["userID"]],
		"listEndpointServices" => ["arguments" => []],
		"listErrors" => ["arguments" => []]
	];

	$serviceName = $_REQUEST["service"];
	$sessionID = $_REQUEST["session"];

	if(!in_array($serviceName, $servicesHere)) {
		endpointError(-40);
	}

	if(!(preg_match('/^[-,a-zA-Z0-9]{1,128}$/', $sessionID) > 0)) {
		endpointError(-41);
	} else {
		session_id($sessionID);
		session_start();
	}

	$argumentsToBePassed = [];
	foreach($servicesHere["serviceName"] as $argumentToBePassed) {
		$argumentsToBePassed[] = $_REQUEST[$argumentToBePassed];
	}

	call_user_func_array( [ $APIServices, $serviceName ],  $argumentsToBePassed);

?>