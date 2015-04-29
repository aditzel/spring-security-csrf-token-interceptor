#spring-security-csrf-token-interceptor

> An AngularJS interceptor that will include the CSRF token header in HTTP requests.

> It does this by doing an AJAX HTTP HEAD call to / by default, and then retrieves the HTTP header 'X-CSRF-TOKEN' and sets this
same token on all HTTP requests.

`spring-security-csrf-token-interceptor` also supports configuring the CSRF header name, number of retries allowed in-case of Forbidden errors, restrict adding the CSRF tokens to some HTTP types etc.

#Installing
###Via Bower
````
$ bower install spring-security-csrf-token-interceptor
````
###Via NPM
````
$ npm install spring-security-csrf-token-interceptor
````

#Usage
Include this as a dependency on your application:

````javascript
angular.module('myApp', ['spring-security-csrf-token-interceptor']);
````
Use the `configProvider` to customize the interceptor behavior. Check [Configuration](#Configuration) section for more details.

````javascript
 csrfProvider.config({});
````
#Configuration
The following options are available for configuring the interceptor,

````
Note: All these below configurations are optional.
````

- `options` (Object) - Options to customize the CSRF interceptor behavior.

- `options.url` (String) - The URL to which the initial CSRF request has to be made to get the CSRF token. Default: `\`.

- `options.csrfHttpType` (String) - The HTTP method type which should be used while requesting the CSRF token call. Default: `head`.

- `options.maxRetries` (Number) - The number of retries allowed for CSRF token call in-case of [403 Forbidden](http://en.wikipedia.org/wiki/HTTP_403) response errors. Default: `5`.

- `options.csrfTokenHeader` (Array) - Set this option to add the CSRF headers only to some HTTP requests. Default: `['GET', 'HEAD', 'PUT', 'POST', 'DELETE']`.

- `options.csrfTokenHeader` (String) - Customize the name of the CSRF header on the requests. Default: `X-CSRF-TOKEN`.

###Example

```js
    angular
        .module('myApp', [
            'spring-security-csrf-token-interceptor'
        ])
        .config(function(csrfProvider) {
            // optional configurations
            csrfProvider.config({
                url: '/login',
                maxRetries: 3,
                csrfHttpType: 'get',
                csrfTokenHeader: 'X-CSRF-XXX-TOKEN',
                httpTypes: ['PUT', 'POST', 'DELETE'] //CSRF token will be added only to these method types 
            });
        }).run(function() {
    });
```