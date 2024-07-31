/** Class와 Prototype */

/**
 * Class는 Prototype 객체에서 속성을 상속하는 객체의 집합이다.
 * 같은 Prototype 객체에서 속성을 상속했다면, 이들 객체는 같은 클래스의 서로 다른 인스턴스가 된다.
 * 인스턴스 객체가 Prototype을 참조하며, 이를 통해 Prototype에 정의된 속성과 메소드를 상속받는다.
 */

// ------------------------------------------------------------------------------------------------------

/** 생성자 함수 */

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {
    toString: function() {
        return `(${this.x}, ${this.y})`;
    }
}

let pt1 = new Point(10, 20);
let pt2 = new Point(100, 200);

console.log(pt1.toString());
console.log(pt2.toString());
console.log(pt1 instanceof Point);
console.log(pt2 instanceof Point);

/**
 * 생성자 함수는 객체가 생성될 때마다 메소드가 별도로 생성된다. 각각의 인스턴스에 대해 독립적으로 정의된다.
 * 각 메소드는 메모리에서 서로 다른 주소를 가지므로, 각각의 인스턴스는 서로 다른 객체를 참조한다.
 * 메소드를 공유하게 해주면 효율적이다.
 */

function Circle(radius) {
    this.radius = radius;
    // this.getArea = function() { // 생성자에 메소드가 포함되어 있는 형식
    //     return Math.PI * this.radius ** 2;
    // }
}

Circle.prototype.getArea = function() { // Prototype으로 메소드를 상속시켜 공유시킨다.
    return Math.PI * this.radius ** 2;
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);
console.log(circle1.getArea === circle2.getArea);

/**
 * Class와 생성자 함수는 모두 Prototype 기반의 인스턴스를 생성하지만 완벽하게 동일하지는 않다.
 * Class는 생성자 함수보다 엄격하며, 생성자 함수에서는 제공하지 않는 기능도 제공한다.
 * 생성자 함수는 함수 안에서 객체를 생성하지 않는다. this를 사용하여 함수 객체 자신에 속성을 추가하고 초기화한다.
 */

// ------------------------------------------------------------------------------------------------------

/** Class */

class Person {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(`Hi! ${this.name}`);
    }

    static sayHello() {
        console.log('Hello!');
    }
}

const me = new Person('Kim');

me.sayHi();
Person.sayHello();

/**
 * Class 몸체에는 0개 이상의 메소드만 선언할 수 있다.
 * constructor, Prototype 메소드, 정적 메소드
 * constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메소드다.
 *
 * Class의 Prototype 프로퍼티에 메소드를 추가하지 않아도 기본적으로 Prototype 메소드가 된다.
 * 정적 메소드는 static 키워드를 붙여 선언하며, 인스턴스에서는 호출할 수 없다. (Class 내장 메소드가 된다.)
 * Prototype 메소드는 인스턴스에서 호출하며, 내부의 this는 이 각각의 인스턴스를 가리킨다.
 */

class Square {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    static calcArea(width, height) {
        return width * height;
    }
}

const mySquare = new Square(10, 10);
console.log(mySquare.area());

console.log(Square.calcArea(200, 300)); // 클래스 내부의 정적 메소드를 이용

// ------------------------------------------------------------------------------------------------------

/** getter, setter (접근자) */

const namedPerson = {
    firstName: 'Chang Wan',
    lastName: 'Kim',

    get fullName() {
        return `${this.lastName} ${this.firstName}`;
    },

    set fullName(name) {
        [this.firstName, this.lastName] = name.split('');
    }
}

console.log(namedPerson.fullName);

/**
 * 자체적으로 값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티이다.
 */

// ------------------------------------------------------------------------------------------------------

/** Class 필드 */

class PrivatePerson {
    #name = ''; // private 필드

    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.#name.trim(); // private 필드에 접근하기 위한 getter 접근자
    }
}

const them = new PrivatePerson('Jung');
console.log(them.name);

/**
 * Class 몸체에서 필드를 정의하는 경우에는 this에 바인딩해서는 안 된다.
 * constructor 내에서는 this에 바인딩한다.
 * Class 필드를 초기화할 필요가 있다면, constructor 내부에서 Class 필드를 참조하여 초기값을 할당한다.
 * private 필드에 선언된 #은 클래스 외부에서 직접 참조할 수 없다. 접근자를 활용해야 한다.
 */

// ------------------------------------------------------------------------------------------------------

/** Class 실습 */

class Vehicle {
    constructor(name, wheel) {
        this.name = name;
        this.wheel = wheel;
    }

    callSpecs() {
        return `${this.name} - ${this.wheel}`;
    }
}

const myVehicle = new Vehicle('BMW', 4);
console.log(myVehicle);

class Bicycle extends Vehicle { // Vehicle의 자식 클래스
    constructor(name, wheel) {
        super(name, wheel);
    }

    callSpecs() {
        return super.callSpecs(); // super 키워드로 부모 클래스의 메소드 호출
    }
}

class Car extends Vehicle { // 부모 클래스인 Vehicle에 없는 프로퍼티 지정
    constructor(name, wheel, license) {
        super(name, wheel);
        this.license = license;
    }

    callSpecs() {
        return super.callSpecs() + ` / ${this.license}`; // 부모 클래스의 메소드에 자신의 프로퍼티도 추가
    }
}

const myBycycle = new Bicycle('붕붕이', 2);
console.log(myBycycle);
console.log(myBycycle.callSpecs());

const myCar = new Car('두돈반', 8, true);
console.log(myCar)
console.log(myCar.callSpecs());

/**
 * super 키워드는 함수처럼 호출할 수 있고, this와 같이 식별자처럼 참조할 수 있다.
 * 메소드 내에서 super를 참조하면, 부모 클래스의 메소드를 호출할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** Book 이라는 생성자 함수를 만들고 Prototype을 이용하여 프로퍼티를 추가하시오. (title, author, price) / 생성할 Prototype 예 : 출판일, 페이지 수 */

function Book(title, author, price) {
    this.title = title,
    this.author = author,
    this.price = price
}

Book.prototype = {
    releaseDate: 2019,
    pages: 600
}

const myBook = new Book('이펙티브 타입스크립트', '댄 벤더캄', 24000);
console.log(myBook);