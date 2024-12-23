# Optimized Virtualized Masonry Grid with Detailed Photo View

This project is an implementation of an optimized virtualized masonry grid that displays a collection of photos. The grid layout adjusts dynamically, offering an efficient and seamless experience when navigating large photo collections. Clicking on a photo brings up a detailed view with additional information.
The project includes a search functionality that allows users to filter images based on keywords or tags, helping users quickly find specific photos within large datasets. The search updates in real-time as users type, providing an efficient and smooth search experience.

---

## Table of Contents

- [Installation](#installation)
- [Build Instructions](#build-instructions)
- [Running the Project](#running-the-project)
- [Design Decisions](#design-decisions)
- [Used Tools](#used-tools)

---

## Installation

To get started with this project, follow these steps:

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/vvardges/growth-group.git
   cd growth-group
   ```

2. **Install dependencies** using npm:
   ```bash
   npm install
   ```

3. **Set up environment variables:**
    - Add the following environment variables to the `.env` file:

      ```bash
      VITE_PEXELS_API_KEY=your_pexels_api_key_here
      VITE_PEXELS_API_URL=https://api.pexels.com/v1
      ```

        - `VITE_PEXELS_API_KEY`: This is your personal API key provided by **Pexels**. You can get your API key by signing up on the [Pexels API page](https://www.pexels.com/api/). This key will be used to authenticate your requests to Pexels and retrieve photo data.
        - `VITE_PEXELS_API_URL`: This is the base URL for the **Pexels API**. It should not be changed unless the API's base URL is updated by Pexels.

      These environment variables will ensure the proper functioning of API calls and data fetching from Pexels in your application.

4. **Start the development server:**
   After installing the dependencies and setting up the environment variables, you can start the application in development mode:
   ```bash
   npm run dev
   ```

This will start the development server and automatically open the application in your default web browser.

---

## Build Instructions

To build the project for production, run:

```bash
npm run build
```

This will generate an optimized production build in the `dist/` directory, which is ready for deployment.

---

## Running the Project

### Development Mode

To run the project in development mode with live reloading, use the following command:

```bash
npm run dev
```

This will start the development server and automatically open the application in your default web browser. Any changes made to the code will automatically trigger a page reload.

### Preview Production Build

Once you've built the project, you can preview the production build locally by running:

```bash
npm run preview
```

This will serve the production-ready files from the `dist/` directory, simulating the live environment so you can verify that everything is working correctly before deploying.

---

## Design Decisions

### 1. **Virtualization**
- We implemented custom logic to handle virtualization, avoiding the overhead of external libraries. This ensures better performance and responsiveness, especially when dealing with large photo datasets.

### 2. **Infinite Scroll**
- **Infinite Scroll** was implemented to enhance the user experience by seamlessly loading new photos as the user scrolls, without needing manual pagination. This provides a fluid browsing experience.

### 3. **TypeScript**
- We used **TypeScript** to ensure strong typing throughout the application. This enhances maintainability, reduces runtime errors, and provides a more robust development experience.

### 4. **Image Optimization**
- **Responsive Images**: We leverage the **`srcset`** and **`sizes`** attributes for `<img>` elements. This ensures that the appropriate image size is served based on the user's device resolution and viewport size, reducing unnecessary data usage while maintaining image quality. By providing multiple versions of each image (e.g., low-resolution for mobile and high-resolution for desktop), we optimize performance across a wide range of devices.
- **Image Preloading**: To speed up the loading of above-the-fold images, we use the **preload** technique for critical images. This prioritizes fetching these images early in the page load process, ensuring that important visuals are displayed as soon as possible without delay.
- This combination of responsive image handling and preloading ensures a fast, optimized experience for users, regardless of their device or connection speed.

### 5. **Code Splitting**
- **Vite Manual Configurations**: We configure **Vite** to split the code into smaller chunks using Vite’s built-in **code splitting** capabilities.
- **React.lazy**: To further optimize the loading of components, we use **React.lazy** for code splitting at the component level. This allows us to load components asynchronously only when they are required, reducing the JavaScript bundle size and speeding up the rendering of the initial page.

Together, these techniques help reduce the overall size of the application, ensuring faster load times and a more responsive user experience.

### 6. **Error Handling**
- **Error Boundaries** were implemented to catch and handle errors gracefully. This ensures that any issues do not crash the application, but instead provide the user with a fallback UI or message, improving the overall user experience.

---

## Used Tools

The following tools and libraries were used to build this project:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript for better maintainability.
- **Vite**: A build tool that provides fast development startup and optimized production builds.
- **Pexels API**: Provides high-quality, free stock photos used in the application.
- **Intersection Observer API**: Utilized for lazy-loading images as they come into view.
- **React.lazy**: For code-splitting React components to improve load performance.
- **Lighthouse**: An open-source, automated tool for improving the quality of web pages, used to measure performance and best practices.
- **Web Vitals**: A set of metrics that help capture the user experience of a site, measuring things like load times and interactivity. We use Web Vitals to track performance and ensure a smooth user experience.