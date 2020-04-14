<?php
	require_once "dependencies.php";
	dependenciesLoad(["config.php"]);
	const DATABASE_TABLES = [
		"log" => ["columns" => [
			"id" => ["dataType" => "INT", "autoIncrement" => true, "primaryKey" => true, "notNull" => true],
			"data" => ["dataType" => "VARCHAR(767)", "autoIncrement" => false, "primaryKey" => false, "notNull" => true],
			"datetime" => ["dataType" => "DATETIME", "autoIncrement" => false, "primaryKey" => false, "notNull" => true]
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
	function createTablesIfNotExists() {
		$dbconn = dbconn();
		$command = "";
		foreach(array_KEYS(DATABASE_TABLES) as $databaseTable) {
			$safeTable = $dbconn->real_escape_string($databaseTable);
			$command .= "CREATE TABLE IF NOT EXISTS `$safeTable` ( ";
			foreach(array_keys(DATABASE_TABLES[$databaseTable]["columns"]) as $col) {
				$safeCol = $dbconn->real_escape_string($col);
				$command .= "`$safeCol` ".$dbconn->real_escape_string(DATABASE_TABLES[$databaseTable]["columns"][$col]["dataType"]);
				if(DATABASE_TABLES[$databaseTable]["columns"][$col]["autoIncrement"] == true) {
					$command .= " AUTO_INCREMENT";
				}
				if(DATABASE_TABLES[$databaseTable]["columns"][$col]["primaryKey"] == true) {
					$command .= " PRIMARY KEY";
				}
				if(DATABASE_TABLES[$databaseTable]["columns"][$col]["notNull"] == true) {
					$command .= " NOT NULL";
				}
				if(array_key_last(DATABASE_TABLES[$databaseTable]["columns"]) != $col ) {
					$command .= ",";
				} else {
					$command .= " );";
				}
			}
		}
		$dbconn->query($command);
	}
	function databaseInsert($table, $data) {
		$dbconn = dbconn();
		$safeColumns = array_map(array($dbconn, 'real_escape_string'), array_keys($data));
		$safeValues = array_map(array($dbconn, 'real_escape_string'), $data);
		$safeTable = $dbconn->real_escape_string($table);
		$columns = '(`'.implode('`, `', $safeColumns).'`)';
		$values = "('".implode("', '", $safeValues)."')";
		$command = "INSERT into `$table` $columns VALUES $values;";
		$dbconn->query($command);
	}

	function databaseUpdate($table, $data, $whereWhat, $isWhat) {
		$dbconn = dbconn();
		$safeColumns = array_map(array($dbconn, 'real_escape_string'), array_keys($data));
		$safeValues = array_map(array($dbconn, 'real_escape_string'), $data);
		$safeTable = $dbconn->real_escape_string($table);
		$safeIsWhat = $dbconn->real_escape_string($isWhat);
		$safeWhereWhat = $dbconn->real_escape_string($whereWhat);
		$magic = array(); // init
		for($i = 0; $i < sizeof($safeColumns); $i++) {
			$magic[] = '`'.$safeColumns[$i].'`'.'='."'".$safeValues[$i]."'";
		}
		$magicStuff = implode(", ", $magic);
		$command = "UPDATE `$table` SET $magicStuff WHERE $safeWhereWhat = $safeIsWhat;";
		$dbconn->query($command);
	}

	if(rand(1,100) == 69) { // idk
		createTablesIfNotExist();
	}

?>