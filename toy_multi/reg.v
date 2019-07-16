module Reg (input clk,wr_a ,input [15:0]a, output reg[15:0]out);
always @(posedge clk)
begin
if (wr_a==1)
begin
  out<=a;
  end
end
endmodule
module Reg_not_write (input clk,input [15:0]a, output reg[15:0]out);

always @(posedge clk)
begin
  out<=a;
end

endmodule

module Reg_pc (input clk,reset,wr_a,input [11:0] pc_next, output reg [11:0]pc_out);
  
always @(posedge clk )  
	begin   
	    if(wr_a)
	     begin  
	  
	    
	      pc_out <= pc_next; 
	       end
	 end  
always @(posedge clk or posedge reset)  
	begin   
	    if(reset)  
	    	pc_out<= 12'd0;
	    else  
	      pc_out<= pc_next;  
	 end  
endmodule