import Container = PIXI.Container;
import { TextStyle } from "pixi.js";

export default class TextWindow extends Container {

	constructor(text:string, width:number, height:number, fontColor:number) {
		super();
        this.initBackground(width, height);
        this.initText(text, fontColor);
	}

    private initBackground(width:number, height:number):void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background
            .beginFill(0x002244, .3)
            .lineStyle(1, 0xff3300, 1, 0)
            .drawRect(0, 0, width, height); 
        this.addChild(background);
    }

    private initText(text:string, fontColor:number):void {
        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'Consolas',
            fontSize: 16,
            fill: [fontColor],
        });

        const textGap:number = 10;
        const windowText:PIXI.Text = new PIXI.Text (text, textStyle);
        windowText.x = textGap;
        windowText.y = textGap;
        windowText.style.wordWrap = true;
        windowText.style.wordWrapWidth = this.width - textGap*2;
        this.addChild(windowText);
    }
}
