export type ApiResponse<T> = {
  status: number;
  message: string;
  body: T;
};

export type LoginResponse = {
  token: string;
};

export type ProfileResponse = {
  firstName: string;
  lastName: string;

}
