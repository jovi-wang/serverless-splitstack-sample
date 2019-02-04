exports.errorResponse = (statusCode, message) => ({
    statusCode,
    body: JSON.stringify({
      message,
    })
  });