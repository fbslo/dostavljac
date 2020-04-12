<?php
	require_once "dependencies.php";
	dependenciesLoad(["config.php"]);
	const DATABASE_TABLES = [
		"log" => ["columns" => [
			"id" => ["dateType" => "INT", "autoIncrement" => true],
			"data" => ["dataType" => "VARCHAR(767)"],
			"datetime" => ["dataType" => "DATETIME"]
		]],
	];
	function dbconn() {
    static $conn;
    if ($conn===NULL){ 
        $conn = new mysqli(DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME);
		}
		if ($conn->connect_error) {
			reportError($conn->connect_error);
		}
    return $conn;
	}
	function createTableIfNotExists($table) {
		$dbconn = dbconn();

	}
?>