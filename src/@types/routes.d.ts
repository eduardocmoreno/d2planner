/// <reference types="react" />

//route
interface IRoute {
  path: string;
  name: string;
  exact?: boolean;
  Component: ComponentType;
}