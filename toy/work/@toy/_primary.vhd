library verilog;
use verilog.vl_types.all;
entity Toy is
    port(
        clk             : in     vl_logic;
        reset           : in     vl_logic;
        pc_out          : out    vl_logic_vector(11 downto 0);
        reg_a_out       : out    vl_logic_vector(15 downto 0);
        reg_t_out       : out    vl_logic_vector(15 downto 0)
    );
end Toy;
