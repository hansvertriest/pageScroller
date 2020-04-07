const pageScroller = new PageScroller('page-container', 200);
pageScroller.set({
	easing: {
		type: "all",
		function: "easeOutQuart",
	}
});

pageScroller.set({
	actionOn: {
		pageIndex: "1",
		action: () => {
			console.log('This could be an animation.')
		}
	}
});


	pageScroller.set({reset: "true"})
