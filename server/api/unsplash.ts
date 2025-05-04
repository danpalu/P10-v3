export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const query = body.query;

    if (!query) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing search query',
      });
    }
  
    const response = await $fetch('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 16,
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });
  
    return response;
  });
  