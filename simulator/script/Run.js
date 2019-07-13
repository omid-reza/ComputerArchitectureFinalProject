var app=new Vue({
  el: '#app',
  data: {
    stage:0,
    pc:null,
    ins_mem:[],
    reg_a:null,
    reg_t:"null,
    app_File:[],
    data_mem:[],
    ins_mem_index:null,
    data_mem_index:null,
    reg_a_show_idex:"",
    reg_t_show_idex:"",
    data_mem_show_idex:""
  },
  methods:{
    run: function (e) {
      if (this.stage==0) {
        this.fill_instruction_memory();
        this.fill_data_memory();
      }
      this.stage++;
    },
    insert_to_inst_mem: function(index, data){
      ins_mem[index]=data;
    },
    insert_to_data_mem: function(index, data){
      data_mem[index]=data; 
    },
    fill_instruction_memory:function(){
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          app.ins_mem=xmlhttp.responseText.split('\n');
        }
      }
      xmlhttp.open("GET", "../binary.txt", true);
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
      xmlhttp.open("GET", "../data.txt", true);
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
        this.data_mem[i]=parseInt(this.data_mem[i], 2);
      }
    }
  }
})