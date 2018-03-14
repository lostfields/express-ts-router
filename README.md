# express-ts-router
A simple router to make it easy to use with Typescript when you have custom Request and Response interfaces.

```typescript
    import * as express from 'express'

    interface MyRequest extends express.Request {
        userId: number
    }

    let router = new Router<MyRequest, express.Response>((req) => {
        return Object.assign(req, { 
            userId: Number(req.headers['x-user-id']) || 0
        })
    })

    router.route('/collections')
        .get((req, res, next) => {
            // req.userId is exposed, since 'req' is of type MyRequest
        })

    
    let app = express()

    app.use(router.getRouter())
```

