# run DataBase Server (Docker)
```sh
sudo docker run --name bread -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 mysql:latest # && sudo docker rm -f bread
```

# Reddit Clone (Breadit Readit Clone)

<!-- ![Reddit Clone](https://your-image-url-here.com) -->

This is a Reddit clone project, known as "Breadit Readit Clone." This application aims to replicate the core functionalities of Reddit, allowing users to post, discuss, and upvote/downvote content on various topics. It's built using a modern tech stack, including Next.js, Prisma, Tailwind CSS, and more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get this project up and running on your local machine, follow the instructions below.

### Prerequisites

Make sure you have the following tools and dependencies installed on your system:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alk-neq-me/breadit-readit-clone.git
   ```

2. Change into the project directory:

   ```bash
   cd reddit-clone
   ```

3. Install the project dependencies:

   ```bash
   yarn
   ```

4. Set up your database and update the Prisma schema as needed.

   ```bash
   # Create a new database and configure it in your .env file
   cp .env.example .env

   # Update the DATABASE_URL in the .env file to point to your PostgreSQL database.
   # Then apply the migrations
   yarn prisma migrate dev
   ```

5. Start the development server:

   ```bash
   yarn dev
   ```

## Usage

To use the Reddit Clone application, open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

## Features

- User authentication and authorization using NextAuth.js.
- Posting and commenting on topics.
- Upvoting and downvoting posts and comments.
- Rich text editor for creating and editing posts.
- Responsive design for a seamless experience on various devices.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to this repository's `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy using the Breadit Readit Clone! If you have any questions or issues, please don't hesitate to open an issue or contact the project maintainers.
