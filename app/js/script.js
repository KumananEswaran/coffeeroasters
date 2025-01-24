// Hamburger Menu
const nav = document.querySelector('.topnav__links');
const navToggle = document.querySelector('.topnav__mobile-toggle');

navToggle.addEventListener('click', () => {
	const visibility = nav.getAttribute('data-visible');
	const body = document.querySelector('body');
	if (visibility === 'false') {
		nav.setAttribute('data-visible', true);
		navToggle.setAttribute('aria-expanded', true);
		body.style.overflowY = 'hidden';
	} else {
		nav.setAttribute('data-visible', false);
		navToggle.setAttribute('aria-expanded', false);
	}
});

// Creating plan

// Toggle when click the question
const options = document.querySelectorAll('.order__options');
const titles = document.querySelectorAll('.order__title-text');

titles.forEach((title, index) => {
	title.addEventListener('click', function () {
		options[index].classList.toggle('hide');
	});
});

// Toggle when click the side bar
const types = document.querySelectorAll('.order__type');
const items = document.querySelectorAll('.order__item');

types.forEach((type, index) => {
	type.addEventListener('click', function () {
		const options = items[index].querySelector('.order__options');
		options.classList.toggle('hide');
		type.classList.toggle('active');
	});
});

// Store selected options
const selectedOptions = {
	preference: '_____',
	beanType: '_____',
	quantity: '_____',
	grind: '_____',
	delivery: '_____',
};

// Helper function to update summary text
function updateSummaryText() {
	const summaryContent = document.querySelector('.summary__content');
	const isCapsule = selectedOptions.preference === 'Capsule';

	if (isCapsule) {
		summaryContent.innerHTML = `"I drink my coffee as <span>${selectedOptions.preference}</span>, with a <span>${selectedOptions.beanType}</span>. <span>${selectedOptions.quantity}</span>, sent to me <span>${selectedOptions.delivery}</span>."`;
	} else {
		summaryContent.innerHTML = `"I drink my coffee as <span>${selectedOptions.preference}</span>, with a <span>${selectedOptions.beanType}</span>. <span>${selectedOptions.quantity}</span> ground ala <span>${selectedOptions.grind}</span>, sent to me <span>${selectedOptions.delivery}</span>."`;
	}
}

// Helper function to check if order summary is complete
function isOrderSummaryComplete() {
	const isCapsule = selectedOptions.preference === 'Capsule';

	if (isCapsule) {
		return (
			selectedOptions.preference !== '_____' &&
			selectedOptions.beanType !== '_____' &&
			selectedOptions.quantity !== '_____' &&
			selectedOptions.delivery !== '_____'
		);
	} else {
		return (
			selectedOptions.preference !== '_____' &&
			selectedOptions.beanType !== '_____' &&
			selectedOptions.quantity !== '_____' &&
			selectedOptions.grind !== '_____' &&
			selectedOptions.delivery !== '_____'
		);
	}
}

// Handle capsule selection and grind options
function handleCapsuleSelection(selectedHeader) {
	const grindSection = document.querySelector('.capsule-selected');

	if (selectedHeader === 'Capsule') {
		grindSection.style.opacity = '0.5';
		grindSection.style.pointerEvents = 'none';
		selectedOptions.grind = '_____';
	} else {
		grindSection.style.opacity = '1';
		grindSection.style.pointerEvents = 'auto';
	}

	updateSummaryText();
}

// Place the selected options into the order summary
document.querySelectorAll('.order__text').forEach((orderText) => {
	orderText.addEventListener('click', function () {
		const selectedHeader = this.querySelector('.order__header').textContent;
		const parentOrderItem = this.closest('.order__item');

		// Remove active class from siblings
		parentOrderItem.querySelectorAll('.order__text').forEach((sibling) => {
			sibling.classList.remove('active');
		});

		// Add active class to clicked option
		this.classList.add('active');

		// Update selected options based on the index
		const parentIndex = Array.from(
			parentOrderItem.parentElement.children
		).indexOf(parentOrderItem);

		switch (parentIndex) {
			case 0:
				selectedOptions.preference = selectedHeader;
				break;
			case 1:
				selectedOptions.beanType = selectedHeader;
				break;
			case 2:
				selectedOptions.quantity = selectedHeader;
				break;
			case 3:
				selectedOptions.grind = selectedHeader;
				break;
			case 4:
				selectedOptions.delivery = selectedHeader;
				break;
		}

		// Handle capsule selection
		if (
			this.dataset.option === 'capsule' ||
			parentOrderItem.querySelector('[data-option="capsule"]')
		) {
			handleCapsuleSelection(selectedHeader);
		} else {
			updateSummaryText();
		}

		// Check if summary is complete and update button state
		const createPlanButton = document.querySelector('.summary__button');
		const modal = document.querySelector('.modal');
		const modalContent = document.querySelector('.modal__content');
		const summaryContent = document.querySelector('.summary__content');
		const body = document.querySelector('body');
		if (isOrderSummaryComplete()) {
			createPlanButton.classList.remove('disabled');
			createPlanButton.addEventListener('click', () => {
				modal.style.display = 'block';
				modalContent.innerHTML = summaryContent.innerHTML;
				body.style.overflowY = 'hidden';
			});
		} else {
			createPlanButton.classList.add('disabled');
		}
	});
});
