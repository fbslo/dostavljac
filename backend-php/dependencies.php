<?php
	const DEPENDENCIES_AVAILABLE = [
		"apiservices" => ["filename" => "apiservices.php"],
		"errors" => ["filename" => "errors.php"],
		"log" => ["filename" => "log.php"],
		"database" => ["filename" => "database.php"]
	];
	function loadDependencies($dependenciesToLoad) {
		foreach($dependenciesToLoad as $dependencyToLoad) {
			if(!in_array($dependencyToLoad, array_keys(DEPENDENCIES_AVAILABLE))) {
				reportError(-50, true);
			}
			if(!file_exists($dependencyToLoad["filename"])) {
				reportError(-51, true);
			}
			require_once $dependencyToLoad["filename"];
		}
	}
	loadDependencies(["errors"]);
?>