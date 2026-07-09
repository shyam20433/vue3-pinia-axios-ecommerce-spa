<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const auth = useAuthStore()

function logout() {
  auth.logout()

  localStorage.removeItem('adminToken')
  localStorage.removeItem('currentUser')

  router.push('/')
}
</script>

<template>
  <!-- ADMIN NAVBAR -->
  <nav v-if="auth.isAdmin" class="navbar admin-navbar">
    <div class="brand">
      <span class="brand-icon">◆</span>

      <div>
        <h2>E-Shop Admin</h2>
        <small>Admin Dashboard</small>
      </div>
    </div>

    <ul class="nav-links">
      <li>
        <RouterLink to="/users">
          Users
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/manage">
          Products
        </RouterLink>
      </li>

      <li>
        <RouterLink to="/orders">
          Orders
        </RouterLink>
      </li>

    </ul>

    <div class="user-menu">
      <div class="welcome">
        <small>Administrator</small>
        <span>{{ auth.currentUser?.username }}</span>
      </div>

      <button class="logout-btn" @click="logout">
        Logout
      </button>
    </div>
  </nav>


  <!-- USER NAVBAR -->
  <nav v-else-if="auth.isLoggedIn" class="navbar user-navbar">
    <div class="brand">
      <span class="brand-icon">◆</span>

      <div>
        <h2>E-Shop</h2>
        <small>Online Store</small>
      </div>
    </div>

    <ul class="nav-links">
      <li>
        <RouterLink to="/productapi">
          Products
        </RouterLink>
      </li>

      <li>
        <RouterLink to="/carts">
          Cart
        </RouterLink>
      </li>

      <li>
        <RouterLink to="/myorders">
          My Orders
        </RouterLink>
      </li>
    </ul>

    <div class="user-menu">
      <div class="welcome">
        <small>Welcome back</small>
        <span>{{ auth.currentUser?.username }}</span>
      </div>
      <ul>
        <li>
          <RouterLink to="/profile">
            Profile
          </RouterLink>
        </li>
      </ul>


      <button class="logout-btn" @click="logout">
        Logout
      </button>
    </div>
  </nav>


  <!-- GUEST NAVBAR -->
  <nav v-else class="navbar guest-navbar">
    <div class="brand">
      <span class="brand-icon">◆</span>

      <div>
        <h2>E-Shop</h2>
        <small>Online Store</small>
      </div>
    </div>

    <ul class="nav-links">
      <li>
        <RouterLink to="/productapi">
          Products
        </RouterLink>
      </li>
    </ul>

    <RouterLink class="login-btn" to="/">
      Login
    </RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  min-height: 72px;
  padding: 0 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
  z-index: 1000;

  font-family: system-ui, sans-serif;
}

.user-navbar,
.guest-navbar {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}

.admin-navbar {
  background: #111827;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #2563eb;
  color: white;

  border-radius: 10px;
}

.brand h2 {
  margin: 0;
  font-size: 18px;
}

.brand small {
  opacity: 0.65;
  font-size: 11px;
}

.nav-links {
  display: flex;
  align-items: center;

  gap: 10px;

  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links a {
  padding: 9px 15px;

  text-decoration: none;
  color: #64748b;

  border-radius: 7px;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s;
}

.admin-navbar .nav-links a {
  color: #cbd5e1;
}

.nav-links a:hover {
  background: #eff6ff;
  color: #2563eb;
}

.admin-navbar .nav-links a:hover {
  background: #1f2937;
  color: white;
}

.nav-links a.router-link-active {
  background: #2563eb;
  color: white;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.welcome small {
  font-size: 11px;
  opacity: 0.6;
}

.welcome span {
  font-size: 14px;
  font-weight: 700;
}

.logout-btn {
  padding: 9px 16px;

  border: none;
  border-radius: 7px;

  background: #ef4444;
  color: white;

  font-weight: 600;
  cursor: pointer;
}

.logout-btn:hover {
  background: #dc2626;
}

.login-btn {
  padding: 10px 22px;

  background: #2563eb;
  color: white;

  border-radius: 7px;

  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 750px) {
  .navbar {
    padding: 15px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .user-menu {
    width: 100%;
    justify-content: center;
  }
}
</style>
