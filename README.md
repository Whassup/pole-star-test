Pole Star Front End Dev Technical Test
============================================

Take the provided data set screening.json and write a web page (or simple set of pages) to present the data. 

The result set is reasonably large so we need to be able to filter the data by:

* Name
* country check severity (Critical, Warning, Ok)

and sort the data by:

* name
* created
* modified


Things to consider - performance, efficient use of space, usability, cross-browser, test driven development.

You can use whatever server side technology you like (or none at all if you think that's appropriate). 
Just give us some instructions if you use anything *really* eccentric. 

You can use whatever frameworks or libraries you like, but be prepared to justify your use of them.

You should aim to get this test back to us within a day but there is no precise time limit. 

# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

## Planning

### Minimum functionality required to meet requirements
* Display list of of screening profiles sorted by latest date.
* Display attributes in a table list with headers for; Name, Country Check Severity, Created Date, Modified Date
* Allow each table header to be delectable for sorting by alphanumeric or date depending on the data type. (Should be able to reverse sort as well)
* Allow user input for filtering by name or country check severity
    * Name filter will do a string starts with match and sorting will not change.
    * Country check severity will allow filtering by multiple country check severity.
        * Filter options are; Critical, Warning, Ok.

### Build Plan
* Mockup a base layout using twitter bootstrap.
* Create components for;
    * screening-profile-table
* Create a service for getting the screenings.json data.

### Considerations
* Did not add other country severity types as it was not included in the requirements. If it is not one of the 3 options no severity is displayed.




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
