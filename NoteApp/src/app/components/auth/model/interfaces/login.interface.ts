export interface Login {
  email: string;
  password: string;
}

export interface CreateAccount {
  name: string; 
  email: string;
  password: string;
}

export interface Token {
  token: string;
}
