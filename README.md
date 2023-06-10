# Instagram Clone

This repository contains the code for an Instagram clone, a frontend web application built using Next.js, Tailwind CSS, Redux Toolkit, and React Query. It aims to replicate the core features and design of the popular social media platform, Instagram.

![Instagram Clone](https://github.com/tehseen01/instagram-clone/assets/86504467/18b1b53b-68ad-4808-ac98-253112b17206)


## Features

- User authentication: Sign up, log in, and log out functionalities.
- User profile: Display user information, profile picture, and the ability to update the profile picture.
- Home feed: Display posts from the users that the logged-in user follows.
- Explore page: Discover new users and posts.
- Create post: Upload images with captions and post them.
- Like and comment: Interact with posts by liking and commenting on them.
- Responsive design: Mobile-friendly layout for a seamless experience on different devices.

## Technologies Used

- Next.js: A React framework for building server-side rendered and static websites.
- Tailwind CSS: A utility-first CSS framework for building custom user interfaces.
- Redux Toolkit: A simplified state management library for React applications.
- React Query: A library for managing server state and caching data in React applications.
- Firebase: A platform for building web and mobile applications.
- Cloud Firestore: A NoSQL cloud database for storing and syncing data.
- Cloud Storage: A service for storing user-uploaded images.

## Backend

The backend for this project is developed in a separate repository. You can find the code and documentation for the backend API in the [social-api](https://github.com/tehseen01/social-api) repository.

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/tehseen01/instagram-clone.git
   ```

2. Install the dependencies:

   ```bash
   cd instagram-clone
   npm install
   ```
   
3. Set up environment variables:
   - Create a `.env` file in the `root` directory.
   - Add the following variables to the .env file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/
```

4. Start the development server:

   ```bash
   npm run dev
   ```

The web application should now be running at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any bugs or want to suggest new features, please open an issue or submit a pull request.
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
