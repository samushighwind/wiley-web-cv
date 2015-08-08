var tagsUsed;
updateTags();

var bio = {
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
	bioPic: "images/ben-cropped-small.jpg",

	display: function() {
		//added in reverse order since we're prepending
		if(this.role)
			$("#header").prepend(HTMLheaderRole.replace("%data%", this.role));
		$("#header").prepend(HTMLheaderName.replace("%data%", inName(this.name)));

		var keys = Object.keys(this.contacts);
		for(i = 0; i < keys.length; i++) {
			var data = this.contacts[keys[i]];
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

		if(this.bioPic)
			$("#header").append(HTMLbioPic.replace("%data%", this.bioPic));

		if(this.welcomeMsg)
			$("#header").append(HTMLwelcomeMsg.replace("%data%", this.welcomeMsg));

		if(this.interests) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Interests"));
			for(i = 0; i < this.interests.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", this.interests[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(this.programLang) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Languages"));
			for(i = 0; i < this.programLang.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", this.programLang[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(this.languages) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Other Languages"));
			for(i = 0; i < this.languages.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", this.languages[i]));
			}
			$(".comma:last").css("display", "none");
		}

		if(this.programs) {
			$("#header").append(HTMLskillsStart.replace("%data%", "Programs"));
			for(i = 0; i < this.programs.length; i++) {
				$(".skills:last").append(HTMLskills.replace("%data%", this.programs[i]));
			}
			$(".comma:last").css("display", "none");
		}
	}
};

var education = {
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
	],

	display: function() {
		// be sure to reset content on new display call
		$("#education").html('<h2 class="contentLimit">Education</h2>');

		updateTags();
		var skipped = 0;

		for(i = 0; i < this.schools.length; i++) {

			if(this.schools[i].tags && match(tagsUsed, this.schools[i].tags)) {

				$("#education").append(HTMLschoolStart);
				
				//tag items after #4 as toggle-able
				if(i >= 4 + skipped)
					$(".education-entry:last").addClass("more-education");

				var formattedName = HTMLschoolName.replace("%data%", this.schools[i].name).replace("#", this.schools[i].url);
				var formattedDegree = "";
				if(this.schools[i].degree)
					formattedDegree = HTMLschoolDegree.replace("%data%", this.schools[i].degree);
				else if(this.schools[i].title)
					formattedDegree = HTMLschoolDegree.replace("%data%", this.schools[i].title);
				$(".education-entry:last").append(formattedName + formattedDegree);

				var formattedDates = HTMLschoolDates.replace("%data%", this.schools[i].dates);
				$(".education-entry:last").append(formattedDates);

				if(this.schools[i].location) {
					var formattedLocation = HTMLschoolLocation.replace("%data%", this.schools[i].location);
					$(".education-entry:last").append(formattedLocation);
				}

				if(this.schools[i].major) {
					var formattedMajor = HTMLschoolMajor.replace("%data%", this.schools[i].major);
					$(".education-entry:last").append(formattedMajor);
				}

				if(this.schools[i].minor) {
					var formattedMinor = HTMLschoolMinor.replace("%data%", this.schools[i].minor);
					$(".education-entry:last").append(formattedMinor);
				}

				if(this.schools[i].description) {
					if(!(this.schools[i].major || this.schools[i].minor))
						$(".education-entry:last").append('<br>');
					$(".education-entry:last").append(HTMLschoolDescription.replace("%data%", this.schools[i].description));
				}

				if(this.schools[i].courses) {

					$(".education-entry:last").append(HTMLschoolCourses);
						for(j = 0; j < this.schools[i].courses.length; j++) {
							$(".education-entry .courses:last").append(HTMLschoolCourse.replace("%data%", this.schools[i].courses[j].title).replace("#", this.schools[i].courses[j].url));
						}
				}
			} else {
				skipped++;
			}
		}

		if(this.schools.length === skipped) {
			$("#education").append('<p class="contentLimit">None selected.</p>');
		} else {

			//add read more button if the list is over 4 items
			if(this.schools.length > 4 + skipped)
				$("#education").append('<div class="contentLimit"><p id="readMoreEducation" class="more-link"><img id="educationTri" src="images/tri-down-white.png"/>see more</p></div>');

			// set up show/hide functionality
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
	}
};

var work = {
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
	],

	display: function() {
		// be sure to reset content on new display call
		$("#workExperience").html('<h2 class="contentLimit">Experience</h2>');

		updateTags();
		var skipped = 0;

		for(i = 0; i < this.jobs.length; i++) {

			if(this.jobs[i].tags && match(tagsUsed, this.jobs[i].tags)) {
			
				$("#workExperience").append(HTMLworkStart);
				
				//tag items after #4 as toggle-able
				if(i >= 4 + skipped)
					$(".work-entry:last").addClass("more-experience");

				var formattedEmployer = HTMLworkEmployer.replace("%data%", this.jobs[i].employer).replace("#", this.jobs[i].url);
				var formattedTitle = HTMLworkTitle.replace("%data%", this.jobs[i].title);
				$(".work-entry:last").append(formattedEmployer + formattedTitle);

				if(this.jobs[i].location) {
					var formattedLocation = HTMLworkLocation.replace("%data%", this.jobs[i].location);
					$(".work-entry:last").append(formattedLocation);
				}

				var formattedDates = HTMLworkDates.replace("%data%", this.jobs[i].dates);
				$(".work-entry:last").append(formattedDates);

				if(this.jobs[i].description) {
					var formattedDescription = HTMLworkDescription.replace("%data%", this.jobs[i].description);
					$(".work-entry:last").append(formattedDescription);
				}

				if(this.jobs[i].highlights) {
					$(".work-entry:last").append(HTMLworkHighlights);
					for(j = 0; j < this.jobs[i].highlights.length; j++) {
						$(".work-entry .highlights:last").append(HTMLworkHighlight.replace("%data%", this.jobs[i].highlights[j]));
					}
				}
			} else {
				skipped++;
			}
		}

		if(this.jobs.length === skipped) {
			$("#workExperience").append('<p class="contentLimit">None selected.</p>');
		} else {

			//add read more button if the list is over 4 items
			if(this.jobs.length > 4 + skipped)
				$("#workExperience").append('<div class="contentLimit"><p id="readMoreExperience" class="more-link"><img id="experienceTri" src="images/tri-down-white.png"/>see more</p></div>');

			// set up show/hide functionality
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
	}
};

var projects = {
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
	],

	display: function() {
		// be sure to reset content on new display call
		$("#projects").html('<h2 class="contentLimit">Projects, Papers and Publications</h2>');

		updateTags();
		var skipped = 0;

		for(i = 0; i < this.projects.length; i++) {

			if(this.projects[i].tags && match(tagsUsed, this.projects[i].tags)) {
			
				$("#projects").append(HTMLprojectStart);
				
				//tag items after #4 as toggle-able
				if(i >= 4 + skipped)
					$(".project-entry:last").addClass("more-projects");

				var formattedTitle = HTMLprojectTitle.replace("%data%", this.projects[i].title).replace("#", this.projects[i].url);
				$(".project-entry:last").append(formattedTitle);

				var formattedDates = HTMLprojectDates.replace("%data%", this.projects[i].dates);
				$(".project-entry:last").append(formattedDates);

				var formattedDescription = HTMLprojectDescription.replace("%data%", this.projects[i].description);
				$(".project-entry:last").append(formattedDescription);
			} else {
				skipped++;
			}
		}

		if(this.projects.length === skipped) {
			$("#projects").append('<p class="contentLimit">None selected.</p>');
		} else {

			//add read more button if the list is over 4 items
			if(this.projects.length > 4 + skipped)
				$("#projects").append('<div class="contentLimit"><p id="readMoreProjects" class="more-link"><img id="projectsTri" src="images/tri-down-black.png"/>see more</p></div>');

			// set up show/hide functionality
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
	}
};

var awards = {
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
	],

	display: function() {
		// be sure to reset content on new display call
		$("#awards").html('<h2 class="contentLimit">Awards</h2>');

		updateTags();
		var skipped = 0;

		for(i = 0; i < this.awards.length; i++) {

			if(this.awards[i].tags && match(tagsUsed, this.awards[i].tags)) {

				$("#awards").append(HTMLawardStart);
				
				//tag items after #4 as toggle-able
				if(i >= 4 + skipped)
					$(".award-entry:last").addClass("more-awards");

				var formattedTitle = HTMLawardTitle.replace("%data%", this.awards[i].title).replace("#", this.awards[i].url);
				$(".award-entry:last").append(formattedTitle);

				var formattedDates = HTMLawardDates.replace("%data%", this.awards[i].dates);
				$(".award-entry:last").append(formattedDates);

				var formattedDescription = HTMLawardDescription.replace("%data%", this.awards[i].description);
				$(".award-entry:last").append(formattedDescription);
			} else {
				skipped++;
			}
		}

		if(this.awards.length === skipped) {
			$("#awards").append('<p class="contentLimit">None selected.</p>');
		} else {

			//add read more button if the list is over 4 items
			if(this.awards.length > 4 + skipped)
				$("#awards").append('<div class="contentLimit"><p id="readMoreAwards" class="more-link"><img id="awardsTri" src="images/tri-down-black.png"/>see more</p></div>');

			// set up show/hide functionality
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

bio.display();
education.display();
work.display();
projects.display();
awards.display();
$("#mapDiv").append(googleMap);

$("#headerBack").css("min-height", $(window).height());

window.addEventListener('resize', function(e) {
	$("#headerBack").css("min-height", $(window).height());
});

// create smooth transitions when following links to ids on the page
$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});

// reload cv entries when checkboxes are hit
$('input:checkbox').change(function(event) {
	reload();
});

// "internationalize" the name given by making the last name all caps
function inName(name) {
	var names = name.trim().split(" ");
	return names[0][0].toUpperCase() + names[0].slice(1).toLowerCase() + " " + names[1].toUpperCase();
}

// see if two arrays have any matching elements
function match(arr1, arr2) {
	for(var i = 0; i < arr1.length; i++) {
		for(var j = 0; j < arr2.length; j++) {
			if(arr1[i] === arr2[j]) {
				return true;
			}
		}
	}
	return false;
}

// refill tagsUsed to match checkboxes
function updateTags () {
	tagsUsed = [];
	if($('#movements').is(":checked")) tagsUsed.push('movements');
	if($('#computers').is(":checked")) tagsUsed.push('computers');
	if($('#sociology').is(":checked")) tagsUsed.push('sociology');
	if($('#other').is(":checked")) tagsUsed.push('other');
}

// reload CV entries to match checkboxes
function reload() {
	console.log("reloading");
	updateTags();
	education.display();
	work.display();
	projects.display();
	awards.display();
}