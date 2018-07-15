# Palindrome Finder #

## Dependencies

This application has been built using Node.js v10.6.0 and npm 6.1.0
These should both be installed to run the application and can be found at https://nodejs.org/en/

## Build the Application

To build the application run the following commands from the project's root directory
 
    npm install
    npm run build
    
## Run the Application
Once you have built the application there are a number of modes in which it can run:

### Development Mode ###
    npm run start:dev
    
### Built Debug Mode ###
    npm start
    
### Production Mode ###
    npm run production

To stop production mode running:

    npm run production:stop

### Accessing the application 
By default the application will run on port `localhost:3010`
The default port can be changed by providing an environment variable while starting the application e.g.

    PORT=3001 npm start
    
## End Points
Once you have the application running using any of the mode there are a nuber of endpoints exposed.

Using a REST Client your browser the application will return palindrome information in JSON directly from the following API call:

##### GET /reporter?input=xxx
_Get a JSON packet with the longest 3 unique palindromes found the input query string provided._

Alternatively a basic UI has been created to allow palindrome queries to be submitted.  This can be accessed in your browser by navigating to `/search`.  If running on the default port this will result in a URL of http://localhost:3010/search

### Run the Tests ###
A test suite has been set up for the application using the test framework JEST.  These tests can be run from the root of the project using:

      npm run test
      
A coverage report has also been configured to run using:

      npm run coverage
      
In addition to unit testing eslint has been configured for the project in order to provide styling consistency. Eslint can be run using:

    npm run lint
    
If any linting errors are found they will be output to the console.  If no errors are found nothing will be reported in the console.
