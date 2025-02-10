# Lambda Composers and Utilities  

This is a collection of simple composers and utilities for AWS Lambdas. It assumes:  
1. You're using a fully open Gateway to receive both headers and footers.  
2. A single deployment CI batch will recognize each Lambda and append shared files to others.  

I know what you're thinking—why not just use a standalone EC2? Why the complexity? Trust me, I ask myself that a lot too. But this pattern worked out in a pinch. It’s a less elegant solution for a more civilized age.  

---

## Why This Approach?  

Because I can—and I wanted to flex my composition solution. While not the most elegant, it was "good enough" and provides an easier migration path to a standalone instance if the number of Lambdas or modules grows beyond justification.  

From my startup experience, many POCs or MVPs end up as production code. While this might be "trash code," at least it's neatly wrapped in thick plastic bags (modules) that can be migrated to a standalone REST API without too much trouble... theoretically.  

Since comedy comes in threes:  
- **"Good enough"**  
- **"Migrate"**  
- **"There is an eel in my watercraft"**  

### Immediate Benefits  

With an automated deployment strategy and treating the shared folder as an internal Node package, you can maintain self-contained, reusable code from an init layer.  

- **Senior Devs & Ops** handle deployment and primary composer chains (which should require minimal updates).  
- **Interns & Junior Devs** can update smaller modules as needed.  

The complexity mainly comes from how I handled **ACTIONS** and **end-time queue calls**, but it works. It’s something that could be improved upon... not by me, because I'm already onto another monstrosity.  

---

## How to Use  

1. **Create a Lambda**  
2. **Import or copy your chosen composer** into `index.mjs`:  

   ```javascript
   import { composeLambdaRequestFormatted } from "@INSERT_PREFERRED_LOADING_HERE";

   export const handler = composeLambdaRequestFormatted(
       [YOUR MODULES GO HERE]
   );
   ```  
3. **Run and enjoy!** Unless you dislike or don’t understand the ref state management system—then hyper-focus and suffer.  

---

## Structure  

Below is a wireframe of the basic composer.  
![Basic composer example](https://github.com/user-attachments/assets/143097af-af48-43a8-aa71-a19d7faf0763)

It builds a simple in-memory state object. Since JavaScript allows mutable data, you might want to **mitigate unintended changes** by introducing a state management module that follows an existing pattern.  

The idea is to **front-load** any consistent, predefined processes in your Lambda chain, including:  
✅ Data parsing  
✅ Validation  
✅ Logging  
✅ General utilities  

### Example:  

```javascript
composeLambdaRequestFormatted(
    useFluxStateManager,
    useLogger,
    useParser,
    useValidation('YOUR_SCHEMA_JSON', flavor), // You can even nest composers inside composers!
    [OTHER UTILITY MODULES],
    [Your Action Modules],
    (state) => {
        const { error, xyd, event } = state;
        if (!xyd) return state.error = { code: 403, message: `Oops, you're not allowed to update ${event.id}` };

        const myRes = {
            ...res, 
            body: ...event.data,
            code: 200
        };
        
        state.res = myRes;
        state.action.push("FunctionXYZ"); // Only needed if this is the last main logic module
        
        return state.res; // Only needed if this is the last module
    }
);
```  

Alternatively, you can **trade flexibility for simplicity** by applying utilities directly to the function itself. If all Lambdas will use a specific tool (e.g., logging), then adding it to the main function state is a reasonable approach.  

### Example with a Logger:  

```javascript
import Logger from 'loggersOnlyDotCom';

const SuperAwesomeNEWCOMPOSER = (...functions) => async (event, context, callback) => {
    let state = { event, context, callback, actions: [], log: new Logger() };

    for (const function of functions) {
        await function(state);
        if (state.error) break;
    }

    const response = state.error ? state.error : state.res;
    return createResponseObject(response);
};
```

### Example with Flux:  

```javascript
import Flux from '@IDontGiveAFluxAboutU';

const SuperAwesomeNEWCOMPOSER = (...functions) => async (event, context, callback) => {
    const flux = new Flux('Schema OBJ', event);
    const state = { dispatch: flux.dispatch(), props: flux.mappedState(), ...otherStuff };

    for (const function of functions) {
        await function(state);
        if (state.error) break;
    }

    const response = state.error ? state.error : state.res;
    return createResponseObject(response);
};
```

---

## Why JavaScript?  

I chose **vanilla JavaScript** for **speed and simplicity**:  
🚀 **Lightweight** - Avoids bulky Lambdas relying on too many Node modules.  
⚡ **Performance** - Fewer KBs = faster startup time.  
🛠 **Gateway & Lambda Rules** - Strong typing can be enforced here rather than through Lambda CLI error states.  

While this may not be an issue for smaller projects, if your Lambda calls an external API more than three times, you could negate the benefits of this pattern entirely.  

---

## Final Thoughts  

This isn't the **most elegant** solution, but it was **"good enough"** in a pinch. If your architecture outgrows this approach, migrating to a standalone REST API should be straightforward. Until then—enjoy the composability, keep modules clean, and don't let an eel get into your watercraft. 🚀
