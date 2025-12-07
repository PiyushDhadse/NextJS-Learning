## SSR - Server Side Rendering
This is the default behaviour

## SSG - Static Site Generation
Any content which does not have network calls is a static page by default

## ISG or ISR - Incremental Static Regeneration
Fetcj in next.js caches the response
To opt out use :
'''
export const dynamic = 'force-dynamic'
'''
However, there are exceptions. fetch requests are not cached when:

- Used inside a server action
- Used inside a Route Handler that uses the POST method
