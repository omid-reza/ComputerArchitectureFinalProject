library verilog;
use verilog.vl_types.all;
entity Control is
    port(
        opcode          : in     vl_logic_vector(3 downto 0);
        src_pc          : out    vl_logic_vector(1 downto 0);
        alu_op          : out    vl_logic_vector(2 downto 0);
        wr_t            : out    vl_logic;
        wr_a            : out    vl_logic;
        src_a           : out    vl_logic;
        wr_dmem         : out    vl_logic;
        rd_dmem         : out    vl_logic;
        src_adr         : out    vl_logic;
        src_data        : out    vl_logic
    );
end Control;
