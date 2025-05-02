/*
 * Utility function to show toast messages
 * Displays a notification with customizable message and error styling
 */
function showToast(message, isError = false) {
  // Creates a toast notification using Toastify library with specified message
  // isError flag determines the background color (red for error, yellow for success)
  Toastify({
    text: message,
    duration: 3000, // Toast displays for 3 seconds
    close: true, // Adds a close button to the toast
    gravity: "top", // Positions toast at the top of the screen
    position: "right", // Aligns toast to the right side
    backgroundColor: isError
      ? "linear-gradient(to right, #ff0000, #ff5555)" // Red gradient for errors
      : "linear-gradient(to right, #f59e0b, #facc15)", // Yellow gradient for success
    stopOnFocus: true, // Pauses toast timer when hovered
  }).showToast(); // Displays the toast
}

// DOM Elements for login/signup/registration
// References to modal elements for login, signup, and registration
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");
const registrationModal = document.getElementById("registration-modal");
const mainContent = document.getElementById("main-content"); // Main content area
const signupLink = document.getElementById("signup-link"); // Link to switch to signup modal
const loginLink = document.getElementById("login-link"); // Link to switch to login modal
const loginForm = document.getElementById("login-form"); // Login form element
const signupForm = document.getElementById("signup-form"); // Signup form element
const registrationForm = document.getElementById("registration-form"); // Registration form element
const closeLoginModal = document.getElementById("close-login-modal"); // Close button for login modal
const closeSignupModal = document.getElementById("close-signup-modal"); // Close button for signup modal
const closeRegistrationModal = document.getElementById(
  "close-registration-modal"
); // Close button for registration modal

// Navbar elements
// References to navigation-related elements
const navLinks = document.querySelector(".nav-links"); // Navigation links container
const welcomeMessage = document.querySelector(".welcome-message"); // Welcome message for logged-in user
const dashboardContent = document.querySelector(".dashboard-content"); // Dashboard dropdown content
const logoutBtn = document.querySelector(".logout-btn"); // Logout button

// Initialize default admin account if not already present
// Checks if users exist in localStorage; if not, creates a default admin account
if (!localStorage.getItem("users")) {
  const defaultAdmin = [
    {
      username: "admin",
      password: "admin123",
      role: "admin", // Admin role for elevated privileges
      email: "admin@sereneyoga.com",
      phone: "1234567890",
    },
  ];
  // Stores default admin account in localStorage as JSON
  localStorage.setItem("users", JSON.stringify(defaultAdmin));
}

// Check login status
// Determines if user is logged in by checking localStorage
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Boolean flag for login status
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null; // Current user object or null

// Show login modal if not logged in
// Displays login modal and hides main content if user is not logged in
if (!isLoggedIn) {
  loginModal.style.display = "flex"; // Shows login modal
  mainContent.style.display = "none"; // Hides main content
} else {
  // If logged in, hide login modal and show main content
  loginModal.style.display = "none";
  mainContent.style.display = "block";
  updateNavbarWelcome(); // Updates navbar with welcome message
  displayDashboard(); // Displays user or admin dashboard
  // Shows welcome toast with user role and username
  showToast(
    `Welcome, ${currentUser.role === "admin" ? "Admin" : "User"} ${
      currentUser.username
    }!`
  );
  logoutBtn.style.display = "inline-block"; // Shows logout button
}

// Function to update navbar with welcome message
// Updates the welcome message in the navbar based on user role
function updateNavbarWelcome() {
  welcomeMessage.textContent = `Welcome, ${
    currentUser.role === "admin" ? "Admin" : currentUser.username
  }`; // Sets welcome text
}

// Toggle dashboard visibility on welcome message click
// Toggles the dashboard dropdown when welcome message is clicked
welcomeMessage.addEventListener("click", () => {
  const isVisible = dashboardContent.style.display === "block"; // Checks current visibility
  dashboardContent.style.display = isVisible ? "none" : "block"; // Toggles visibility
});

// Switch to signup modal
// Shows signup modal and hides login modal when signup link is clicked
signupLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents default link behavior
  loginModal.style.display = "none"; // Hides login modal
  signupModal.style.display = "flex"; // Shows signup modal
});

// Switch to login modal
// Shows login modal and hides signup modal when login link is clicked
loginLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents default link behavior
  signupModal.style.display = "none"; // Hides signup modal
  loginModal.style.display = "flex"; // Shows login modal
});

// Close modals
// Closes respective modals when close buttons are clicked
closeLoginModal.addEventListener("click", () => {
  loginModal.style.display = "none"; // Hides login modal
});

closeSignupModal.addEventListener("click", () => {
  signupModal.style.display = "none"; // Hides signup modal
});

closeRegistrationModal.addEventListener("click", () => {
  registrationModal.style.display = "none"; // Hides registration modal
});

// Handle login form submission
// Processes login form data and authenticates user
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents default form submission
  const username = document.getElementById("login-username").value.trim(); // Gets username input
  const password = document.getElementById("login-password").value.trim(); // Gets password input

  const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieves users from localStorage
  // Finds user with matching username and password
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // If user is found, set login status and current user in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    loginModal.style.display = "none"; // Hides login modal
    mainContent.style.display = "block"; // Shows main content
    currentUser = user; // Updates currentUser variable
    updateNavbarWelcome(); // Updates navbar welcome message
    displayDashboard(); // Displays dashboard
    // Shows welcome toast
    showToast(
      `Welcome, ${user.role === "admin" ? "Admin" : "User"} ${user.username}!`
    );
    logoutBtn.style.display = "inline-block"; // Shows logout button
  } else {
    // If credentials are invalid, show error toast
    showToast("Invalid username or password!", true);
  }
});

// Handle signup form submission
// Processes signup form data to create a new user
signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents default form submission
  const username = document.getElementById("signup-username").value.trim(); // Gets username input
  const password = document.getElementById("signup-password").value.trim(); // Gets password input

  const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieves users from localStorage
  // Checks if username already exists
  const userExists = users.some((u) => u.username === username);

  if (userExists) {
    // If username exists, show error toast
    showToast("Username already exists! Try a different one.", true);
    return;
  }

  // Creates new user object with default role and empty fields
  const newUser = { username, password, role: "user", email: "", phone: "" };
  users.push(newUser); // Adds new user to users array
  localStorage.setItem("users", JSON.stringify(users)); // Updates localStorage
  showToast("Account created successfully! Please log in."); // Shows success toast
  signupModal.style.display = "none"; // Hides signup modal
  loginModal.style.display = "flex"; // Shows login modal
});

// Handle registration form submission
// Processes class registration form data
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents default form submission
  // Collects form input values
  const fullname = document.getElementById("reg-fullname").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const phone = document.getElementById("reg-phone").value.trim();
  const selectedClass = document.getElementById("reg-class").value;
  const date = document.getElementById("reg-date").value;
  const time = document.getElementById("reg-time").value;

  // Creates registration object with user details
  const registration = {
    username: currentUser.username,
    fullname,
    email,
    phone,
    class: selectedClass,
    date,
    time,
  };

  // Retrieves existing registrations from localStorage
  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  registrations.push(registration); // Adds new registration
  localStorage.setItem("registrations", JSON.stringify(registrations)); // Updates localStorage

  showToast("Registration successful!"); // Shows success toast
  registrationForm.reset(); // Resets form
  registrationModal.style.display = "none"; // Hides registration modal
});

// Function to display dashboard based on role
// Renders admin or user dashboard based on current user's role
function displayDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser")); // Gets current user
  if (!user) return; // Exits if no user

  let dashboardHTML = ""; // Initializes dashboard HTML
  if (user.role === "admin") {
    // Admin dashboard content
    const users = JSON.parse(localStorage.getItem("users")) || []; // Gets all users
    const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // Gets all bookings
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || []; // Gets all registrations
    const subscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || []; // Gets all subscriptions
    // Counts bookings per class
    const classCounts = bookings.reduce((acc, booking) => {
      acc[booking.class] = (acc[booking.class] || 0) + 1;
      return acc;
    }, {});
    // Determines most popular class
    const popularClass = Object.keys(classCounts).length
      ? Object.keys(classCounts).reduce((a, b) =>
          classCounts[a] > classCounts[b] ? a : b
        )
      : "None";

    // Generates admin dashboard HTML with links to various sections
    dashboardHTML = `
      <div class="dashboard admin-dashboard">
        <h2>Admin Dashboard</h2>
        <p>Manage users, registrations, subscriptions, enquiries, and view analytics.</p>
        <ul>
          <li><a href="#" onclick="showAnalytics()">View Analytics</a></li>
          <li><a href="#" onclick="manageUsers()">Manage Users</a></li>
          <li><a href="#" onclick="showRegistrations()">View Registrations</a></li>
          <li><a href="#" onclick="showSubscriptions()">View Subscriptions</a></li>
          <li><a href="#" onclick="showEnquiries()">View Enquiries</a></li>
        </ul>
        <div class="analytics-section" style="display: none;">
          <h3>Analytics Overview</h3>
          <p><strong>Total Users:</strong> ${users.length}</p>
          <p><strong>Total Bookings:</strong> ${bookings.length}</p>
          <p><strong>Total Registrations:</strong> ${registrations.length}</p>
          <p><strong>Total Subscriptions:</strong> ${subscriptions.length}</p>
          <p><strong>Most Popular Class:</strong> ${popularClass}</p>
        </div>
        <div class="users-section" style="display: none;">
          <h3>Manage Users</h3>
          <div id="user-list"></div>
        </div>
        <div class="registrations-section" style="display: none;">
          <h3>Class Registrations</h3>
          <div id="registration-list"></div>
        </div>
        <div class="subscriptions-section" style="display: none;">
          <h3>Newsletter Subscriptions</h3>
          <div id="subscription-list"></div>
        </div>
        <div class="enquiries-section" style="display: none;">
          <h3>Class Enquiries</h3>
          <div id="enquiry-list"></div>
        </div>
      </div>
    `;
  } else {
    // User dashboard content
    dashboardHTML = `
      <div class="dashboard user-dashboard">
        <h2>User Dashboard</h2>
        <p>Welcome, ${
          user.username
        }! Manage your profile, view bookings, and register for classes.</p>
        <ul>
          <li><a href="#classes">Enquiry for a Class</a></li>
          <li><a href="#" onclick="showBookings()">View Bookings</a></li>
          <li><a href="#" onclick="showProfile()">Manage Profile</a></li>
          <li><a href="#" onclick="showRegistrationModal()">Register for Classes</a></li>
        </ul>
        <div class="profile-section" style="display: none;">
          <h3>Manage Profile</h3>
          <form id="profile-form">
            <div>
              <label for="profile-username">Username:</label>
              <input type="text" id="profile-username" value="${
                user.username
              }" disabled />
            </div>
            <div>
              <label for="profile-email">Email:</label>
              <input type="email" id="profile-email" value="${
                user.email || ""
              }" required />
            </div>
            <div>
              <label for="profile-phone">Phone:</label>
              <input type="tel" id="profile-phone" value="${
                user.phone || ""
              }" required />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
        <div class="bookings-section" style="display: none;">
          <h3>Your Bookings</h3>
          <div id="user-bookings"></div>
        </div>
      </div>
    `;
  }
  dashboardContent.innerHTML = dashboardHTML; // Sets dashboard content

  // Attach profile form listener
  // Handles profile updates for users
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevents default form submission
      const email = document.getElementById("profile-email").value.trim(); // Gets email input
      const phone = document.getElementById("profile-phone").value.trim(); // Gets phone input
      const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieves users
      // Updates user email and phone in users array
      const updatedUsers = users.map((u) =>
        u.username === user.username ? { ...u, email, phone } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Updates localStorage
      // Updates current user in localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, email, phone })
      );
      currentUser = { ...user, email, phone }; // Updates currentUser variable
      showToast("Profile updated successfully!"); // Shows success toast
    });
  }
}

// Function to show registration modal
// Displays the class registration modal
function showRegistrationModal() {
  registrationModal.style.display = "flex"; // Shows registration modal
}

// Function to show bookings
// Displays user's bookings in the dashboard
function showBookings() {
  const bookingsSection = document.querySelector(".bookings-section"); // Bookings section element
  // Other dashboard sections
  const otherSections = document.querySelectorAll(
    ".profile-section, .analytics-section, .users-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none")); // Hides other sections
  bookingsSection.style.display = "block"; // Shows bookings section

  const user = JSON.parse(localStorage.getItem("currentUser")); // Gets current user
  const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // Gets all bookings
  // Filters bookings for current user
  const userBookings = bookings.filter((b) => b.username === user.username);
  const bookingsDiv = document.getElementById("user-bookings"); // Bookings display div
  // Displays user bookings or a message if none exist
  bookingsDiv.innerHTML = userBookings.length
    ? userBookings
        .map((b) => `<p>${b.class} on ${b.date} at ${b.time}</p>`)
        .join("")
    : "<p>No bookings yet.</p>";
}

// Function to show profile
// Displays user's profile section in the dashboard
function showProfile() {
  const profileSection = document.querySelector(".profile-section"); // Profile section element
  // Other dashboard sections
  const otherSections = document.querySelectorAll(
    ".bookings-section, .analytics-section, .users-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none")); // Hides other sections
  profileSection.style.display = "block"; // Shows profile section
}

// Function to show analytics
// Displays analytics section for admin in the dashboard
function showAnalytics() {
  const analyticsSection = document.querySelector(".analytics-section"); // Analytics section element
  // Other dashboard sections
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .users-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none")); // Hides other sections
  analyticsSection.style.display = "block"; // Shows analytics section
}

// Function to manage users (admin only)
// Displays user management section for admin
function manageUsers() {
  const usersSection = document.querySelector(".users-section"); // Users section element
  // Other dashboard sections
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none")); // Hides other sections
  usersSection.style.display = "block"; // Shows users section

  const users = JSON.parse(localStorage.getItem("users")) || []; // Gets all users
  const userListDiv = document.getElementById("user-list"); // User list display div
  // Displays list of users with delete buttons (except for admin)
  userListDiv.innerHTML = users.length
    ? users
        .map(
          (u) => `
        <div class="user-item">
          <p><strong>Username:</strong> ${u.username}</p>
          <p><strong>Role:</strong> ${u.role}</p>
          ${
            u.role !== "admin"
              ? `<button class="delete-user-btn" data-username="${u.username}">Delete</button>`
              : ""
          }
        </div>
      `
        )
        .join("")
    : "<p>No users found.</p>";

  // Attach delete button listeners
  // Adds event listeners to delete buttons for removing users
  const deleteButtons = document.querySelectorAll(".delete-user-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const username = btn.dataset.username; // Gets username from button data
      let users = JSON.parse(localStorage.getItem("users")) || []; // Retrieves users
      users = users.filter((u) => u.username !== username); // Removes user
      localStorage.setItem("users", JSON.stringify(users)); // Updates localStorage
      manageUsers(); // Refreshes user list
      showToast("User deleted successfully!"); // Shows success toast
    });
  });
}

// Function to show registrations (admin only)
// Displays class registrations for admin
function showRegistrations() {
  const registrationsSection = document.querySelector(".registrations-section"); // Registrations section element
  // Other dashboard sections
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .users-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none")); // Hides other sections
  registrationsSection.style.display = "block"; // Shows registrations section

  const registrations = JSON.parse(localStorage.getItem("registrations")) || []; // Gets all registrations
  const registrationListDiv = document.getElementById("registration-list"); // Registration list display div
  // Displays list of registrations
  registrationListDiv.innerHTML = registrations.length
    ? registrations
        .map(
          (r) => `
        <div class="user-item">
          <p><strong>Username:</strong> ${r.username}</p>
          <p><strong>Full Name:</strong> ${r.fullname}</p>
          <p><strong>Email:</strong> ${r.email}</p>
          <p><strong>Phone:</strong> ${r.phone}</p>
          <p><strong>Class:</strong> ${r.class}</p>
          <p><strong>Date:</strong> ${r.date}</p>
          <p><strong>Time:</strong> ${r.time}</p>
        </div>
      `
        )
        .join("")
    : "<p>No registrations found.</p>";
}

// Function to show subscriptions (admin only)
// Displays newsletter subscriptions for admin
function showSubscriptions() {
  const subscriptionsSection = document.querySelector(".subscriptions-section"); // Subscriptions section element
  // Other dashboard sections
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .users-section, .registrations-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none")); // Hides other sections
  subscriptionsSection.style.display = "block"; // Shows subscriptions section

  const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || []; // Gets all subscriptions
  const subscriptionListDiv = document.getElementById("subscription-list"); // Subscription list display div
  // Displays list of subscriptions
  subscriptionListDiv.innerHTML = subscriptions.length
    ? subscriptions
        .map(
          (s) => `
        <div class="user-item">
          <p><strong>Username:</strong> ${s.username}</p>
          <p><strong>Email:</strong> ${s.email}</p>
        </div>
      `
        )
        .join("")
    : "<p>No subscriptions found.</p>";
}

// Function to show enquiries (admin only)
// Displays class enquiries for admin
function showEnquiries() {
  const enquiriesSection = document.querySelector(".enquiries-section"); // Enquiries section element
  // Other dashboard sections
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .users-section, .registrations-section, .subscriptions-section"
  );
  otherSections.forEach((section) => (section.style.display = "none")); // Hides other sections
  enquiriesSection.style.display = "block"; // Shows enquiries section

  const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // Gets all bookings (enquiries)
  const enquiryListDiv = document.getElementById("enquiry-list"); // Enquiry list display div
  // Displays list of enquiries
  enquiryListDiv.innerHTML = bookings.length
    ? bookings
        .map(
          (b) => `
        <div class="user-item">
          <p><strong>Username:</strong> ${b.username}</p>
          <p><strong>Class:</strong> ${b.class}</p>
          <p><strong>Date:</strong> ${b.date}</p>
          <p><strong>Time:</strong> ${b.time}</p>
        </div>
      `
        )
        .join("")
    : "<p>No enquiries found.</p>";
}

// Logout function
// Handles user logout
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false"); // Sets login status to false
  localStorage.removeItem("currentUser"); // Removes current user
  welcomeMessage.textContent = ""; // Clears welcome message
  dashboardContent.innerHTML = ""; // Clears dashboard content
  dashboardContent.style.display = "none"; // Hides dashboard
  logoutBtn.style.display = "none"; // Hides logout button
  loginModal.style.display = "flex"; // Shows login modal
  mainContent.style.display = "none"; // Hides main content
  showToast("Logged out successfully!"); // Shows success toast
});

// Hamburger menu functionality
// Toggles mobile navigation menu
const hamburger = document.querySelector(".hamburger"); // Hamburger icon
const links = document.querySelectorAll(".nav-links a"); // Navigation links

hamburger.addEventListener("click", () => {
  // Toggles active class for hamburger and nav links
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Handles navigation link clicks
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents default link behavior
    hamburger.classList.remove("active"); // Closes hamburger menu
    navLinks.classList.remove("active"); // Closes nav links
    links.forEach((l) => l.classList.remove("active")); // Removes active class from all links
    link.classList.add("active"); // Adds active class to clicked link
    // Smooth scrolls to target section
    const target = document.querySelector(link.getAttribute("href"));
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

// Closes mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("active"); // Closes hamburger
    navLinks.classList.remove("active"); // Closes nav links
    dashboardContent.style.display = "none"; // Hides dashboard
  }
});

// Highlight active section on scroll
// Updates active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section"); // All sections
  let current = ""; // Current section ID
  sections.forEach((section) => {
    const sectionTop = section.offsetTop; // Section top position
    if (window.scrollY >= sectionTop - 70) {
      current = section.getAttribute("id"); // Updates current section
    }
  });
  links.forEach((link) => {
    link.classList.remove("active"); // Removes active class from all links
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active"); // Adds active class to current link
    }
  });
});

// Theme toggle functionality
// Toggles between light and dark themes
const themeToggle = document.querySelector(".theme-toggle"); // Theme toggle button
const html = document.documentElement; // HTML element for theme attribute
const themeIcon = themeToggle.querySelector("i"); // Theme icon

// Sets initial theme from localStorage
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme); // Applies theme
themeIcon.className = savedTheme === "light" ? "fas fa-sun" : "fas fa-moon"; // Sets icon

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme"); // Gets current theme
  const newTheme = currentTheme === "light" ? "dark" : "light"; // Toggles theme
  html.setAttribute("data-theme", newTheme); // Applies new theme
  localStorage.setItem("theme", newTheme); // Saves theme to localStorage
  themeIcon.className = newTheme === "light" ? "fas fa-sun" : "fas fa-moon"; // Updates icon
});

// Newsletter form submission
// Handles newsletter subscription form
const newsletterForm = document.getElementById("newsletter-form"); // Newsletter form
const newsletterEmail = document.getElementById("newsletter-email"); // Email input

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents default form submission
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex pattern
  if (!emailPattern.test(newsletterEmail.value)) {
    // If email is invalid, show error toast
    showToast("Please enter a valid email address!", true);
    return;
  }
  if (!isLoggedIn || !currentUser) {
    // If user is not logged in, prompt login
    showToast("Please log in to subscribe to the newsletter!", true);
    loginModal.style.display = "flex";
    return;
  }
  // Creates subscription object
  const subscription = {
    username: currentUser.username,
    email: newsletterEmail.value.trim(),
  };
  const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || []; // Gets existing subscriptions
  // Checks if user is already subscribed
  const alreadySubscribed = subscriptions.some(
    (s) => s.username === currentUser.username
  );
  if (alreadySubscribed) {
    // If already subscribed, show error toast
    showToast("You are already subscribed to the newsletter!", true);
    return;
  }
  subscriptions.push(subscription); // Adds new subscription
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions)); // Updates localStorage
  showToast("Thank you for subscribing!"); // Shows success toast
  newsletterForm.reset(); // Resets form
});

// Progress bar on scroll
// Updates progress bar width based on scroll position
window.addEventListener("scroll", () => {
  const scrollHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
  const scrollPosition = window.scrollY; // Current scroll position
  const progress = (scrollPosition / scrollHeight) * 100; // Progress percentage
  document.querySelector(".progress-bar").style.width = `${progress}%`; // Updates progress bar
});

// Intersection observer for animations
// Animates elements when they come into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // Adds visible class for animation
        observer.unobserve(entry.target); // Stops observing once visible
      }
    });
  },
  { threshold: 0.1 } // Triggers when 10% of element is visible
);

// Observes sections and cards for animation
document
  .querySelectorAll("section, .team-member, .class-card, .blog-card")
  .forEach((el) => {
    observer.observe(el); // Adds element to observer
  });

// Calendar functionality
// Sets up FullCalendar for class scheduling
const calendarEl = document.getElementById("calendar"); // Calendar container
const classModal = document.getElementById("class-modal"); // Class details modal
const enquiryModal = document.getElementById("enquiry-modal"); // Enquiry form modal
const closeModal = document.querySelectorAll(".close-modal"); // Modal close buttons
const modalTitle = document.getElementById("modal-title"); // Modal title
const modalTime = document.getElementById("modal-time"); // Modal time
const modalInstructor = document.getElementById("modal-instructor"); // Modal instructor
const modalLevel = document.getElementById("modal-level"); // Modal level
const modalDuration = document.getElementById("modal-duration"); // Modal duration
const enquiryNowBtn = document.getElementById("enquiry-now-btn"); // Enquiry button

const enquiryClass = document.getElementById("enquiry-class"); // Enquiry class input
const enquiryDate = document.getElementById("enquiry-date"); // Enquiry date input
const enquiryTime = document.getElementById("enquiry-time"); // Enquiry time input
const enquiryForm = document.getElementById("enquiry-form"); // Enquiry form

// Class data for calendar events
const classData = [
  {
    title: "Hatha Yoga",
    time: "7:00 AM",
    instructor: "Anjali Sharma",
    level: "Beginner, Intermediate",
    duration: "60 minutes",
  },
  {
    title: "Vinyasa Flow",
    time: "8:00 AM",
    instructor: "Julie Smith",
    level: "Intermediate, Advanced",
    duration: "75 minutes",
  },
  {
    title: "Yin Yoga",
    time: "8:00 PM",
    instructor: "Priya Patel",
    level: "All Levels",
    duration: "90 minutes",
  },
  {
    title: "Power Yoga",
    time: "6:00 PM",
    instructor: "Anjali Sharma",
    level: "Intermediate, Advanced",
    duration: "60 minutes",
  },
  {
    title: "Restorative Yoga",
    time: "7:00 PM",
    instructor: "Neha Gupta",
    level: "All Levels",
    duration: "75 minutes",
  },
  {
    title: "Ashtanga Yoga",
    time: "8:00 AM",
    instructor: "Sakshi Patwal",
    level: "Intermediate, Advanced",
    duration: "90 minutes",
  },
];

// Shuffles array elements randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swaps elements
  }
  return array;
}

// Generates calendar events for the year
const today = new Date("2025-01-01"); // Starting date
const events = []; // Array to store events
for (let week = 0; week < 52; week++) {
  const weekStart = new Date(today); // Start of week
  weekStart.setDate(today.getDate() + week * 7); // Advances by week
  const shuffledClasses = shuffleArray([...classData]); // Shuffles classes
  for (let day = 0; day < 6; day++) {
    const classDate = new Date(weekStart); // Date for class
    classDate.setDate(weekStart.getDate() + day); // Advances by day
    if (classDate.getDay() !== 0) {
      // Excludes Sundays
      events.push({
        title: shuffledClasses[day].title,
        date: classDate.toISOString().split("T")[0], // ISO date string
        time: shuffledClasses[day].time,
        instructor: shuffledClasses[day].instructor,
        level: shuffledClasses[day].level,
        I18n: true, // Localization flag
        duration: shuffledClasses[day].duration,
      });
    }
  }
}

// Initializes FullCalendar
const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth", // Monthly view
  events: events, // Calendar events
  eventClick: (info) => {
    // Handles event clicks to show class details
    modalTitle.textContent = info.event.title; // Sets title
    modalTime.textContent = `Time: ${info.event.extendedProps.time}`; // Sets time
    modalInstructor.textContent = `Instructor: ${info.event.extendedProps.instructor}`; // Sets instructor
    modalLevel.textContent = `Level: ${info.event.extendedProps.level}`; // Sets level
    modalDuration.textContent = `Duration: ${info.event.extendedProps.duration}`; // Sets duration
    classModal.style.display = "flex"; // Shows class modal

    // Prefills enquiry form
    enquiryClass.value = info.event.title;
    enquiryDate.value = info.event.start.toISOString().split("T")[0];
    enquiryTime.value = info.event.extendedProps.time;
  },
  eventBackgroundColor: "var(--primary)", // Event background color
  eventBorderColor: "var(--primary)", // Event border color
  height: "auto", // Auto height
});

calendar.render(); // Renders calendar

// Calendar filter buttons
// Filters calendar events by class type
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active")); // Removes active class from all buttons
    btn.classList.add("active"); // Adds active class to clicked button
    const filter = btn.dataset.filter; // Gets filter value
    calendar.getEvents().forEach((event) => event.remove()); // Removes all events
    // Filters events based on selection
    const filteredEvents =
      filter === "all"
        ? events
        : events.filter((event) => event.title === filter);
    filteredEvents.forEach((event) => calendar.addEvent(event)); // Adds filtered events
  });
});

// Shows enquiry modal from class modal
enquiryNowBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents default link behavior
  classModal.style.display = "none"; // Hides class modal
  enquiryModal.style.display = "flex"; // Shows enquiry modal
});

// Handles enquiry form submission
enquiryForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents default form submission
  // Creates booking object
  const booking = {
    username: currentUser.username,
    class: enquiryClass.value,
    date: enquiryDate.value,
    time: enquiryTime.value,
  };
  const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // Gets existing bookings
  bookings.push(booking); // Adds new booking
  localStorage.setItem("bookings", JSON.stringify(bookings)); // Updates localStorage
  // Shows success toast
  showToast(
    "Enquiry submitted successfully! Our enquiry team will reach out to you very soon."
  );
  enquiryForm.reset(); // Resets form
  enquiryModal.style.display = "none"; // Hides enquiry modal
});

// Closes modals when close buttons are clicked
closeModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    classModal.style.display = "none"; // Hides class modal
    enquiryModal.style.display = "none"; // Hides enquiry modal
    registrationModal.style.display = "none"; // Hides registration modal
  });
});

// Closes modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === classModal) {
    classModal.style.display = "none"; // Hides class modal
  }
  if (e.target === enquiryModal) {
    enquiryModal.style.display = "none"; // Hides enquiry modal
  }
  if (e.target === registrationModal) {
    registrationModal.style.display = "none"; // Hides registration modal
  }
});

// Blog card functionality
// Toggles blog card expanded state
const blogCards = document.querySelectorAll(".blog-card");
blogCards.forEach((card) => {
  const readMoreBtn = card.querySelector(".read-more"); // Read more button
  const showLessBtn = card.querySelector(".show-less"); // Show less button

  readMoreBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents default link behavior
    card.classList.add("expanded"); // Expands card
  });

  showLessBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents default link behavior
    card.classList.remove("expanded"); // Collapses card
  });
});

// Back to top button
// Shows/hides back-to-top button based on scroll position
const backToTop = document.querySelector(".back-to-top"); // Back-to-top button

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible"); // Shows button
  } else {
    backToTop.classList.remove("visible"); // Hides button
  }
});

// Scrolls to top when back-to-top button is clicked
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolls to top
});

// Navbar toggle switch
// Toggles navbar visibility
const navbarToggle = document.getElementById("navbar-toggle"); // Navbar toggle checkbox
const navbar = document.querySelector(".navbar"); // Navbar element

navbarToggle.addEventListener("change", () => {
  navbar.classList.toggle("hidden"); // Toggles hidden class
});

// Sharable Link Functionality
// Copies shareable links to clipboard
const shareLinkButtons = document.querySelectorAll(".share-link-btn");
shareLinkButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.title; // Gets item title
    const type = btn.dataset.type; // Gets item type (class or blog)
    // Creates shareable link
    const link = `${window.location.origin}${
      type === "class" ? "#classes" : "#blog"
    }?item=${encodeURIComponent(title)}`;
    navigator.clipboard
      .writeText(link)
      .then(() => showToast("Link copied to clipboard!")) // Shows success toast
      .catch(() => showToast("Failed to copy link!", true)); // Shows error toast
  });
});

// Social Media Sharing Functionality
// Handles social media sharing for classes and blogs
const socialShareButtons = document.querySelectorAll(".social-share-btn");
socialShareButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents default link behavior
    const platform = btn.dataset.platform; // Gets platform (facebook, twitter, instagram)
    const card = btn.closest(".class-card, .blog-card"); // Gets parent card
    const title = card.querySelector("h3").textContent; // Gets card title
    const type = card.classList.contains("class-card") ? "class" : "blog"; // Determines card type
    // Creates shareable link
    const url = `${window.location.origin}${
      type === "class" ? "#classes" : "#blog"
    }?item=${encodeURIComponent(title)}`;
    const text = `Check out "${title}" at Serene Yoga Studio!`; // Share text
    let shareUrl; // Share URL for platform

    switch (platform) {
      case "facebook":
        // Facebook share URL
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        // Twitter share URL
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "instagram":
        // Instagram requires manual sharing
        showToast("Copy the link and share it on Instagram!", false);
        return;
    }

    window.open(shareUrl, "_blank"); // Opens share URL in new tab
  });
});
