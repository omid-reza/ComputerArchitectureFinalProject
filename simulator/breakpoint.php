<!DOCTYPE html>
<html>
<head>
	<title>Simulator - Set BreakPoint</title>
	<link rel="stylesheet" type="text/css" href="style/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="style/BreakPoint.css">
</head>
<body>
	<div class="list-group">
		<form method="POST" action="Run.php">
			<?php
				$tempFile = fopen('compiled/app.txt', 'w');
				if ((isset($_POST['compile_type']) && ($_POST['compile_type']=='Line By Line'))){
					echo '<div class="alert alert-primary breakPoint_line_box HaveMargin" role="alert">There is no BreakPoint For Run Line By Line.Lets Start Run By Click on Run Button</div>';
				}
				if (isset($_FILES["file"])) {
					if ((isset($_POST['compile_type']) && ($_POST['compile_type']=='Once'))) {
						echo '<br><data  class="list-group-item list-group-item-action list-group-item-dark breakPoint_line_box">HavBreak<data class="breakPoint_line_title">Command</data><data class=" line_number_title">Command number</data></data>';
					}
					$myfile = fopen($_FILES["file"]["tmp_name"], 'r');
					$breakpoint_lbl= fopen('compiled/breakpoint.txt', 'w');
					$i=0;
					while(!feof($myfile)) {
						$line=fgets($myfile);
						if ((isset($_POST['compile_type']) && ($_POST['compile_type']=='Line By Line'))) {
							if (substr($line, 1,3)!="ORG" && substr($line, 1,4)!="DATA") {
								fwrite($breakpoint_lbl, $i."\n");
								$i++;		
							}
						}
						if ((isset($_POST['compile_type']) && ($_POST['compile_type']=='Once'))) {
							if (substr($line, 1,3)!="ORG" && substr($line, 1,4)!="DATA") {
							 	echo '<br><data  class="list-group-item list-group-item-action list-group-item-dark breakPoint_line_box HavePadding"><input class="form-check-input" type="checkbox" name=line['.$i.'] id="defaultCheck1"><data class="breakPoint_line_title">'.$line.'</data><span class="badge badge-light line_number">'.($i+1).'</span></data>';
								$i++;
							}
						}
					  fwrite($tempFile, $line);
					}
					fclose($myfile);
					fclose($breakpoint_lbl);
				}
				fclose($tempFile);
			?>
		<input type="hidden" name="compile_type" value="<?php echo $_POST['compile_type'] ?>">
		<input class="btn btn-primary btn-send run_btn" type="submit" name="send" value="Run">
		<br>
		<br>
		</form>
	</div>
</body>
</html>