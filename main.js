const pageScroller = new PageScroller('page-container', 200);
pageScroller.set({
	easingForAll: {
		func: "easeOutQuart",
	},
	easing: [
		{
			from: '1',
			to: '0',
			func: 'linearTween'
		},
		{
			from: '2',
			// to: '2',
			func: 'easeInOutQuart',
		}
	],
	actionOn: [
		{
			pageIndex: "1",
			action: () => {
				console.log('This could be an animation happening on section 1.')
			},
		}
	],
	reset: 'true',
	dragTreshold: 0.2,
	whileTransitioning: [
		{
			from: '0',
			to: '1',
			callback: () => console.log('This happens while transitioning from section 1 to 0.'),
		},
		{
			from: '2',
			// to: '1',
			callback: () => console.log('This happens while transitioning from section 2.'),
		}
	]
});

const toTopBtn = document.getElementById('to-top-btn');

toTopBtn.addEventListener('click', () => {
	pageScroller.scrollToPage(0);
});