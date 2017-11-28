#Authentication with JWT

## Install

`yarn add jsonwebtoken express-jwt` 


## Require in authentication.js

* Require jsonwebtoken library to create tokens for registering and logging in
`const jwt = require('jsonwebtoken');`

* Require secret string needed to generate a JWT token (this can be found in environment.js 
`secret: process.env.SECRET || 'secret phrase'`

* Require secret in authentication.js
`{ secret }` means deconstructing an object. It's saying I want to use this part of the object in the `required file.
const { secret } = require('../config/environment');`

## Check if working with Insomnia

* Check post to `http://localhost:4000/api/register` 
* Write in your schema info and "register" in Insomnia 


##Add to log-in function
```
function authenticationsLogin(req, res){
  User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized.' });
      }
      //create token to be sent in the response of the successful login
      //.sign assigns a token to the user - first argument is the info for the payload, second argument is the 'secret' encryption process and third argument is optional but we are adding an expiration (in hours)
      
      const token = jwt.sign({ userId: user.id}, secret, { expiresIn: '1hr'});

      return res.status(200).json({
        message: 'Welcome back.',
        token,
        user
    //user is the object being returned from the server at the beginning of the function
      });
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong on the server' }));
}
```

##Add to registration function

```
function authenticationsRegister(req, res){
  User
    .create(req.body)
    .then(user => {
      const token = jwt.sign({ userId: user.id}, secret, { expiresIn: '1hr'});

      return res.status(201).json({
        message: `Welcome ${user.username}!`,
        user,
        token
      });
    })
    .catch((err) => res.status(500).json({ message: err }));
}
```

##Require in app.js

`const expressJWT   = require('express-jwt');` and add `secret` to {port, db} = ....

AND

```
app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST']},
      { url: '/api/register', methods: ['POST']}
    ]
  }));

```
We are asking any route via api requires a token to access the data. 


##Test with insomnia

Go to `http://localhost:4000/api/users` in Insomnia and POST 
```
{
	"username":"joyce",
	"email":"joyce@joyce.com",
	"password":"password",
	"passwordConfirmation":"password"
}
```

you should get....


```
UnauthorizedError: No authorization token was found
    at middleware (/Users/hannahcross/Development/WDI_LDN_30_CLASSWORK/w07d01/express-jwt/node_modules/express-jwt/lib/index.js:76:21)
    at /Users/hannahcross/Development......
 
```

Let's write a nice error message!! 


```
app.use(jwtErrorHandler);
function jwtErrorHandler(err, req, res, next){
  //if error is not from having a invalid token  move on to next piece of middleware to handle that error.
  if (err.name !== 'UnauthorizedError')return next();
  return res.status(401).json({message: 'You must be logged in to view this content'});
}
```

## More testing with Insomnia - Bearer + token....


`GET http://localhost:4000/api/users`

Using the HEADER tab we can check if log in process is working by adding

```
'Authorization' and 'Bearer' and copying the token from our test users (e.g.
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTAwNmQ4NWY0NTFmZjU0YTY1ZTVhNGYiLCJpYXQiOjE1MDk5Nzg3MDYsImV4cCI6MTUwOTk4MjMwNn0.j-Am4ZwQd7vTQyoitD7dU7noUb5-SeJoqSdktMFED5s'
```

This just replicates what the conversation between browser and api when users log in. If user exists we will see the index page. If not we get an error message as described above. 



##Next - authentication on client side. 



`bower install satellizer --save`

Require satellizer in app.js in your src file. 

In your configs folder create a `satellizer.js` file 

Add the following:

```
angular
  .module('angularAuthentication')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {

//defining endpoints that satellizer should make requests to when we either log in or register

  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
}
```


`$authProvider` is part of the satellizer package. 



##Write the function to log in successfully 

`$auth` is a child of the configuration Auth. 

Add `$state, $auth` to log in controller:

```
angular
  .module('angularAuthentication')
  .controller('loginController', loginController);

loginController.$inject = ['$state', '$auth'];
function loginController($state, $auth) {
  const vm = this;

  vm.submitForm = login;

  function login() {
    $auth
      .login(vm.user)//*.login returns a promise so we don't need $promise
      .then(() => {
        $state.go('usersIndex');
      });
  }

}
```

Then we add to register controller:

```
angular
  .module('angularAuthentication')
  .controller('registerController', registerController);

registerController.$inject = ['$state', '$auth'];
function registerController($state, $auth) {
  const vm = this;

  vm.submitForm = register;

  function register(){
    $auth
      .signup(vm.user)
      .then(() => $auth.login(vm.user))
      .then(() => {
        $state.go('usersIndex');
      });
  }
}

```

NOTE: In terms of whether we use config, factories.. etc. It's about load chain. What we need to load first. 


NOW when we log in we go straight to logged in status. 


## Current User Service


Let's create a services folder and within that a file called **current-user.session.js**

```
angular
  .module('angularAuthentication')
  .service('currentUserService', currentUserService);

currentUserService.$inject = ['$auth', 'User', '$rootScope'];

function currentUserService($auth, User, $rootScope){
  const self = this;
  //BEFORE: token
  //AFTER: { userId: rfsff4tfs8u8rfsjof}
  //will take token from local storage and decode payload so the current user's id can be used.
  self.getUser = () => {
    const decoded = $auth.getPayload();
    if(decoded) {
      User
        .get({ id: decoded.userId })
        .$promise //$resource.get does not return a promise so we need to state $promise
        .then(user => {
          //using the id from the token to find the user in the database, once returned store on service to be used in other modules. 
          self.currentuser = user;
        });
    }

  };
}

```

##Current User Service injected into...

**Login controller**

```
angular
  .module('angularAuthentication')
  .controller('loginController', loginController);

loginController.$inject = ['$state', '$auth', 'currentUserService'];
function loginController($state, $auth, currentUserService) {
  const vm = this;

  vm.submitForm = login;

  function login() {
    $auth
      .login(vm.user)//*.login returns a promise so we don't need $promise
      .then(() => {
        currentUserService.getUser();
        $state.go('usersIndex');
      });
  }

}

```

**Register controller**

```
angular
  .module('angularAuthentication')
  .controller('registerController', registerController);

registerController.$inject = ['$state', '$auth', 'currentUserService'];
function registerController($state, $auth, currentUserService) {
  const vm = this;

  vm.submitForm = register;

  function register(){
    $auth
      .signup(vm.user)
      .then(() => $auth.login(vm.user))
      .then(() => {
        currentUserService.getUser();
        $state.go('usersIndex');
      });
  }
}
```


##Main Controller 

We want the Nav to change depending on logged in status of userr. 
Body is linked to ng-controller 'main'.

Let's go to Main Controller and add:

```
angular
  .module('angularAuthentication')
  .controller('mainController', mainController);

mainController.$inject = ['$rootScope', 'currentUserService'];
function mainController($rootScope, currentUserService) {
  const vm = this;

  $rootScope.$on('loggedIn', ()=> {
    vm.user = currentUserService.currentUser;
    console.log(vm.user);
  });

}
```
$rootScope enables us broadcast messages between modules. So when the broadcast 'loggedin' is heard the controller knows to behave in a specify way. 

