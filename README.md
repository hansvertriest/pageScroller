# pageScroller
Alternative to fullpage.js
Demo: https://hansvertriest.github.io/pageScroller/

## Usage
Create a new pagescroller instance of a given container (container id) and a minimum screenheight for the effects to enable. This container should contain section-elements which will be the pages.
```javascript
const pageScroller = new PageScroller('page-container', 400);
```
Set properties:
* set easing function of all the page transitions
```javascript
pageScroller.set({
	easingForAll: {
		func: "easeOutQuart",
	},
});
```

* set easing function of one the page transitions
```javascript
pageScroller.set({
	easing: [
		{
			from: '0',
			to: '1',
			func: 'linearTween'
		},
		{
			from: '1',
			to: '2',
			func: 'easeInOutQuart',
		}
	],
});
```
Ommiting the 'to' property will apply the easing function when scrolling up and down from the page specified in 'from'.

* Define an action after transitioning to another page
```javascript
pageScroller.set({
	actionOn: [
		{
			pageIndex: "1",
			action: () => {
				console.log('This could be an animation happening on section 1.')
			},
		}
	],
});
```

* Enable window reset to first page after refresh
```javascript
pageScroller.set({
  reset: "true"
})
```

* When dragging the screen on mobile, set a percentage of the screenheight which is the treshold of when to go to the next screen or stay on the current one.
```javascript
pageScroller.set({
	dragTreshold: 0.2
})
```

* Adding an action when a transition start is as follows:
```javascript
pageScroller.set({
	whileTransitioning: [
		{
			from: '2',
			to: '1',
			callback: () => console.log('This happens while transitioning from section 2 to 1.'),
		}
	]
})
```
Ommiting the 'to' property will apply the transition when scrolling up and down from the page specified in 'from'.

* When you want to scroll to a specific page, like a menu or a to top button, do as follows:
```javascript
const toTopBtn = document.getElementById('to-top-btn');

toTopBtn.addEventListener('click', () => {
	pageScroller.scrollToPage(0);
});
```
Using a navigation for the pages is recommended as it allows the user to quickly scan the page without heving to wit for every animation.
