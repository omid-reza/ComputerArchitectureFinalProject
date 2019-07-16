
module Alu (input [2:0]alu_op,input [15:0]a,src , output reg[15:0]rd, output reg z, c);
	always@(alu_op)
	begin
		case(alu_op)
		    3'b000:begin
		    	assign {c,rd}=(a+src);
		    	z<=(rd==16'b0 && c==1'b0)?1'b1:1'b0;
		    end
		    3'b001:begin
		    	assign rd=(a-src);
		    	z<=(rd==16'b0 && c==1'b0)?1'b1:1'b0;
		    end //not coplete
		    3'b100:begin
		    	assign rd=(a<<1);  
		    	z<=(rd==16'b0 && c==1'b0)?1'b1:1'b0;
		    end //Not Complete
		    3'b101:begin
		    	assign rd=(a^src);  
		    	z<=(rd==16'b0 && c==1'b0)?1'b1:1'b0;
		    end
		    3'b110:begin
		    	assign rd=(a||src); 
		    	z<=(rd==16'b0 && c==1'b0)?1'b1:1'b0;
		    end
		    3'b111:begin
		    	assign rd=(a&src);  
		    	z<=(rd==16'b0 && c==1'b0)?1'b1:1'b0;
		    end
	 	endcase
	end
endmodule