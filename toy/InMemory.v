
module InMemory (input [11:0]pc, output wire[15:0]Inst);
 	wire [11 : 0] rom_addr = pc[11 : 0]; 
	reg [15:0]rom[4096:0];
	initial begin
	  	///pc 
	  	rom[0]=16'b0000000000000001;
	  	rom[1]=16'b1110000000001000;
	  	//rom[2]=16'b0001000001000010;
	   	//rom[3]=16'b0001000001000011;
	end
 	assign Inst = (pc[11:0] < 16 )? rom[rom_addr[11:0]]: 16'd0;  
endmodule
