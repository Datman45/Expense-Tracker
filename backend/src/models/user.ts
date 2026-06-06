export class User {
  constructor(
    public id: number,
    public username: string,
    public passwordHash: string,
    public firstName: string,
    public lastName: string,
  ) {}
}
