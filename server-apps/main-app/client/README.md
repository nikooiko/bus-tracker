# This is the BusTracker's front-end application.
## Basic Technologies
* React
* Redux
* Grommet

## Structure - Breakdown
The ***core*** folder contains as the name implies the application core
functionality:
* The **app** component
* The **root** component
* The **routes**
* The **reducers** that indexes all application's reducers
* The **store** that contains the store configuration
* And more...

The ***common*** folder contains various shared components (ex Logo, Loading, etc...)
The ***utils*** folder contains various utilities (ex. api handler, function binder etc...)

All the other folders contain the various application features.

Each ***feature*** might contain a basic component-container (see [**redux**](http://redux.js.org/)), a **store** folder that contains redux *reducers*, *actions*, *types*, a **layout** component (usually only if it's a top level feature) and *sub-features* (following the same structure as parent).

