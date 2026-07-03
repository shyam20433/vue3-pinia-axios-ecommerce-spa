<script setup>
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>

      <!-- <li>
        <RouterLink to="/products" v-if=" auth.isLoggedIn && !auth.isAdmin">Products</RouterLink>
      </li> -->

      <li>
        <RouterLink to="/carts" v-if=" auth.isLoggedIn && !auth.isAdmin">Cart</RouterLink>
      </li>
      <li>
        <RouterLink to="/productapi" >Product Api</RouterLink>
      </li>


      <li v-if="auth.isAdmin">
        <RouterLink to="/manage">Manage</RouterLink>
      </li>
      <li v-if="auth.isAdmin">
        <RouterLink to="/orders">Orders</RouterLink>
      </li>
    </ul>

    <div class="auth">
      <RouterLink to="/" v-if="!auth.isLoggedIn">
        Login
      </RouterLink>

      <div v-else class="user-menu">
        <span>Welcome {{ auth.currentUser.username }}</span>

        <button @click="auth.logout()">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* ============================================
   NAVBAR - Clean, Themed, Fully Responsive
   ============================================ */

/* ----- Base Navbar ----- */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 24px;

  /* Matches your store layout theme */
  background-color: #ffffff;
  padding: 16px 48px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #e2e8f0;
  font-family: system-ui, -apple-system, sans-serif;
}

/* ----- Navigation Links Container ----- */
.nav-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ----- Each Nav Item ----- */
.nav-links li {
  display: flex;
  align-items: center;
  position: relative;
}

/* ----- Nav Links (RouterLink) ----- */
.nav-links a {
  text-decoration: none;
  color: #64748b; /* Slate Gray */
  font-size: 15px;
  font-weight: 600;
  padding: 6px 4px;
  transition: color 0.2s ease, transform 0.2s ease;
  position: relative;
}

/* --- Underline Hover Effect --- */
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2.5px;
  background: #3b82f6; /* Blue Accent */
  border-radius: 4px;
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-links a:hover {
  color: #1e293b;
}

.nav-links a:hover::after {
  width: 100%;
}

/* --- Active Link State --- */
.nav-links a.router-link-active {
  color: #3b82f6;
}

.nav-links a.router-link-active::after {
  width: 100%;
}

/* ----- Auth Section (Right Side) ----- */
.auth {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 20px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ----- Auth Links (Login) ----- */
.auth a {
  text-decoration: none;
  color: #3b82f6;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.auth a:hover {
  background-color: #f8fafc;
  border-color: #3b82f6;
}

/* ----- Welcome Text ----- */
.auth span {
  color: #4a5568;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 12px;
  background-color: #f1f5f9;
  border-radius: 20px;
}

/* ----- Logout Button ----- */
.auth button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #ef4444; /* Matches red from admin buttons */
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.auth button:hover {
  opacity: 0.9;
}

.auth button:active {
  transform: scale(0.97);
}

/* ============================================
   RESPONSIVE LAYOUTS
   ============================================ */

@media (max-width: 820px) {
  .navbar {
    padding: 14px 28px;
    gap: 12px 16px;
  }
  .nav-links {
    gap: 6px 20px;
  }
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 14px 20px;
    gap: 16px;
  }

  .nav-links {
    justify-content: center;
    gap: 6px 18px;
  }

  .auth {
    justify-content: center;
    width: 100%;
  }

  .user-menu {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .auth span {
    width: 100%;
    box-sizing: border-box;
  }

  .auth button {
    width: 100%;
  }
}
</style>
