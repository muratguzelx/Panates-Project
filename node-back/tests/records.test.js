const request = require('supertest')
const app = require('../server')

describe('/list', () => {

  beforeAll((done) => {
    app.on('ready', function () {   // wait for DB connection to be completed.
      done();
    });
  });

  it('it should return errors', async (done) => {
    const res = await request(app)
      .post('/list')
      .send({
        startDate: "2016-01-26",  // endDate is missing
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('endDate');
    expect(res.body.errors.endDate).toBe('endDate is required');
    done();
  });

  it('it should return successful request', async (done) => {
    jest.setTimeout(10000);
    const res = await request(app)
      .post('/list')
      .send({
        "startDate": "2016-01-26",
        "endDate": "2018-02-02"
      });
    expect(res.statusCode).toEqual(200, done);
    expect(res.body.code).toBe(0);
    expect(res.body.message).toBe("Success");
    expect(res.body).toHaveProperty('records') // should return the records.
    done();
  });


  it('it should return errors', async (done) => {
    const res = await request(app)
      .post('/')
      .send({
        _id: "string-id",  // id must be numeric
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('_id');
    done();
  });

})
