export default async function fetchUser(size) {
    try {
      const response = await fetch(`https://random-data-api.com/api/users/random_user?size=${size}`);
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return [];
    }
  }
  