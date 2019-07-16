library verilog;
use verilog.vl_types.all;
entity Controller is
    generic(
        \IF\            : integer := 0;
        ID              : integer := 1;
        EXE_JAM         : integer := 2;
        EXE_R           : integer := 3;
        EXE_R_ADD       : integer := 4;
        EXE_R_XOR       : integer := 5;
        EXE_R_SUB       : integer := 6;
        EXE_R_ROR       : integer := 7;
        EXE_R_OR        : integer := 8;
        EXE_R_AND       : integer := 9;
        EXE_ZC_LDC      : integer := 10;
        EXE_ZC_LDI      : integer := 11;
        EXE_ZC_STT      : integer := 12;
        EXE_ZC_LDA      : integer := 13;
        EXE_ZC_STA      : integer := 14;
        MEM_LDC         : integer := 15;
        MEM_LDI         : integer := 16;
        MEM_STT         : integer := 17;
        MEM_LDA         : integer := 18;
        MEM_STA         : integer := 19;
        WB_LDC          : integer := 20;
        WB_LDI          : integer := 21;
        WB_LDA          : integer := 22;
        WB_R            : integer := 23;
        EXE_ZC          : integer := 16
    );
    port(
        clk             : in     vl_logic;
        reset           : in     vl_logic;
        opcode          : in     vl_logic_vector(3 downto 0);
        z               : in     vl_logic;
        c               : in     vl_logic;
        src_pc          : out    vl_logic_vector(1 downto 0);
        alu_op          : out    vl_logic_vector(2 downto 0);
        wr_t            : out    vl_logic;
        wr_a            : out    vl_logic;
        src_a           : out    vl_logic;
        wr_dmem         : out    vl_logic;
        rd_dmem         : out    vl_logic;
        src_adr         : out    vl_logic_vector(1 downto 0);
        src_data        : out    vl_logic;
        alu_src_a       : out    vl_logic;
        alu_src_b       : out    vl_logic;
        ir_wr           : out    vl_logic;
        pc_wr           : out    vl_logic
    );
end Controller;
