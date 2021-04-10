'use strict'

const expect = require("chai").expect;
const { mockRequest, mockResponse } = require('mock-req-res');
const sinon = require('sinon');
const mocks = require('./mocks')
const authCheck = require('../middlewares/isAuthenticated').authCheck;

const res = mockResponse();
const reqBasic = mockRequest({ headers: { authorization: mocks.token_basic } });
const reqPremium = mockRequest({ headers: { authorization: mocks.token_premium } });
const reqInvalidToken = mockRequest({ headers: { authorization: 'testest' } });
const reqEmpty = mockRequest();

describe("User authentication",function(){

    it('Should authenticate Basic user', function() {
       const nextSpy = sinon.spy();
  
        authCheck(reqBasic, res, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });

      it('Should authenticate Premium user', function() {
        const nextSpy = sinon.spy();
  
        authCheck(reqPremium, res, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });

      it('Should handle empty authorization header', function() {
        const nextSpy = sinon.spy();
  
        authCheck(reqEmpty, res, nextSpy);
        expect(nextSpy.called).to.be.false;
      });

      it('Should handle invalid token', function() {
        const nextSpy = sinon.spy();
  
        authCheck(reqInvalidToken, res, nextSpy);
        expect(nextSpy.called).to.be.false;
      });
      
})