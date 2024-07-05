export const validate = {
    isLength: (value,minLength,maxLength) => {
        if(value.length < minLength || value.length > maxLength) {
            return false;
        }
        return true;
    },
    isEmail: (value) => {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regexEmail.test(value)) {
            return true;
        }
        return false;
    },
    isCharactor: (value) => {
        var regexLetter = /^[A-Z a-z]+$/;
        if(regexLetter.test(value)){ 
            return true;
        }
        return false;
    }
}