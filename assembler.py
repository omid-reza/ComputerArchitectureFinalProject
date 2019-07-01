def index_binary_convertor(decimal_number):
	binarys=['0000', '0001','0010','0011', '0100', '0101', '0110', '0111', '1000',  '1001','1010','1011', '1100', '1101', '1110', '1111']
	return binarys[decimal_number]

def data_binary_convertor(decimal_address):
	raw_address=str(bin(decimal_address))
	if raw_address[0]=='-': # Detect number in Neg or Pos From Binary Model
		raw_address=raw_address[3:]
		raw_address=(12-len(raw_address))*'1'+str(raw_address) # Extend Sign Bit For Neg Numbers
	else:
		raw_address=raw_address[2:]
		raw_address=(12-len(raw_address))*'0'+str(raw_address) # Extend Sign Bit For Pos Numbers
	return raw_address


input_file=open('app/app.txt', 'r') # Open File For Read Input(App) File => r=read mode
output_file=open('app/compiled.txt', 'w') # Open File For Write OutPut(binary) Fille => w=write mode
commands=['JMP', 'ADC', 'XOR', 'SBC', 'ROR', 'TAT', 'OR', None, 'AND', 'LDC', 'BCC', 'BNE', 'LDI', 'STT', 'LDA', 'STA']
commands_with_address=['JMP', 'ADC', 'XOR', 'SBC', 'OR','AND', 'LDC', 'BCC', 'BNE', 'LDA', 'STA']
data_setter_commands=['.ORG', '.DATA']
data_address=None
data=[]

for line in input_file:
	line=line.split()
	if line[0] in commands:
		index=commands.index(line[0])
	else:
		print("Invalid command : "+line[0])
		break
	output_file.write(index_binary_convertor(index))
	address='000000000000'
	if line[0] in commands_with_address:
		address=data_binary_convertor(int(line[1]))
	output_file.write(address)
	output_file.write("\n")
input_file.close()
output_file.close()