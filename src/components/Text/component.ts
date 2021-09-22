import { Text, TextStyle } from '../../adapter';
import { Component } from '../../core';

export class TextComponent extends Component {
	public static componentName = 'TextComponent';

	private _text: Text;

	public get style() {
		return this._text.style as TextStyle;
	}

	public set style(val: TextStyle) {
		this._text.style = val;
	}

	public get text() {
		return this._text.text;
	}

	public set text(val: string) {
		this._text.text = val;
	}

	public constructor() {
		super();
		this._text = new Text('');
	}
}
