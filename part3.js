// 1. Constructor Pattern

// js에서 일반적으로 많이 사용되는 패턴
// 같은 객체의 여러 인스턴스화 가능

let person1 = {};

let person2 = new Object();

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.showName = () => console.log(this.name);
}

let person3 = new Person("chaemin", 22);
person3.showName(); //chaemin

// 2. Prototype Pattern

// 객체 기반 창조 디자인 패턴
// 객체의 새로운 인스턴스를 프로토타입에서 복제를 통해 만든다.
// 새로운 객체의 생성자를 직접적으로 만든다면 복잡하고 비효율적일 수 있으나 Prototype Pattern에서는 이를 커버한다.

function Book(title, price) {
  this.title = title;
  this.price = price;
  this.printTitle = () => console.log(this.title);
}

function BookPrototype(prototype) {
  this.prototype = prototype;
  this.clone = () => {
    let book = new Book();
    book.title = prototype.title;
    book.price = prototype.price;
    return book;
  };
}

let sampleBook = new Book("JavaScript", 15);
let prototype = new BookPrototype(sampleBook);
let book = prototype.clone();
book.printTitle();

//js는 자체 내장 프로토타입 기능이 있다.

// 3. Command Pattern

// 주요 목적 : 액션 또는 객체 인스턴스화를 캡슐화하는 것

if (selectedPayment == "creditcard") {
  //handle payment by creditcard
}

// 위 코드는 오직 한 가지 결제 방법으로 이루어져 있다.
// 하지만 더 다양한 결제 방법이 존재할 것이다.
// 위 코드를 사용하면, 인터페이스가 아닌 구현된 부분을 제공하므로 Coupling(결합)이 발생한다.

// => Command Pattern은 결합을 느슨하게 하는 좋은 해결 방법
// 따라서 이를 충족시키기 위해서 작업을 요청하는 코드와 실제 구현을 실행하는 코드를 분리시켜야 한다.

// 4. Singleton Pattern

// 한 클래스에 대해 오직 하나의 instance

const utils = (function () {
  let instance;

  function initialize() {
    return {
      sum: function (a, b) {
        return a + b;
      },
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = initialize();
      }
      return instance;
    },
  };
})();

let sum = utils.getInstance().sum(3, 5); //8

/* 잠깐 알아보는 캡슐화..... 클로져! */
function makeAdder(x) {
  var y = 1;
  return function (z) {
    y = 100;
    return x + y + z;
  };
}

var func1 = makeAdder(5);
var func2 = makeAdder(10);

console.log(func1(3));
// 108
console.log(func2(6));
// 116

/* 
위 코드에서 func1과 func2가 바로 클로저이다. 두 클로저를 살펴보자.
func1을 정의할 때 5가 매개변수로 전달되었고 makeAdder 내부에서 x에 매핑되어 x=5라는 환경이 저장되었다. 따라서 앞으로 func1을 백만, 천만번 호출해도 x=5이다.

반면 func2는 10을 매개변수로 전달했다. 동일한 방식으로 x=10이라는 환경이 저장되었고 몇 번을 호출해도 x=10이라는 사실은 변함없다.
그리고 func1, func2 모두 makeAdder 함수 내부에서 리턴하는 함수를 할당받았다. 이제 func1 또는 func2를 호출하면 저 함수가 호출되는 것이다.
그렇기 때문에 func1(3)의 결과가 5(x) + 100(y) + 3(z) = 108로 나오는 것이다. (func2 동일)
*/

// 5. 올바르게 객체 리터럴을 사용하는 방법 (권장)

// bad example
var obj = {
  key: "value",
  method: function () {
    console.log("hello world");
  },
};

//위와 같은 방법은 보안에 취약하다.

const plusMinus = (function () {
  let num = 0;
  return {
    plus: function () {
      num++;
    },
    minus: function () {
      num--;
    },
    getNum: function () {
      return num;
    },
  };
})();

//자바스크립트에서 리터럴을 사용할땐 글로벌 공간에 변수를 선언하는 것은 되도록 피해야 한다.
// 위와 같이 클로저나 익명 함수를 사용하여 객체를 리턴하고 변수를 함수 안에 선언하여 보호한다.

// 위 코드는 함수를 익명 함수로 감싸 변수를 보호할 수 있고, 재사용성을 높일 수 있다.
