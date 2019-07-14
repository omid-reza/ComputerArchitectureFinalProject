// TODO : calculate all operator with binary value and store in binary value.show with func to convert to other types
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
    current_command:""
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
      switch($event.target.value){
        case "Binary":
          if (typeof this.reg_a=="string")
            this.reg_a=this.reg_a.charCodeAt(0);
          this.reg_a=this.reg_a.toString(2);
          break;
        case "Integer":
        if (this.reg_a.charAt(0)!='0' && this.reg_a.charAt(0)!='1')
          this.reg_a=this.reg_a.charCodeAt(0);
        else
          this.reg_a=parseInt(this.reg_a, 2);
          break;
        case "Charcter":
          if(typeof this.reg_a=="string")
            this.reg_a=parseInt(this.reg_a, 2);
          this.reg_a=String.fromCharCode(this.reg_a);
          break;
      }
    },
    reg_t_show_type_change:function($event){
      switch($event.target.value){
        case "Binary":
          if (typeof this.reg_t=="string")
            this.reg_t=this.reg_t.charCodeAt(0);
          this.reg_t=this.reg_t.toString(2);
          break;
        case "Integer":
        if (this.reg_t.charAt(0)!='0' && this.reg_t.charAt(0)!='1')
          this.reg_t=this.reg_t.charCodeAt(0);
        else
          this.reg_t=parseInt(this.reg_t, 2);
          break;
        case "Charcter":
          if(typeof this.reg_t=="string")
            this.reg_t=parseInt(this.reg_t, 2);
          this.reg_t=String.fromCharCode(this.reg_t);
          break;
      }
    },
    data_mem_show_type_change:function($event){
      for (var i =0; i < this.data_mem.length; i++) {
        switch($event.target.value){
          case "Binary":
            if (typeof this.data_mem[i]=="string")
              this.data_mem[i]=this.data_mem[i].charCodeAt(0);
            this.data_mem[i]=this.data_mem[i].toString(2);
            break;
          case "Integer":
          if (this.data_mem[i].charAt(0)!='0' && this.data_mem[i].charAt(0)!='1')
            this.data_mem[i]=this.data_mem[i].charCodeAt(0);
          else
            this.data_mem[i]=parseInt(this.data_mem[i], 2);
            break;
          case "Charcter":
            if(typeof this.data_mem[i]=="string")
              this.data_mem[i]=parseInt(this.data_mem[i], 2);
            this.data_mem[i]=String.fromCharCode(this.data_mem[i]);
            break;
        }
      }
    },
    run_command:function(){
      switch(this.current_command.substring(0,4)){
        case"0000":
          this.pc=(parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2));
        break;
        case"0001":
          this.reg_a=this.reg_a+parseInt(this.data_mem[parseInt(this.current_command.substring(4,16), 2)],2);
          this.pc++;
        break;
        case"0010":
        break;
        case"0011":
        break;
        case"0100":
        break;
        case"0101":
          this.reg_t=this.reg_a;
          this.pc++;
        break;
        case"0110":
        break;
        case"1000":
        break;
        case"1001":
        break;
        case"1010":
        break;
        case"1011":
        break;
        case"1100":
          this.reg_a=this.data_mem[parseInt(this.reg_a,2)];
          this.pc++;
        break;
        case"1101":
          this.data_mem[parseInt(this.reg_a, 2)]=this.reg_t;
          this.pc++;
        break;
        case"1110":
          this.reg_a=this.data_mem[parseInt(this.current_command.substring(4,16), 2)];
          this.pc++;
        break;
        case"1111":
          this.data_mem[parseInt(this.current_command.substring(4,16), 2)]=this.reg_a;
          this.pc++;
        break;
      }
    },
    ret:function(){
      return "aa";
    }
  }
})