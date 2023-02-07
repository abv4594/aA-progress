// Your code here
const chai = require('chai');
const expect = chai.expect;
const myMap = require('../problems/my-map');
const spies = require('chai-spies');
chai.use(spies);

describe('Mymap function', function () {
    let arr;
    let cb;
    let spyMap;
    let spyCb;
    
    beforeEach(function(){
        arr = [1,2,3];
        cb = (el) => el*2;
        spyMap = chai.spy.on(arr, 'map');
        spyCb = chai.spy(cb);
    });
    it('should work like Array.map', function () {
        expect(myMap(arr,cb)).to.deep.equal([2,4,6]);
    });
    it('should not change the original array', function () {
        const answer = myMap(arr,cb);
        expect(arr).to.deep.equal([1,2,3]);
    });
    it('Should not use Array.map', function() {
        myMap(arr,cb);
        expect(spyMap).to.not.have.been.called();
    })
    it('Should call the callback is invoked for each element', function () {
        const answer = myMap(arr,spyCb);
        expect(spyCb).to.have.been.called.exactly(arr.length);
    });


});