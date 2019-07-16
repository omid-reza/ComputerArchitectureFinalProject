library verilog;
use verilog.vl_types.all;
entity DataMemory is
    port(
        clk             : in     vl_logic;
        rd              : in     vl_logic;
        wr              : in     vl_logic;
        mem_access_addr : in     vl_logic_vector(11 downto 0);
        wd              : in     vl_logic_vector(15 downto 0);
        \Rd\            : out    vl_logic_vector(15 downto 0)
    );
end DataMemory;
