
files:
	make -C number_one/ -f Makefile.ubuntu
	cp number_one/number_one_main data/
	echo | data/number_one_main

all: files
	jpm xpi

run: files
	./run.sh # can't figure out how to do $(which firefox)

clean:
	make -C number_one/ -f Makefile.ubuntu clean
	rm -f data/number_one_main data/n1bot_data.bin *.xpi

