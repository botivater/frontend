export type LinkItem = {
  name: string;
  path?: string;
  action?: () => void;
  button?: boolean;
  icon?: string[];
  external: boolean;
}
