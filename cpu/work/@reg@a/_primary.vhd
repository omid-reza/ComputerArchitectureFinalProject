library verilog;
use verilog.vl_types.all;
entity RegA is
    port(
        clk             : in     vl_logic;
        wr_a            : in     vl_logic;
        a               : in     vl_logic_vector(15 downto 0);
        \out\           : out    vl_logic_vector(15 downto 0)
    );
end RegA;
