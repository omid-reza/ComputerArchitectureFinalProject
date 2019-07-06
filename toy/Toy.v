module Toy (input clk,reset ,output [11:0]pc_out,output[15:0] reg_a_out ,
output [15:0]reg_t_out);
	reg [11:0] pc;
	reg [15:0] A,T;
	wire [11:0] pc_next,adr_in_data_mem,pc_add1;
	wire src_adr,src_data,rd_dmem,wr_dmem,src_a,wr_a,wr_t,pc_reset,flag_z ,flag_c;
	wire [2:0]alu_op;
	wire [1:0]src_pc;
	wire [15:0] inst_mem_out,write_data,data_mem_out,reg_t_in,reg_a_in,alu_out;
	///reset pc =0 //////////////////////////////
	always @(posedge clk or posedge reset)  
	begin   
	    if(reset)  
	    	pc<= 12'd0;
	    else  
	      pc <= pc_next;  
	 end  
 
	assign pc_add1=pc+1'b1;
	assign pc_out=pc;
	Controller Control1(flag_z,flag_c,inst_mem_out[15:12],src_pc,alu_op ,wr_t,wr_a ,src_a ,
	wr_dmem,rd_dmem ,src_adr ,src_data);
	// ALL MUX 
  	// Mux3to1 pc_next
 	assign pc_next = src_pc[1] ? (src_pc[0] ? 12'hxxx: data_mem_out[11:0]) : (src_pc[0] ? inst_mem_out[11:0] : pc_add1);
 	// mux 2to1 addrs data mem  
 	assign adr_in_data_mem=(src_adr==1'b1)? reg_a_out[11:0]:inst_mem_out[11:0];
 	// mux 2to1 wr data to mem
 	assign write_data=(src_data==1'b1)? reg_t_out:reg_a_out;
 	// mux 2to1 select alu and data mem for input reg A
 	assign reg_a_in=(src_a==1'b1)? data_mem_out :alu_out;
	InMemory InMem1(pc,inst_mem_out);
	DataMemory DataMem1(clk,rd_dmem,wr_dmem,adr_in_data_mem,write_data,data_mem_out);
	Alu Alu1(alu_op,reg_a_out,data_mem_out,alu_out,flag_z,flag_c);
	RegA rega(clk,wr_a ,reg_a_in,reg_a_out);
	RegA regt(clk,wr_t ,reg_a_out,reg_t_out);

endmodule
