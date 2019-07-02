
module RegA (input clk,wr_a ,input [15:0]a, output reg[15:0]out);
always @(posedge clk)
begin
if (wr_a==1)
begin
  out=a;
  end
end
endmodule

module RegT (input clk ,wr_t,input [15:0]t, output reg [15:0]out);
always @(posedge clk)
begin
if (wr_t==1)
begin
  out=t;
  end
end
endmodule

module Pc (input clk ,input [11:0]t, output [11:0]out);
  assign out=t;

endmodule