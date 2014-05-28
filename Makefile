REPORTER = spec

test:
  ./node_modules/bin/mocha --invert --grep Zendesk --reporter=$(REPORTER)

test-all:
  ./node_modules/bin/mocha --reporter=$(REPORTER)

.PHONY: test test-all
