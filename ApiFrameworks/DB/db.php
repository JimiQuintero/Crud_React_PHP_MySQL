<?php

$pdo = null;
$host = "localhost";
$dbname = "crud_react_php";
$user = "root";
$password = "";


//Metodo para conectar a la base de datos con PDO

function conexion() {
    try {
        $GLOBALS['pdo'] = new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['dbname']. "", $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo 'Conexion con la DB OK!!' ;
        /* $mbd = new PDO("mysql:host=localhost;dbname=crud_react_php", "root", "");
        echo 'Conexion OK'; */
    } catch (PDOException $e) {
        // die('Error:' . $e->GetMessage());
        print "Error!: No se pudo conectar a la Base de Datos ".$dbname."<br/>";
        print "\nError!: ".$e."<br/>";
        die();
    }
}

//Metodo para desconectar a la base de datos con PDO

function disconnect() {
    $GLOBALS['pdo'] = null;
}

//Llamado a las funciones anteriores para hacer pruebas de conexión
//conexion();
//disconnect();

//Metodo GET
 function metodoGet($query) {
    try {
        conexion();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        disconnect();
        return $sentencia;
    } catch (Exception $e) {
       die("Error: ".$e);
    }
}

//Metodo POST
function metodoPost($query, $queryAutoIncrement) {
    try {
        conexion();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $idAutoIncrement=metodoGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);
        $resultado=array_merge($idAutoIncrement, $_POST);
        $sentencia->closeCursor();
        disconnect();
        return $resultado;
    } catch (Exception $e) {
       die("Error:".$e);
    }
}

//Metodo PUT
function metodoPut($query) {
    try {
        conexion();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $resultado=array_merge($_GET, $_POST);
        $sentencia->closeCursor();
        disconnect();
        return $resultado;
    } catch (Exception $e) {
       die("Error:".$e);
    }
}

//Metodo DELETE
function metodoDelete($query) {
    try {
        conexion();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $sentencia->closeCursor();
        disconnect();
        return $_GET['id'];
    } catch (Exception $e) {
       die("Error:".$e);
    }
} 

?>