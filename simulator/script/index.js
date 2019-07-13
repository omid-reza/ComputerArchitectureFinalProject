new Vue({
  el: '#app',
  data: {
    files:null,
    compile_type:null,
    errors:[]
  },
  methods:{
    checkForm: function (e) {
      this.errors = [];
      if (!this.files)
        this.errors.push('File requiere');
      if (!this.compile_type)
        this.errors.push('Compile Type Require');
      if (!this.errors.length)
        return true;
      e.preventDefault();
    },
    previewFiles() {
			this.files = this.$refs.myFiles.files;
	  }
  }
})