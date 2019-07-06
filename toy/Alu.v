module Alu (input [2:0]alu_op,input [15:0]a,src , output reg[15:0]rd, output reg z,c);
	always@(alu_op)
	begin
		case(alu_op) 
		    3'b000:begin assign {c,rd}=(a+src); end
		    3'b001:begin assign rd=(a-src); end
		    3'b100:begin assign rd=(a<<1); end //Not Complete
		    3'b101:begin assign rd=(a^src); end
		    3'b110:begin assign rd=(a||src);end
		    3'b111:begin assign rd=(a&src);end
	 	endcase
	 	assign z = (rd==16'b0 && c==1'b0)?1'b1:1'b0;
	end
endmodule

module AluTb;
	reg [15:0]a,b;
	reg [2:0]alu_operion;
	wire [15:0]reponse;
	wire zero;
	reg clk;
	wire carry;
	Alu alu_ins(alu_operion, a, b, reponse, zero, carry);
	initial begin  
        clk = 0;    
        forever #50 clk = ~clk;  
    end
    initial begin
    	#10 a=16'b0; b=16'b0; alu_operion=3'b0;
    	#10 a=16'b0000000000000001;b=16'b0000000000000001;
    	#200 a=16'b1111111111111111;alu_operion=3'b100;
    	#200 a=16'b0000000000000001;
    	#200 a=16'b0;b=16'b0;alu_operion=3'b0;
    end
endmodule