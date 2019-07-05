module DataMemory(input clk,rd,wr,input [11:0]mem_access_addr,input[15:0]wd , output  [15:0]Rd);
	integer i;  
	reg [15:0] ram [4096:0];  
	wire [11 : 0] ram_addr = mem_access_addr[11 : 0];  
    initial begin  
		for(i=0;i<4096;i=i+1)  
			ram[i] <= 16'd0;  
    end  
    initial begin 
    	ram[3]=16'b0001000000000100;
		ram[4]=16'b0000000000001000;
		ram[65]=16'b1110000000001000;
		ram[67]=16'b0000000000001000;
		ram[8]=16'b0000000000000011;
		ram[4096]=16'b0000000000000011;
	end
	always@(posedge clk)
	begin
		if(wr)
			ram[ram_addr]<=wd;
	end
	assign Rd=(rd==1'b1) ? ram[ram_addr]:16'd0;
endmodule 
