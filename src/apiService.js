export async function fetchDataFromAPI() {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  