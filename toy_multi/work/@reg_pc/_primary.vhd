library verilog;
use verilog.vl_types.all;
entity Reg_pc is
    port(
        clk             : in     vl_logic;
        reset           : in     vl_logic;
        wr_a            : in     vl_logic;
        pc_next         : in     vl_logic_vector(11 downto 0);
        pc_out          : out    vl_logic_vector(11 downto 0)
    );
end Reg_pc;
