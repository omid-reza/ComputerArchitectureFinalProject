library verilog;
use verilog.vl_types.all;
entity InMemory is
    port(
        pc              : in     vl_logic_vector(11 downto 0);
        Inst            : out    vl_logic_vector(15 downto 0)
    );
end InMemory;
