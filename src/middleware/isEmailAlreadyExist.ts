// Core
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

// Entity
import { User } from '../entity';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
implements ValidatorConstraintInterface {
    async validate(email: string) {
        const user = await User.findOne({ where: { email }});

        return !!user;
    }
}

export const IsEmailAlreadyExist = (validationOptions?: ValidationOptions) => {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target:       object.constructor,
            propertyName: propertyName,
            options:      validationOptions,
            constraints:  [],
            validator:    IsEmailAlreadyExistConstraint,
        });
    };
};
