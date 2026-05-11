declare module "*.png" {
  const src: string;
  export default src;
}

declare module "data-url:*.png" {
  const src: string;
  export default src;
}

declare module "*.css";
