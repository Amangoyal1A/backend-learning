const sinon = require("sinon");
const Student = require("../IgnoreFiles/check");

describe("Student class", () => {
  let student;

  beforeEach(() => {
    student = new Student();
  });

  describe("getInfo() method", () => {
    it("should return 10", () => {
      const result = student.getInfo();
      expect(result).toEqual(10);
    });
  });

  describe("home() method", () => {  //it only care about how many times function call thats it it donot care about argument and all
    
    it("should call getInfo() method once", () => {
      const spy = sinon.spy(student, "getInfo");
      student.home("foo");
      expect(spy.calledOnce).toBe(true);
      spy.restore();
    });

    it("should call getInfo() method with correct arguments", () => {
      const spy = sinon.spy(student, "getInfo");
      student.home("bar");
      expect(spy.calledWith("bar", 1)).toBe(true);
      spy.restore();
    });
    

    it("should return the correct result", () => {
      const result = student.home("foo");
      expect(result).toEqual(15);
    });
  });
});

