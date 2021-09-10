## Requirements
 
Globally installed node
 
## Installation
 
Once the repository has been cloned, change directory to the checked out folder.
 
Once in the folder you will need to run the command:
npm install
 
This will install the package dependencies.
 
Then you will need to run:
npm install -g .
 
This will install the package globally and allow for commands to be run from within the terminal.
 
After this you can run the standard parser using the command cron-parse. Additional commands can be configured by adding further files to the bin section in package.json
 
Parameter support can be configured using the yargs library (https://www.npmjs.com/package/yargs)
 
## Considerations
 
The current version has a several cron strings that it is unable to support:
- Seconds.
- ? for day of week.
- A value for year.
 
## Testing
 
The program uses Jest to do its unit tests.
The package.json has been set up so that running the following command will run the test suite in watch mode:
npm test
 
This will cause it to re-run the tests every time that a file is changed.
