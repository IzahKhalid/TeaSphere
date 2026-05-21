/**
 * Determines if a nav link should show active styling.
 * - Home: exact match only
 * - Community: /users and /user/:id detail routes
 */
export const isNavActive = (pathname, path) => {
  if (path === '/') return pathname === '/'
  if (path === '/users') {
    return pathname === '/users' || pathname.startsWith('/user/')
  }
  if (path === '/menu') {
    return pathname === '/menu' || pathname === '/checkout'
  }
  return pathname === path || pathname.startsWith(`${path}/`)
}
