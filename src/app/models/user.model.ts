export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
