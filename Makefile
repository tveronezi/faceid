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

up-static:
	rm -rf target/apache-tomee/webapps/faceid/app
	cp -r src/main/webapp/app target/apache-tomee/webapps/faceid/

run:
	mvn clean install -DskipTests=true
	mvn tomee:run

.PHONY: up-static run

