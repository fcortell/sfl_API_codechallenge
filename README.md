# SFL Code Challenge

`SFL Code Challenge` candidate solution.

## Requirements
- [x] Include a README.md file explaining at least how to install and run the application.
- [x] Following the best practices of the programming language of your choice, your solution must show off some maintainability characteristics such as modularity, understandability, changeability, testability, and reusability.
    - For instance, it could follow Hexagonal architecture and SOLID principles to
comply with some of the above characteristics.
- [x] Unit testing.
- [x] A Docker environment to run the application. Docker Compose would also be appreciated.
- [ ] E2E (end-to-end) testing
- [ ] Performant for big inputs.

## Command Line Usage

### Set up

You can install and run the server either using Node.js directly or using
[Docker](https://www.docker.com/).  This and the following sections describe the
first approach, for the second approach see the section [use Docker](#use-docker)
Section below.

To install, first install [Node](https://nodejs.org/en/), move to folder project and then run the following

```bash
$ node index.js
# sfl API listening at http://localhost:3000
```

### Using Docker

```bash
docker build -t app .
```

When Docker image is successfully built:

```bash
docker run --publish 3000:3000 app
```

### Using Docker Compose
```bash
docker-compose up -d
```

### Testing

```bash
npm test
```
