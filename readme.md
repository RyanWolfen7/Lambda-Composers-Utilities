# Lambda Composers and Utilities
THis is a collection of simple composers and utilities for AWS labdas. It has a couple assumptions one being that you're using a fully open Gatway to recieve both headers and footers and that you'll use one deployment CI batch to that will recognize each lambda and append the 'shared files to the other'... I know what you're thinking... why not just make a standalone EC2... Why the complexity... Trust me I ask myself that alot aswell, but this patteren worked out in a pinch. Its a less elegant solution for a more civilized age.

### Seriously but why though?
Because I can and want to flex my compose solution. While not the most elegant, it was "good enough", and would be easier to migrate to a standalone instance should the number of lambdas or modules become so big you cant justify them as lambdas. I have alot of startup experience and often a POC or "MVP" will enevitably be labeled good enough. While this trash code is trash code... at least its wrapped nicely in extra thick plastic bags(modules) that could migrated to a standalone rest API without to much truble... theoretically. Since comedy comes in threes I will now rapid fire "Good enough, "Migrate", "There is an eel in my water craft"

One of the immidate benifits is that combined with an automated deployment stratagy and replacing the shared folder as an internal node package, you should be able to share self maintainable code from an init layer. While it would take a more senior Ops and Dev to maintain the deployment and primary conposer chains, these parts would hopefully not need many updates. This leaves smaller modules interns and jr devs can update as needed. Unfortionately it does get a little more complex for how i handled ACTIONS and endtimme que calls, but it works and its something that could be improved upon... not by me because I'm on to building some other monstrosity, but it could be.

## How to use

1: Create a Lambda
2: Import or copy and past your chosen composer to the index.mjs

```
import { composeLambdaRequestFormatted } from "@INSERT_PREFFERED_LOADING_HERE";

export const handler = composeLambdaRequestFormatted(
    [YOUR MODULES GO HERE]
)
```
3: Run and enjoy, unless you hate or don't understand the ref state management sytem... then hyper focus and suffer. 

## Structure

Below is a wire of the basic composer.

It builds a simple in memory state object... now in javascript this can be tricky since the data is mutable and can easily change. In order to solidify it, you could always midigate this by building a state managment 'module' that uses an existing patter. The idea would be to have any consistant pre defined process front loaded on your lambda chain. This would include things like data parsing, validation, logging, and general utilities. See below:
```
composeLambdaRequestFormatted(
    useFluxStateManager,
    useLogger,
    useParser
    useValidation('YOUR SCHEMA JSON', flavor) // <--- you can even use composers inside the composers if you want to abstract more 
    [OTHER UTILITY MODULES]
    [Your Action Modules]
    (state) => {
        const {error, xyd, event } = state
        if(!xyd) return state.error = { code: 403, message: `oops you're not alowed to update ${event.id}}
        const myRes = {
            ...res, // or whatever
            body: ...event.data,
            code: 200
        }
        state.res = myRes
        state.action.push("FunctionXYZ") // <--- only important if this is your last main logic, but have some syncronous fire and forget modules after

        return state.res // <--- only important if this is the last module
    } 
)

```

alternatively you could trade off some of the basic composers flexibility (and opportunity for misconfiguration, error, and senior dev fustration) and apply some of these utilities to the actual function itself. If you already have tools or processes you know all the lambdas will use, ie. logger, then adding them to the main function state as a new instance would not be a bad idea. 
```
import Logger from 'loggersOnlyDotCom'
 
const SuperAwesomeNEWCOMPOSER = (...functions) => async (event, context, callback) => {
    let state = { event, context, callback, actions: [], log: new Logger() }
    // console.log('lambdaRequestComposer: ', state)
    for (const funcion of functions) {
        await funcion(state);
        if(state.error) break
    }
    const response = state.error ? state.error : state.res 
    return createResponseObject(response)
}

// ||

import Flux from '@IDontGiveAFluxAboutU'

const SuperAwesomeNEWCOMPOSER = (...functions) => async (event, context, callback) => {
    const flux = new Flux('Schema OBJ', event)
    const state = { dispatch: flux.dispatch(), props: flux.mappedState(), ...otherStuff}
    // console.log('lambdaRequestComposer: ', state)
    for (const funcion of functions) {
        await funcion(state);
        if(state.error) break
    }
    const response = state.error ? state.error : state.res 
    return createResponseObject(response)
}

```

### Why JS
The reason I chose vanilla JS is the speed and simplicity of development. We don't want very builky lambdas especially ones that rely on many node modules or shared code. It may seem trivial, but kb can drastically affect start up time, same with using more complex state managment patterns. While the examples in the ExampleProject may not be big enough for this to matter, if you had to call an external api more then 3 times you could defeat the purpose of using a patter like this all together. The second mentality for using vanilla js is that we can really leverage Gateway and Lambda rules for strong typing and we don't want to courge the lambda CLi for error states. To me its much better to see this in an actual response on fail.