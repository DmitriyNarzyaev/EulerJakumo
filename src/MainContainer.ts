import Container = PIXI.Container;
import { Loader, Sprite } from "pixi.js";
import Button from "./Button";
import TextWindow from "./TextWindow";
import Global from "./Global";

export default class MainContainer extends Container {
	public static WIDTH:number = 1200;
	public static HEIGHT:number = 600;
	private readonly _windowWidth:number = MainContainer.WIDTH - MainContainer.WIDTH/3;
	private readonly _windowHeight:number = MainContainer.HEIGHT;
	private _background:PIXI.Graphics;
	private _json:IBlock
	private _textWindow:TextWindow;
	private _textHighlighter:PIXI.Graphics;
	private _consoleText:string = "";
	private _loaderSwitcher:number = 0;

	constructor() {
		super();
		this.jsonLoader();
		this.pictureLoader();
	}

	private jsonLoader():void {
		const xhr:XMLHttpRequest = new XMLHttpRequest();
		xhr.responseType = "json";
		xhr.open("GET", "test.json", true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					this._json = xhr.response;
					this._loaderSwitcher ++;
					if (this._loaderSwitcher == 2) {
						this.initialComplete();
					}
				} else {
					console.log("JSON ERROR");
				}
			}
		};
		xhr.send();
	}

	private pictureLoader():void {
		const loader:Loader = new Loader();
		//loader.add("background", "background.jpg");
		loader.add("pic1", "1.png");
		loader.add("pic2", "2.png");
		loader.load((loader, resources)=> {
			this._loaderSwitcher ++;
			if (this._loaderSwitcher == 2) {
				this.initialComplete();
			}
		});
		loader.load();
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
		let maxButtonsOnColumn:number = 12;
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

		let button12:Button = new Button("Euler-10", () => {this.euler10Function();},);
		this.addChild(button12);
		buttons.push(button12);

		let button13:Button = new Button("Euler-11", () => {this.euler11Function();},);
		this.addChild(button13);
		buttons.push(button13);

		let button14:Button = new Button("Fractal", () => {this.triangleFunction();},);
		this.addChild(button14);
		buttons.push(button14);

		let button15:Button = new Button("Images", () => {this.imagesChangingFunction();},);
		this.addChild(button15);
		buttons.push(button15);

		for (let i:number = 0; i < buttons.length; i++) {
			buttons[i].x = indentX;
			buttons[i].y = indentY;
			indentY += buttons[i].height + gap;
			if ((i+1) % maxButtonsOnColumn == 0) {
				indentX += buttons[i].width + gap;
				indentY = 10;
			}
		}
	}

	private initTextWindow(text:string):void {
		this.removeWindow();
		this._consoleText = "";
		this._textWindow = new TextWindow(text, this._windowWidth, this._windowHeight, 0x000000);
		this._textWindow.x = MainContainer.WIDTH - this._windowWidth;
		this.addChild(this._textWindow);
	}

	private removeWindow():void {
		if (this._textWindow) {
			this.removeChild(this._textWindow);
		}
		if (this._textHighlighter) {
			this.removeChild(this._textHighlighter);
		}
		if (this._temporaryContainer) {
			this.removeChild(this._temporaryContainer);
		}
		clearInterval(this._interval);
		Global.PIXI_APP.ticker.remove(this.ticker, this);
	}

	private initTextHighlighter():void {
		this._textHighlighter = new PIXI.Graphics;
		this._textHighlighter
			.beginFill(0xff0000, .5) 
			.drawRect(0, 0, 20, 20)
			.endFill()
			.beginFill(0xff0000, .5) 
			.drawRect(26, 15, 20, 20)
			.endFill()
			.beginFill(0xff0000, .5) 
			.drawRect(53, 30, 20, 20)
			.endFill()
			.beginFill(0xff0000, .5) 
			.drawRect(79, 45, 20, 20);
		this.addChild(this._textHighlighter);
		this._textHighlighter.x = 620;
		this._textHighlighter.y = 142;
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

	///////////////////////////////// 9 /////////////////////////////////

	private euler9Function():void {
		this._consoleText += "Проект Эйлера. Задача 9:\n" +
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

	///////////////////////////////// 9 /////////////////////////////////

	private euler10Function():void {
		this._consoleText += "Проект Эйлера. Задача 10:\n" +
		"Сумма простых чисел ниже 10 равна 2 + 3 + 5 + 7 = 17.\n" +
		"Найдите сумму всех простых чисел, меньших двух миллионов.\n\n"
		this.eulerJakumo10();
		this.initTextWindow(this._consoleText);
	}

	private eulerJakumo10():void {
		let maximumValue:number = 2000000;
		let simpleNumberSum:number = 0;
		for (let i:number = 1; i < maximumValue; i++) {
			if (this.simpleNumberChecking(i)) {
				simpleNumberSum += i;
			}
		}
		this._consoleText += simpleNumberSum;
	}

	/////////////////////////////// 9 /////////////////////////////////

	private euler11Function():void {
		this._consoleText += "Проект Эйлера. Задача 11:\n" +
		"В приведенной ниже сетке 20x20 четыре числа вдоль диагональной линии отмечены красным.\n\n" +
		"08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08\n" +
		"49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00\n" +
		"81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65\n" +
		"52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91\n" +
		"22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80\n" +
		"24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50\n" +
		"32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70\n" +
		"67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21\n" +
		"24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72\n" +
		"21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95\n" +
		"78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92\n" +
		"16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57\n" +
		"86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58\n" +
		"19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40\n" +
		"04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66\n" +
		"88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69\n" +
		"04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36\n" +
		"20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16\n" +
		"20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54\n" +
		"01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48\n\n" +
		"Произведение этих чисел равно 26 x 63 x 78 x 14 = 1788696.\n" +
		"Каково наибольшее произведение четырех соседних чисел в одном направлении\n" +
		"(вверх, вниз, влево, вправо или по диагонали) в сетке 20 x 20?\n\n"
		this.eulerJakumo11();
		this.initTextWindow(this._consoleText);
		this.initTextHighlighter();
	}

	private eulerJakumo11():void {
		let numberToCheck:number[][] = [];
	 	let line1:number[] = [8, 2, 22, 97, 38, 15, 0, 40, 0, 75, 4, 5, 7, 78, 52, 12, 50, 77, 91, 8];
	 	numberToCheck.push(line1);
	 	let line2:number[] = [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 4, 56, 62, 0];
	 	numberToCheck.push(line2);
	 	let line3:number[] = [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 3, 49, 13, 36, 65];
	 	numberToCheck.push(line3);
	 	let line4:number[] = [52, 70, 95, 23, 4, 60, 11, 42, 69, 24, 68, 56, 1, 32, 56, 71, 37, 2, 36, 91];
	 	numberToCheck.push(line4);
	 	let line5:number[] = [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80];
	 	numberToCheck.push(line5);
	 	let line6:number[] = [24, 47, 32, 60, 99, 3, 45, 2, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50];
	 	numberToCheck.push(line6);
	 	let line7:number[] = [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70];
	 	numberToCheck.push(line7);
		let line8:number[] = [67, 26, 20, 68, 2, 62, 12, 20, 95, 63, 94, 39, 63, 8, 40, 91, 66, 49, 94, 21];
	 	numberToCheck.push(line8);
	 	let line9:number[] = [24, 55, 58, 5, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72];
	 	numberToCheck.push(line9);
	 	let line10:number[] = [21, 36, 23, 9, 75, 0, 76, 44, 20, 45, 35, 14, 0, 61, 33, 97, 34, 31, 33, 95];
	 	numberToCheck.push(line10);
	 	let line11:number[] = [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 3, 80, 4, 62, 16, 14, 9, 53, 56, 92];
	 	numberToCheck.push(line11);
	 	let line12:number[] = [16, 39, 5, 42, 96, 35, 31, 47, 55, 58, 88, 24, 0, 17, 54, 24, 36, 29, 85, 57];
	 	numberToCheck.push(line12);
	 	let line13:number[] = [86, 56, 0, 48, 35, 71, 89, 7, 5, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58];
	 	numberToCheck.push(line13);
	 	let line14:number[] = [19, 80, 81, 68, 5, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 4, 89, 55, 40];
	 	numberToCheck.push(line14);
	 	let line15:number[] = [4, 52, 8, 83, 97, 35, 99, 16, 7, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66];
	 	numberToCheck.push(line15);
	 	let line16:number[] = [88, 36, 68, 87, 57, 62, 20, 72, 3, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69];
	 	numberToCheck.push(line16);
	 	let line17:number[] = [4, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 8, 46, 29, 32, 40, 62, 76, 36];
	 	numberToCheck.push(line17);
	 	let line18:number[] = [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 4, 36, 16];
	 	numberToCheck.push(line18);
	 	let line19:number[] = [20, 73, 35, 29, 78, 31, 90, 1, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 5, 54];
	 	numberToCheck.push(line19);
	 	let line20:number[] = [1, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 1, 89, 19, 67, 48];
	 	numberToCheck.push(line20);
	
		let greatestLine:number = this.searchGreatestLineWork(numberToCheck);
		console.log("max line - " + greatestLine);

		let greatestColumn:number = this.searchGreatestColumnWork(numberToCheck);
		console.log("max column - " + greatestColumn);

		let greatestDiagLUtoRD:number = this.searchGreatestDiagLUtoRD(numberToCheck);
		console.log("max diag LUtoRD - " + greatestDiagLUtoRD);

		let greatestDiagLDtoRU:number = this.searchGreatestDiagLDtoRU(numberToCheck);
		console.log("max diag LDtoRU - " + greatestDiagLDtoRU);

		let solvingTheProblem:number = Math.max(greatestLine, greatestColumn, greatestDiagLUtoRD,greatestDiagLDtoRU);
		this._consoleText += solvingTheProblem;
	}

	private searchGreatestLineWork(array:number[][]):number {
		let greatestLine:number = 0;
		for (let i:number = 0; i< array.length; i++) {
			for (let j:number = 0; j<= array[i].length-3; j++) {
				let searchLine:number = array[i][j] * array[i][j+1] * array[i][j+2] * array[i][j+3];
				if (searchLine > greatestLine) {
					greatestLine = searchLine;
				}
			}
		}
		return greatestLine
	}

	private searchGreatestColumnWork(array:number[][]):number {
		let greatestColumn:number = 0;
		for (let i:number = 0; i< array.length - 3; i++) {
			for (let j:number = 0; j<= array[i].length; j++) {
				let searchLine:number = array[i][j] * array[i+1][j] * array[i+2][j] * array[i+3][j];
				if (searchLine > greatestColumn) {
					greatestColumn = searchLine;
				}
			}
		}
		return greatestColumn
	}

	private searchGreatestDiagLUtoRD(array:number[][]):number{
		let greatestDiag:number = 0;
		for (let i:number = 0; i< array.length-3; i++) {
			for (let j:number = 0; j<= array[i].length-3; j++) {
				let searchLine:number = array[i][j] * array[i+1][j+1] * array[i+2][j+2] * array[i+3][j+3];
				if (searchLine > greatestDiag) {
					greatestDiag = searchLine;
				}
			}
		}
		return greatestDiag
	}

	private searchGreatestDiagLDtoRU(array:number[][]):number{
		let greatestDiag:number = 0;
		for (let i:number = 3; i< array.length; i++) {
			for (let j:number = 0; j<= array[i].length-3; j++) {
				let searchLine:number = array[i][j] * array[i-1][j+1] * array[i-2][j+2] * array[i-3][j+3];
				if (searchLine > greatestDiag) {
					greatestDiag = searchLine;
				}
			}
		}
		return greatestDiag
	}

	

	///////////////////////////////// 9 /////////////////////////////////

	private triangleFunction():void {
		this._consoleText += "Построение Треугольника Серпинского:\n" +
		"При каждой итерации, рандомно создается новая точка на\n" +
		"половине расстояния от предыдущей точки к одной из вершин.\n"
		"Первая точка создается в рандомном месте на поле.\n\n"
		this.initTextWindow(this._consoleText);
		this.addedSierpinskiTriangle();
	}

	private _temporaryContainer:PIXI.Container
	private _pointRandomizer:number = 1 + Math.floor(Math.random()*3);

	private addedTemporaryContainer():void {
		this._temporaryContainer = new PIXI.Container;
		this._temporaryContainer.x = MainContainer.WIDTH - this._windowWidth;
		this.addChild(this._temporaryContainer);
	}

	private addedSierpinskiTriangle():void {
		this.addedTemporaryContainer();
		this.addedTrianglePoints();
	}

	private _point1:PIXI.Graphics;
	private _point2:PIXI.Graphics;
	private _point3:PIXI.Graphics;
	private _tracepointX:number = Math.random() * this._windowWidth;
	private _tracepointY:number = Math.random() * this._windowHeight;
	private _interval:any;
	private addedTrianglePoints():void {
		const pointSize:number = 3;

		let point1x:number = (this._windowWidth/3) + (Math.random() * this._windowWidth/3);
		let point1y:number = Math.random() * (this._windowHeight / 2.5);
		this._point1 = new PIXI.Graphics;
		this._point1
			.beginFill(0x00ff00)
			.drawCircle(0, 0, pointSize);
		this._point1.x = point1x;
		this._point1.y = point1y;
		this._temporaryContainer.addChild(this._point1);

		let point2x:number = Math.random() * this._windowWidth/3;
		let point2y:number = (this._windowHeight/3) * 2 + (Math.random() * this._windowHeight/3);
		this._point2 = new PIXI.Graphics;
		this._point2
			.beginFill(0x00ff00)
			.drawCircle(0, 0, pointSize);
		this._point2.x = point2x;
		this._point2.y = point2y;
		this._temporaryContainer.addChild(this._point2);

		let point3x:number = (this._windowWidth/3) * 2 + (Math.random() * this._windowWidth/3);
		let point3y:number = (this._windowHeight/3) * 2 + (Math.random() * this._windowHeight/3);
		this._point3 = new PIXI.Graphics;
		this._point3
			.beginFill(0x00ff00)
			.drawCircle(0, 0, pointSize);
		this._point3.x = point3x;
		this._point3.y = point3y;
		this._temporaryContainer.addChild(this._point3);

		let tracepoint:PIXI.Graphics = new PIXI.Graphics;
		tracepoint
			.beginFill(0xffffff)
			.drawCircle(0, 0, pointSize)
			.endFill;
		tracepoint.x = this._tracepointX;
		tracepoint.y = this._tracepointY;
		this._temporaryContainer.addChild(tracepoint);

		this._interval = setInterval(() => {
			this.addedTracePoint()
		}, 150);
		this._interval
	}

	private _tracepoint:PIXI.Graphics;
	private addedTracePoint():void {
		this._pointRandomizer = 1 + Math.floor(Math.random()*3);

		let tracepointx:number;
		let tracepointy:number;
		if (this._pointRandomizer == 1) {
			tracepointx = (this._tracepointX + this._point1.x) / 2;
			tracepointy = (this._tracepointY + this._point1.y) / 2;
		} else if (this._pointRandomizer == 2) {
			tracepointx = (this._tracepointX + this._point2.x) / 2;
			tracepointy = (this._tracepointY + this._point2.y) / 2;
		} else if (this._pointRandomizer == 3) {
			tracepointx = (this._tracepointX + this._point3.x) / 2;
			tracepointy = (this._tracepointY + this._point3.y) / 2;
		}

		const pointSize:number = 3; 
		this._tracepoint = new PIXI.Graphics;
		this._tracepoint
			.beginFill(0xffffff)
			.drawCircle(0, 0, pointSize)
		this._tracepoint.x = tracepointx;
		this._tracepoint.y = tracepointy;
		this._temporaryContainer.addChild(this._tracepoint);

		this._tracepointX = tracepointx;
		this._tracepointY = tracepointy;
	}

	///////////////////////////////// 9 /////////////////////////////////

	private imagesChangingFunction():void {
		this._consoleText += "Меняющиеся изображения:\n" +
		"Первое изображение меняется на чёрный фон, а затем на второе изображение.\n" +
		"Анимация происходит за заданное время.\n\n"
		this.initTextWindow(this._consoleText);
		this.imagesChanging();
	}
	
	private _pic1:Sprite;
	private _pic2:Sprite;
	private _blackSquare:PIXI.Graphics
	private _decreaseAlphaOnTick:number;

	private _startTime:number;
	private _stopTime:number;

	private imagesChanging() {
		this.addedTemporaryContainer();
		
		let inputText = prompt('Введите время анимации', "3");
		this._decreaseAlphaOnTick = 1/((60/2) * Number(inputText));
		const picSize:number = 250;
		const picX:number = MainContainer.WIDTH - this._windowWidth - picSize/2;
		const picY:number = (MainContainer.HEIGHT - picSize)/2;

		this._pic2 = Sprite.from("pic2");
		this._pic2.x = picX;
		this._pic2.y = picY;
		this._temporaryContainer.addChild(this._pic2);

		this._blackSquare = new PIXI.Graphics;
		this._blackSquare
			.beginFill(0x000000)
			.drawRect(0, 0, picSize, picSize);
		this._blackSquare.x = picX;
		this._blackSquare.y = picY;
		this._temporaryContainer.addChild(this._blackSquare);

		this._pic1 = Sprite.from("pic1");
		this._pic1.x = picX;
		this._pic1.y = picY;
		this._temporaryContainer.addChild(this._pic1);

		this._startTime = (new Date()).getTime();
		Global.PIXI_APP.ticker.add(this.ticker, this);
	}

	private ticker():void {
		console.log("шаг тикера");
		if (this._pic1.alpha > 0) {
			this._pic1.alpha -= this._decreaseAlphaOnTick;
		}
		else if(this._pic1.alpha <= 0 && this._blackSquare.alpha > 0) {
			this._blackSquare.alpha -= this._decreaseAlphaOnTick;
		}

		if (this._blackSquare.alpha <= 0) {
			this._stopTime = (new Date()).getTime();
			let timeDifference:number = (this._stopTime - this._startTime) / 1000;
			console.log("time = " + timeDifference);
			Global.PIXI_APP.ticker.remove(this.ticker, this);
		}
	}
}

interface IBlock {
	name:string;
	children:IBlock[];
}
