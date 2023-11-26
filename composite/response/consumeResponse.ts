const consumeResponse = async (response: Promise<Response>): Promise<any> => {
    const resolvePromise = await response
    if (resolvePromise.ok === false) {
        throw new Error('Failed to fetch data');
    }
    return await resolvePromise.json();
}

export default consumeResponse