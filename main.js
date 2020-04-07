const pageScroller = new PageScroller('page-container');
pageScroller.set({
	easing: {
		type: "all",
		function: "easeOutCirc",
	}
});

pageScroller.set({
	actionOn: {
		pageIndex: "1",
		action: () => {
			console.log('dddd')
		}
	}
});

pageScroller.set({reset: "true"})
