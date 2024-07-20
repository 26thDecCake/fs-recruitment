export interface LoginDTO {
  Email?: string;
  Password?: string;
}

export interface RegisterDTO {
  FullName?: string;
  Email?: string;
  Password?: string;
}

export interface UserDetailDTO {
  id: string | null;
  fullName: string | null;
  email: string | null;
  roles: string[] | null;
  phoneNumber: string | null;
  twoFacotrEnabled: boolean;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
}
