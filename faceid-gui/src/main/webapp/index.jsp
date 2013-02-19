<!DOCTYPE html>
<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>faceid</title>
    <link rel="stylesheet" type="text/css" href="<c:url value='/app/lib/ext-4.1.1a/resources/css/ext-all.css'/>">
    <script type="text/javascript" src="<c:url value='/app/lib/ext-4.1.1a/ext-all-debug.js'/>"></script>
    <script type="text/javascript">
        // Save the path to the application. Case the application is not the root context, we should now that.
        // The "c:url" is able to figure it out since forever.
        var USER_NAME = "<%=request.getUserPrincipal().getName()%>";
        var SESSION_ID = "<%=request.getSession().getId()%>";
        var ROOT_URL = "<c:url value='/'/>".replace(';jsessionid=' + SESSION_ID, '');
    </script>
    <script type="text/javascript" src="<c:url value='/app/js/app.js'/>"></script>
</head>
<body></body>
</html>