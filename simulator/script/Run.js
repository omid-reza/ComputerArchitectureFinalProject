var app=new Vue({
  el: '#app',
  data: {
    stage:0,
    pc:null,
    ins_mem:[],
    reg_a:null,
    reg_t:null,
    app_File:[],
    data_mem:[],
    ins_mem_index:null,
    data_mem_index:null
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
        for (i=0; i< temp_array.length-1;i++) {
          app.data_mem[parseInt((temp_array[i].substring(0, 11)), 2)]=temp_array[i].substring(12, 28);
        }
      }
      xmlhttp.open("GET", "../data.txt", true);
      xmlhttp.send();
    }
  }
})