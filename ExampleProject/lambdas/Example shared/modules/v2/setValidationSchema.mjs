const setValidationSchema = schema => async (state) => {
    console.log('Schema: ', schema)
    state.schema = schema
}

export default setValidationSchema
