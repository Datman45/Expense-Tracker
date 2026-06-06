export interface IAuthenticationDto {
  token?: string;
  user?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
}
