
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
    const apiKey = process.env.NEXT_PUBLIC_GEO_API_KEY;
    if (!apiKey) {
      throw new Error('API key is not defined');
    }
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (!data.results.length) {
      throw new Error(`No results found for address: ${address}`);
    }
  
    const { lat, lng } = data.results[0].geometry;
    return { lat, lng };
  };