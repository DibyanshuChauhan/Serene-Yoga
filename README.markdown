# Serene Yoga Studio - README

## Project Overview

**Serene Yoga Studio** is a fully functional, responsive web application designed for a yoga studio to provide an engaging user experience for both clients and administrators. The website allows users to explore yoga classes, register for sessions, read blog posts, manage their profiles, and interact with a dynamic calendar for class schedules. Administrators have access to a dashboard for managing users, registrations, subscriptions, and analytics. The project emphasizes modern web development practices, accessibility, and a seamless user interface with light/dark theme support.

This README provides a detailed explanation of the technologies used, project structure, features, and setup instructions to ensure clarity for any examiner or developer reviewing the project.

---

## Technologies Used

The project leverages a robust stack of front-end technologies and libraries to deliver a feature-rich, interactive, and responsive web application. Below is a detailed breakdown of each technology and its role in the project:

### 1. **HTML5**

- **Purpose**: Provides the structural foundation of the website.
- **Usage**:
  - Semantic elements (`<nav>`, `<section>`, `<footer>`, etc.) ensure accessibility and SEO optimization.
  - Modals for login, signup, class registration, and enquiry forms enhance user interaction.
  - Meta tags (`viewport`) enable responsive design for mobile and desktop devices.
  - Favicon support for multiple resolutions (e.g., Android, Apple touch icons) improves branding.
- **Key Features**:
  - Hero section with a background image for an immersive landing experience.
  - Structured sections for About, Classes, Blog, and Footer.
  - Embedded forms for user authentication and class registration.

### 2. **CSS3**

- **Purpose**: Handles styling, layout, and visual effects for a polished and responsive design.
- **Usage**:
  - **CSS Variables** (`:root`) for consistent theming (light/dark modes) using colors like `--primary`, `--secondary`, and `--background`.
  - **Flexbox** and **Grid** for responsive layouts (e.g., navigation menu, class/blog grids, team member display, footer sections).
  - **Media Queries** ensure adaptability across devices (mobile, tablet, desktop).
  - **Animations** (`@keyframes`) for smooth transitions (e.g., modal fade-in, slide-in effects for sections).
  - **Pseudo-classes** (e.g., `:hover`) and **pseudo-elements** (e.g., `::before`) for interactive elements like buttons and toggle switches.
  - **Custom Styling** for modals, cards, and calendar to align with the yoga studio's serene aesthetic.
- **External Libraries**:
  - **Font Awesome (v6.5.0)**: Provides icons for navigation (hamburger menu), social media links, and class details (e.g., clock, user).
  - **Google Fonts**: Uses *Poppins* (modern sans-serif) for body text and *Playfair Display* (elegant serif) for headings to enhance typography.
- **Key Features**:
  - Theme toggle (light/dark) for user preference.
  - Responsive navbar with a hamburger menu for mobile devices.
  - Wave divider (`wave-divider.svg`) for aesthetic section transitions.

### 3. **JavaScript (ES6+)**

- **Purpose**: Powers the dynamic and interactive functionality of the website.
- **Usage**:
  - **DOM Manipulation**: Updates content dynamically (e.g., dashboard, welcome message, modal content).
  - **Event Listeners**: Handles user interactions like form submissions, navigation clicks, theme toggling, and social sharing.
  - **Local Storage**: Persists user data (login credentials, registrations, bookings, subscriptions, theme preferences) for a seamless experience.
  - **Intersection Observer**: Animates elements (sections, cards) when they enter the viewport for a smooth scrolling experience.
  - **Form Validation**: Ensures valid inputs for login, signup, registration, and newsletter subscriptions.
  - **Calendar Integration**: Manages class schedules with filtering capabilities.
  - **Social Sharing**: Enables copying links and sharing content on platforms like Facebook and Twitter.
- **External Libraries**:
  - **FullCalendar (v5.11.3)**: Displays an interactive monthly calendar for class schedules, with clickable events that open modals for details and enquiries.
  - **Toastify.js (v1.12.0)**: Shows notification popups for user actions (e.g., successful login, registration, or errors).
  - **Locomotive Scroll (v4.1.4)**: Implements smooth scrolling for a premium navigation experience.
- **Key Features**:
  - User authentication with admin and user roles.
  - Admin dashboard with analytics (e.g., total users, bookings, popular classes).
  - User dashboard for profile management and booking history.
  - Progress bar indicating scroll position.
  - Back-to-top button for easy navigation.

### 4. **Local Storage**

- **Purpose**: Provides client-side data persistence without a backend database.
- **Usage**:
  - Stores user accounts (`users`), registrations (`registrations`), bookings (`bookings`), subscriptions (`subscriptions`), and theme preferences.
  - Manages login state (`isLoggedIn`) and current user data (`currentUser`).
- **Key Features**:
  - Default admin account (`username: admin`, `password: admin123`) for initial access.
  - Secure storage of user profiles, class registrations, and newsletter subscriptions.

### 5. **Responsive Design**

- **Purpose**: Ensures the website is accessible and visually appealing on all devices.
- **Usage**:
  - CSS media queries adjust layouts for mobile (≤480px), tablet (≤768px), and desktop screens.
  - Mobile-friendly features like a collapsible hamburger menu and full-width modals.
  - Viewport meta tag (`width=device-width, initial-scale=1.0`) for proper scaling.

### 6. **Accessibility**

- **Purpose**: Enhances usability for screen readers and keyboard navigation.
- **Usage**:
  - Semantic HTML for better structure and compatibility with assistive technologies.
  - ARIA attributes (e.g., `aria-label` for theme toggle and back-to-top button).
  - High-contrast themes (light/dark) for readability.

### 7. **External CDNs**

- **Purpose**: Loads third-party libraries efficiently to reduce local file size.
- **Usage**:
  - Links to Font Awesome, Google Fonts, FullCalendar, Toastify.js, and Locomotive Scroll via `cdnjs` and `jsdelivr`.
  - Cloudflare challenge script for security (included in `index.html`).

### 8. **Other**

- **Favicon Support**: Multiple favicon sizes for cross-device compatibility (e.g., Android Chrome, Apple Touch).
- **Wave Divider**: Custom SVG for aesthetic section separation.
- **Theme Persistence**: Saves user theme preference (`light` or `dark`) in `localStorage`.

---

## Project Structure

The project consists of the following key files and directories:

```
serene-yoga-studio/
├── index.html          # Main HTML file with structure and content
├── script.js           # JavaScript file for dynamic functionality
├── styles.css          # CSS file for styling and responsive design
├── assets/             # Directory for images and SVGs
│   ├── hero.png        # Hero section background
│   ├── *.jpg/*.webp    # Images for classes, blogs, and team
├── favicon_io/         # Directory for favicon files
│   ├── *.png           # Favicon images for various devices
│   ├── favicon.ico
```

- **index.html**: Defines the website's structure, including navigation, hero section, about section, class schedules, blog posts, footer, and modals for user interactions.
- **script.js**: Contains all JavaScript logic for authentication, dashboard management, form handling, calendar integration, and animations.
- **styles.css**: Includes custom styles, theme definitions, and responsive design rules.
- **assets/**: Stores images for the hero section, classes, blogs, team members, and the wave divider SVG.
- **favicon_io/**: Contains favicon files for branding across devices.

---

## Key Features

The project offers a rich set of features for both users and administrators, ensuring a complete yoga studio management experience:

### 1. **User Authentication**

- **Login/Signup Modals**: Users can log in or create accounts with username and password.
- **Admin Account**: Default admin credentials (`admin`/`admin123`) for administrative access.
- **Local Storage**: Stores user data securely on the client side.
- **Toast Notifications**: Feedback for successful logins, signups, or errors.

### 2. **Role-Based Dashboards**

- **User Dashboard**:
  - View and manage profile details (email, phone).
  - Access booking history.
  - Register for classes via a dedicated modal.
- **Admin Dashboard**:
  - View analytics (total users, bookings, registrations, subscriptions, most popular class).
  - Manage users (delete non-admin users).
  - View class registrations, newsletter subscriptions, and enquiries.

### 3. **Class Scheduling**

- **FullCalendar Integration**: Displays a monthly calendar with yoga class events.
- **Filters**: Buttons to filter classes by type (e.g., Hatha, Vinyasa, All).
- **Event Details**: Clicking a calendar event opens a modal with class details (title, time, instructor, level, duration) and an enquiry option.
- **Randomized Scheduling**: Classes are shuffled weekly for variety.

### 4. **Class Registration and Enquiry**

- **Registration Modal**: Users can register for classes by providing full name, email, phone, class type, date, and time.
- **Enquiry Modal**: Allows users to submit enquiries for specific classes with additional messages.
- **Data Storage**: Registrations and enquiries are saved in `localStorage` for admin review.

### 5. **Blog Section**

- **Blog Cards**: Display summaries of blog posts with images and titles.
- **Read More/Show Less**: Expandable content for detailed blog reading.
- **Social Sharing**: Copy links or share blogs on Facebook/Twitter.

### 6. **Responsive Navigation**

- **Sticky Navbar**: Remains fixed at the top with smooth scrolling to sections.
- **Hamburger Menu**: Collapsible menu for mobile devices.
- **Theme Toggle**: Switch between light and dark themes with icon changes (sun/moon).
- **Navbar Toggle**: Option to hide/show the navbar via a switch.

### 7. **Social Media and Sharing**

- **Social Links**: Footer links to Facebook, Instagram, and Twitter.
- **Shareable Links**: Copy class/blog URLs to clipboard.
- **Social Media Sharing**: Share classes/blogs on Facebook/Twitter (Instagram sharing via copied link).

### 8. **Newsletter Subscription**

- **Form**: Users can subscribe to the newsletter with email validation.
- **Authentication Check**: Requires login to subscribe.
- **Admin View**: Admins can view all subscriptions in the dashboard.

### 9. **Animations and Interactivity**

- **Smooth Scrolling**: Powered by Locomotive Scroll for a premium experience.
- **Intersection Observer**: Animates sections, cards, and team members on scroll.
- **Progress Bar**: Visual indicator of scroll position.
- **Back-to-Top Button**: Appears after scrolling down for quick navigation.

### 10. **Accessibility and Theming**

- **Light/Dark Themes**: Persistent theme selection saved in `localStorage`.
- **ARIA Labels**: Improve accessibility for buttons (e.g., theme toggle, back-to-top).
- **Semantic HTML**: Enhances screen reader compatibility.

---

## Setup Instructions

To run the project locally, follow these steps:

1. **Clone or Download the Project**:

   - Obtain the project files (`index.html`, `script.js`, `styles.css`, `assets/`, `favicon_io/`).

2. **Set Up a Local Server**:

   - Use a local server to serve the files (required for proper functioning of external CDNs and relative paths).
   - Options:
     - **VS Code Live Server**: Install the *Live Server* extension and open `index.html`.
     - **Python HTTP Server**: Run `python -m http.server 8000` in the project directory and access `http://localhost:8000`.
     - **Node.js**: Use `npx serve` or any static server.

3. **Open in Browser**:

   - Navigate to `http://localhost:<port>` (port depends on the server used).
   - The website will load, prompting a login modal for new users.

4. **Test Credentials**:

   - **Admin Access**: Use `username: admin`, `password: admin123` to access the admin dashboard.
   - **User Access**: Sign up with a new username/password or log in with existing credentials stored in `localStorage`.

5. **Dependencies**:

   - No manual installation is required as all libraries (Font Awesome, FullCalendar, Toastify.js, Locomotive Scroll, Google Fonts) are loaded via CDNs.
   - Ensure an active internet connection for CDN resources to load.

6. **Browser Compatibility**:

   - Tested on modern browsers (Chrome, Firefox, Edge, Safari).
   - Ensure JavaScript is enabled for full functionality.

---

## How to Test Key Features

1. **Login/Signup**:

   - On page load, the login modal appears.
   - Use admin credentials (`admin`/`admin123`) or sign up as a new user.
   - Verify toast notifications for successful/failed attempts.

2. **Dashboards**:

   - After logging in, click the welcome message to view the dashboard.
   - For admin: Explore analytics, user management, registrations, subscriptions, and enquiries.
   - For user: Update profile, view bookings, or register for classes.

3. **Class Calendar**:

   - Navigate to the *Classes* section.
   - Use filter buttons to view specific class types.
   - Click a calendar event to see details and submit an enquiry.

4. **Registration**:

   - From the user dashboard, open the registration modal.
   - Fill out the form and submit to save the registration in `localStorage`.

5. **Blog and Sharing**:

   - In the *Blog* section, click *Read More* to expand posts.
   - Test copying links or sharing on social media (Facebook/Twitter).

6. **Theme Toggle**:

   - Click the sun/moon icon in the navbar to switch themes.
   - Verify theme persistence after page refresh.

7. **Responsive Design**:

   - Resize the browser or use developer tools to test mobile/tablet views.
   - Check the hamburger menu and modal layouts on smaller screens.

---

## Notes for Examiners

- **No Backend Required**: The project is entirely client-side, using `localStorage` for data persistence, making it easy to test without server setup.
- **Security**: User passwords are stored in plain text in `localStorage` for simplicity. In a production environment, a backend with proper encryption would be used.
- **Extensibility**: The codebase is modular, with clear separation of HTML (structure), CSS (styling), and JavaScript (logic), allowing easy additions like new features or backend integration.
- **Error Handling**: Toast notifications provide feedback for invalid inputs, failed logins, or subscription issues.
- **Performance**: External CDNs reduce local file size, and Locomotive Scroll ensures smooth performance for scrolling-heavy pages.
- **Code Organization**:
  - `script.js` includes comments for key functions (e.g., `showToast`, `displayDashboard`).
  - `styles.css` uses CSS variables and organized sections for maintainability.
  - `index.html` follows a logical structure with semantic tags.

---

## Future Enhancements

- **Backend Integration**: Add a server (e.g., Node.js, Firebase) for secure user data storage and real-time updates.
- **Payment Gateway**: Enable online payments for class registrations.
- **Advanced Analytics**: Include charts (e.g., Chart.js) in the admin dashboard for visual data representation.
- **Email Notifications**: Send confirmation emails for registrations and subscriptions.
- **Accessibility Improvements**: Add more ARIA attributes and keyboard navigation support.

---

## Conclusion

**Serene Yoga Studio** is a well-rounded web application showcasing modern front-end development techniques. It combines **HTML5**, **CSS3**, **JavaScript**, and popular libraries to deliver a responsive, interactive, and user-friendly experience. The project is designed to be intuitive for users and administrators, with clear documentation and setup instructions to facilitate evaluation. For any questions or clarifications, the code and this README provide all necessary details.

**Developed by**: Aditya Kumar Dhal
**Date**:  02 May 2025