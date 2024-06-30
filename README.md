# MixAnime

Welcome to MixAnime, your go-to platform for streaming a wide range of anime series. Developed using MongoDB, Express.js, Nunjucks, and Node.js, MixAnime provides a seamless and immersive streaming experience.

## Website Link

[MixAnime](https://mixanime.onrender.com/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication using JWT.
- **Anime Catalog**: Browse and search from a large collection of anime series.
- **Streaming**: High-quality streaming with support for multiple resolutions.
- **Favorites**: Users can add anime to their favorites list.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Admin Panel**: Admin functionality to manage anime content and users.

## Technologies Used

- **Frontend**: Nunjucks
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Hosting**: Render

## Installation

### Prerequisites

- Node.js (v18 or above)
- MongoDB

### Steps

1. Clone the repository:

    ```sh
    git clone -b mixanime-V-0.8 https://github.com/sandy-5000/mixanime.git
    cd mixanime
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the directory and add the following environment variables:

    ```env
    PORT=5000
    MONGO_DB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:

    ```sh
    npm start
    ```

5. Open your browser and navigate to `http://localhost:{PORT}`.

## Usage

1. Register or log in to your account.
2. Browse or search for your favorite anime.
3. Click on an anime to start streaming.
4. Add anime to your favorites for quick access.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using MixAnime! If you have any questions or feedback, feel free to open an issue or contact us. Enjoy streaming!

---

**Note**: Replace `https://github.com/sandy-5000/mixanime.git` with your actual GitHub repository URL, and ensure you have set up the necessary environment variables and configurations for deployment on Render.