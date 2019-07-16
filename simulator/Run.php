<?php
	shell_exec('python assembler.py');
	if ($_POST['compile_type']=='Once') {
		$myfile = fopen('compiled/breakpoint.txt', 'w');
		foreach ($_POST['line'] as $line_number => $param_value) {
			fwrite($myfile, $line_number."\n");
		}
		fclose($myfile);
	}
?>
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
				<div class="h_row">
				<label class="title">A:</label>
				<data class="reg_a">{{display_reg_a()}}</data>
				<select class="form-control show_type" v-on:change="reg_a_show_type_change($event)">
			      	<option>Binary</option>
			      	<option>Integer</option>
			      	<option>Charcter</option>
		    	</select>
				</div>
				<br>
				<div style="display: flex;">
					<data class="title">T:</data>
					<data class="reg_t">{{display_reg_t()}}</data>
					<select class="form-control show_type" v-on:change="reg_t_show_type_change($event)">
				      	<option>Binary</option>
				      	<option>Integer</option>
				      	<option>Charcter</option>
			    	</select>
		    	</div>
			</div>
			<div class="instruction_mem_box">
				<data class="title">Instruction memory index:</data>
				<input class="form-control ins_mem_inp" placeholder="index" v-model="ins_mem_index">
				<br>
				<data class="inst_mem">{{ins_mem[ins_mem_index]}}</data>
			</div>
			<div class="data_mem_box">
				<data class="title">Data memory index:</data>
				<input class="form-control ins_mem_inp" placeholder="index" v-model="data_mem_index">
				<br>
				<div>
					<data class="data_mem">{{display_data_mem()}}</data>
					<select class="form-control show_type" v-on:change="data_mem_show_type_change($event)">
					    <option>Binary</option>
					    <option>Integer</option>
					    <option>Charcter</option>
				    </select>
			    </div>
			</div>
			<div class="stage_box">
				<data style="margin-left: 5%;">Program Counter:</data>
				<data class="stage">{{pc}}</data>
			</div>
		</div>
		<div class="h_row">
			<div class="flags_box">
				<data class="title">c:</data>
				<data class="stage">{{c}}</data>
				<br>
				<data class="title">z:</data>
				<data class="stage">{{z}}</data>
			</div>
			<div class="new_var_box" style="display: flex;">
				<data class="new_var_title">Edit Variable?</data>
				<select class="form-control new_var_select" v-on:change="variable_select_change">
					<option v-for="variable in variables" v-bind:value="variable[0]">{{variable[0]}}</option>
				</select>
				<input class="form-control new_var_index" placeholder="New value In Integer" v-model="new_var_value">
				<button v-on:click="change_variable" type="button" class="btn btn-primary">Change</button>
			</div>
		</div>
		<button v-on:click="run" type="button" class="btn run" v-bind:class="get_btn_color()">{{btn_txt}}</button>
		<ul class="list-group app_box">
		    <li class="border border-secondary list-group-item line" v-for="(line, index) in file" v-bind:class="is_in_line(index)">
		    	<span class="badge badge-warning badge-pill run_time">
					Runed {{get_runed_time(index)}} Time
				</span>
				{{ line }}
				<span v-if="have_breakpoint(index)" class="badge badge-primary badge-pill have_breakpoint">
					Have Breakpoint
				</span>
			</li>
		</ul>
		<br><br>
	</div>
	<script type="text/javascript" src="script/vue.js"></script>
	<script type="text/javascript" src="script/Run.js"></script>
</body>
</html>