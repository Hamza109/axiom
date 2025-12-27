/**
 * TypeScript declarations for CSS imports
 * Allows importing CSS files without TypeScript errors
 */

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "remixicon/fonts/remixicon.css" {
  const content: string;
  export default content;
}
