# Instagram Clone

This repository contains an Instagram clone, a web application built using modern web technologies to replicate some of the core features and functionalities of the popular social media platform, Instagram.

## Features
- User registration and authentication
- Profile creation and customization
- Posting photos and videos
- Following other users
- Liking and commenting on posts
- Direct messaging between users
- Explore page to discover new content
- Notifications for various activities

## Technologies Used
- **Frontend:** Next.js, Tailwind CSS, Typescript, redux-toolkit 
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB

### More details about backend go to this repository https://github.com/tehseen01/social-api.git

## Installation

1.  Create a folder 
2.  Clone the repository:

```bash
# Frontend repository
git clone https://github.com/tehseen01/instagram-clone.git

# backend repository
git clone https://github.com/tehseen01/social-api.git
```

2. Install the dependencies for frontend:

```bash
# Go to the backend directory
yarn install

# Go to the frontend directory
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the `frontend` directory.
   - Add the following variables to the .env file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/
```
  - Create a `.env` file in the `backend` directory.
  - Add the following variables to the .env file:

```
PORT = 8080
MONGO_URL = <your-mongodb-connection-string>
JWT_SECRET = <your-jwt-secret-key>

SMPT_USER = <your-smpt-gmail>
SMPT_PASSWORD = <your-smpt-password>

CLOUDINARY_NAME= <your-cloudinary-name>
CLOUDINARY_API_KEY =<your-coudinary-api-key>
CLOUDINARY_API_SECRET = <your-coudinary-api-secret>
```

4. Start the development server for both the backend and frontend:

```bash
# Go to the backend directory
cd instagram-clone/backend
yarn start

# Go to the frontend directory
cd ../frontend
npm run dev
```

The development server for the backend will start running at `http://localhost:8080`, and the frontend will be accessible at `http://localhost:3000`.

## Contributing

We welcome contributions from the developer community to enhance the Instagram clone. To contribute, follow these steps:

1. Fork the repository to your GitHub account.

2. Clone the forked repository to your local machine:

```bash
git clone https://github.com/<your-username>/instagram-clone.git
```

3. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature
```

4. Make the necessary changes and additions.

5. Commit your changes with descriptive commit messages with issue id:

```bash
git commit -m "#issue-id Add feature/fix to improve the functionality"
```

6. Push your changes to the branch on your forked repository:

```bash
git push origin feature/your-feature
```

7. Open a pull request (PR) on the original repository and provide a clear description of your changes.

Once your pull request is reviewed and approved, it will be merged into the main repository.

### Guidelines for Contributing

- Follow the existing code style and naming conventions.
- Write clear commit messages and PR descriptions.
- Test your changes thoroughly before submitting a PR.
- Ensure that your code doesn't introduce any linting errors or warnings.
- Be respectful and considerate towards other contributors.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or feedback, feel free to contact me at tehseen.type@gmail.com.

Thank you for your interest in contributing to the Instagram clone! We appreciate your efforts to make this project better.
