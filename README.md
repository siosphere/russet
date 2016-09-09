#russet

## Example Usage
``` javascript
'use strict';
var russet = require('russet')

class MyBundle extends russet.Bundle
{
    routes()
    {
        return [{
            'GET:/': function(request)
            {
                return new russet.Response("this is working")
            },
            'GET:/foo': function(request)
            {
                return new russet.Response("bar")
            }
        }]
    }
}

class MyApp extends russet.App
{
    bundles()
    {
        return [
            new MyBundle()
        ]
    }
}

var AwesomeApp = new MyApp()

AwesomeApp.start()
```

## App
All Russet apps are a collection of bundles.
The app itself usually requires minimal updates, and is essentially used to register your bundles.
``` javascript
'use strict';

const russet = require('russet')

class MyAppClass extends russet.App
{
    /**
     * Return an array of bundles to register
     */
    bundles()
    {
        return []
    }
}

const MyApp = new MyAppClass()

/**
 * This starts the http server and starts serving traffic to any
 * matched routes in your registered bundles or in the ./public/
 * directory (usually used for static assets)
 */
MyApp.start()

```

## Bundle
Bundles are meant to be folders that contain a list of your models,
stores, routes, and templates.

Each bundle requires a bundle object to register the routes.

``` javascript
'use strict';

const russet = require('russet')

class MyBundle extends russet.Bundle
{
    routes()
    {
        return [{
            'GET:/': function(request)
            {
                return new russet.Response("this is working")
            },
        }]
    }
}
```

## Routes
Routes for Russet are defined via a simply key => function syntax.
The key begins with an HTTP Verb, and then the path to match. 
``` javascript
'use strict';

var LandingController = require('./controller/landing')

const MyRoutes = {
    'GET:/': LandingController.indexAction,
    'POST:/login': LandingController.loginAction,
    'DELETE:/user/{userId}': LandingController.deleteUser,
    'PUT:/user': LandingController.saveUser 
}
```
When the route is matched, the corresponding function will be called,
and should return a russet.Response object.
The function will receive a http.Request object, a http.Response object (which
allows you to end the response outside of russet),
and if the URL contains parameters, a 3rd object with the parameters:
``` javascript
'use strict';

const russet = require('russet')


const MyRoutes = {
    'DELETE:/user/{userId}': function(request, response, data)
    {
        return new russet.Response("Deleting user with ID: " + data.userId)
    }
};
```
When using TypeScript, routes can use the Route Sanitizer Decorator from beef

## Template Response
Russet allows you to return React objects in a response which will be rendered out to a string
using ReactServer.
``` jsx
//written using jsx
'use strict';
const russet = require('russet')
const React = require('react')

var MyComponent = React.createClass({
    render: function() {
        return <div>Hello World</div>
    }
})

const MyRoutes = {
    'GET:/': function()
    {
        return new russet.TemplateResponse(<MyComponent />)
    }
};
```
