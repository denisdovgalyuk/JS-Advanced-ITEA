const name = document.querySelector('#name');
const email = document.querySelector('#email');
const zip = document.querySelector('#zip');

form.addEventListener('submit', onsubmitHandler);
name.addEventListener('change', validation);
email.addEventListener('change', validation);
zip.addEventListener('change', validation);

function validation(e) {
	styleValidation(e.target);
}

function styleValidation(element) {
	var pattern = new RegExp(element.pattern);
	element.className = pattern.test(element.value) ? 'valid' : 'invalid';
}

function submitValidation() {
  var patternName = new RegExp(name.pattern);
  var patternEmail = new RegExp(email.pattern);
	var patternZip = new RegExp(zip.pattern);
	
	return patternName.test(name.value) && patternEmail.test(email.value) && patternZip.test(zip.value);
} 

function onsubmitHandler(e) {
	e.preventDefault();
	const submitForm = e.target.elements;

	for (var i = 0; i < submitForm.length; i++) {
		if (submitForm[i].hasAttribute('pattern')) {
			styleValidation(submitForm[i]);
		}
	}

	submitValidation() ? e.target.submit() : alert("Допущены ошибки при заполнении формы.");
}