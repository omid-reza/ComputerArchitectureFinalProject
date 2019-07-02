library verilog;
use verilog.vl_types.all;
entity DataMem is
    port(
        rd              : in     vl_logic;
        wr              : in     vl_logic;
        a               : in     vl_logic_vector(11 downto 0);
        wd              : in     vl_logic_vector(15 downto 0);
        \Rd\            : out    vl_logic_vector(15 downto 0)
    );
end DataMem;
