def index_binary_convertor(decimal_number):
	binarys=['0000', '0001','0010','0011', '0100', '0101', '0110', '0111', '1000',  '1001','1010','1011', '1100', '1101', '1110', '1111']
	return binarys[decimal_number]

def address_binary_convertor(decimal_address):
	raw_address=str(bin(decimal_address))
	if raw_address[0]=='-': # Detect number in Neg or Pos From Binary Model
		raw_address=raw_address[3:] # delete -xb
		raw_address=(12-len(raw_address))*'1'+str(raw_address) # Extend Sign Bit For Neg Numbers
	else:
		raw_address=raw_address[2:] # delete xb
		raw_address=(12-len(raw_address))*'0'+str(raw_address) # Extend Sign Bit For Pos Numbers
	return raw_address

input_file=open('app/app.txt', 'r') # Open File For Read Input(App) File => r :read mode
output_file=open('app/binary.txt', 'w') # Open File For Write OutPut(binary) Fille => w : write mode
commands=['JMP', 'ADC', 'XOR', 'SBC', 'ROR', 'TAT', 'OR', None, 'AND', 'LDC', 'BCC', 'BNE', 'LDI', 'STT', 'LDA', 'STA'] # commands, don't change it
commands_with_address=['JMP', 'ADC', 'XOR', 'SBC', 'OR','AND', 'LDC', 'BCC', 'BNE', 'LDA', 'STA'] # commands which need address
data_address=None
memory=[] # memory array with this item struct : [variable_name, address]

for line in input_file:
	line=line.split() # splite line to array (example: add A=> ['add', 'A'])
	if line[0] in commands: # search command name in command
		index=commands.index(line[0])
	elif line[0] == '.ORG':
		data_address=int(line[1])-1 # set with -1 beacuse increment later and be correct
	elif line[0] == '.DATA':
		 # search in memory to find pervios data :(example : A is in address 64, we again set in address 65-> we search and find 64->remove 64)
		for x in memory:
			if x[0]==line[1]:
				memory.remove(x)
		memory.append([line[1], address_binary_convertor(data_address)]) # insert data to memory
	else: # detect invalid command -> stop compile proccess
		print("Invalid command : "+line[0])
		print("Exit compile proccess...")
		break
	if data_address is not None: # if data_address was set incremnet data_address
		data_address=data_address+1

	address='000000000000' # dont care address
	if line[0] in commands_with_address:
		try: # Detect address is direct(try part) Or variable(expect part)
			address=address_binary_convertor(int(line[1]))	
		except: # we have variable -> lets search in memory
			for x in memory:
				if line[1]==x[0]:
					address=x[1]
					break
	if line[0] in commands:
		output_file.write(index_binary_convertor(index)) # write op of command in output file
		output_file.write(address) # write address of command in output file
		output_file.write("\n") # go to next line
input_file.close()
output_file.close()