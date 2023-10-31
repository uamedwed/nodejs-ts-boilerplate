# nodejs-ts-boilerplate

## Description
Application template

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Development Team](#development-team)
- [Acknowledgements](#acknowledgements)

## Project Structure
The project has the following structure:

```plaintext
.
├── src/                  # Source files for the application
│   ├── api/              # API routes and controllers
│   ├── docs/             # API documentation and Swagger files
│   ├── helpers/          # Helper functions and utilities
│   ├── system/           # System-level modules and configurations
│   ├── tests/            # Test files and test suites
│   └── index.ts          # Entry point for the application
├── requests/             # Example requests and API usage
├── .husky/               # Configuration for Git hooks using Husky
│   └── pre-commit        # Pre-commit hook script
├── .dockerignore         # List of files and directories to ignore in Docker
├── .env.example          # Example .env file with required variables
├── .gitignore            # List of files and directories to ignore in Git
├── .lintstagedrc.json    # Configuration for lint-staged
├── .mocharc.json         # Configuration for Mocha test framework
├── .prettierrc           # Configuration for Prettier code formatter
├── .versionrc            # Configuration for version bumping
├── docker-compose.yml    # Docker Compose configuration for services
├── Dockerfile            # Dockerfile for building the application image
├── nodemon.json          # Configuration for nodemon to watch file changes
├── package.json          # Node.js package configuration and dependencies
├── README.md             # Detailed information about the project
├── register.ts           # Register TypeScript compiler and configuration
├── tsconfig.json         # Configuration for TypeScript compiler
└── tslint.json           # Configuration for TSLint code linter
```

## Installation


### Clone the Repository
Clone the repository using the following command:
```bash
git clone https://github.com/uamedwed/nodejs-ts-boilerplate.git
```

### Navigate to the Project Directory
Navigate to the project directory using the following command:
```bash
cd nodejs-ts-boilerplate
```

### Install Dependencies
Install the project dependencies using the following command:
```bash
npm install
```

## Usage
To run the application, set the required environment variables and execute the following command:
```bash
npm start
```

### Developing
To run the application in development mode, set the environment variables as described below and run the following commands:
```bash
npm install
```

### Environment Variables
Create a .env.development file in the root of your project and add the required environment variables as shown below:
```plaintext
# Environment variables for Database Configuration
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
DATABASE_PORT=your_db_port

# Environment variables for Application Configuration
APP_PORT=3000 # Set the port on which your Node.js app will run
API_ENDPOINT=/api/v1 # Your API endpoint URL

# Add more environment variables as needed for your application
```

### Running in Development Mode
To run the application in development mode, set the environment variables and execute the following command:
```bash
npm run dev
```

### Developing with Docker
To start developing a project using docker containers, you need to run the following command.
```bash
docker compose --env-file .env.development up
```

To run the project in development mode and not display the database logs, execute the following command:
```bash
docker compose --env-file .env.development up --no-attach mongodb
```

### Testing
To run the tests, execute the following command:
```bash
npm run tests
```

### Release
```bash
npm run release
```

## Contributing
If you'd like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](https://github.com/uamedwed/nodejs-ts-boilerplate/blob/main/CONTRIBUTING.md)

## License
This project is licensed under the MIT License.

## Development Team
- Mykhailo Kudriashev - uamedwed.me

## Acknowledgements
Special thanks to the following projects and libraries:
- Express
- Mongoose
- Jest
- Swagger