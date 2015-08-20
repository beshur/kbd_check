var fields = $(".form input"),
    btnSuccess = $(".click_finish"),
    btnRestart = $(".click_restart"),
    data = {values: [], score: 0, phrase: "", old_phrase: ""};


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
	if (data.phrase != "") {
		data.old_phrase = data.phrase;
	}
	data.values = [];
	data.score = 0;
	data.phrase = passGen();

	$(".form .check").text(data.phrase);
}

function checkFields(e) {
	e.preventDefault();

	if ($(e.currentTarget).hasClass("disabled")) return;

	resetData();
	$(".revealed h3").show();
	$(".revealed .in").fadeIn("fast")
		.find(".revealed-list").html("");

	$(".revealed .old_phrase").text(data.old_phrase);

	fields.each(function(i) {
		var value = $(this).val();
		var check = prepareResult(value);
		data.values.push(check);
		data.score += check.score;

		var newHint = $('<div>' + check.html + '</div>');
		$(".revealed-list").append(newHint);

		$(this).val("");

		if (i == fields.length - 1) {
			data.score = Math.floor(data.score / fields.length);

			$(".revealed .check").text(data.score + "%");
		}

	});

	btnSuccess.addClass("disabled");


	function prepareResult(item) {
		var i = 0,
			wrong_start = false,
			true_start = false,
			score = 0,
			html = "";

		while(item[i]) {
			if (item[i] == data.old_phrase[i]) {
				if (wrong_start === true) {
					wrong_start = false;
					html += "</span>"
				}
				if (true_start === false) {
					true_start = true;
					html += "<span class='correct'>"
				}
				html += item[i];

				score++;
			} else {
				if (true_start === true) {
					true_start = false;
					html += "</span>"
				}
				if (wrong_start === false) {
					wrong_start = true;
					html += "<span class='incorrect'>"
				}

				html += item[i];

				score--;
			}

			i++;


		}

		console.log('qqq', score, item.length, data.old_phrase.length);
		score = score - (Math.abs(item.length - data.old_phrase.length));
		if (score < 0) {
			score = 0;
		} else {
			// to percent
			score = data.old_phrase.length / score * 100;
		}

		if (i === item.length) {
			html += "</span>";
			return {html: html, score: score};
		}

	}
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