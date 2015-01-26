jQuery(window).load(function(){

		var resize = false;
		var close = true;
		var classNames = [
		"titlebar"
		];

		jQuery(document).mousedown(function(e){
		if($(e.target).parents(".titlebar").length > 0){
			resize = true;
			close = true;
			var closeTimeout = setTimeout(function(){
				close = false;
			},200);
			var clickedCords = e.pageY - $(e.target).offset().top;
			var currentTarget = e.target;
			var parent = $(currentTarget).closest(".fbNubFlyout");
			var chatWindow = $(parent).find(".fbNubFlyoutBody");
			var minHeight = 230;
			var textarea = $(parent).find(".uiTextareaAutogrow");
			var textareaHeight = $(textarea).height();
			var textareaContainer = $(textarea).parent();
			var paddingTop = parseInt($(textareaContainer).css("padding-top").replace(/px/,""));
			var paddingBottom = parseInt($(textareaContainer).css("padding-bottom").replace(/px/,""));
			var textareaContainerHeight = textareaHeight + paddingTop + paddingBottom;

			$(".titlebar").css({
				'-webkit-user-select': 'none',
				'-moz-user-select': 'none',
				'-ms-user-select': 'none',
				'-o-user-select': 'none',
				'user-select': 'none',
				'cursor': 'ns-resize'
			});


			var innerMaxHeight = parseInt($(parent).css("max-height").replace(/px/,""));
			innerMaxHeight = innerMaxHeight - textareaContainerHeight - 27;



			jQuery(document).mousemove(function(e){
				if(resize){



					var Y = $(window).height() - (e.pageY - document.getElementsByTagName("body")[0].scrollTop);

					var height = Y + clickedCords;

					if(height < minHeight){
						height = minHeight;
					}

					var innerHeight = height - textareaContainerHeight - 27;

					if(innerHeight > innerMaxHeight){
						innerHeight = innerMaxHeight;
					}

					$(parent).height(height);

					
					$(chatWindow).height(innerHeight);

					$(textarea).height(textareaHeight);


					
				}
				
			});

				jQuery(document).mouseup(function(){
					resize = false;
					clearTimeout(closeTimeout);
					var parentOpened = $(parent).closest(".fbNub");
					if(!close){
						setTimeout(function(){
							$(parentOpened).addClass("opened");
						},1);
					}
					else if(close){
						setTimeout(function(){
							$(parentOpened).removeClass("opened");
						},1);
					}

					close = true;

					$(".titlebar").css({
						'-webkit-user-select': 'text',
						'-moz-user-select': 'text',
						'-ms-user-select': 'text',
						'-o-user-select': 'text',
						'user-select': 'text',
						'cursor': 'pointer'
					});

					$(document).off("mouseup");
				});
			}
		});
});