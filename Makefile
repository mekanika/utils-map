REPORTER = spec
TESTFILES = $(shell find test/ -name '*.test.js')

build: components component

components: component.json
	@component install --dev

component:
	@echo "\nCreating component..."
	@component build --name mekanika-utils-map --standalone map
	@echo "Done: ./build/mekanika-utils.map.js\n"

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTFILES)

clean:
	rm -fr build components

.PHONY: clean test
