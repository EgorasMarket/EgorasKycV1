const errorResponse = (error) => {
  if (!error) {
    return 'error occured';
  }

  if (error.response) {
    console.log(error.response.message);
  }
};

export { errorResponse };
