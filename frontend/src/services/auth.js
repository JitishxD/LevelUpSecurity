// Base URL of our Express backend server
const url = "https://level-up-security.vercel.app";
// const url = "http://localhost:3000";


const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${url}/api/v1/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      console.error("Registration failed");
      return res.json();
    }

    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${url}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.error("Login failed");
      return res.json();
    }

    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const checkAuthStatus = async () => {
  try {
    // This endpoint should be protected on your backend.
    // The browser will automatically send the HttpOnly cookie.
    const res = await fetch(`${url}/api/v1/getauthstatus`, {
      method: "GET",
      // Important: include credentials to send cookies
      credentials: "include", 
    });

    // If the cookie is invalid or expired, the backend should return a 401 Unauthorized
    if (!res.ok) {
      return { success: false };
    }
    
    // If the cookie is valid, the backend returns user data
    return res.json(); // Assuming it returns { success: true, user: {...} }
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

const logoutUser = async () => {
  try {
    const res = await fetch(`${url}/api/v1/logout`, {
      method: "POST",
      credentials: "include", // Send cookie to invalidate the session
    });
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export { registerUser, loginUser, checkAuthStatus, logoutUser };
