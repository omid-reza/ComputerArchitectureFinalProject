const app=new Vue({
  el: '#app',
  data: {
    c:0,
    z:0,
    pc:0,
    reg_a:0,
    reg_t:0,
    file:[],
    org:null,
    ins_mem:[],
    data_mem:[],
    run_time:[],
    variables:[],
    btn_txt:"Run",
    reg_a_show_idex:"",
    reg_t_show_idex:"",
    current_command:"",
    new_var_value:null,
    ins_mem_index:null,
    data_mem_index:null,
    data_mem_show_idex:"",
    reg_a_show_type:"Binary",
    reg_t_show_type:"Binary",
    breakpoint_line_numbers:[],
    data_mem_show_type:"Binary",
    variable_name_to_change:null
  },
  methods:{
    run(e) {
      if (this.btn_txt=="Run") {
        while(this.breakpoint_line_numbers.includes(this.pc)==false && (this.current_command!=''||this.pc==0)){
          this.current_command=this.ins_mem[this.pc];
          this.run_command();
        }
        this.current_command=this.ins_mem[this.pc];
        this.run_command();
        if (this.current_command=='')
          this.btn_txt="Finish";
      }
    },
    reg_a_show_type_change(event){
      this.reg_a_show_type=event.target.value;
    },
    reg_t_show_type_change(event){
      this.reg_t_show_type=event.target.value;
    },
    data_mem_show_type_change(event){
      this.data_mem_show_type=event.target.value;
    },
    variable_select_change(event){
      this.variable_name_to_change=event.target.value;
    },
    run_command(){
      this.run_time[this.pc]++;
      switch(this.current_command.substring(0,4)){
        case"0000"://JMP
          this.pc=(parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2));
        break;
        case"0001"://ADC
          this.reg_a=parseInt(this.reg_a,2)+parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.update_c();
          this.check_z();
          this.pc++;
        break;
        case"0010"://XOR
          this.reg_a=parseInt(this.reg_a,2)^parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.update_c();
          this.check_z();
          this.pc++;
        break;
        case"0011"://SBC
          this.reg_a=parseInt(this.reg_a,2)-parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2)-this.c;
          this.reg_a=this.reg_a.toString(2);
          this.update_c();
          this.check_z();
          this.pc++;
        break;
        case"0100"://ROR
          var temp;
          temp=this.c;
          this.c=this.reg_a.substring(0,1);
          this.reg_a=this.reg_a.substring(1,this.reg_a.length)+temp;
          this.check_z();
          this.pc++;
        break;
        case"0101"://TAT
          this.reg_t=this.reg_a;
          this.pc++;
        break;
        case"0110"://OR
          this.reg_a=parseInt(this.reg_a,2)|parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.update_c();
          this.check_z();
          this.pc++;
        break;
        case"1000"://AND
          this.reg_a=parseInt(this.reg_a,2)&parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.update_c();
          this.check_z();
          this.pc++;
        break;
        case"1001"://LDC
          this.reg_a=this.data_mem[parseInt(this.current_command.substring(4,16), 2)];
          this.c=0;
          this.pc++;
        break;
        case"1010"://BCC
          if (this.c==1)
            this.pc=(parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2));
          else
            this.pc++;
        break;
        case"1011"://BNE
          if (this.z==0)
            this.pc=(parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2));
          else
            this.pc++;
        break;
        case"1100"://LDI
          this.reg_a=this.data_mem[parseInt(this.reg_a,2)];
          this.pc++;
        break;
        case"1101"://STT
          this.data_mem[parseInt(this.reg_a, 2)]=this.reg_t;
          this.pc++;
        break;
        case"1110"://LDA
          this.reg_a=this.data_mem[parseInt(this.current_command.substring(4,16), 2)];
          this.pc++;
        break;
        case"1111"://STA
          this.data_mem[parseInt(this.current_command.substring(4,16), 2)]=this.reg_a;
          this.pc++;
        break;
      }
    },
    display_reg_a(){
        switch(this.reg_a_show_type){
        case "Binary":
          return this.reg_a;
          break;
        case "Integer":
          return parseInt(this.reg_a, 2);
          break;
        case "Charcter":
          return String.fromCharCode(parseInt(this.reg_a, 2));
          break;
      }
    },
    display_reg_t(){
        switch(this.reg_t_show_type){
        case "Binary":
          return this.reg_t;
          break;
        case "Integer":
          return parseInt(this.reg_t, 2);
          break;
        case "Charcter":
          return String.fromCharCode(parseInt(this.reg_t, 2));
          break;
      }
    },
    display_data_mem(){
        switch(this.data_mem_show_type){
        case "Binary":
          return this.data_mem[this.data_mem_index];
          break;
        case "Integer":
          return parseInt(this.data_mem[this.data_mem_index], 2);
          break;
        case "Charcter":
          return String.fromCharCode(parseInt(this.data_mem[this.data_mem_index], 2));
          break;
      }
    },
    fill_instruction_memory(){
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
          app.ins_mem=xmlhttp.responseText.split('\n');
      }
      xmlhttp.open("GET", "../compiled/binary.txt", true);
      xmlhttp.send();
    },
    fill_data_memory(){
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      var temp_array=[];
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
          temp_array=xmlhttp.responseText.split('\n');
        for (var i=0; i< temp_array.length;i++) {
          app.data_mem[parseInt((temp_array[i].substring(0, 12)), 2)]=temp_array[i].substring(12, 28);
        }
      }
      xmlhttp.open("GET", "../compiled/data.txt", true);
      xmlhttp.send();
    },
    fetch_break_points(){
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      var tmp_array=[];
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
          tmp_array=xmlhttp.responseText.split('\n');
        for (var k=0; k< tmp_array.length-1;k++) {
          app.breakpoint_line_numbers.push(parseInt(tmp_array[k]));
        }
      }
      xmlhttp.open("GET", "../compiled/breakpoint.txt", true);
      xmlhttp.send();
    },
    read_file(){
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      var file_temp_array=[];
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
          file_temp_array=xmlhttp.responseText.split('\n');
        var splited_line;
        for (var k=0; k< file_temp_array.length;k++) {
          splited_line=file_temp_array[k].split(' ');
          if (file_temp_array[k].search(".ORG")==0){
            app.org=parseInt(splited_line[1]);
          }else if (file_temp_array[k].search(".DATA")==0){
            app.variables.push([splited_line[1], app.org]);
            app.org++;
          }else{
            app.file.push(file_temp_array[k]);
            app.run_time.push(0);
          }
        }
        try{
          if (app.variables.length>0)
            app.variable_name_to_change=app.variables[0][0];
        }catch(exection){}
      }
      xmlhttp.open("GET", "../compiled/app.txt", true);
      xmlhttp.send();
    },
    is_in_line(index){
      if (this.btn_txt=="Finish")
        return "list-group-item-success";
      if(index==this.pc && this.btn_txt=="Run")
        return 'list-group-item-primary';
    },
    check_z(){
      if(this.reg_a==0 & this.c==0)
        this.z=1;
      else
        this.z=0;
    },
    update_c(){
      if (this.reg_a.length==17){
        this.c=this.reg_a.charAt(0);
        this.reg_a=this.reg_a.substring(1,17);
      }
    },
    have_breakpoint(index){
      return(this.breakpoint_line_numbers.includes(index));
    },
    change_variable(){
      for (var q = 0; q < this.variables.length; q++) {
        if (this.variables[q][0]==this.variable_name_to_change)
          this.data_mem[this.variables[q][1]]=parseInt(this.new_var_value).toString(2);
      }
    },
    get_runed_time(index){
      return this.run_time[index];
    },
    get_btn_color(){
      if (this.btn_txt=="Finish")
        return "btn-success disabled";
      return "btn-dark";
    }
  },
  created(){
    this.read_file();
    this.fill_instruction_memory();
    this.fill_data_memory();
    this.fetch_break_points();
  }
})