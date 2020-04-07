Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

class PageScroller {
	constructor (PageScrollerId, minScreenHeight) {
		this.pageScrollerContainer = document.getElementById(PageScrollerId);
		this.pages = [...this.pageScrollerContainer.childNodes].filter((node) => node.nodeName === 'SECTION');

		this.currentIndex = 0;
		this.maxIndex = this.pages.length;

		this.defaultEasingFunction = 'easeOutQuad';
		this.customSetEasingFunctionsDown = [];
		this.customSetEasingFunctionsUp = [];
		this.setEasingFunctions();

		this.pageFunctions = [];
		this.setPageFunctions();

		this.scrolling = false;
		this.scrollDuration = 650;

		this.setPageStyling();

		window.onresize = () => {
			if (minScreenHeight < window.innerHeight) {
				this.setPageStyling();
			} else {
				document.body.style.margin = '0';
				document.body.style.overflow = 'visible';
				this.pages.forEach((page) => {
					page.style.height = `${minScreenHeight}px`;
					page.style.width = '100vw';
				});
			}
		};

		document.addEventListener('wheel', (ev) =>{
			if (minScreenHeight < window.innerHeight) {
				ev.preventDefault();
				let easingFunction; 
				if (this.scrolling === false) {
					if (this.checkScrollDirection(ev)) { // up
						easingFunction = this.customSetEasingFunctionsUp[this.currentIndex] || this.defaultEasingFunction;
						if (this.currentIndex > 0 ) this.currentIndex -= 1;
					} else { // down
						easingFunction = this.customSetEasingFunctionsDown[this.currentIndex] || this.defaultEasingFunction;
						if (this.currentIndex < this.maxIndex - 1) this.currentIndex += 1;
					}
					this.scrollToElement(this.pages[this.currentIndex], this.scrollDuration, easingFunction);
				}
			}
		})

	}

	scrollToElement(element, duration, easingFunction) { 
		this.scrolling = true;
		const elementY = element.offsetTop;
		const startingY = window.pageYOffset;
		const deltaY = elementY - startingY;
		let start;
	  
		const animation = new Promise((resolve) => {
			window.requestAnimationFrame(function step(timestamp) {
				if (!start) start = timestamp;
				const elapsed = timestamp - start;
				const nextPoint = easingFunctions[easingFunction](elapsed, startingY, deltaY, duration);
				window.scrollTo(0, nextPoint);
				if (elapsed < duration) {
					window.requestAnimationFrame(step);
				} else {
					resolve();
				}
			})
		}).then(() => {
			this.scrolling = false;
			if (this.pageFunctions[this.currentIndex]) this.pageFunctions[this.currentIndex]();
		})
	  }

	setPageStyling() {
		document.body.style.margin = '0';
		document.body.style.overflow = 'hidden';
		this.pages.forEach((page) => {
			page.style.height = '100vh';
			page.style.width = '100vw';
		
		// Only for testing
		// 	page.style.backgroundColor = 'red';
		// 	page.style.border = '2px solid blue';
		});
	}

	setEasingFunctions() {
		this.pages.forEach((page) => this.customSetEasingFunctionsUp.push(undefined) );
		this.pages.forEach((page) => this.customSetEasingFunctionsDown.push(undefined) );
	}

	setPageFunctions() {
		this.pages.forEach((page) => this.pageFunctions.push(undefined) );
	}

	checkScrollDirection(event) {
		if (event.wheelDelta) {
			return event.wheelDelta > 0;
		}
		return event.deltaY < 0;
	}

	set(props) {
		if (props.easing) {
			if (props.easing.type === '1') {
				this.customSetEasingFunctionsDown.insert(props.easing.from.toString(10), props.easing.function);
				this.customSetEasingFunctionsUp.insert(props.easing.to.toString(10), props.easing.function);
			} else if (props.easing.type = 'all') {
				this.customSetEasingFunctionsDown = this.customSetEasingFunctionsDown.map((func) => props.easing.function);
				this.customSetEasingFunctionsUp = this.customSetEasingFunctionsUp.map((func) => props.easing.function);
			}
		}
		if (props.actionOn) {
			this.pageFunctions.insert(props.actionOn.pageIndex.toString(10), props.actionOn.action);
		}
		if (props.actionAfter) {
			this.customSetEasingFunctionsDown.insert(props.easing.from.toString(10), props.easing.function);
			this.customSetEasingFunctionsUp.insert(props.easing.to.toString(10), props.easing.function);
		}

		if (props.reset === "true") {
			this.scrollToElement(this.pages[0], 0, 'linearTween')
		}
	}
}

class easingFunctions {	
	static linearTween(t, b, c, d) {
		return c*t/d + b;
	};

	static easeOutQuad(t, b, c, d) {
		t /= d;
		return -c * t*(t-2) + b;
	};

	static easeInOutQuad(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	static easeInCubic(t, b, c, d) {
		t /= d;
		return c*t*t*t + b;
	};

	static easeOutCubic(t, b, c, d) {
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	};

	static easeInOutCubic(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t + 2) + b;
	};

	static easeInQuart(t, b, c, d) {
		t /= d;
		return c*t*t*t*t + b;
	};

	static easeOutQuart(t, b, c, d) {
		t /= d;
		t--;
		return -c * (t*t*t*t - 1) + b;
	};

	static easeInOutQuart(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t*t + b;
		t -= 2;
		return -c/2 * (t*t*t*t - 2) + b;
	};

	static easeInQuint(t, b, c, d) {
		t /= d;
		return c*t*t*t*t*t + b;
	};

	static easeOutQuint(t, b, c, d) {
		t /= d;
		t--;
		return c*(t*t*t*t*t + 1) + b;
	};

	static easeInOutQuint(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t*t*t + 2) + b;
	};

	static easeInSine(t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	};
	
	static easeOutSine(t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	};

	static easeInOutSine(t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	};

	static easeInExpo(t, b, c, d) {
		return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
	};

	static easeOutExpo(t, b, c, d) {
		return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
	};
	
	static easeInOutExpo(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
		t--;
		return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
	};

	static easeInCirc (t, b, c, d) {
		t /= d;
		return -c * (Math.sqrt(1 - t*t) - 1) + b;
	};

	static easeOutCirc(t, b, c, d) {
		t /= d;
		t--;
		return c * Math.sqrt(1 - t*t) + b;
	};

	static easeInOutCirc(t, b, c, d) {
		t /= d/2;
		if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		t -= 2;
		return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
	};
}
