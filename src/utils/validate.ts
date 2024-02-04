import { CustomError } from "./error";

const validateEmailAndPassword = (email:string, password:string) => {
  const emailRegex =
  /^[0-9a-zA-Z]*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if(!emailRegex.test(email)){
    const err = new CustomError("invalid email", 400);
    throw err;
  }

  if(!passwordRegex.test(password)){
    const err = new CustomError("invalid password", 400);
    throw err;
  }
}

export { validateEmailAndPassword };