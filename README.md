# Murakami Messageboard App

This project is a simple messageboard application dedicated to discussions and comments about a specific Haruki Murakami book. It allows users to read existing messages, post their own thoughts, and engage with other readers through upvoting and downvoting.

[live preview can be viewed here](https://message-board-beta.vercel.app/)

## Project Overview

This application is built using a modern web development stack, separating the frontend and backend into distinct components:

* **Frontend:** Developed using Next.js (React framework) for a dynamic and user-friendly interface. It's hosted on Vercel for seamless deployment and scalability.
* **Backend:** Built with Express.js (Node.js framework) to handle API requests and interact with the database. It's hosted on Render, providing a reliable platform for the backend server.
* **Database:** Uses SQLite, a lightweight and file-based database, for storing messages and votes.

## Frontend (`/frontend`)

The frontend, built with Next.js and React, provides a single, intuitive page for all interactions. The main components of this page are:

* **`Card`:** This component is responsible for displaying individual messages (comments) posted by users. Each card shows the message content, author, timestamp, and the current number of upvotes and downvotes.
* **`Form`:** This component provides an input field and a submission button, allowing users to write and post new messages to the messageboard.
* **`Description`:** This component displays information about the specific Murakami book. This includes the book cover image and a brief description or synopsis of the novel.
* **`pages/layout.tsx`:** This represents the main layout component that provides the overall structure and styling for the entire page, wrapping the other components.
* **`pages/index.tsx`:** This is the main page component that integrates all the other frontend components to create the user interface.

## Backend (`/backend`)

The backend, built with Express.js, provides a simple API to manage the messageboard data stored in the SQLite database. Its primary functionalities include:

* **Configuration:** Sets up Cross-Origin Resource Sharing (CORS) to allow the frontend hosted on Vercel to communicate with the backend hosted on Render. It also establishes a connection to the SQLite database file.
* **`GET /`:** This endpoint handles GET requests to retrieve messages from the SQLite database. It supports querying messages based on either the date they were posted or the number of votes they have received, allowing for different sorting options on the frontend.
* **`PUT /submit`:** This endpoint handles POST requests when a user submits a new message through the frontend form. It receives the message data and inserts it as a new record into the SQLite database.
* **`POST /vote`:** This endpoint handles POST requests to register an upvte/downvote for a specific message. It receives the message identifier and updates the vote count in the SQLite database.

## Upvoting/Downvoting Behavior

To provide a smoother and more responsive user experience, the upvoting and downvoting actions have a specific behavior:

* When a user clicks the upvote or downvote button on a message, the vote count displayed on the frontend is immediately updated.
* The actual update to the SQLite database on the backend happens asynchronously in the background.
* The application **does not automatically reload or fetch the updated vote counts from the backend** after an upvote or downvote. To see the updated vote counts reflected from the database, the user needs to manually refresh the page.

This approach prioritizes a snappy user interface by providing immediate visual feedback to the user's interaction, even though the data in the backend might take a brief moment to be updated.
