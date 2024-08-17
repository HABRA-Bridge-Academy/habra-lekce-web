export default class User {
  public static make(data: User): User {
    return new User(
      data.id,
      data.firstName,
      data.lastName,
      data.email,
      data.role,
      data.hasPassword
    );
  }

  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
    public hasPassword: boolean
  ) {}

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
}
