var model = {
	cvData: {
		bio: {
			name: "Ben Wiley",
			role: "Organizer, Developer, Writer and Sociologist",
			contacts: {
				email: "benwiley@benwiley.org",
				facebook: "/benwiley4000",
				twitter: "@samushighwind",
				github: "benwiley4000",
				location: "Scranton, PA, US"
			},
			interests: ["Campaign Organizing", "Programming", "Social Theory", "Movements", "Open-Source", "AI", "Linux", "Android", "Jazz", "Video Games"],
			programLang: ["Java", "Python", "C++", "C", "JavaScript (+JQuery)", "HTML5", "CSS/SCSS", "PHP"],
			languages: ["French (Advanced)", "German (Beginner)", "Spanish (Beginner)", "Arabic (Beginner)"],
			programs: ["Photoshop", "InDesign", "git", "WordPress", "NationBuilder", "SPSS", "ATLAS.ti"],
			bioPic: "ben-cropped-small.jpg"
		},
		education: {
			schools: [
				{
					name: "Davidson College",
					location: "Davidson, NC, US",
					degree: "B.A.",
					major: "Sociology",
					minor: "Computer Science",
					dates: "2011-2015",
					description:
						"<b>Key Sociology courses:</b> Classical Sociological Theory, Feminist Theories, Contemporary Social Theory, Qualitative Research Methods, Social Statistics</br>"
						+ "<b>Key Computer Science courses:</b> Algorithms and Analysis, Programming Languages, Artificial Intelligence, Data Structures, Combinatorics and Graph Theory",
					url: "http://www.davidson.edu/",
					tags: ["movements", "computers", "sociology", "other"]
				},
				{
					name: "SIT Study Abroad",
					title: "Tunisia: Emerging Identities in North Africa",
					location: "Tunis, Tunisia",
					dates: "February 2014-May 2014",
					description: "<b>Topics studied:</b> Youth Social Movements and Media, Islam and Democracy, The Arab Spring and the Tunisian Revolution, Post-Revolutionary Community Organizing and Network-Building (including two-month-long ethnographic research)",
					url: "http://studyabroad.sit.edu/sn/programs/semester/fall-2015/tnc/",
					tags: ["movements", "sociology"]
				},
				{
					name: "Udacity",
					title: "Online Courses in Web/Software Development",
					dates: "Summer 2015",
					courses: [
						{
							title: "HTML5 Canvas",
							url: "https://www.udacity.com/course/html5-canvas--ud292"
						},
						{
							title: "Object-Oriented JavaScript",
							url: "https://www.udacity.com/course/object-oriented-javascript--ud015"
						},
						{
							title: "Intro to AJAX",
							url: "https://www.udacity.com/course/intro-to-ajax--ud110"
						}
					],
					url: "https://www.udacity.com/",
					tags: ["computers"]
				}
			]
		},
		work: {
			jobs: [
				{
					employer: "Energy Justice: Shale Initative",
					title: "Summer Fellow",
					location: "Scranton, PA, US",
					dates: "Summer 2015 (current)",
					description: "Providing support to community groups fighting hydraulic fracking and gas infrastructure projects in Northeast Pennsylvania. Projects include a web application for visualizing fracking well violations by company and date, as well as a documentary featuring testimony from locals fighting construction of a gas-fired power plant in their township.",
					url: "http://energyjusticesummer.org/",
					tags: ["movements", "computers"]
				},
				{
					employer: "Fossil Fuel Divestment Student Network",
					title: "Organizer and Web Developer",
					dates: "2014-present",
					description: 'Co-organizing a southeast network of students leading fossil fuel divestment campaigns on their campuses. Also serving as a member of the network\'s national Communications Team, and as developer and maintainer of the Divestment Student Network\'s <a href="http://studentsdivest.org/" target="_blank">website</a>, which runs on the <a href="http://nationbuilder.com/" target="_blank">NationBuilder</a> platform and uses <a href="http://www.shopify.com/" target="_blank">Shopify\'s</a> open-source <a href="https://docs.shopify.com/themes/liquid-documentation/basics" target="_blank">Liquid</a> templating language.',
					url: "http://studentsdivest.org/",
					tags: ["movements", "computers"]
				},
				{
					employer: "Davidson College Campus",
					title: "Student Organizer",
					location: "Davidson, NC, US",
					dates: "2011-2015",
					highlights: [
						'Began and won a <a href="http://www.huffingtonpost.com/2012/08/13/chick-fil-a-davidson-college-suspends_n_1772685.html" target="_blank">well-publicized campaign</a> to end college business relationships with Chick-fil-A in response to the company\'s donation practices.',
						'Co-led media outreach for a #BlackLivesMatter "die-in" demonstration, attended by over 200 students, and <a href="http://www.wcnc.com/story/news/local/2014/12/06/davisdon-die-in/20026157/" target="_blank">covered on television</a> by NBC Charlotte.',
						'Organized and received close to $4,000 in total grant funding for long-distance student trips, including Power Shift in Pittsburgh, PA (2013) and the People\'s Climate March in New York (2014).',
						'Organized a successful student referendum vote calling on the college to divest from fossil fuel companies. Trained student volunteers in petitioning, contact blasting, media, data entry, and advanced organizing skills.'
					],
					url: "http://studentsdivest.org/",
					tags: ["movements"]
				},
				{
					employer: "350.org",
					title: "Web Translation Assistant for People's Climate March",
					dates: "Summer 2014",
					description: 'Collaborated with Arabic translators to install the right­-to-­left (RTL) translation of the international People\'s Climate Mobilisation <a href="http://peoplesclimate.org/ar/" target="_blank">website</a> on WordPress. This helped groups in North Africa and the Middle East to mobilize on 21 September alongside 2,646 parallel events in 162 different countries (including the People\'s Climate March in New York, which attracted 400,000 marchers).',
					url: "http://350.org/",
					tags: ["movements", "computers"]
				},
				{
					employer: "Family Scholar House",
					title: "Office and Tech Intern",
					location: "Louisville, KY, US",
					dates: "Summer 2014",
					description: "Upgraded the organization’s computer systems, took phone calls for new program participants and entered data for those participants into a client database. ",
					url: "http://www.familyscholarhouse.org/",
					tags: ["computers", "other"]
				},
				{
					employer: "Davidson College ITS",
					title: "Student Tech",
					location: "Davidson, NC, US",
					dates: "2012-2013",
					description: "Serviced Davidson's Student Technology Help Desk, troubleshooting network issues for students.",
					url: "http://www.davidson.edu/offices/its/for-students/student-technology-help-desk",
					tags: ["computers"]
				},
				{
					employer: "The Ada Jenkins Center",
					title: "Tutor",
					location: "Davidson, NC, US",
					dates: "2011-2013",
					description: "As a Bonner Service Scholar at Davidson College, logged nearly 200 hours tutoring 4th and 5th grade students at the nearby Ada Jenkins community center.",
					url: "http://www.adajenkins.org/",
					tags: ["other"]
				}
			]
		},
		projects: {
			projects: [
				{
					title: "Narrative Identity as Means for Understanding and Criticizing <i>The Two-Income Trap</i>",
					dates: "May 2015",
					description: "A criticism of Senator Elizabeth Warren and daughter Amelia Tyagi's <i>The Two-Income Trap</i>, using Margaret R. Somers's narrative identity framework. Discusses Warren's failure to acknowledge the role of race in middle-class families' flight to public schools in suburban neighborhoods. Argues that her policy recommendations, based upon \"middle-class\" identity but not racial identity, could be detrimental to black students.",
					url: "files/narrative-identity-warren.pdf",
					tags: ["movements", "sociology"]
				},
				{
					title: "Implementing an Ant Swarm Intelligence-Based Approach to Balancing Communication Network Loads",
					dates: "May 2015",
					description: "A write-up of a project mimicking the pheromone-assisted behavior of foraging ant colonies, for an algorithm which balances signal loads in a simulated communication network. <i>(With Tommy Rhodes.)</i>",
					url: "files/ant-intelligence.pdf",
					tags: ["computers"]
				},
				{
					title: "Is Social Movement Organizing Easier in the Age of Social Media?",
					dates: "April 2015",
					description: "A discussion of new assets and difficulties social movements face in the age of social media, using examples of the Zapatistas, Anonymous, the Arab Spring, Occupy, and Kony 2012.",
					url: "files/goffman-beck.pdf",
					tags: ["movements", "computers", "sociology"]
				},
				{
					title: "Erving Goffman and Ulrich Beck: Interaction Order or New World Order?",
					dates: "December 2014",
					description: "A paper examining untapped similarities between the work of microsociologist Erving Goffman and that of macrosociologist Ulrich Beck. It covers themes of impression management, social construction, individualization, and social change.",
					url: "files/goffman-beck.pdf",
					tags: ["movements", "sociology"]
				},
				{
					title: "Indigenous Groups in Papua New Guinea Ready For War with ExxonMobil",
					dates: "May 2014",
					description: "A blog post compiling troubling information surrounding ExxonMobil's $19 billion, U.S.-assisted liquefied natural gas (LNG) operation in Papua New Guinea.",
					url: "http://benwiley4000.kinja.com/indigenous-groups-in-papua-new-guinea-ready-for-war-wit-1576026036",
					tags: ["movements"]
				},
				{
					title: "Can't They Just Get Along? (not quite)",
					dates: "May 2013",
					description: "Confronting and then sidestepping Karl Marx and Michel Foucault’s irreconcilable differences in search for a sound theory of social change.",
					url: "files/marx-foucault.pdf",
					tags: ["movements", "sociology"]
				},
				{
					title: "JazzerBot",
					dates: "2009",
					description: "A program created for a high school science fair, JazzerBot generates auto-improvised blues tracks based on user preference for length, lead instrument, and part selection. It supports output to connected MIDI devices and export for use by media players and MIDI editors.",
					url: "https://code.google.com/p/jazzerbot/",
					tags: ["computers", "other"]
				}
			]
		},
		awards: {
			awards: [
				{
					title: "Davidson College Civic Engagement Award",
					dates: "April 2013",
					description: 'Awarded by the Davidson College Center of Civic Engagement for "unparalleled commitment to social justice advocacy in the Davidson College community."',
					url: "http://www.davidson.edu/student-life/civic-engagement",
					tags: ["movements"]
				},
				{
					title: "Top-60 finisher in IBM Master the Mainframe Competition",
					dates: "October 2012",
					description: "One of the first 60 students to complete part 2 of IBM's Master the Mainframe competition, which has participants remotely log into an IBM mainframe computer and complete a series of increasingly difficult tasks.",
					url: "http://www-03.ibm.com/systems/z/education/academic/masterthemainframe/",
					tags: ["computers"]
				},
				{
					title: "Student Activist of the Year (Amnesty International USA, Midwest)",
					dates: "2010",
					description: "Awarded for work on organizing a benefit concert with a student Amnesty International chapter in Louisville, Kentucky.",
					url: "http://www.amnestyusa.org/events/regional-conferences/midwest-regional-conference",
					tags: ["movements"]
				}
			]
		}
	},
	init: function() {
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

		return model.cvData;
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
	init: function() {
		model.init();
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

		if(bio.programLang) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Languages"));
			for(i = 0; i < bio.programLang.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.programLang[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(bio.languages) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Other Languages"));
			for(i = 0; i < bio.languages.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", bio.languages[i]));
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

octopus.init();