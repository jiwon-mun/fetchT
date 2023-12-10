const toJSON = async (response: Promise<Response>): Promise<any> => {
    const resolvePromise = await response
  
    return await resolvePromise.json();
}

export default toJSON