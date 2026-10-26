// Edge-safe role helpers (used by middleware, server components and the client navbar).
//   admin   — everything, incl. rates, media, settings and the team.
//   manager — day-to-day operations: bookings, blocks, guests (notes), enquiries.
//   guest   — public account area only.
export const ROLES = ["guest", "manager", "admin"];
export const STAFF_ROLES = ["admin", "manager"];
export const isStaff = (role) => STAFF_ROLES.includes(role);
export const isAdmin = (role) => role === "admin";

// Admin panel paths a manager may NOT open.
export const ADMIN_ONLY_PATHS = ["/admin/rates", "/admin/media", "/admin/settings", "/admin/team", "/admin/guests/export"];
export const isAdminOnlyPath = (pathname) => ADMIN_ONLY_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

export const homeFor = (role) => (isStaff(role) ? "/admin" : "/account");
export const roleLabel = (role) => ({ admin: "Admin", manager: "Manager", guest: "Guest" })[role] || role;
