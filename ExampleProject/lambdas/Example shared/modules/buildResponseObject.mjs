const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};
const defaultRes = { status: 500, message: "something went wrong", error: true }
const buildResponseObject = ({
  res: {
    status = 500, message = "something went wrong", error = true, body, headers,
  } = defaultRes,
}) => ({
  statusCode: status,
  message,
  error,
  body,
  headers: { ...defaultHeaders, ...headers },
});

export default buildResponseObject;
