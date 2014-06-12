/*
 * Copyright 2014 Allan Ditzel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * spring-security-csrf-token-interceptor
 *
 * Sets up an interceptor for all HTTP requests that adds the CSRF Token Header that Spring Security requires.
 */

angular.module('spring-security-csrf-token-interceptor', [])
    .config(function($httpProvider) {
        var getTokenData = function() {
            var defaultCsrfTokenHeader = 'X-CSRF-TOKEN';
            var csrfTokenHeaderName = 'X-CSRF-HEADER';
            var xhr = new XMLHttpRequest();
            xhr.open('head', '/', false);
            xhr.send();
            var csrfTokenHeader = xhr.getResponseHeader(csrfTokenHeaderName);
            csrfTokenHeader = csrfTokenHeader ? csrfTokenHeader : defaultCsrfTokenHeader;
            return { headerName: csrfTokenHeader, token: xhr.getResponseHeader(csrfTokenHeader) };
        };
        var csrfTokenData = getTokenData();
        $httpProvider.interceptors.push(function($q) {
            return {
                request: function(config) {
                    if (config.method.toLowerCase() == "post") {
                        csrfTokenData = getTokenData();
                    }
                    config.headers[csrfTokenData.headerName] = csrfTokenData.token;
                    return config || $q.when(config);
                }
            };
        });
    });