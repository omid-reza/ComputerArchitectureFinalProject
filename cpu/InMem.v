
module InMem (input [11:0]a, output [15:0]Rd);
reg [11:0]mem_ins[15:0];
assign Rd=mem_ins[a];
endmodule
