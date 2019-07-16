def index_binary_convertor(decimal_number):
	binarys=['0000', '0001','0010','0011', '0100', '0101', '0110', '0111', '1000',  '1001','1010','1011', '1100', '1101', '1110', '1111']
	return binarys[decimal_number]

def data_binary_convertor(decimal_data):
	raw__data=str(bin(decimal_data))
	if raw__data[0]=='-': # Detect number in Neg or Pos From Binary Model
		raw__data=raw__data[3:] # delete -xb
		raw__data=(16-len(raw__data))*'0'+str(raw__data) # Extend Sign Bit For Neg Numbers
		raw__data=bin(int("1111111111111111",base=2)-int(str(raw__data),base=2)+int("1",base=2)) # make number negative(complete 2)
	else:
		raw__data=raw__data[2:] # delete xb
		raw__data=(16-len(raw__data))*'0'+str(raw__data) # Extend Sign Bit For Pos Numbers
	return raw__data

def address_binary_convertor(decimal_address):
	raw_address=str(bin(decimal_address))
	if raw_address[0]=='-': # Detect number in Neg or Pos From Binary Model
		raise "Address can not be lawer than 0 !" # raise error
	else:
		raw_address=raw_address[2:] # delete xb
		raw_address=(12-len(raw_address))*'0'+str(raw_address) # Extend Sign Bit For Pos Numbers
	return raw_address

data_address=None
memory=[] # memory array with this item struct : [variable_name, address, data]
input_file=open('app.txt', 'r') # Open File For Read Input(App) File => r :read mode
data_output_file=open('data.txt', 'w') # Open File For Write OutPut(data&binary) File => w : write mode
command_output_file=open('binary.txt', 'w') # Open File For Write OutPut(binary) File => w : write mode
commands_with_address=['JMP', 'ADC', 'XOR', 'SBC', 'OR','AND', 'LDC', 'BCC', 'BNE', 'LDA', 'STA'] # commands which need address
commands=['JMP', 'ADC', 'XOR', 'SBC', 'ROR', 'TAT', 'OR', None, 'AND', 'LDC', 'BCC', 'BNE', 'LDI', 'STT', 'LDA', 'STA'] # commands, don't change it

for line in input_file:
	line=line.split() # splite line to array (example: add A =>split: ['add', 'A'])
	if line[0] in commands: # search command name in command
		index=commands.index(line[0])
	elif line[0] == '.ORG':
		data_address=int(line[1])-1 # set with -1 beacuse increment later and be correct
	elif line[0] == '.DATA':
		 # search in memory to find pervios data :(example : A is in address 64, we again set in address 65-> we search and find 64->remove 64)
		for x in memory:
			if x[0]==line[1]:
				memory.remove(x)
		memory.append([line[1], address_binary_convertor(data_address), data_binary_convertor(int(line[2]))], ) # insert data to memory('name', 'address', 'value')
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
		except: # we have variable -> lets search in memory to find address
			for x in memory:
				if line[1]==x[0]:
					address=x[1]
					break
	if line[0] in commands:
		command_output_file.write(index_binary_convertor(index)+address+"\n") # write op+address of command in output file and goto next line

for my_data in memory: # write file for .data commands
	data_output_file.write(str(my_data[1])+str(my_data[2])+"\n") #write into data file(address[12 bit]+data[16 bit]), got o next line

input_file.close()
data_output_file.close()
command_output_file.close()