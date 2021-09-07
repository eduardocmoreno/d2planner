//routes
interface IRoutes {
  path: string;
  name: string;
  exact?: boolean;
  Component: React.ComponentType;
  props?: any;
}