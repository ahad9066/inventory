export interface EmployeeDetails {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    mobile: number;
    roles: string[];
    isMobileVerified: Boolean;
    isEmailVerified: Boolean;
}
