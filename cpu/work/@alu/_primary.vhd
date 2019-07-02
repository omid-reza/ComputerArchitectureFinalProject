library verilog;
use verilog.vl_types.all;
entity Alu is
    port(
        alu_op          : in     vl_logic_vector(2 downto 0);
        a               : in     vl_logic_vector(15 downto 0);
        src             : in     vl_logic_vector(15 downto 0);
        rd              : out    vl_logic_vector(15 downto 0)
    );
end Alu;
