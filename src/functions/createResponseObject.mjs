export const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
}

const createResponseObject = ({ 
    status = 500, 
    message = 'none', 
    error = true, 
    body = {}, 
    headers = defaultHeaders
}) => ({
    statusCode: status,
    message,
    error,
    body,
    headers
})

export default createResponseObject
