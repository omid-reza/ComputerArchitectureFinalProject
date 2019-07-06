module Controller(input [3:0]opcode,output reg[1:0]src_pc,output reg[2:0]alu_op , output reg wr_t, reg wr_a ,reg src_a ,reg wr_dmem,reg rd_dmem ,reg src_adr ,reg src_data);
always @(*)
begin
  case(opcode)
    4'b0000:begin//JMP VEC
      src_pc=2'b01;
      wr_t=1'b0;
      wr_a=1'b0;
      src_a=1'bx;
      wr_dmem=1'b0;
      rd_dmem=1'b0;
      src_adr=1'bx;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b0001:begin//ADC SRC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b0;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'b000;
      end
      4'b0010:begin//XOR SRC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b0;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'b101;
      end
      4'b0011:begin//SBR SRC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b0;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'b001;
      end
      4'b0100:begin//ROR
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b0;
      wr_dmem=1'b0;
      rd_dmem=1'b0;
      src_adr=1'bx;
      src_data=1'bx;
      alu_op=3'b100;
      end
      4'b0101:begin//TAT
      src_pc=2'b00;
      wr_t=1'b1;
      wr_a=1'b0;
      src_a=1'b0;
      wr_dmem=1'b0;
      rd_dmem=1'b0;
      src_adr=1'bx;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b0110:begin//OR SRC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b0;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'b110;
end
      4'b0111:begin//???
      src_pc=2'bxx;
      wr_t=1'bx;
      wr_a=1'bx;
      src_a=1'bx;
      wr_dmem=1'bx;
      rd_dmem=1'bx;
      src_adr=1'bx;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b1000:begin//AND SRC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b0;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'b111;
      end
     4'b1001:begin//LDC SRC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b1;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b1010:begin//BCC VEC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b1;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b1011:begin//BNE VEC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b0;
      src_a=1'bx;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b1100:begin//LDI
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b1;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b1;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b1101:begin//STT
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b0;
      src_a=1'bx;
      wr_dmem=1'b1;
      rd_dmem=1'b0;
      src_adr=1'b1;
      src_data=1'b1;
      alu_op=3'bxxx;
      end
      4'b1110:begin//LDA SRC
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b1;
      src_a=1'b1;
      wr_dmem=1'b0;
      rd_dmem=1'b1;
      src_adr=1'b0;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      4'b1111:begin//STA
      src_pc=2'b00;
      wr_t=1'b0;
      wr_a=1'b0;
      src_a=1'bx;
      wr_dmem=1'b1;
      rd_dmem=1'bx;
      src_adr=1'bx;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      
       4'bxxxx:begin//default
      src_pc=2'bxx;
      wr_t=1'bx;
      wr_a=1'bx;
      src_a=1'bx;
      wr_dmem=1'bx;
      rd_dmem=1'bx;
      src_adr=1'bx;
      src_data=1'bx;
      alu_op=3'bxxx;
      end
      endcase
        
end
endmodule
