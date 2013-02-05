#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#

PROJECT_NAME=faceid

up-static:
	rm -rf ./$(PROJECT_NAME)-gui/target/tomee-runtime/webapps/$(PROJECT_NAME)/app
	cp -r $(PROJECT_NAME)-gui/src/main/webapp/app ./$(PROJECT_NAME)-gui/target/tomee-runtime/webapps/$(PROJECT_NAME)/
	cp -r $(PROJECT_NAME)-gui/src/main/webapp/index.html ./$(PROJECT_NAME)-gui/target/tomee-runtime/webapps/$(PROJECT_NAME)/index.html

clean-start: clean-install start-tomee

clean-install: kill-tomee
	mvn clean install -DskipTests=true

unzip-tomee: kill-tomee
	cd ./$(PROJECT_NAME)-gui/target/ && \
	rm -f tomee-runtime && \
	tar -xzf tomee-runtime.tar.gz && \
	mv apache-tomee-plus-1.5.2-SNAPSHOT tomee-runtime
	cp ./$(PROJECT_NAME)-gui/target/$(PROJECT_NAME).war ./$(PROJECT_NAME)-gui/target/tomee-runtime/webapps

kill-tomee:
	@if test -f $(shell pwd)/tomee-pid.txt; then \
		kill -9 `cat $(shell pwd)/tomee-pid.txt`; \
		rm $(shell pwd)/tomee-pid.txt; \
	fi

start-tomee: unzip-tomee restart-tomee

restart-tomee: kill-tomee
	cd ./$(PROJECT_NAME)-gui/target/ && \
	export JPDA_SUSPEND=n && \
	export CATALINA_PID=$(shell pwd)/tomee-pid.txt && \
	./tomee-runtime/bin/catalina.sh jpda start

run-jasmine:
	cd ./$(PROJECT_NAME)-gui/ && mvn jasmine:bdd

run-lint:
	cd ./$(PROJECT_NAME)-gui/ && mvn jslint4java:lint

.PHONY: up-static clean-start clean-install unzip-tomee kill-tomee start-tomee restart-tomee \
		run-jasmine run-lint
