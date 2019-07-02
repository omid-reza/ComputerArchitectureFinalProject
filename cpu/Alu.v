module Alu (input [2:0]alu_op,input [15:0]a,src , output reg[15:0]rd);
always@(alu_op)
begin
 case(alu_op) 
     3'b000:begin rd=(a+src); end
     3'b001:begin rd=(a-src); end
     3'b010:begin end
     3'b011:begin end
     3'b100:begin rd=(a<<1); end
     3'b101:begin rd=(a^src); end
     3'b110:begin rd=(a||src);end
     3'b111:begin rd=(a&src);end
     
     
   endcase
  
end
endmodule
