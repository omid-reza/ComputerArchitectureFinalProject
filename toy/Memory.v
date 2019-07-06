module InMemory (input [11:0]pc, output [15:0]Inst);
	reg [15:0]ram[4095:0];
	integer file_id;
	integer i=0;
	initial begin
		file_id=$fopen("..\\app\\binary.txt","rb");
		while (! $feof(file_id)) begin
			$fscanf(file_id,"%b\n",ram[i]);
			i=i+1;
		end
	end
 	assign Inst = ram[pc];  
endmodule

module DataMemory(input clk,rd,wr,input [11:0]mem_access_addr,input[15:0]wd , output  [15:0]Rd);
	integer address;
	integer file_id;
	integer i;
	reg [27:0]line;
	reg [15:0] ram [4095:0];  
    initial begin  
		for(i=0;i<4096;i=i+1)  
			ram[i] <= 16'd0;  
    end
    initial begin
    	file_id=$fopen("..\\app\\data.txt","rb");
		while (! $feof(file_id)) begin
			$fscanf(file_id,"%b\n",line);
			address=line[27:16];
			ram[address]<=line[15:0];
		end
  end
  always@(posedge clk)
  begin
    if(wr)
      ram[mem_access_addr]<=wd;
  end
  assign Rd=(rd==1'b1) ? ram[mem_access_addr]:16'd0;
endmodule 
