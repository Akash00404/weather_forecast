document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logout");

  function showMessage(elementId, message, type = "error") {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = `message ${type}`;
      messageElement.style.display = "block";
      setTimeout(() => {
        messageElement.style.display = "none";
        messageElement.textContent = "";
      }, 3000);
    } else {
      alert(message);
    }
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const usernameInput = document.getElementById("signupUsername");
      const passwordInput = document.getElementById("signupPassword");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      const signupMessage = document.getElementById("signupMessage");

      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (!username || !password || !confirmPassword) {
        showMessage("signupMessage", "All fields are required!");
        return;
      }

      if (password.length < 6) {
        showMessage("signupMessage", "Password must be at least 6 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        showMessage("signupMessage", "Passwords do not match!");
        return;
      }

      if (localStorage.getItem("username") === username) {
        showMessage("signupMessage", "Username already exists. Please choose another.");
        return;
      }

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      showMessage("signupMessage", "Signup successful! Redirecting to login...", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const usernameInput = document.getElementById("loginUsername");
      const passwordInput = document.getElementById("loginPassword");
      const loginMessage = document.getElementById("loginMessage");

      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const storedUser = localStorage.getItem("username");
      const storedPass = localStorage.getItem("password");

      if (!username || !password) {
        showMessage("loginMessage", "Both username and password are required.");
        return;
      }

      if (username === storedUser && password === storedPass) {
        showMessage("loginMessage", "Login successful! Redirecting...", "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        showMessage("loginMessage", "Invalid username or password.");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      alert("You have been logged out.");
      window.location.href = "login.html";
    });
  }
});