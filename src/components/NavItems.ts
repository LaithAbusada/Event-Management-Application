export const initialNavItems = [
  { name: "Home", path: "/" },
  { name: "Admin Login", path: "/api/auth/login" },
];
//when no admin logged in, regular user(no admin)
export const adminNavItems = [
  { name: "Home", path: "/" },
  { name: "Admin Logout", path: "/api/auth/logout" },
  { name: "Dashboard", path: "/dashboard" },
];
// when admin logged in, adminNavitems will appear on navbar
