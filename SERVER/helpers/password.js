import bcrypt from "bcryptjs";


  // Return the encrypted password

  const  hashingPassword = async (password, salt) => {
    const hashed_password = await bcrypt.hash(password, salt);
    return hashed_password;
  };


  //  Check whether the provided
  // password matches the encrypted and saved password.

  const isSame = async (password, encrypted_password) => {
    const returned_password = await bcrypt.compare(password, encrypted_password);
    return returned_password;
  };

export {hashingPassword, isSame}