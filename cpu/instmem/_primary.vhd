library verilog;
use verilog.vl_types.all;
entity instmem is
    port(
        addrs           : in     vl_logic_vector(11 downto 0);
        inst            : out    vl_logic_vector(15 downto 0)
    );
end instmem;
