library verilog;
use verilog.vl_types.all;
entity Adder32bit is
    port(
        t               : in     vl_logic_vector(15 downto 0);
        \out\           : out    vl_logic_vector(11 downto 0)
    );
end Adder32bit;
