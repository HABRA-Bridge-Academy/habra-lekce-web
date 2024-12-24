export default class User {
  public static make(data: User): User {
    return new User(
      data.id,
      data.firstName,
      data.lastName,
      data.email,
      data.role,
    );
  }

  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
  ) {}

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
}
