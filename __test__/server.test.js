const supertest = require('supertest');
const app = require('../lib/server');
const request = supertest(app);

describe('Express REST API Tests', () => {
  let foodId;
  let clothesId;

  it('should return 404 on a bad route', async () => {
    const response = await request.get('/badroute');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Route not found', statusCode: 404 });
  });

  it('should return 404 on a bad method', async () => {
    const response = await request.put('/food');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Route not found', statusCode: 404 });
  });

  it('should create a new food item using POST', async () => {
    const response = await request.post('/food').send({
      name: 'Pizza',
      description: 'Delicious',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    foodId = response.body.id;
  });

  it('should retrieve a list of food items using GET', async () => {
    const response = await request.get('/food');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should retrieve a specific food item using GET', async () => {
    const response = await request.get(`/food/${foodId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', foodId);
  });

  it('should update a specific food item using PUT', async () => {
    const response = await request.put(`/food/${foodId}`).send({
      name: 'Updated Pizza',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', foodId);
    expect(response.body).toHaveProperty('name', 'Updated Pizza');
  });

  it('should delete a specific food item using DELETE', async () => {
    const response = await request.delete(`/food/${foodId}`);
    expect(response.status).toBe(204);
  });

  it('should create a new clothes item using POST', async () => {
    const response = await request.post('/clothes').send({
      name: 'T-shirt',
      description: 'Comfortable',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    clothesId = response.body.id;
  });

  it('should retrieve a list of clothes items using GET', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should retrieve a specific clothes item using GET', async () => {
    const response = await request.get(`/clothes/${clothesId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', clothesId);
  });

  it('should update a specific clothes item using PUT', async () => {
    const response = await request.put(`/clothes/${clothesId}`).send({
      name: 'Updated T-shirt',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', clothesId);
    expect(response.body).toHaveProperty('name', 'Updated T-shirt');
  });

  it('should delete a specific clothes item using DELETE', async () => {
    const response = await request.delete(`/clothes/${clothesId}`);
    expect(response.status).toBe(204);
  });

  it('should handle 500 errors', async () => {
    
    const response = await request.get('/food/internalerror');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error', statusCode: 500 });
  });
});
