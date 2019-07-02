library verilog;
use verilog.vl_types.all;
entity cpuToy is
    port(
        clk             : in     vl_logic;
        cpu_out         : out    vl_logic_vector(15 downto 0)
    );
end cpuToy;
