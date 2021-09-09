# Zinio Technical Test: Hire Me Blog

Author: Arnau Gómez
License: MIT

[Link to Node.js Backend](https://github.com/arnaugomez/zinio-test.node)
## Stack

- Frontend
  - Typescript
  - React
  - Next.js
  - Chakra UI
- Backend
  - Typescript
  - Node
  - Express
  - Fuzzy search library

I chose the TypeScript programming language because it has an awesome developer experience, thanks to which I have been able to build this project in a day. Using the same language both for the frontend and the backend lets you reuse types and interfaces. Finally, TypeScript's strong typing makes the project more scalable and maintainable.

React and Express were my frameworks of choice because they are the tech stack of Zinio. Moreover, I used Next.js because it adds SEO enhancements and Server Side Rendering / Static Side Rendering on top of React. When building a blog, having a strong SEO is a must.

## Performance improvements and optimizations

Backend:
- Some of the operations, like reading + parsing the JSON file and generating the search results, are very expensive. This is why **I have created my own caching system**. Therefore, if you search for the same word twice, the results will appear much faster the second time around. In a real-world app, I would consider using a dedicated caching system like Redis.
- I used a specific library to implement **fuzzy search** and **weighted search** so that the results in the title take priority over the results in the article's body.

Frontend:
- I used a complex **debouncing system** so that the **real-time search** can be much more efficient. Instead of making an API call every time the user types a letter, only 1 API call is performed in the end.

## Architecture and good practices
- Domain-Driven Design
- SOLID
- Repository pattern
- MVC pattern

## How to use

1. Backend: run `yarn && yarn dev` from the root folder of the project
2. Frontend: run `yarn && yarn dev` from the root folder of the project
3. Open the browser at [localhost:3000](localhost:3000)

## Potential improvements and self-criticism
These are some improvements that I would work on next and that were not done because of my limited time.
- Add a test for each page and endpoint with Jest and React-Testing-Library
- Abstract repeated items into separate React components
- Test edge cases and provide error handling for every case in which the API could respond with an error
- Customize the design of the page.
- Get the website tested by potential users, ask for their opinion and criticism.
- Publish the site and the API. Hide the API url in an environment variable.