import { EmployeeDetails } from "../interfaces/user.interface";


export class EmployeeDetailsHelper {
    static createFromResponse(data: {}) {
        return {
            _id: data['_id'] ? data['_id'] : null,
            firstName: data['firstName'] ? data['firstName'] : null,
            lastName: data['lastName'] ? data['lastName'] : null,
            email: data['email'] ? data['email'] : null,
            countryCode: data['countryCode'] ? data['countryCode'] : null,
            mobile: data['mobile'] ? data['mobile'] : null,
            isMobileVerified: data['isMobileVerified'] ? data['isMobileVerified'] : false,
            isEmailVerified: data['isEmailVerified'] ? data['isEmailVerified'] : false,
            roles: data['roles'] ? data['roles'] : []
        } as EmployeeDetails;
    }
    static toRequest(addone) {
        const data = this.createFromResponse(addone);
        return Object.assign(data, {});
    }
}
