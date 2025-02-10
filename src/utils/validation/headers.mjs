const validateHeaders = ({ event }, schema) => {
    const { headers: reqHeaders } = event
    return { name: 'validateHeaders', reqHeaders, schema }
};

export default validateHeaders
