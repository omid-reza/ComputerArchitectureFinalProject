library verilog;
use verilog.vl_types.all;
entity InMem is
    port(
        a               : in     vl_logic_vector(11 downto 0);
        Rd              : out    vl_logic_vector(15 downto 0)
    );
end InMem;
