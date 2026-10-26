## QuickChat — Backend

The robust server-side backend API architecture for **QuickChat**, engineered using the **NestJS** framework paired with **MongoDB** data storage. This codebase handles all persistent transaction handling, socket gateways, data hydration layers, and core operations running behind the frontend client application.

## ✨ Core Functionalities & Modules
*   **Decoupled Microservice Flow:** Structured modular patterns engineered to isolate authentication, user accounts, and live communication pipelines cleanly.
*   **NoSQL Data Integrity:** Integrates native Mongoose validation models to store, query, and structure chat transcripts and contact graphs smoothly.
*   **Highly Performant Execution:** Leverages architectural patterns designed for sub-millisecond execution loops and asynchronous thread synchronization.

## Project setup

```bash
\$ npm install
```

## Compile and run the project

```bash
# development
\$ npm run start

# watch mode
\$ npm run start:dev

# production mode
\$ npm run start:prod
```

## Run tests

```bash
# unit tests
\$ npm run test

# e2e tests
\$ npm run test:e2e

# test coverage
\$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
