
files:
	make -C number_one/ -f Makefile.ubuntu
	cp number_one/number_one_main src/data/
	src/data/number_one_main < /dev/null

xpi: files
	make -C src/ xpi

run: files
	make -C src/ run

clean:
	make -C number_one/ -f Makefile.ubuntu clean
	make -C src/ clean

