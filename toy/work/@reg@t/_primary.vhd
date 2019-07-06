library verilog;
use verilog.vl_types.all;
entity RegT is
    port(
        clk             : in     vl_logic;
        wr_t            : in     vl_logic;
        t               : in     vl_logic_vector(15 downto 0);
        \out\           : out    vl_logic_vector(15 downto 0)
    );
end RegT;
