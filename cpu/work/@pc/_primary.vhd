library verilog;
use verilog.vl_types.all;
entity Pc is
    port(
        clk             : in     vl_logic;
        t               : in     vl_logic_vector(11 downto 0);
        \out\           : out    vl_logic_vector(11 downto 0)
    );
end Pc;
