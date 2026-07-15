// Production requests stay on the same Vercel origin. A local backend can be
// configured with VITE_API_URL, or defaults to localhost during Vite dev.
const url = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:3000" : "");


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

// Silently request new access + refresh tokens using the refresh token cookie.
// This runs automatically when the access token (15 min) expires.
const refreshToken = async () => {
  try {
    const res = await fetch(`${url}/api/v1/refresh`, {
      method: "POST",
      credentials: "include", // Sends the refreshToken cookie
    });

    if (!res.ok) {
      return { success: false };
    }

    return res.json();
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

const checkAuthStatus = async () => {
  try {
    // Step 1: Try verifying with the current access token
    const res = await fetch(`${url}/api/v1/getauthstatus`, {
      method: "GET",
      credentials: "include", 
    });

    // If access token is valid, return the user data
    if (res.ok) {
      return res.json();
    }

    // Step 2: Access token expired (401) — silently try refreshing
    if (res.status === 401) {
      const refreshResult = await refreshToken();

      if (refreshResult.success) {
        // New access token was set as a cookie — retry the original request
        const retryRes = await fetch(`${url}/api/v1/getauthstatus`, {
          method: "GET",
          credentials: "include",
        });

        if (retryRes.ok) {
          return retryRes.json();
        }
      }
    }

    // Both access and refresh tokens are invalid — user must log in again
    return { success: false };
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
