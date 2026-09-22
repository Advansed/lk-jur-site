
export const version = "7.1"

export const URL = "https://fhd.aostng.ru/vesta/hs/API_STNG_JUR/V1/"

interface FetchResponse {
    success:    boolean;
    data?:      any;
    message?:   string;
}
  
export const post = async (endpoint: string, data: any): Promise<FetchResponse> => {
    const res = await fetch(`${URL}/${endpoint}`, {
        method:   'POST',
        headers:  { 'Content-Type': 'application/json' },
        body:     JSON.stringify(data)
    });
    return res.json();
};

export const get = async (endpoint: string, params?: Record<string, any>): Promise<FetchResponse> => {
    let url = `${URL}/${endpoint}`;
    
    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });
        const queryString = searchParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }
    
    const res = await fetch(url);
    return res.json();
    
};
  
  export const getVersion = async() => {
      const res = await fetch(`${URL}/api/getVersion`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      });
      return res.json()
  };
  