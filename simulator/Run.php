<?php shell_exec('python index.py') ?>
<!DOCTYPE html>
<html>
<head>
	<title>Simulator - Run</title>
	<link rel="stylesheet" type="text/css" href="style/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="style/Run.css">
</head>
<body>
	<div id="app">
		<div class="h_row">
			<div class="regs_box">
				<data style="margin-left: 5%;">Register A :</data>
				<data class="reg_a">{{reg_a}}</data>
				<br>
				<data style="margin-left: 5%;">Register T :</data>
				<data class="reg_t">{{reg_t}}</data>
				<br>
			</div>
			<div class="instruction_mem_box">
				<data style="margin-left: 5%;">Instruction memory index:</data>
				<input class="form-control ins_mem_inp" id="memoy_index_inp" placeholder="index" v-model="ins_mem_index">
				<br>
				<data style="margin-left: 5%;">Data :</data>
				<data class="inst_mem">{{ins_mem[ins_mem_index]}}</data>
			</div>
			<div class="instruction_mem_box">
				<data style="margin-left: 5%;">Data memory index:</data>
				<input class="form-control ins_mem_inp" id="memoy_index_inp" placeholder="index" v-model="data_mem_index">
				<br>
				<data style="margin-left: 5%;">Data :</data>
				<data class="data_mem">{{data_mem[data_mem_index]}}</data>
			</div>
			<div class="stage_box">
				<data style="margin-left: 5%;">Code is in line:</data>
				<data class="stage">{{stage}}</data>
			</div>
		</div>
		<div class="h_row">
			<div class="pc_box">
				<data style="margin-left: 5%;">Program Counter :</data>
				<data class="pc">{{pc}}</data>
			</div>
		</div>
		<button v-on:click="run" type="button" class="btn btn-dark run">Run</button>
	</div>
	<script type="text/javascript" src="script/vue.js"></script>
	<script type="text/javascript" src="script/Run.js"></script>
</body>
</html>
