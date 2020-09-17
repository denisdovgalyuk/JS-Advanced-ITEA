const list_group = document.getElementsByClassName('list-group');

function firstElement() {
	list_group[0].children[0].classList.add('active');
	list_group[0].children[0].classList.remove('bg-dark');

	for (var i = 1; i < list_group[0].children.length; i++) {
		list_group[0].children[i].classList.remove('active');
		list_group[0].children[i].classList.add('bg-dark');
	}
}

function lastElement() {
	const last_element = list_group[0].children[list_group[0].children.length - 1];
	last_element.classList.add('active');
	last_element.classList.remove('bg-dark');

	for (var i = 0; i < list_group[0].children.length - 1; i++) {
		list_group[0].children[i].classList.remove('active');
		list_group[0].children[i].classList.add('bg-dark');
	}
}

function nextElement() {
	const active_item = document.getElementsByClassName('active');
	const last_element = list_group[0].children[list_group[0].children.length - 1];

		if (!active_item.length) {
			list_group[0].children[0].classList.add('active');
			list_group[0].children[0].classList.remove('bg-dark');
		} else if (last_element === active_item[0]) {
				active_item[0].classList.add('bg-dark');
				active_item[0].classList.remove('active');

				list_group[0].children[0].classList.add('active');
				list_group[0].children[0].classList.remove('bg-dark');
			} else {
				active_item[0].nextElementSibling.classList.remove('bg-dark');
				active_item[0].nextElementSibling.classList.add('active');
	
				active_item[0].classList.add('bg-dark');
				active_item[0].classList.remove('active');
			}
			
}

function prevElement() {
	const active_item = document.getElementsByClassName('active');
	const first_element = list_group[0].children;

	if (!active_item.length) {
		list_group[0].children[0].classList.add('active');
		list_group[0].children[0].classList.remove('bg-dark');
	} else if (first_element[0] === active_item[0]) {
		first_element[first_element.length - 1].classList.remove('bg-dark');
		first_element[first_element.length - 1].classList.add('active');

		active_item[0].classList.add('bg-dark');
		active_item[0].classList.remove('active');
	} else {
		active_item[0].previousElementSibling.classList.remove('bg-dark');
		active_item[0].previousElementSibling.classList.add('active');

		active_item[0].nextElementSibling.classList.add('bg-dark');
		active_item[0].nextElementSibling.classList.remove('active');
	}

}

function addElement() {
	const list_group_item = document.createElement('li');

	list_group_item.classList = 'list-group-item bg-dark';
	list_group_item.textContent = 'New Item';
	
	list_group[0].appendChild(list_group_item);
}

function removeElement() {
	const list_group_item = list_group[0].children;
	const active_item = document.getElementsByClassName('active');

	(active_item.length) ? active_item[0].remove() : list_group_item[list_group_item.length - 1].remove()	
}

function addFirstElement() {
	const list_group_item = document.createElement('li');

	list_group_item.classList = 'list-group-item bg-dark';
	list_group_item.textContent = 'New Item';
	list_group[0].prepend(list_group_item);
}