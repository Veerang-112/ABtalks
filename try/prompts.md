Stitch: 
1.Redesign ABTalks
Reimagine the platform you're standing on.
The Situation
ABTalks runs a 60-day coding challenge for Indian college students.
Students pick a track, build something every day, and maintain a public learning streak by submitting:


A GitHub commit

A LinkedIn post
This daily proof of work helps them build consistency and become visible to recruiters.
Most students use the platform on their phones, late at night after college.
The product works.
It has never been designed.
Ship at Minimum
Design and build the following three screens.
1. Landing Page (/)
The first experience for a student who has never heard of ABTalks.
Show enough trust, clarity, and motivation that they're willing to commit to a 60-day challenge.
2. Student Dashboard (/dashboard)
The home screen after logging in.
Include essentials such as:


Current streak

Today's task

Progress through the challenge

Overall completion

Student standing or achievements
3. Challenge Day (/day/12)
The complete experience of a single challenge day.
A student should be able to:


Read the day's task

Understand what needs to be built

Submit proof of work


GitHub repository/commit

LinkedIn post
Submission
Along with your repository and live deployment URL, include a Route Map.
Provide the three routes below, one per line, in this exact order:
/
/dashboard
/day/12

We'll open every submission at 390px width (mobile viewport) and automatically capture screenshots of these routes.
Providing the route map ensures we don't have to guess your URLs.
What We're Looking For
Your redesign should:


Be designed mobile-first (390px), with desktop as a secondary consideration.

Be understandable to a student who has never heard of ABTalks.

Handle real-world edge cases such as:


First day with no streak

A missed day

An empty profile

Introduce at least one thoughtful idea that improves the student experience.
Out of Scope
You do not need to build:


Authentication

Real user accounts

A production database
Use mocked data instead.
A simple JSON file (written by you or generated using AI) is sufficient as long as the interface feels realistic.
Also out of scope:


Recruiter dashboard

Admin panel

Matching ABTalks' current tech stack
Build using any framework or technology your AI workflow is most productive with.

make it full responsive for all screen sizes

2. in this page for the pc add the scroller in the end having older challenges showing which have been completed and which not and showing the today challenge and add the callender showing on which day u have completed the challenge and on which not. and for the mobile phone add a button showing streak and make a overlay tab showing this details

aistudio: 
1.Build this multi-screen app with the following navigation flow.
Prototype Navigation Spec
Screens
Landing Page - ABTalks — Initial Screen
Student Dashboard (Desktop) - ABTalks
Challenge Day 12 - ABTalks
Navigation Flow
Challenge Day 12 - ABTalks:
Element (xpath: //nav//span[text()='dashboard']/parent::a) → Student Dashboard (Desktop) - ABTalks (none transition)
Element (xpath: //button[@type='submit']) → Student Dashboard (Desktop) - ABTalks (push_back transition)
Student Dashboard (Desktop) - ABTalks:
Element (xpath: //button[contains(., 'START TASK')]) → Challenge Day 12 - ABTalks (push transition)
Element (xpath: //nav//span[@data-icon='assignment']/parent::a) → Challenge Day 12 - ABTalks (none transition)
Landing Page - ABTalks:
Element (xpath: //button[contains(., 'Start the Challenge')]) → Student Dashboard (Desktop) - ABTalks (push transition)
Element (xpath: //button[contains(., 'Commit to Day 1')]) → Student Dashboard (Desktop) - ABTalks (push transition)
Make sure the screen are connected as defined in the navigation flow.

antigravity: 
1. make this full webpage inside the try folder inside ab folder using react and javascript. and also .tsx file to .jsx
add a python server for it and add json file to store all the data giving a challenge or getting the data that student submits.
2. continue

3. now instead of setting the database inside the python file only of challenges make it a seperate file and make a seperate data file for what the student is submitting and if the project is submitted it should not allow again to submit the challenge. and also make change that if the day of challenge is missed then the streak should get reset

vscode agent: 
1. can u make changes in this project like whenever i run server.py file i don't require to run npm run dev toothe website should start automatically and can be deployed too

2. now instead of setting the database inside the python file only of challenges make it a seperate file and make a seperate data file for what the student is submitting and if the project is submitted it should not allow again to submit the challenge.

3. in the student dashboard page there should be relation between all the data in challenges.json like the streak, challenges, and other which is going to shown. and if the streak is broken the streak should get reset automatically and start again where the streak is shown. and in the calender instead of this add a actual calender showing on which day u have completed the challenge and on which not.

4. ok tell me one thing when there is nothing in dashboard file so how i am able to see the full page?

5. ok do i one thing make it different three pages like landing page is the home page which is the starting and then it goes to dashboard and then if click on the challenge then to challenge page my mean instead of a single page make it three so if go back to then it goes to previous page no to the different link

6. when i run the server and open the link it still works like that only when i try return from the challenge page or dashboard i need to click on the icon but when i do remotely like chlicking on back button on the phone it exits the webpage

7. it's still a single web page i want to make it split and works properly

8. the link address system is not working in the server when i click back it exits whole webpage but in the react file when i uses npm ru dev it runs perfectly

9. i have changed the code of the dashboard then why still it is showing me the older frontend

10. and nowfix the callender and make it more presentable

11. fix the callender more there are font issues they are perfeclty aligned

12. now in the callender change color to red which day u haven't completed ur challenge. and adjust the callender to the actual callender

13. adjust the weekdays names they are aligned

14. now make the the red if the task is incomplete on the day. and make a change if the task is already completed on the next page it should show the task has already been submitted and is today hasn't been completed yet the day should be in yellow in the callender and only there the challenger page should all details

15. make the thirteen day as still need to be done

16. i have made three things in status pending, incomplete and completed. if theres a incomplete in the day then the color of the block in callender should be red if the status is pending then the color of the block in the callender should be yellow. and after the whole day if the student didn't submit the code then the status automatically changes to incomplete

17. day 13 status is pending but still i am seeing it as complete and make the incomplete challenge as blocked to show message that the challenge hasn't completed on time

18. now in the challenge page instead of editor asks for the github repo and the linked in post

19. make the submit box little small as there is negative there

20. make one thing whenever the student submit the data it should check the that link is of github only and same for linked in and make the github link compulsory and linkin optional

21. make sure that the link should be complete like it should have the username and the repo.

22. now in callender wheni click on the grey box it takes to the landing page it should not o anything and donot change the style

23. now make the streak 0 if the previous day the status is incomplete and till the today's challenge hasn't completed yet. 

24. make the today's challenge block small it has too many negative space

25. make the challenge history scroll vertical and made it scroll from today's challenge to prevoius challenge

26. the end of the page is not complete the footer is covering the end lines of the challenge history and callender which is looking too off
