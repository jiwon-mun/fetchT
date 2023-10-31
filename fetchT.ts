function fetchT<ReuqestParams>(buildParams: (params: ReuqestParams)=> string, defaultInit?: RequestInit)
    : <R>(params: ReuqestParams, init?: RequestInit) => Promise<R>

function fetchT<R, ReuqestParams>(buildParams: (params: ReuqestParams)=> string, defaultInit?: RequestInit)
    : (params: ReuqestParams, init?: RequestInit) => Promise<R>

    function fetchT<R, ReuqestParams, RequestOption extends RequestInit>(buildParams: (params: ReuqestParams)=> string, defaultInit?: RequestInit)
    : (params: ReuqestParams, init?: RequestOption) => Promise<R>


function fetchT<R, ReuqestParams, RequestOption extends RequestInit>(buildParams: (params: ReuqestParams)=> string, defaultInit?: RequestOption) {
    return async (params: ReuqestParams, init?: RequestOption): Promise<R> => {
        const path = buildParams(params)
        const raw = await fetch(path, {...defaultInit, ...init})
        const data = await raw.json()
        return data
    }
}

export default fetchT