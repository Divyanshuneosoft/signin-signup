export const validate = (target,previousValue)=>{
    let error = '';
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if(!target.value) return error = `${target.name} is required.`
    switch(target.name){
        case 'email':
            if(!emailPattern.test(target.value)) return error = `Please Enter Valid email.`
            return error
        case 'password':
            if(!passwordPattern.test(target.value)) return error = `Invalid Password.`
            return error
        case 'confirmpassword':
            if(!passwordPattern.test(target.value)) return error = `Invalid Password.`
            if(target.value !== previousValue) return error = `password doesn't match.`
            return error
        default:
            return error


    }

}
