'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var timeseriesCtrlStub = {
  index: 'timeseriesCtrl.index',
  show: 'timeseriesCtrl.show',
  create: 'timeseriesCtrl.create',
  upsert: 'timeseriesCtrl.upsert',
  patch: 'timeseriesCtrl.patch',
  destroy: 'timeseriesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var timeseriesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './timeseries.controller': timeseriesCtrlStub
});

describe('Timeseries API Router:', function() {
  it('should return an express router instance', function() {
    expect(timeseriesIndex).to.equal(routerStub);
  });

  describe('GET /api/timeseriess', function() {
    it('should route to timeseries.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'timeseriesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/timeseriess/:id', function() {
    it('should route to timeseries.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'timeseriesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/timeseriess', function() {
    it('should route to timeseries.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'timeseriesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/timeseriess/:id', function() {
    it('should route to timeseries.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'timeseriesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/timeseriess/:id', function() {
    it('should route to timeseries.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'timeseriesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/timeseriess/:id', function() {
    it('should route to timeseries.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'timeseriesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
