export default async function handler(req, res) {
    const { id } = req.query;
  
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
  }
  