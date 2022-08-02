const validateNIN = (value) => {
  // validation strategy
  // check if the length of the string is = 11
  //check if the type of the value is string

  if (value.length > 11) {
    return false;
  }

  return true;
};

export default validateNIN;
