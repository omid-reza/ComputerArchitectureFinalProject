
module TB;
	reg clk,reset;
	wire [11:0]pc_in;
	wire [11:0]pc_out;
	wire [15:0]reg_a_out;
	wire [15:0]reg_t_out;
 	Toy uut(clk,reset,pc_in,pc_out,reg_a_out,reg_t_out);    
    initial begin  
        clk = 0;    
        forever #50 clk = ~clk;  
    end  
    initial begin    
		  
		reset = 1; 
	
	
		#50;  
     	reset = 0;  
       
      end
 endmodule  