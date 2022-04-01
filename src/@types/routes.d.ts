/// <reference types="react" />

//route
interface RouteProps {
  path: string;
  name: string;
  exact?: boolean;
  Component: React.ComponentType;
}