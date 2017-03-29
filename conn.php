<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-29 21:34:28
 * @version $Id$
 */

$conn = mysqli_connect("localhost","root", "root","moodle");
if(empty($conn)) {
	die("mysqli_connect falid: " . mysqli_connect_error());
    }
    echo("connected to " . mysqli_get_host_info($conn));
    mysqli_close($conn);
}
?>