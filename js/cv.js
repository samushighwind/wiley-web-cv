/*
 * Ben Wiley
 * 2015
 */

var model = {
	init: function(data) {
		// initializes model

		// stores CV data
		this.cvData = data;

		// if no filter preferences were created already, initalizes a set of filters where all tags are visible.
		if(!localStorage.filters) {
			var filters = {
				movements: true,
				computers: true,
				sociology: true,
				other: true
			}
			localStorage.filters = JSON.stringify(filters);
		}
	},
	getFilters: function() {
		// returns the filters object

		return JSON.parse(localStorage.filters);
	},
	getCVData: function() {
		// returns data for the CV

		return this.cvData;
	},
	setFilter: function(name, bool) {
		// changes true/false value of specified filter to the given boolean

		var filters = model.getFilters();
		filters[name] = bool;
		localStorage.filters = JSON.stringify(filters);
	}
};

var octopus = {
	getData: function() {
		// returns data needed for rendering

		var data = model.getCVData();
		var filters = model.getFilters();
		var visibleTags = [];
		$.each(filters, function(category, value) {
			if(value === true ) {
				visibleTags.push(category);
			}
		});

		var bio = data.bio;

		var schools = [];
		for(var i = 0; i < data.education.schools.length; i++) {
			var school = data.education.schools[i];
			if(school.tags && octopus.match(school.tags, visibleTags)) {
				schools.push(school);
			}
		}

		var jobs = [];
		for(var i = 0; i < data.work.jobs.length; i++) {
			var job = data.work.jobs[i];
			if(job.tags && octopus.match(job.tags, visibleTags)) {
				jobs.push(job);
			}
		}

		var projects = [];
		for(var i = 0; i < data.projects.projects.length; i++) {
			var project = data.projects.projects[i];
			if(project.tags && octopus.match(project.tags, visibleTags)) {
				projects.push(project);
			}
		}

		var awards = [];
		for(var i = 0; i < data.awards.awards.length; i++) {
			var award = data.awards.awards[i];
			if(award.tags && octopus.match(award.tags, visibleTags)) {
				awards.push(award);
			}
		}

		return {
			"bio": bio,
			"schools": schools,
			"jobs": jobs,
			"projects": projects,
			"awards": awards,
			"filters": filters
		}
	},
	setTagVisibility: function(name, bool) {
		// tells model whether to show or hide a given tag, then renders again

		model.setFilter(name, bool);
		view.update();
	},
	match: function(arr1, arr2) {
		// returns true if the two given arrays contain a common element

		for(var i = 0; i < arr1.length; i++) {
			for(var j = 0; j < arr2.length; j++) {
				if(arr1[i] === arr2[j]) {
					return true;
				}
			}
		}
		return false;
	},
	init: function(data) {
		model.init(data);
		view.init();
	}
};

var view = {
	MAX_ITEM_DISPLAY: 4,
	init: function() {
		// adds event listeners and renders the page content

		// adjusts the height of the header section to fit the changing size of the window.
		$(window).resize(function() {
			view.adjustHeaderSize();
			view.adjustFiller();
		});

		// creates smooth transitions when following links to ids on the page
		$('a[href^="#"]').on('click', function(event) {
		    var target = $( $(this).attr('href') );
		    if( target.length ) {
		        event.preventDefault();
		        $('html, body').animate({
		            scrollTop: target.offset().top
		        }, 1000);
		    }
		});

		// updates filters when checkboxes are hit
		$('input:checkbox').each(function() {
			var id = $(this).attr('id');
			$(this).click((function(tag) {
				return function() {
					var bool = $('#' + tag).prop('checked');
					octopus.setTagVisibility(tag, bool);
				}
			})(id));
		});

		view.render();
		view.adjustHeaderSize();
		view.adjustFiller();
	},
	render: function() {
		// renders content on page (function called only once)

		var data = octopus.getData();

		// displays checkboxes using current filter data
		$('input:checkbox').each(function() {
			$(this).prop('checked', false);
			var tag = $(this).attr('id');
			if(data.filters[tag]) {
				$(this).prop('checked', true);
			}
		});

		// adds bio data
		view.loadBio(data.bio);

		// appends google map to page
		$("#mapDiv").append(googleMap);
		
		// loads filterable sections
		view.update(data);
	},
	update: function(data) {
		// updates content display according to current filters

		if(!data) {
			var data = octopus.getData();
		}

		view.loadSection("education", data.schools, "black");
		view.loadSection("experience", data.jobs, "white");
		view.loadSection("projects", data.projects, "black");
		view.loadSection("awards", data.awards, "white");
	},
	adjustFiller: function() {
		var filler = $('#floating-head').height();
		var sectionFiller = filler + 10;
		$('#headerBack').css('padding-top', filler + 'px');
		$('.section-head').css('padding-top', sectionFiller + 'px');
	},
	adjustHeaderSize: function() {
		$('#headerBack').css(
			"min-height",
			$(window).height() - $('#floating-head').height()
		);
	},
	loadBio: function(bio) {
		// loads bio information to screen

		// "internationalizes" the name given by making the last name all caps
		function intlName(name) {
			var names = name.trim().split(" ");
			return names[0][0].toUpperCase() + names[0].slice(1).toLowerCase() + " " + names[1].toUpperCase();
		};

		// added in reverse order since we're prepending
		if(bio.role) {
			$("#title").prepend(HTMLheaderRole.replace("%data%", bio.role));
		}
		$("#title").prepend(HTMLheaderName.replace("%data%", intlName(bio.name)));

		for(var contact in bio.contacts) {
			var data = bio.contacts[contact];

			formattedContact = HTMLcontactGeneric.replace("%data%", data).replace("%contact%", contact).replace("%class%", contact);

			if(contact === "email") {
				formattedContact = formattedContact.replace("#", "mailto:" + data);
			} else if(contact === "mobile") {
				formattedContact = formattedContact.replace("#", "tel:+" + data);
			} else if(contact === "location") {
				formattedContact = formattedContact.replace("#", "https://www.google.com/maps/place/" + data);
			} else if(contact === 'facebook' || contact === 'twitter') {
				formattedContact = formattedContact.replace("#", "http://www." + contact + ".com/" + data.slice(1));
			} else {
				formattedContact = formattedContact.replace("#", "http://www." + contact + ".com/" + data);
			}

			$("#topContacts").append(formattedContact);
			$("#footerContacts").append(formattedContact);
		}

		if(bio.bioPic) {
			$("#header").append(HTMLbioPic.replace("%data%", "images/" + bio.bioPic));
		}

		if(bio.welcomeMsg) {
			$("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMsg));
		}

		if(bio.interests) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Interests"));
			for(var i = 0; i < bio.interests.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.interests[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.languages) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Languages"));
			for(var i = 0; i < bio.languages.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.languages[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.programLang) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Other Languages"));
			for(var i = 0; i < bio.programLang.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.programLang[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.libraries) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Libraries & Frameworks"));
			for(var i = 0; i < bio.libraries.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.libraries[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.programs) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Programs"));
			for(var i = 0; i < bio.programs.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.programs[i]));
			}
			$(".comma:last").css("display", "none");
		}
	},
	loadSection: function(type, items, color) {
		// loads section information to screen

		var upperType = type.charAt(0).toUpperCase() + type.slice(1);
		var sectionID = type;
		var entryClass = type + "-entry";
		var moreClass = "more-" + type;

		// clears all content
		$('#' + sectionID).empty();

		if(items.length === 0) {

			// if list is empty, a corresponding notification is displayed.
			$('#' + sectionID).append('<p class="contentLimit">None selected.</p>');

		} else {

			for(var i = 0; i < items.length; i++) {

				var item = items[i];

				// entry header
				$('#' + sectionID).append(HTMLitemStart.replace("%type%", type));
				
				// tags items after max as toggle-able
				if(i >= view.MAX_ITEM_DISPLAY) {
					$('.' + entryClass + ":last").addClass(moreClass);
				}

				var headingText = item.name || item.employer;
				var formattedHeading = HTMLitemHeading.replace("%data%", headingText).replace("#", item.url);

				var taglineText = item.degree || item.title;
				var formattedTagline = "";
				if(taglineText) {
					formattedTagline = HTMLitemTagline.replace("%data%", taglineText);
				}
				$('.' + entryClass + ":last").append(formattedHeading + formattedTagline);

				if(item.dates) {
					var formattedDates = HTMLitemDates.replace("%data%", item.dates);
					$('.' + entryClass + ":last").append(formattedDates);
				}

				if(item.location) {
					var formattedLocation = HTMLitemLocation.replace("%data%", item.location);
					$('.' + entryClass + ":last").append(formattedLocation);
				} else {
					$('.' + entryClass + ":last").append('<br>');
				}

				function appendAttribute(label) {
					var upperLabel = label.charAt(0).toUpperCase() + label.slice(1);
					var formattedAttr = HTMLitemAttribute.replace("%data%", item[label]).replace("%label%", upperLabel);
					$('.' + entryClass + ":last").append(formattedAttr);
				}

				if(item.major) {
					appendAttribute("major");
				}
				if(item.minor) {
					appendAttribute("minor");
				}

				if(item.description) {
					var formattedDescription = HTMLitemDescription.replace("%data%", item.description);
					$('.' + entryClass + ":last").append(formattedDescription);
				}

				if(item.courses) {
					$('.' + entryClass + ":last").append(HTMLschoolCourses);
					for(var j = 0; j < item.courses.length; j++) {
						var course = item.courses[j];
						var formattedCourse = HTMLschoolCourse.replace("%data%", course.title).replace("#", course.url);
						$("." + entryClass + " .courses:last").append(formattedCourse);
					}
				}

				if(item.highlights) {
					$('.' + entryClass + ":last").append(HTMLexprHighlights);
					for(var j = 0; j < item.highlights.length; j++) {
						var formattedHighlight = HTMLexprHighlight.replace("%data%", item.highlights[j]);
						$("." + entryClass + " .highlights:last").append(formattedHighlight);
					}
				}
			}

			// adds 'see more' functionality if list exceeds max length
			if(items.length > view.MAX_ITEM_DISPLAY) {

				// stores additional IDs/classes used for read more/less
				var readMoreID = "readMore" + upperType;
				var triID = type + "Tri";

				// adds 'read more' button
				$('#' + sectionID).append('<div class="see-more-entry"><p id="' + readMoreID + '" class="more-link"><img id="' + triID + '" src="images/tri-down-' + color + '.png"/>see more</p></div>');

				// sets up smooth show/hide
				$('.' + moreClass).hide();
				$('#' + readMoreID).on('click', function(e) {
					if($('#' + readMoreID).text() === "see more") {
						$('#' + readMoreID).html('<img id="' + triID + '" src="images/tri-up-' + color + '.png"/>see less');
					} else {
						$('#' + readMoreID).html('<img id="' + triID + '" src="images/tri-down-' + color + '.png"/>see more');
					}
					$('.' + moreClass).slideToggle(800);
				});
			}
		}
	}
};

// hides 'main' div until AJAX call has completed
$('#main').hide();

// initializes cv display with data
// (for testing, use data/cv-data.json and switch fetch_url)
var fetch_url = "data/cv-data.min.json";
$.getJSON(fetch_url, function(data) {
	$('#main').show();
    octopus.init(data);
}).error(function(e) {
    $('body').append('<div class="error"><h2>ERROR: Data missing at ' + fetch_url + '</h2></div>');
});