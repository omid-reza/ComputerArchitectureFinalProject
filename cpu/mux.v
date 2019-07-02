
module Mux2to1_16bit (input [15:0]a,input [15:0]b ,input sel , output reg [15:0]out);
always @(a or b or sel)
begin
 case(sel)
 1'b0:out <= a;
 1'b1:out <= b;
 endcase 
end
endmodule
module Mux2to1_12bit (input [11:0]a,input [11:0]b ,input sel , output reg [15:0]out);
always @(a or b or sel)
begin
 case(sel)
 1'b0:out <= a;
 1'b1:out <= b;
 endcase 
end
endmodule

module Mux3to1 (input [11:0]a,input [11:0]b,input[11:0]c ,input [1:0]sel ,
 output reg[11:0]out);
always @(a or b or c or sel )
begin
 case(sel)
 2'b00:out <= a;
 2'b01:out <= b;
 2'b10:out <= c;
 endcase 
end
endmodule
module Adder32bit (input [15:0]t, output [11:0]out);
assign out=t+1'b1;
endmodule
