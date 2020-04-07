# pageScroller
Alternative to fullpage.js

## Usage
Create a new pagescroller instance of a given container (container id) and a minimum screenheight for the effects to enable. This container should contain section-elements which will be the pages.
```javascript
const pageScroller = new PageScroller('page-container', 400);
```
Set properties:
* set easing function of all the page transitions
```javascript
pageScroller.set({
	easing: {
		type: "all",
		function: "easeOutCirc",
	}
});
```

* set easing function of one the page transitions
```javascript
pageScroller.set({
	easing: {
		from: "0",
    		to: "1",
		function: "easeOutCirc",
	}
});
```

* Define an action after transitioning to another page
```javascript
pageScroller.set({
	actionOn: {
		pageIndex: "1",
		action: () => {
			console.log('This could be an animation.')
		}
	}
});
```

* Enable window reset to first page after refresh
```javascript
pageScroller.set({
  reset: "true"
})
```
