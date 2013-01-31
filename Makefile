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

clean-install:
	mvn clean install -DskipTests=true

run-headless-jasmine:
	cd ./faceid-gui/ && mvn test

run-jasmine:
	cd ./faceid-gui/ && mvn jasmine:bdd

run-lint:
	cd ./faceid-gui/ && mvn jslint4java:lint

.PHONY: clean-install run-headless-jasmine run-jasmine run-lint
