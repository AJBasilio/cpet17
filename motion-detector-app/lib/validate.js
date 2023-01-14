export default function login_validate(values) {
    const errors = {};

    // Email Validate
    if (!values.email) {
        errors.email = 'Required.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    
    // Password Validate
    if (!values.password) {
        errors.password = 'Required.'
    } else if (values.password.length < 8) {
        errors.password = 'Password must be greater than 8 characters long.';
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    return errors;
}

export function registerValidate(values) {
    const errors = {};

    // Username Validate
    if (!values.username) {
        errors.username = 'Required.';
    } else if (values.username.includes(" ")) {
        errors.username = 'Invalid Username.'
    }

    // Email Validate
    if (!values.email) {
        errors.email = 'Required.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    
    // Password Validate
    if (!values.password) {
        errors.password = 'Required.'
    } else if (values.password.length < 8) {
        errors.password = 'Password must be greater than 8 characters long.';
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    // CPassword Validate
    if (!values.cpassword) {
        errors.cpassword = 'Required.'
    } else if (values.password !== values.cpassword) {
        errors.cpassword = 'Password does not match.';
    }

    return errors;
}