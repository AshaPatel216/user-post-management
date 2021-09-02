export class User {
  id?: string;
  username: string;
  email: string;
  provider?: string;
  password: string;
  resetPasswordToken?: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: string;
  posts: [string];
  comments?: [string];
  created_by?: string;
  updated_by?: string

  constructor() {
    this.confirmed = false;
    this.blocked = false;
  }
}
