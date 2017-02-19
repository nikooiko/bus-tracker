# Bus (TODO find better name)

## Description
### What’s the goal of the project?
Design and develop a software ecosystem who’s purpose is to solve the problem of limited information about the various bus routes.

To be more specific, passengers usually need information about bus routes in general or a specific bus route they are interested in. The information might be:

* The list of running buses, what's their route and where they are right now.
* The exact route of the bus, in order to find those he is interested in.
* The current position of the bus inside it's route.
* The bus estimated time of arrival to it's destination or to passenger's current location.


### What’s the scope of the project?
The above are abstract references to various functionalities (grouped like views).
* Bus
  * List of all buses
  * Specific Bus Info (active path/position etc)
  * Driver's info
* Passenger
  * Profile
  * Favourite paths
  * Interesting paths (paths that currently the passenger is interested in receiving notifications)
* Path
  * Official Routes (named ex Athens-Volos)
  * Custom paths (created by bus drivers)
* Common Services
  * About Us
  * Contact Us
  * Bug Report

### What are the deliverables?
There are four instances at this ecosystem:
* A backend that stores all the exchanged information
* A bus mobile application (business/closed)
* A passenger mobile application (free/opened)
* A web app for the presentation of the entire ecosystem (Basically an extensive aboutUs) (maybe)

### What are the requirements/prerequisites?
Need to get in contact with bus company's drivers in order to create a demo on realistic environment.
```
TODO
```

## Schedule
The project started at **19 February 2017** and will (for now) end at **31 June 2017**
Each sprint will last two weeks (starts at Mondays and ends after two Sundays).

Schedule can be found at the below trello board:
https://trello.com/b/c4ebNtw5

## Research

```
TODO
```

## Technologies
The technologies that are gonna be used at each instance (see [deliverables](https://github.com/nikooiko/Bus#deliverables))
Backend:
* Node.js
* Loopback
* MongoDB

Bus mobile App:
* React-native (maybe)
* ```TODO```

Passenger mobile App:
* React-native (maybe)
* ```TODO```

Presentation Web App (maybe):
* CMS or react based front-end application.
