library verilog;
use verilog.vl_types.all;
entity Reg_not_write is
    port(
        clk             : in     vl_logic;
        a               : in     vl_logic_vector(15 downto 0);
        \out\           : out    vl_logic_vector(15 downto 0)
    );
end Reg_not_write;
