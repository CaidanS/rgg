var active_notes = [];
function remove_highlights(){
	if (active_notes.length != 0) {
		// console.log(active_notes);
		for (var i = 0; i < active_notes.length; i++) {
			// active_notes[i].classList.remove('highlighted');
			active_notes[i].className = active_notes[i].className.replace(/\bh_[a-zA-Z]+\b/g,'')
		}
	}
}

function update_highlights(highlights_connected) {
	if (highlights_connected != '') {
		hack_to_find_h_color = highlights_connected.split(" ");
 		hcolor = hack_to_find_h_color[hack_to_find_h_color.length-1];
 		// console.log(hack_to_find_h_color);
		// getting rid of connected and replacing with '.' to make passable for 'OR' query selector
		highlights_connected = highlights_connected.split("connected_").join(".");
		// replacing spaces with commas to make passable for 'OR' query selector
		highlights = highlights_connected.split(" ").join(","); 
		spans_to_highlight = document.querySelectorAll(highlights);
		for (var i = 0; i < spans_to_highlight.length; i++) {
			
			spans_to_highlight[i].classList.add(hcolor);
		}
		

		active_notes = [...active_notes, ...spans_to_highlight];
		console.log(active_notes);
	}

}

all_selector_wrappers = document.getElementsByClassName('note_selector_wrapper');
// console.log(all_elements);

// if (highest_visible_element != null) {
// 	// highest_visible_element.classList.add('highlighted');
// 	update_highlights(highest_visible_element.getAttribute('class'));

// }

function get_all_visible(array_of_elements) {
	var all_visible = []
	// allVisible = null;
	for (var i = 0; i < array_of_elements.length; i++) {
		client_rect = array_of_elements[i].getBoundingClientRect();
		if (client_rect.bottom > 0){
			if (client_rect.top < window.innerHeight){
				all_visible.push(array_of_elements[i]);
			}
		}
	}
	// console.log(all_visible);
	return all_visible; // returns array of all visible elements

}

function get_highest_visible (array_of_elements) {
	var highest_bot_pos = 10000;
	highest_visible_element = null;
	for (var i = 0; i < array_of_elements.length; i++) {
		bot_pos = array_of_elements[i].getBoundingClientRect().bottom;
		if (bot_pos < highest_bot_pos){
			highest_visible_element = array_of_elements[i];
			highest_bot_pos = bot_pos;
		}
	}

	// return highest_visible_element;
	return highest_visible_element;

}

window.onscroll = function(){
	remove_highlights();
	all_visible_wrappers = get_all_visible(all_selector_wrappers);
	highest_wrapper = get_highest_visible(all_visible_wrappers);
	// console.log("highest_wrapper", highest_wrapper);
	if (highest_wrapper != null) {
		combined_spans = [];
		spans = get_all_visible(highest_wrapper.getElementsByClassName('note_selector'));
		// console.log(spans);
		for (var i = 0; i < spans.length; i++) {
			// combined_spans.push(spans[i]);
			// combined_classes = ''
			// for (var i = 0; i < combined_spans.length; i++) {
			// combined_classes += combined_spans[i].classList;
			// console.log(spans[i].classList)
			update_highlights(String(spans[i].classList));
		}


		
		// console.log("spans: ", combined_spans)
		
		// combined_classes = ''
		// for (var i = 0; i < combined_spans.length; i++) {
		// 	combined_classes += combined_spans[i].classList;
		// 	update_highlights(combined_classes);
		// }
		// console.log(combined_classes);
	
	} else {
		update_highlights(null);
		active_notes = [];
	}
}
	// if (highest_visible_element != null) {
	// 	highest_visible_element.classList.remove('highlighted');
	// }
	// highest_visible_element = get_highest_visible();

// console.log(left_div.querySelectorAll('p'));