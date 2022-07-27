import { TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Button extends Container {
    private _button:PIXI.Graphics
    private _textStyle:TextStyle;
    public buttonHenght:number = 100;
    private readonly _clickCallback:()=>void;
    public buttonName:string;
    private readonly _buttonWidth:number = 150;
    private readonly _buttonHeight:number = 40;

	constructor(
            buttonName:string,
            clickCallback:()=>void = null,
        ){

		super();
        this._clickCallback = clickCallback;
        this.buttonName = buttonName;
        this.interactive = true;
        this.buttonMode = true;

        this._button = new PIXI.Graphics;
        this._button
            .lineStyle(1, 0x000000, 1, 0)
            .beginFill(0x228866)
            .drawRect(0, 0, this._buttonWidth, this._buttonHeight);
        this.addChild(this._button);

        this._textStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['#000000'],
        });

        const buttonText:PIXI.Text = new PIXI.Text (buttonName, this._textStyle);
        buttonText.x = (this._button.width - buttonText.width)/2;
        buttonText.y = (this._button.height - buttonText.height)/2;
        this._button.addChild(buttonText);

        if (clickCallback) {
			this.addListener('pointertap', this.pointerTabHandler, this);
		}
	}

    private pointerTabHandler():void {
		this._clickCallback();
	}
}