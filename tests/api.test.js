const request = require('supertest')

const app = require('../index')

/**
 * Testing stats 
 */
describe('Testing APIs', function () {
	it('POST /maximize respond with json containing the best combination of requests that maximizes total profits', done => {
		request(app)
			.post('/maximize')
			.send([
				{
					"request_id": "acme_AAAAA",
					"check_in": "2020-01-10",
					"nights": 4,
					"selling_rate": 160,
					"margin": 30
				},
				{
					"request_id": "bookata_XY123",
					"check_in": "2020-01-01",
					"nights": 5,
					"selling_rate": 200,
					"margin": 20
				},
				{
					"request_id": "kayete_PP234",
					"check_in": "2020-01-04",
					"nights": 4,
					"selling_rate": 156,
					"margin": 5
				},
				{
					"request_id": "atropote_AA930",
					"check_in": "2020-01-04",
					"nights": 4,
					"selling_rate": 150,
					"margin": 6
				}
			])
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});

	it('POST /stats respond with json containing the average, minimum, and maximum profit per night', done => {
        request(app)
            .post('/stats')
            .send([
                {
                    "request_id": "bookata_XY123",
                    "check_in": "2020-01-01",
                    "nights": 1,
                    "selling_rate": 50,
                    "margin": 20
                },
                {
                    "request_id": "kayete_PP234",
                    "check_in": "2020-01-04",
                    "nights": 1,
                    "selling_rate": 55,
                    "margin": 22
                },
                {
                    "request_id": "kayete_PP234",
                    "check_in": "2020-01-07",
                    "nights": 1,
                    "selling_rate": 49,
                    "margin": 21
                }
            ])
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});