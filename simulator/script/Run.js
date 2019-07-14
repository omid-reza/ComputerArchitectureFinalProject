var app=new Vue({
  el: '#app',
  data: {
    pc:0,
    ins_mem:[],
    reg_a:0,
    reg_t:0,
    data_mem:[],
    ins_mem_index:null,
    data_mem_index:null,
    reg_a_show_idex:"",
    reg_t_show_idex:"",
    data_mem_show_idex:"",
    btn_txt:"PrePare To Run",
    current_command:"",
    reg_a_show_type:"Binary",
    reg_t_show_type:"Binary",
    data_mem_show_type:"Binary"
  },
  methods:{
    run: function (e) {
      if (this.btn_txt=="PrePare To Run") {
        this.fill_instruction_memory();
        this.fill_data_memory();
        this.btn_txt="Run";
        return;
      }
      this.current_command=this.ins_mem[this.pc];
      this.run_command();
    },
    fill_instruction_memory:function(){
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          app.ins_mem=xmlhttp.responseText.split('\n');
        }
      }
      xmlhttp.open("GET", "../compiled/binary.txt", true);
      xmlhttp.send();
    },
    fill_data_memory:function(){
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      var temp_array=[];
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          temp_array=xmlhttp.responseText.split('\n');
        }
        var i;
        for (i=0; i< temp_array.length;i++) {
          app.data_mem[parseInt((temp_array[i].substring(0, 12)), 2)]=temp_array[i].substring(12, 28);
        }
      }
      xmlhttp.open("GET", "../compiled/data.txt", true);
      xmlhttp.send();
    },
    reg_a_show_type_change:function($event){
      this.reg_a_show_type=$event.target.value;
    },
    reg_t_show_type_change:function($event){
      this.reg_t_show_type=$event.target.value;
    },
    data_mem_show_type_change:function($event){
      this.data_mem_show_type=$event.target.value;
    },
    run_command:function(){
      switch(this.current_command.substring(0,4)){
        case"0000"://JMP
          this.pc=(parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2));
        break;
        case"0001"://ADC
          this.reg_a=parseInt(this.reg_a,2)+parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.pc++;
        break;
        case"0010"://XOR
          this.reg_a=parseInt(this.reg_a,2)^parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.pc++;
        break;
        case"0011"://SBC
          this.reg_a=parseInt(this.reg_a,2)-parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          //-c
          this.reg_a=this.reg_a.toString(2);
          this.pc++;
        break;
        case"0100"://ROR
        break;
        case"0101"://TAT
          this.reg_t=this.reg_a;
          this.pc++;
        break;
        case"0110"://OR
          this.reg_a=parseInt(this.reg_a,2)|parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.pc++;
        break;
        case"1000"://AND
          this.reg_a=parseInt(this.reg_a,2)&parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.reg_a=this.reg_a.toString(2);
          this.pc++;
        break;
        case"1001"://LDC
          this.reg_a=this.data_mem[parseInt(this.current_command.substring(4,16), 2)];
          // c=0
          this.pc++;
        break;
        case"1010"://BCC
        break;
        case"1011"://BNE
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
    display_reg_a:function(){
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
    display_reg_t:function(){
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
    display_data_mem:function(){
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
    }
  }
})