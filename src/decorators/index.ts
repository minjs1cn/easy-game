import { Component } from '../component';

function Class(name: string) {
	return function (C: typeof Component) {
		C.prototype.componentName = name;
	};
}

const cc = {
	Class,
};

export default cc;
