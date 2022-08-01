import Container = PIXI.Container;
import {} from "pixi.js";
import Button from "./Button";
import TextWindow from "./TextWindow";

export default class MainContainer extends Container {
	public static WIDTH:number = 1200;
	public static HEIGHT:number = 600;
	private _background:PIXI.Graphics;
	private _json:IBlock
	private _textWindow:TextWindow;
	private _consoleText:string = "";

	constructor() {
		super();
		this.jsonLoader();
	}

	private jsonLoader():void {
		const xhr:XMLHttpRequest = new XMLHttpRequest();
		xhr.responseType = "json";
		xhr.open("GET", "test.json", true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					this._json = xhr.response;
					this.initialComplete();
				} else {
					console.log("JSON ERROR");
				}
			}
		};
		xhr.send();
	}

	private initialComplete():void {
		this.initBackground();
		this.initButton();
	}

	private initBackground():void {
		this._background = new PIXI.Graphics;
		this._background
			.beginFill(0x999999)
			.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(this._background);
	}

	private initButton():void {
		let indentX:number = 20;
		let indentY:number = 10;
		let gap:number = 10;
		let buttons:Button[] = [];

		let button1:Button = new Button("Json-1", () => {this.jsonFunction1();},);
		this.addChild(button1);
		buttons.push(button1);

		let button2:Button = new Button("Json-2", () => {this.jsonFunction2();},);
		this.addChild(button2);
		buttons.push(button2);

		let button3:Button = new Button("Euler-1", () => {this.euler1Function();},);
		this.addChild(button3);
		buttons.push(button3);

		let button4:Button = new Button("Euler-2", () => {this.euler2Function();},);
		this.addChild(button4);
		buttons.push(button4);

		let button5:Button = new Button("Euler-3", () => {this.euler3Function();},);
		this.addChild(button5);
		buttons.push(button5);

		let button6:Button = new Button("Euler-4", () => {this.euler4Function();},);
		this.addChild(button6);
		buttons.push(button6);

		let button7:Button = new Button("Euler-5", () => {this.euler5Function();},);
		this.addChild(button7);
		buttons.push(button7);

		let button8:Button = new Button("Euler-6", () => {this.euler6Function();},);
		this.addChild(button8);
		buttons.push(button8);

		let button9:Button = new Button("Euler-7", () => {this.euler7Function();},);
		this.addChild(button9);
		buttons.push(button9);

		let button10:Button = new Button("Euler-8", () => {this.euler8Function();},);
		this.addChild(button10);
		buttons.push(button10);

		let button11:Button = new Button("Euler-9", () => {this.euler9Function();},);
		this.addChild(button11);
		buttons.push(button11);

		buttons.forEach(button => {
			button.x = indentX;
			button.y = indentY;
			indentY += button.height + gap;
		});
	}

	private initTextWindow(text:string):void {
		const windowWidth:number = MainContainer.WIDTH - MainContainer.WIDTH/3;
		const windowHeight:number = MainContainer.HEIGHT;
		if (this._textWindow) {
			this.removeChild(this._textWindow);
		}
		this._consoleText = "";
		this._textWindow = new TextWindow(text, windowWidth, windowHeight);
		this._textWindow.x = MainContainer.WIDTH - windowWidth;
		this.addChild(this._textWindow);
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	private jsonFunction1():void {
		this._consoleText += "Задача 1:\n" +
		"Вывести имена всех элементов test.json (включая вложенные) в консоль в любом порядке.\n" +
		"Решение 1:\n\n"
		this.logObjectLevels1(this._json);
		this.initTextWindow(this._consoleText);
	}

	private logObjectLevels1(o:IBlock, r?:boolean):void {
		if (o.name && !r) {
			this._consoleText += o.name + "\n";
			console.log(o.name);
		}
		o.children.forEach((v) => {
			this._consoleText += v.name + "\n";
			console.log(v.name);
			if(v.children) {
				this.logObjectLevels1(v, true);
			}
		})
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	private jsonFunction2():void {
		this._consoleText += "Задача 1:\n" +
		"Вывести имена всех элементов test.json (включая вложенные) в консоль в любом порядке.\n" +
		"Решение 2:\n\n"
		this.logObjectLevels2(this._json);
		this.initTextWindow(this._consoleText);
	}

	private logObjectLevels2(o:IBlock):void {
		this._consoleText += o.name + "\n";
		console.log(o.name);
		o.children?.forEach((v) => {
			this.logObjectLevels2(v);
		})
	}

	///////////////////////////////// 1 /////////////////////////////////

	private euler1Function():void {
		this._consoleText += "Проект Эйлера. Задача 1:\n" +
		"Если выписать все натуральные числа меньше 10, " +
		"кратные 3 или 5, то получим 3, 5, 6 и 9.\n" +
		"Сумма этих чисел равна 23.\n" +
		"Найдите сумму всех чисел меньше 1000, кратных 3 или 5.\n\n"
		this.eulerJakumo1();
		this.initTextWindow(this._consoleText);
		console.log("******");
	}

	private eulerJakumo1():void {
		let summ:number = 0;

		for (let i:number = 1; i < 1000; i++) {
			let mult3:number = i/3;
			let mult5:number = i/5;
			if(Number.isInteger(mult3) || Number.isInteger(mult5)){
				this._consoleText += i + " ";
				summ += i;
			}
		}
		this._consoleText += "\n\nСумма = " + summ;
	}

	///////////////////////////////// 2 /////////////////////////////////

	private euler2Function():void {
		this._consoleText += "Проект Эйлера. Задача 2:\n" +
		"Каждый следующий элемент ряда Фибоначчи получается при сложении двух предыдущих.\n" +
		"Начиная с 1 и 2, первые 10 элементов будут: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ... \n" +
		"Найдите сумму всех четных элементов ряда Фибоначчи, которые не превышают четыре миллиона.\n\n"
		this.eulerJakumo2();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo2():void {
		let firstNum:number = 1;
		let secondNum:number = 2;
		let evenNumbers:number[] = [secondNum];
		let nextNumber:number = 0;
		this._consoleText += "Все: " + firstNum + " ";
		this._consoleText += secondNum + " ";
		let evenSumm:number = secondNum;
		while(nextNumber < 4000000) {
			nextNumber = firstNum + secondNum;
			this._consoleText += nextNumber + " ";
			firstNum = secondNum;
			secondNum = nextNumber;
			if (nextNumber % 2 == 0) {
				evenSumm += nextNumber;
				evenNumbers.push(nextNumber);
			}
		}

		let textToConsole = evenNumbers.join(' ');
		this._consoleText += "\n\nЧетные: " + textToConsole;
		this._consoleText += "\n\nСумма чётных чисел: " + evenSumm;
	}

	///////////////////////////////// 3 /////////////////////////////////

	private euler3Function():void {
		this._consoleText += "Проект Эйлера. Задача 3:\n" +
		"Простые делители числа 13195 - это 5, 7, 13 и 29.\n" +
		"Какой самый большой делитель числа 600851475143, являющийся простым числом?\n\n"
		this.eulerJakumo3();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo3():void {
		let numberToCheck:number = 13195;						//	29		*455
		//let numberToCheck:number = 600851475143;				//	6857 ???
		for (let i:number = numberToCheck/5; i>1; i--) {
			if (numberToCheck % i == 0) {
				if (this.simpleNumberChecking(i)) {
					this._consoleText += i + "\n";
					break
				}
			}
		}
	}

	private simpleNumberChecking(element:number):boolean {
		for (let j:number = 2; j <= Math.sqrt(element); j++) {
			if (Number.isInteger(element/j)) {
				return false;
			}
		}
		return true;
	}

	///////////////////////////////// 4 /////////////////////////////////

	private euler4Function():void {
		this._consoleText += "Проект Эйлера. Задача 4:\n" +
		"Палиндромное число читается одинаково в обоих направлениях.\n" +
		"Самый большой палиндром, составленный из произведения двух 2-значных чисел, \n" +
		"     равен 9009 = 91 * 99.\n" +
		"Найдите самый большой палиндром, составленный из произведения двух 3-значных чисел.\n\n"
		this.eulerJakumo4();
		this.initTextWindow(this._consoleText);
	}

	private _palindromicMax:number = 0;
	private eulerJakumo4():void {
		const firstNum:number = 900;
		const secondNum:number = 900;
		//let palindromicMax:number = 0;
		this._consoleText += "проверка множетелей от " + firstNum + " и " + secondNum + ":\n\n";

		for(let i:number = firstNum; i<1000; i++){
			for(let j:number = i; j<1000; j++){
			let checkingNumber:number = i * j;
			this.checkingPalindromic(i, j, checkingNumber);
			}
		}
		this._consoleText += "\nСамый большой палиндром = " + this._palindromicMax;
		this._palindromicMax = 0;
	}

	private checkingPalindromic(firstNum:number, secondNum:number, checkingNumber:number):void {
		if (checkingNumber == Number(checkingNumber.toString().split("").reverse().join(""))) {
			this._consoleText += "множитель 1 = " + firstNum + ", множитель 2 = " + secondNum + ", палиндром = " + checkingNumber + "\n";
			if (this._palindromicMax < checkingNumber) {
				this._palindromicMax = checkingNumber;
			}
		}
	}

	///////////////////////////////// 5 /////////////////////////////////

	private euler5Function():void {
		this._consoleText += "Проект Эйлера. Задача 5:\n" +
		"2520 - это наименьшее число, которое можно разделить на каждое из чисел от 1 до 10 без остатка.\n" +
		"Каково наименьшее положительное число, которое равномерно делится на все числа от 1 до 20?\n\n"
		this.eulerJakumo5();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo5():void {
		let divider:number = 20;
		let checkingNumber:number = 2520;
		let iterator:number;

		while(iterator != divider) {
			for(iterator = 2; iterator <= divider; iterator++){		//fixme +1?
				if (!Number.isInteger(checkingNumber/iterator)) {
					break
				}
				if (iterator == divider) {
					this._consoleText += checkingNumber + "\n";
					break
				}
			}
			checkingNumber+=2;
		}
	}

	///////////////////////////////// 6 /////////////////////////////////

	private euler6Function():void {
		this._consoleText += "Проект Эйлера. Задача 6:\n" +
		"Сумма квадратов первых десяти натуральных чисел равна 1² + 2² + ... + 10² = 385\n" +
		"Квадрат суммы первых десяти натуральных чисел равен (1 + 2 + ... + 10)² = 55² = 3025\n" +
		"следовательно, разница между суммой квадратов первых десяти натуральных чисел\n" +
		" и квадратом суммы равна 3025 - 385 = 2640.\n" +
		"Найдите разницу между суммой квадратов первых ста натуральных чисел и квадратом суммы.\n\n"
		this.eulerJakumo6();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo6():void {
		let numberToCheck = 100;
		let sumOfTheSquares:number = this.sumOfTheSquares(numberToCheck);
		let squareOfTheSum:number = this.squareOfTheSum(numberToCheck);
		let answer:number = 0;
		if (sumOfTheSquares > squareOfTheSum) {
			answer = sumOfTheSquares - squareOfTheSum;
		} else {
			answer = squareOfTheSum - sumOfTheSquares;
		}
		this._consoleText += answer + "\n";
	}

	private sumOfTheSquares(numberToCheck:number):number {
		let sumOfTheSquares:number = 0;
		for (let i:number = 1; i <= numberToCheck; i++) {
			sumOfTheSquares += Math.pow(i, 2);
		}
		console.log(sumOfTheSquares);
		return sumOfTheSquares;
	}

	private squareOfTheSum(numberToCheck:number):number {
		let squareOfTheSum:number = 0;
		for (let i:number = 1; i <= numberToCheck; i++) {
			squareOfTheSum += i;
		}
		return Math.pow(squareOfTheSum, 2);
	}

	///////////////////////////////// 7 /////////////////////////////////

	private euler7Function():void {
		this._consoleText += "Проект Эйлера. Задача 7:\n" +
		"Перечислив первые шесть простых чисел: 2, 3, 5, 7, 11 и 13, мы увидим,\n" +
		"что 6-е простое число равно 13." +
		"Какое 10001-е простое число?\n\n"
		this.eulerJakumo7();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo7():void {
		let simpleNumberToCheck = 10001;
		let iterator:number = 0;
		let i:number = 0;
		while(iterator <= simpleNumberToCheck){
			i++
			if (this.simpleNumberChecking(i)) {
				if (iterator == simpleNumberToCheck) {
					this._consoleText += i + "\n";
					break
				}
				iterator++
			}	
		}
	}

	///////////////////////////////// 8 /////////////////////////////////

	private euler8Function():void {
		this._consoleText += "Проект Эйлера. Задача 8:\n" +
		"Четыре соседние цифры в 1000-значном числе, которые имеют наибольшее произведение,\n" +
		" являются 9 × 9 × 8 × 9 = 5832.\n\n" +
		"73167176531330624919225119674426574742355349194934 \n" +
		"96983520312774506326239578318016984801869478851843 \n" +
		"85861560789112949495459501737958331952853208805511 \n" +
		"12540698747158523863050715693290963295227443043557 \n" +
		"66896648950445244523161731856403098711121722383113 \n" +
		"62229893423380308135336276614282806444486645238749 \n" +
		"30358907296290491560440772390713810515859307960866 \n" +
		"70172427121883998797908792274921901699720888093776 \n" +
		"65727333001053367881220235421809751254540594752243 \n" +
		"52584907711670556013604839586446706324415722155397 \n" +
		"53697817977846174064955149290862569321978468622482 \n" +
		"83972241375657056057490261407972968652414535100474 \n" +
		"82166370484403199890008895243450658541227588666881 \n" +
		"16427171479924442928230863465674813919123162824586 \n" +
		"17866458359124566529476545682848912883142607690042 \n" +
		"24219022671055626321111109370544217506941658960408 \n" +
		"07198403850962455444362981230987879927244284909188 \n" +
		"84580156166097919133875499200524063689912560717606 \n" +
		"05886116467109405077541002256983155200055935729725 \n" +
		"71636269561882670428252483600823257530420752963450 \n\n" +
		"Найдите тринадцать соседних цифр в 1000-значном числе, которые имеют\n" +
		"наибольшее произведение.\n\n"
		this.eulerJakumo8();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo8():void {
		let checkingNumber:string = 
		"73167176531330624919225119674426574742355349194934" +
		"96983520312774506326239578318016984801869478851843" +
		"85861560789112949495459501737958331952853208805511" +
		"12540698747158523863050715693290963295227443043557" +
		"66896648950445244523161731856403098711121722383113" +
		"62229893423380308135336276614282806444486645238749" +
		"30358907296290491560440772390713810515859307960866" +
		"70172427121883998797908792274921901699720888093776" +
		"65727333001053367881220235421809751254540594752243" +
		"52584907711670556013604839586446706324415722155397" +
		"53697817977846174064955149290862569321978468622482" +
		"83972241375657056057490261407972968652414535100474" +
		"82166370484403199890008895243450658541227588666881" +
		"16427171479924442928230863465674813919123162824586" +
		"17866458359124566529476545682848912883142607690042" +
		"24219022671055626321111109370544217506941658960408" +
		"07198403850962455444362981230987879927244284909188" +
		"84580156166097919133875499200524063689912560717606" +
		"05886116467109405077541002256983155200055935729725" +
		"71636269561882670428252483600823257530420752963450";

		let product:number = 0;
		let greatestProduct:number = 0;
		let numbersForGreatestProduct:string;
		let numberOfMultipliers:number = 13;

		for (let i:number = 0; i <= checkingNumber.length - numberOfMultipliers - 1; i++) {
			product = Number(checkingNumber[i]);
			for (let j:number = 1; j<= numberOfMultipliers-1; j++ ) {
				product *= Number(checkingNumber[i + j]);
			}

			if (greatestProduct < product) {
				greatestProduct = product;

				numbersForGreatestProduct = checkingNumber[i] + " ";
				for (let j:number = 1; j<= numberOfMultipliers-1; j++ ) {
					numbersForGreatestProduct += checkingNumber[i+j] + " ";
				}
			}
		}
		this._consoleText += "множители = " +numbersForGreatestProduct + "\n";
		this._consoleText += greatestProduct;
	}

	///////////////////////////////// 7 /////////////////////////////////

	private euler9Function():void {
		this._consoleText += "Проект Эйлера. Задача 7:\n" +
		"Пифагорейский триплет - это набор из трех натуральных чисел a < b < c, для которых,\n" +
		"a² + b² = c²\n" +
		"Например, 3² + 4² = 9 + 16 = 25 = 5².\n" +
		"Существует ровно один пифагорейский триплет, для которого a + b + c = 1000.\n" +
		"Найдите abc.\n\n"
		this.eulerJakumo9();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo9():void {
		let searchA:number = 2;
		let searchB:number;
		let searchC:number = 0;
		let inputText = prompt('Сумма чисел «Пифагорейского Триплета»', "1000");
		let maximumValue = Number(inputText);
		let hasASolution:boolean = false;

		for (searchA; searchA<maximumValue; searchA++) {
			for (let i:number = 0; i < maximumValue - searchA; i++) {
				searchB = searchA + i;
				let sumOfTheSquares = Math.pow(searchA, 2) + Math.pow(searchB, 2);
				searchC = searchC = Math.sqrt(sumOfTheSquares);
				if ((searchA + searchB + searchC) ==  maximumValue) {
					hasASolution = true;
					this._consoleText += searchA + "² + ";
					this._consoleText += searchB + "² = ";
					this._consoleText += sumOfTheSquares + "\n";
					this._consoleText += "√" + sumOfTheSquares + " = " + searchC + "\n";
					this._consoleText += "«Пифагорейский триплет» = " + searchA + " < " + searchB + " < " + searchC + "\n";
					this._consoleText += searchA + " + " + searchB + " + " + searchC + " = " + (searchA + searchB + searchC) + "\n\n";
				}
			}
		}
		if (hasASolution == false) {
			this._consoleText += "«Пифагорейский триплет» с данной суммой не найден.";
		}
	}
}

interface IBlock {
	name:string;
	children:IBlock[];
}
