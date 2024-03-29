(function(){
	SG.Book = function() {}
	SG.Book.prototype = new SG.Publisher();
	SG.Book.prototype.parseDesc = function(){
		var markdownString = $('.book .desc').text();
		// 配置 marked 语法高亮
		marked = SG.markSettingNoHightlight();

		var contentHtml = marked(markdownString);
		contentHtml = SG.replaceCodeChar(contentHtml);

		$('.book .desc').html(contentHtml);
	}

	jQuery(document).ready(function($) {
		var IS_PREVIEW = false;
		$('.desc .preview').on('click', function(){
			// console.log(hljs.listLanguages());
			if (IS_PREVIEW) {
				$('.preview-div').hide();
				$('#desc').show();
				IS_PREVIEW = false;
			} else {
				var markdownString = $('#desc').val();
				// 配置 marked 语法高亮
				marked.setOptions({
					highlight: function (code) {
						code = code.replace(/&#34;/g, '"');
						code = code.replace(/&lt;/g, '<');
						code = code.replace(/&gt;/g, '>');
						return hljs.highlightAuto(code).value;
					}
				});

				$('#desc').hide();
				$('.preview-div').html(marked(markdownString)).show();
				IS_PREVIEW = true;
			}
		});

		// 发布图书
		$('#submit').on('click', function(evt){
			evt.preventDefault();
			var validator = $('.validate-form').validate();
			if (!validator.form()) {
				return false;
			}

			var book = new SG.Book()
			book.publish(this);
		});

		$(document).keypress(function(evt){
			if (evt.ctrlKey && (evt.which == 10 || evt.which == 13)) {
				$('#submit').click();
			}
		});
	});
}).call(this);