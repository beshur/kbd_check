var fields = $(".form .check_field input"),
    btnSuccess = $(".click_finish"),
    btnRestart = $(".click_restart"),
    data = {values: [], correctness: 0, phrase: ""};


btnSuccess.on("click", checkFields);
btnRestart.on("click", restartFields);


fields.on("keyup", function(e) {
	var count = 0;

	fields.each(function() {
		if ($(this).val() != "")
			count++;

		if (count == fields.length)
			btnSuccess.removeClass("disabled");
	})
});

function resetData() {
	data = {values: [], correctness: 0};
	data.phrase = passGen();

	$(".check").text(data.phrase);
}

function checkFields(e) {
	e.preventDefault();

	if ($(e.currentTarget).hasClass("disabled")) return;

	resetData();

	fields.each(function(i, el) {
		var obj = $(this);
		var value = obj.val();
		var newHint = $('<div class="col-md-6">' + value + '</div>');
		data.values.push(value);

		obj.closest("div").siblings("div")
			.text(value);

	});
}

function restartFields(e) {
	e.preventDefault();


	resetData();

	fields.each(function(i, el) {
		$(el).val("");

		$(el).closest("div").siblings("div")
			.text("");

	});

	btnSuccess.addClass("disabled");
}

window.onload = resetData();