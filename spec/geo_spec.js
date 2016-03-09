var GeoAPI = require('../routes/geo.js');
var CityModel = require('../models/location.js');
var Mock = require('./mock.js');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var MockCity = {
    "elevation": null,
    "name": "Moscow",
    "modification_date": "2016-02-02",
    "geonameid": 524901,
    "feature_class": "P",
    "admin3_code": "",
    "admin2_code": "",
    "longitude": 37.61556,
    "cc2": "",
    "timezone": "Europe/Moscow",
    "latitude": 55.75222,
    "feature_code": "PPLC",
    "dem": 144,
    "country_code": "RU",
    "admin1_code": "48",
    "alternatenames": "Gorad Maskva,MOW,Maeskuy,Maskav,Maskava,Maskva,Mat-xco-va,Matxcova,Matxcơva,Mosca,Moscfa,Moscha,Mosco,Moscou,Moscova,Moscovo,Moscow,Moscoƿ,Moscu,Moscua,Moscòu,Moscó,Moscù,Moscú,Mosk\"va,Moska,Moskau,Mosko,Moskokh,Moskou,Moskov,Moskova,Moskovu,Moskow,Moskowa,Mosku,Moskuas,Moskva,Moskvo,Moskwa,Moszkva,Muskav,Musko,Mát-xcơ-va,Mòskwa,Məskəү,masko,maskw,mo si ke,moseukeuba,mosko,mosukuwa,mskw,mwskva,mwskw,mwsqbh,mx s ko,Μόσχα,Горад Масква,Мæскуы,Маскав,Москва,Москова,Москох,Москъва,Мускав,Муско,Мәскәү,Մոսկվա,מאָסקװע,מאסקווע,מוסקבה,ماسکو,مسکو,موسكو,موسكۋا,ܡܘܣܩܒܐ,मास्को,मॉस्को,মস্কো,மாஸ்கோ,มอสโก,མོ་སི་ཁོ།,მოსკოვი,ሞስኮ,モスクワ,莫斯科,모스크바",
    "asciiname": "Moscow",
    "admin4_code": "",
    "population": 10381222
};

describe('Geo API', function() {
	var res, req;

	beforeAll(function(done) {
		mongoose.connect('mongodb://localhost/petswatch', done);
	});

	afterAll(function(done) {
		mongoose.unmock(done);
	});

	beforeEach(function(done){
		res = Mock.mockResponse();
		req = Mock.mockRequest();

    	CityModel.create(MockCity, function(err, city) {
    		expect(err).toBeFalsy();
    		done();
    	});
	});

	afterEach(function(done) {
		mockgoose.reset(done);
	});

	it('does not accept an empty search string', function() {
		res = Mock.mockResponse();
		req = Mock.mockRequest();

		GeoAPI.searchCity(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('does not accept a search string shorter than 3 characters', function() {
		res = Mock.mockResponse();
		req = Mock.mockRequest();
		req.query.search = "qw";

		GeoAPI.searchCity(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('returns array of cities', function(done) {
		req.query.search = "mosc";
		GeoAPI.searchCity(req, res);
		setTimeout(function() {
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalled();
			expect(res.json.calls.argsFor(0)[0][0]["geonameid"]).toBe(524901);
			done();
		}, 10);
	});
});