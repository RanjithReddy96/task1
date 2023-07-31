
// // Testing component using suoer test


// import { Test, TestingModule } from '@nestjs/testing';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ProductsModule } from './products.module';
// import { ProductSchema } from '../schemas/product.schema';

// import * as request from 'supertest';
// import { INestApplication, ValidationPipe } from '@nestjs/common';

// describe('API endpoints testing (e2e)', () => {
//     let app: INestApplication;
//     beforeAll(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [ MongooseModule.forRoot('mongodb://dev-alldb:devroot@172.20.6.22:27017/ranjith?authMechanism=DEFAULT&authSource=admin'),MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),ProductsModule],
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         app.enableShutdownHooks();
//         app.useGlobalPipes(new ValidationPipe());
//         await app.init();
//     });

//     afterAll(async () => {
//         await app.close();
//     });

//     let data = [
//         {
//             "_id": "64b7c2f4f5e99da5c6d1bf05",
//             "name": "jeep",
//             "price": 25,
//             "description": "more milage",
//             "__v": 0
//         },
//         {
//             "_id": "64b7c2faf5e99da5c6d1bf07",
//             "name": "reddy",
//             "price": 25,
//             "description": "qwerty",
//             "__v": 0
//         }
//     ]
//     let sampleData = {
//         "name": "car",
//         "price": 25,
//         "description": "moremilage",
//     }
//     let sampleUpdateData = {
//         "name": "jeep",
//         "description": "more milage",
//     }
//      // an example of using supertest reqruest.
//     it('/Could return Products (GET)', async () => {
//         const res = await request(app.getHttpServer()).get('/products');
//         expect(res.status).toBe(200);
//         expect(res.body.length).toBeGreaterThan(4);
//     });
//     it('/Could return Product. (GET)', async () => {
//         const res = await request(app.getHttpServer()).get('/products/64b7c2f4f5e99da5c6d1bf05');
//         expect(res.status).toBe(200);
//         // expect(res.body).toEqual(data[0]);
//     });
//     it('/Return Could not find Product. (GET)', async () => {
//         const res = await request(app.getHttpServer()).get('/products/64b7c2f4f5e99da5c6d1bf70');
//         expect(res.status).toBe(404);
//         expect(res.body).toEqual({
//               "error": "Not Found",
//               "message": "Could not find Product.",
//               "statusCode": 404,
//             });
//     });
//     it('/Add  Product to DB. (post)', async () => {
//         const res = await request(app.getHttpServer()).post('/products').send(sampleData).expect(201);
//         expect(res.status).toBe(201);
//         // expect(res.body).toHaveProperty('name');
//     });
//     it('/It Update the  Product to DB. (put)', async () => {
//         const res = await request(app.getHttpServer()).put('/products/64b7c2f4f5e99da5c6d1bf05').send(sampleUpdateData);
//         expect(res.status).toBe(200);
//     });
//     it('/It Remove the  Product from DB. (Delete)', async () => {
//         const res = await request(app.getHttpServer()).delete('/products/64b7c2faf5e99da5c6d1bf07');
//         expect(res.status).toBe(200);
//     });
// });
