
module Memory(input clk,rd,wr,input [11:0]mem_access_addr,input[15:0]wd , output  [15:0]Rd);
	integer i;
	reg [15:0] ram [4095:0];  
    initial begin  
		for(i=64;i<4096;i=i+1)  
			ram[i] <= 16'd0;  
    end
    initial begin  
		ram[0]<=16'b0000000000000001;
		ram[1]<=16'b1110000001000000;
		ram[2]<=16'b0001000000001001;
		ram[3]<=16'b0000000000001000;
		ram[64]<=16'b0000000000000100;
		ram[65]<=16'b0000000000000010;
    end

  always@(posedge clk)
  begin
    if(wr)
      ram[mem_access_addr]<=wd;
  end
  assign Rd=(rd==1'b1) ? ram[mem_access_addr]:16'd0;
endmodule 