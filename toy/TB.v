module TB;
	reg clk,reset;
	wire [11:0]pc_out;
	wire [15:0]reg_a_out;
	wire [15:0]reg_t_out;
 	Toy uut(clk,reset, pc_out,reg_a_out,reg_t_out);    
    initial begin  
        clk = 0;    
        forever #50 clk = ~clk;  
    end  
    initial begin    
		// Initialize Inputs  
		//$monitor ("register 3=%d, register 4=%d", reg3,reg4);  
		reset = 1; 
	
		// Wait 100 ns for global reset to finish  
		#48;  
     	reset = 0;  
        // Add stimulus here  
      end
 endmodule  