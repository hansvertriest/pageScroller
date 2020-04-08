const pageScroller = new PageScroller('page-container', 200);
pageScroller.set({
	easing: {
		type: "all",
		function: "easeOutQuart",
	},
	actionOn: {
		pageIndex: "1",
		action: () => {
			console.log('This could be an animation.')
		}
	},
	reset: 'true',
	dragTreshold: 0.2,
});