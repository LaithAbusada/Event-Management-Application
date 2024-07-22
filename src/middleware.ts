import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ["/dashboard", "/add-event", "/edit-event", "/manage-users"],
};
// protected next js pages, so that users who are not logged in ,
// or not admins wont have access to the admin dashboard page
