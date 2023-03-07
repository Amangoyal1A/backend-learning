const sinon = require("sinon");
const student = require("../IgnoreFiles/check");

describe("Student class", () => {
  let studentobj = new student();
  

  it("function argument check",function(){
    var stub = sinon.stub(studentobj,'getexternal')
    stub.withArgs(40).returns(5)

    expect(studentobj.finalmarks(40)).toEqual(46);

  })


})