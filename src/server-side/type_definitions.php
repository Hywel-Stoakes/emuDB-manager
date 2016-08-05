<?php

// (c) 2016 Markus Jochim <markusjochim@phonetik.uni-muenchen.de>

class Upload {
	public $uuid;
	public $date;
	public $name;
	public $sessions;
}

class Session {
	public $name;
	public $bundles;
}

class BundleListItem {
	public $name;
	public $session;
	public $finishedEditing;
	public $comment;
}

class BundleList {
	public $name;
	public $status;
	public $items;
}

class Database {
	public $name;
	public $dbConfig;
	public $bundleLists;
	public $sessions;
}

class Dataset {
	public $name;
	public $databases;
	public $uploads;
}

class Result {
	public $success;
	public $message;
	public $data;
}

class AuthToken {
	public $projectName;
	public $projectDir;
}

class HelperResult {
	public $success; // Boolean
	public $data;    // Machine-readable (error string or result data)
	public $message; // human-readable error string (in case of success: empty string)
}

?>
