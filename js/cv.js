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
	init: function() {
		// adds event listeners and renders the page content

		// adjusts the height of the header section to fit the changing size of the window.
		$(window).resize(function() {
			view.adjustHeaderSize();
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

		view.loadEducation(data.schools);
		view.loadWork(data.jobs);
		view.loadProjects(data.projects);
		view.loadAwards(data.awards);
	},
	adjustHeaderSize: function() {
		$("#headerBack").css("min-height", $(window).height());
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
			$("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
		}
		$("#header").prepend(HTMLheaderName.replace("%data%", intlName(bio.name)));

		var keys = Object.keys(bio.contacts);
		for(i = 0; i < keys.length; i++) {
			var data = bio.contacts[keys[i]];
			var key = keys[i];

			formattedContact = HTMLcontactGeneric.replace("%data%", data).replace("%contact%", key).replace("%class%", key);

			if(key === "email") {
				formattedContact = formattedContact.replace("#", "mailto:" + data);
			} else if(key === "mobile") {
				formattedContact = formattedContact.replace("#", "tel:+" + data);
			} else if(key === "location") {
				formattedContact = formattedContact.replace("#", "https://www.google.com/maps/place/" + data);
			} else if(key === 'facebook' || key === 'twitter') {
				formattedContact = formattedContact.replace("#", "http://www." + key + ".com/" + data.slice(1));
			} else {
				formattedContact = formattedContact.replace("#", "http://www." + key + ".com/" + data);
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
			for(i = 0; i < bio.interests.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.interests[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.languages) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Languages"));
			for(i = 0; i < bio.languages.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.languages[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.programLang) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Other Languages"));
			for(i = 0; i < bio.programLang.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.programLang[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.libraries) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Libraries & Frameworks"));
			for(i = 0; i < bio.libraries.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.libraries[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.programs) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Programs"));
			for(i = 0; i < bio.programs.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.programs[i]));
			}
			$(".comma:last").css("display", "none");
		}
	},
	loadEducation: function(schools) {
		// loads education information to screen

		// places section title and clears all other section content 
		$("#education").html('<h2 class="contentLimit">Education</h2>');

		if(schools.length === 0) {
			// if list is empty, a corresponding notification is displayed.
			$("#education").append('<p class="contentLimit">None selected.</p>');
		} else {

			for(i = 0; i < schools.length; i++) {

				$("#education").append(HTMLschoolStart);
				
				// tags items after #4 as toggle-able
				if(i >= 4) {
					$(".education-entry:last").addClass("more-education");
				}

				var formattedName = HTMLschoolName.replace("%data%", schools[i].name).replace("#", schools[i].url);
				var formattedDegree = "";
				if(schools[i].degree) {
					formattedDegree = HTMLschoolDegree.replace("%data%", schools[i].degree);
				}
				else if(schools[i].title)
					formattedDegree = HTMLschoolDegree.replace("%data%", schools[i].title);
				$(".education-entry:last").append(formattedName + formattedDegree);

				var formattedDates = HTMLschoolDates.replace("%data%", schools[i].dates);
				$(".education-entry:last").append(formattedDates);

				if(schools[i].location) {
					var formattedLocation = HTMLschoolLocation.replace("%data%", schools[i].location);
					$(".education-entry:last").append(formattedLocation);
				}

				if(schools[i].major) {
					var formattedMajor = HTMLschoolMajor.replace("%data%", schools[i].major);
					$(".education-entry:last").append(formattedMajor);
				}

				if(schools[i].minor) {
					var formattedMinor = HTMLschoolMinor.replace("%data%", schools[i].minor);
					$(".education-entry:last").append(formattedMinor);
				}

				if(schools[i].description) {
					if(!(schools[i].major || schools[i].minor))
						$(".education-entry:last").append('<br>');
					$(".education-entry:last").append(HTMLschoolDescription.replace("%data%", schools[i].description));
				}

				if(schools[i].courses) {

					$(".education-entry:last").append(HTMLschoolCourses);
					for(j = 0; j < schools[i].courses.length; j++) {
						$(".education-entry .courses:last").append(HTMLschoolCourse.replace("%data%", schools[i].courses[j].title).replace("#", schools[i].courses[j].url));
					}
				}
			}

			// adds 'read more' button if the list is over 4 items
			if(schools.length > 4) {
				$("#education").append('<div class="contentLimit"><p id="readMoreEducation" class="more-link"><img id="educationTri" src="images/tri-down-white.png"/>see more</p></div>');
			}

			// sets up show/hide functionality
			$(".more-education").hide();
			$("#readMoreEducation").on('click', function(e) {
				if($("#readMoreEducation").text() === "see more") {
					$("#readMoreEducation").html('<img id="educationTri" src="images/tri-up-white.png"/>see less');
				} else {
					$("#readMoreEducation").html('<img id="educationTri" src="images/tri-down-white.png"/>see more');
				}
				$(".more-education").slideToggle(800);
			});
		}
	},
	loadWork: function(jobs) {
		// loads work information to screen

		// places section title and clears all other section content 
		$("#workExperience").html('<h2 class="contentLimit">Experience</h2>');

		if(jobs.length === 0) {
			// if list is empty, a corresponding notification is displayed.
			$("#workExperience").append('<p class="contentLimit">None selected.</p>');
		} else {

			for(i = 0; i < jobs.length; i++) {

				$("#workExperience").append(HTMLworkStart);
				
				// tags items after #4 as toggle-able
				if(i >= 4) {
					$(".work-entry:last").addClass("more-experience");
				}

				var formattedEmployer = HTMLworkEmployer.replace("%data%", jobs[i].employer).replace("#", jobs[i].url);
				var formattedTitle = HTMLworkTitle.replace("%data%", jobs[i].title);
				$(".work-entry:last").append(formattedEmployer + formattedTitle);

				if(jobs[i].location) {
					var formattedLocation = HTMLworkLocation.replace("%data%", jobs[i].location);
					$(".work-entry:last").append(formattedLocation);
				}

				var formattedDates = HTMLworkDates.replace("%data%", jobs[i].dates);
				$(".work-entry:last").append(formattedDates);

				if(jobs[i].description) {
					var formattedDescription = HTMLworkDescription.replace("%data%", jobs[i].description);
					$(".work-entry:last").append(formattedDescription);
				}

				if(jobs[i].highlights) {
					$(".work-entry:last").append(HTMLworkHighlights);
					for(j = 0; j < jobs[i].highlights.length; j++) {
						$(".work-entry .highlights:last").append(HTMLworkHighlight.replace("%data%", jobs[i].highlights[j]));
					}
				}
			}

			// adds 'read more' button if the list is over 4 items
			if(jobs.length > 4) {
				$("#workExperience").append('<div class="contentLimit"><p id="readMoreExperience" class="more-link"><img id="experienceTri" src="images/tri-down-white.png"/>see more</p></div>');
			}

			// sets up show/hide functionality
			$(".more-experience").hide();
			$("#readMoreExperience").on('click', function(e) {
				if($("#readMoreExperience").text() === "see more") {
					$("#readMoreExperience").html('<img id="experienceTri" src="images/tri-up-white.png"/>see less');
				} else {
					$("#readMoreExperience").html('<img id="experienceTri" src="images/tri-down-white.png"/>see more');
				}
				$(".more-experience").slideToggle(800);
			});
		}
	},
	loadProjects: function(projects) {
		// loads projects information to screen

		// places section title and clears all other section content 
		$("#projects").html('<h2 class="contentLimit">Projects, Papers and Publications</h2>');

		if(projects.length === 0) {
			// if list is empty, a corresponding notification is displayed.
			$("#projects").append('<p class="contentLimit">None selected.</p>');
		} else {

			for(i = 0; i < projects.length; i++) {

				$("#projects").append(HTMLprojectStart);
				
				// tags items after #4 as toggle-able
				if(i >= 4) {
					$(".project-entry:last").addClass("more-projects");
				}

				var formattedTitle = HTMLprojectTitle.replace("%data%", projects[i].title).replace("#", projects[i].url);
				$(".project-entry:last").append(formattedTitle);

				var formattedDates = HTMLprojectDates.replace("%data%", projects[i].dates);
				$(".project-entry:last").append(formattedDates);

				var formattedDescription = HTMLprojectDescription.replace("%data%", projects[i].description);
				$(".project-entry:last").append(formattedDescription);
			}

			// adds 'read more' button if the list is over 4 items
			if(projects.length > 4) {
				$("#projects").append('<div class="contentLimit"><p id="readMoreProjects" class="more-link"><img id="projectsTri" src="images/tri-down-black.png"/>see more</p></div>');
			}

			// sets up show/hide functionality
			$(".more-projects").hide();
			$("#readMoreProjects").on('click', function(e) {
				if($("#readMoreProjects").text() === "see more") {
					$("#readMoreProjects").html('<img id="projectsTri" src="images/tri-up-black.png"/>see less');
				} else {
					$("#readMoreProjects").html('<img id="projectsTri" src="images/tri-down-black.png"/>see more');
				}
				$(".more-projects").slideToggle(800);
			});
		}
	},
	loadAwards: function(awards) {
		// loads awards information to screen

		// places section title and clears all other section content 
		$("#awards").html('<h2 class="contentLimit">Awards</h2>');

		if(awards.length === 0) {
			// if list is empty, a corresponding notification is displayed.
			$("#awards").append('<p class="contentLimit">None selected.</p>');
		} else {

			for(i = 0; i < awards.length; i++) {

				$("#awards").append(HTMLawardStart);
				
				// tags items after #4 as toggle-able
				if(i >= 4) {
					$(".award-entry:last").addClass("more-awards");
				}

				var formattedTitle = HTMLawardTitle.replace("%data%", awards[i].title).replace("#", awards[i].url);
				$(".award-entry:last").append(formattedTitle);

				var formattedDates = HTMLawardDates.replace("%data%", awards[i].dates);
				$(".award-entry:last").append(formattedDates);

				var formattedDescription = HTMLawardDescription.replace("%data%", awards[i].description);
				$(".award-entry:last").append(formattedDescription);
			}

			// adds 'read more' button if the list is over 4 items
			if(awards.length > 4) {
				$("#awards").append('<div class="contentLimit"><p id="readMoreAwards" class="more-link"><img id="awardsTri" src="images/tri-down-black.png"/>see more</p></div>');
			}

			// sets up show/hide functionality
			$(".more-awards").hide();
			$("#readMoreAwads").on('click', function(e) {
				if($("#readMoreAwards").text() === "see more") {
					$("#readMoreAwards").html('<img id="awardsTri" src="images/tri-up-black.png"/>see less');
				} else {
					$("#readMoreAwards").html('<img id="awardsTri" src="images/tri-down-black.png"/>see more');
				}
				$(".more-awards").slideToggle(800);
			});
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