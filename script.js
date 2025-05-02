/*
 * Utility function to show toast messages
 * Displays a notification with customizable message and error styling
 */
function showToast(message, isError = false) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: isError
      ? "linear-gradient(to right, #ff0000, #ff5555)"
      : "linear-gradient(to right, #f59e0b, #facc15)",
    stopOnFocus: true,
  }).showToast();
}

// DOM Elements for login/signup/registration
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");
const registrationModal = document.getElementById("registration-modal");
const mainContent = document.getElementById("main-content");
const signupLink = document.getElementById("signup-link");
const loginLink = document.getElementById("login-link");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const registrationForm = document.getElementById("registration-form");
const closeLoginModal = document.getElementById("close-login-modal");
const closeSignupModal = document.getElementById("close-signup-modal");
const closeRegistrationModal = document.getElementById(
  "close-registration-modal"
);

// Navbar elements
const navLinks = document.querySelector(".nav-links");
const welcomeMessage = document.querySelector(".welcome-message");
const dashboardContent = document.querySelector(".dashboard-content");
const logoutBtn = document.querySelector(".logout-btn");

// Initialize default admin account if not already present
if (!localStorage.getItem("users")) {
  const defaultAdmin = [
    {
      username: "admin",
      password: "admin123",
      role: "admin",
      email: "admin@sereneyoga.com",
      phone: "1234567890",
    },
  ];
  localStorage.setItem("users", JSON.stringify(defaultAdmin));
}

// Check login status
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Show login modal if not logged in
if (!isLoggedIn) {
  loginModal.style.display = "flex";
  mainContent.style.display = "none";
} else {
  loginModal.style.display = "none";
  mainContent.style.display = "block";
  updateNavbarWelcome();
  displayDashboard();
  showToast(
    `Welcome, ${currentUser.role === "admin" ? "Admin" : "User"} ${
      currentUser.username
    }!`
  );
  logoutBtn.style.display = "inline-block";
}

// Function to update navbar with welcome message
function updateNavbarWelcome() {
  welcomeMessage.textContent = `Welcome, ${
    currentUser.role === "admin" ? "Admin" : currentUser.username
  }`;
}

// Toggle dashboard visibility on welcome message click
welcomeMessage.addEventListener("click", () => {
  const isVisible = dashboardContent.style.display === "block";
  dashboardContent.style.display = isVisible ? "none" : "block";
});

// Switch to signup modal
signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "none";
  signupModal.style.display = "flex";
});

// Switch to login modal
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupModal.style.display = "none";
  loginModal.style.display = "flex";
});

// Close modals
closeLoginModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});

closeSignupModal.addEventListener("click", () => {
  signupModal.style.display = "none";
});

closeRegistrationModal.addEventListener("click", () => {
  registrationModal.style.display = "none";
});

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    currentUser = user;
    updateNavbarWelcome();
    displayDashboard();
    showToast(
      `Welcome, ${user.role === "admin" ? "Admin" : "User"} ${user.username}!`
    );
    logoutBtn.style.display = "inline-block";
  } else {
    showToast("Invalid username or password!", true);
  }
});

// Handle signup form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((u) => u.username === username);

  if (userExists) {
    showToast("Username already exists! Try a different one.", true);
    return;
  }

  const newUser = { username, password, role: "user", email: "", phone: "" };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  showToast("Account created successfully! Please log in.");
  signupModal.style.display = "none";
  loginModal.style.display = "flex";
});

// Handle registration form submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullname = document.getElementById("reg-fullname").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const phone = document.getElementById("reg-phone").value.trim();
  const selectedClass = document.getElementById("reg-class").value;
  const date = document.getElementById("reg-date").value;
  const time = document.getElementById("reg-time").value;

  const registration = {
    username: currentUser.username,
    fullname,
    email,
    phone,
    class: selectedClass,
    date,
    time,
  };

  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  registrations.push(registration);
  localStorage.setItem("registrations", JSON.stringify(registrations));

  showToast("Registration successful!");
  registrationForm.reset();
  registrationModal.style.display = "none";
});

// Function to display dashboard based on role
function displayDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let dashboardHTML = "";
  if (user.role === "admin") {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];
    const subscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];
    const classCounts = bookings.reduce((acc, booking) => {
      acc[booking.class] = (acc[booking.class] || 0) + 1;
      return acc;
    }, {});
    const popularClass = Object.keys(classCounts).length
      ? Object.keys(classCounts).reduce((a, b) =>
          classCounts[a] > classCounts[b] ? a : b
        )
      : "None";

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
  dashboardContent.innerHTML = dashboardHTML;

  // Attach profile form listener
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("profile-email").value.trim();
      const phone = document.getElementById("profile-phone").value.trim();
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.username === user.username ? { ...u, email, phone } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, email, phone })
      );
      currentUser = { ...user, email, phone };
      showToast("Profile updated successfully!");
    });
  }
}

// Function to show registration modal
function showRegistrationModal() {
  registrationModal.style.display = "flex";
}

// Function to show bookings
function showBookings() {
  const bookingsSection = document.querySelector(".bookings-section");
  const otherSections = document.querySelectorAll(
    ".profile-section, .analytics-section, .users-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none"));
  bookingsSection.style.display = "block";

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const userBookings = bookings.filter((b) => b.username === user.username);
  const bookingsDiv = document.getElementById("user-bookings");
  bookingsDiv.innerHTML = userBookings.length
    ? userBookings
        .map((b) => `<p>${b.class} on ${b.date} at ${b.time}</p>`)
        .join("")
    : "<p>No bookings yet.</p>";
}

// Function to show profile
function showProfile() {
  const profileSection = document.querySelector(".profile-section");
  const otherSections = document.querySelectorAll(
    ".bookings-section, .analytics-section, .users-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none"));
  profileSection.style.display = "block";
}

// Function to show analytics
function showAnalytics() {
  const analyticsSection = document.querySelector(".analytics-section");
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .users-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none"));
  analyticsSection.style.display = "block";
}

// Function to manage users (admin only)
function manageUsers() {
  const usersSection = document.querySelector(".users-section");
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .registrations-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none"));
  usersSection.style.display = "block";

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userListDiv = document.getElementById("user-list");
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
  const deleteButtons = document.querySelectorAll(".delete-user-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const username = btn.dataset.username;
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users = users.filter((u) => u.username !== username);
      localStorage.setItem("users", JSON.stringify(users));
      manageUsers();
      showToast("User deleted successfully!");
    });
  });
}

// Function to show registrations (admin only)
function showRegistrations() {
  const registrationsSection = document.querySelector(".registrations-section");
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .users-section, .subscriptions-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none"));
  registrationsSection.style.display = "block";

  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  const registrationListDiv = document.getElementById("registration-list");
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
function showSubscriptions() {
  const subscriptionsSection = document.querySelector(".subscriptions-section");
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .users-section, .registrations-section, .enquiries-section"
  );
  otherSections.forEach((section) => (section.style.display = "none"));
  subscriptionsSection.style.display = "block";

  const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
  const subscriptionListDiv = document.getElementById("subscription-list");
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
function showEnquiries() {
  const enquiriesSection = document.querySelector(".enquiries-section");
  const otherSections = document.querySelectorAll(
    ".profile-section, .bookings-section, .analytics-section, .users-section, .registrations-section, .subscriptions-section"
  );
  otherSections.forEach((section) => (section.style.display = "none"));
  enquiriesSection.style.display = "block";

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const enquiryListDiv = document.getElementById("enquiry-list");
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
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("currentUser");
  welcomeMessage.textContent = "";
  dashboardContent.innerHTML = "";
  dashboardContent.style.display = "none";
  logoutBtn.style.display = "none";
  loginModal.style.display = "flex";
  mainContent.style.display = "none";
  showToast("Logged out successfully!");
});

// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const links = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    const target = document.querySelector(link.getAttribute("href"));
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    dashboardContent.style.display = "none";
  }
});

// Highlight active section on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 70) {
      current = section.getAttribute("id");
    }
  });
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
themeIcon.className = savedTheme === "light" ? "fas fa-sun" : "fas fa-moon";

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeIcon.className = newTheme === "light" ? "fas fa-sun" : "fas fa-moon";
});

// Newsletter form submission
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newsletterEmail.value)) {
    showToast("Please enter a valid email address!", true);
    return;
  }
  if (!isLoggedIn || !currentUser) {
    showToast("Please log in to subscribe to the newsletter!", true);
    loginModal.style.display = "flex";
    return;
  }
  const subscription = {
    username: currentUser.username,
    email: newsletterEmail.value.trim(),
  };
  const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
  const alreadySubscribed = subscriptions.some(
    (s) => s.username === currentUser.username
  );
  if (alreadySubscribed) {
    showToast("You are already subscribed to the newsletter!", true);
    return;
  }
  subscriptions.push(subscription);
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  showToast("Thank you for subscribing!");
  newsletterForm.reset();
});

// Progress bar on scroll
window.addEventListener("scroll", () => {
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;
  const progress = (scrollPosition / scrollHeight) * 100;
  document.querySelector(".progress-bar").style.width = `${progress}%`;
});

// Intersection observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll("section, .team-member, .class-card, .blog-card")
  .forEach((el) => {
    observer.observe(el);
  });

// Calendar functionality
const calendarEl = document.getElementById("calendar");
const classModal = document.getElementById("class-modal");
const enquiryModal = document.getElementById("enquiry-modal");
const closeModal = document.querySelectorAll(".close-modal");
const modalTitle = document.getElementById("modal-title");
const modalTime = document.getElementById("modal-time");
const modalInstructor = document.getElementById("modal-instructor");
const modalLevel = document.getElementById("modal-level");
const modalDuration = document.getElementById("modal-duration");
const enquiryNowBtn = document.getElementById("enquiry-now-btn");

const enquiryClass = document.getElementById("enquiry-class");
const enquiryDate = document.getElementById("enquiry-date");
const enquiryTime = document.getElementById("enquiry-time");
const enquiryForm = document.getElementById("enquiry-form");

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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const today = new Date("2025-01-01");
const events = [];
for (let week = 0; week < 52; week++) {
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() + week * 7);
  const shuffledClasses = shuffleArray([...classData]);
  for (let day = 0; day < 6; day++) {
    const classDate = new Date(weekStart);
    classDate.setDate(weekStart.getDate() + day);
    if (classDate.getDay() !== 0) {
      events.push({
        title: shuffledClasses[day].title,
        date: classDate.toISOString().split("T")[0],
        time: shuffledClasses[day].time,
        instructor: shuffledClasses[day].instructor,
        level: shuffledClasses[day].level,
        I18n: true,
        duration: shuffledClasses[day].duration,
      });
    }
  }
}

const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  events: events,
  eventClick: (info) => {
    modalTitle.textContent = info.event.title;
    modalTime.textContent = `Time: ${info.event.extendedProps.time}`;
    modalInstructor.textContent = `Instructor: ${info.event.extendedProps.instructor}`;
    modalLevel.textContent = `Level: ${info.event.extendedProps.level}`;
    modalDuration.textContent = `Duration: ${info.event.extendedProps.duration}`;
    classModal.style.display = "flex";

    enquiryClass.value = info.event.title;
    enquiryDate.value = info.event.start.toISOString().split("T")[0];
    enquiryTime.value = info.event.extendedProps.time;
  },
  eventBackgroundColor: "var(--primary)",
  eventBorderColor: "var(--primary)",
  height: "auto",
});

calendar.render();

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    calendar.getEvents().forEach((event) => {
      event.remove();
    });
    const filteredEvents =
      filter === "all"
        ? events
        : events.filter((event) => event.title === filter);
    filteredEvents.forEach((event) => {
      calendar.addEvent(event);
    });
  });
});

enquiryNowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  classModal.style.display = "none";
  enquiryModal.style.display = "flex";
});

enquiryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const booking = {
    username: currentUser.username,
    class: enquiryClass.value,
    date: enquiryDate.value,
    time: enquiryTime.value,
  };
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  showToast(
    "Enquiry submitted successfully! Our enquiry team will reach out to you very soon."
  );
  enquiryForm.reset();
  enquiryModal.style.display = "none";
});

closeModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    classModal.style.display = "none";
    enquiryModal.style.display = "none";
    registrationModal.style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  if (e.target === classModal) {
    classModal.style.display = "none";
  }
  if (e.target === enquiryModal) {
    enquiryModal.style.display = "none";
  }
  if (e.target === registrationModal) {
    registrationModal.style.display = "none";
  }
});

// Blog card functionality
const blogCards = document.querySelectorAll(".blog-card");
blogCards.forEach((card) => {
  const readMoreBtn = card.querySelector(".read-more");
  const showLessBtn = card.querySelector(".show-less");

  readMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.add("expanded");
  });

  showLessBtn.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.remove("expanded");
  });
});

// Back to top button
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Navbar toggle switch
const navbarToggle = document.getElementById("navbar-toggle");
const navbar = document.querySelector(".navbar");

navbarToggle.addEventListener("change", () => {
  navbar.classList.toggle("hidden");
});

// Sharable Link Functionality
const shareLinkButtons = document.querySelectorAll(".share-link-btn");
shareLinkButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.title;
    const type = btn.dataset.type;
    const link = `${window.location.origin}${
      type === "class" ? "#classes" : "#blog"
    }?item=${encodeURIComponent(title)}`;
    navigator.clipboard
      .writeText(link)
      .then(() => showToast("Link copied to clipboard!"))
      .catch(() => showToast("Failed to copy link!", true));
  });
});

// Social Media Sharing Functionality
const socialShareButtons = document.querySelectorAll(".social-share-btn");
socialShareButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const platform = btn.dataset.platform;
    const card = btn.closest(".class-card, .blog-card");
    const title = card.querySelector("h3").textContent;
    const type = card.classList.contains("class-card") ? "class" : "blog";
    const url = `${window.location.origin}${
      type === "class" ? "#classes" : "#blog"
    }?item=${encodeURIComponent(title)}`;
    const text = `Check out "${title}" at Serene Yoga Studio!`;
    let shareUrl;

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "instagram":
        showToast("Copy the link and share it on Instagram!", false);
        return;
    }

    window.open(shareUrl, "_blank");
  });
});