"use strict";

import Home         from './views/pages/Home.js'
import About        from './views/pages/About.js'
import Error404     from './views/pages/Error404.js'
import Register     from './views/pages/Register.js'

import Navbar       from './views/component/Navbar.js'
import Bottombar    from './views/component/Bottombar.js'
import Interviews   from './views/pages/Interviews.js'
import InterviewShow     from './views/pages/InterviewShow.js'
import Participants from './views/pages/Participants.js'
import ParticipantShow from './views/pages/ParticipantShow.js'
import NewInterview        from './views/pages/NewInterview.js'
import Utils        from './services/Utils.js'
import NewParticipant from "./views/pages/NewParticipant.js";
import EditInterview from './views/pages/EditInterview.js'
import EditParticipant from "./views/pages/EditParticipant.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Interviews
    , '/p/:id'      : InterviewShow
    , '/participants' :Participants
    , '/q/:id'      :   ParticipantShow
    , '/new_interview' : NewInterview
    , '/new_participant' : NewParticipant
    , '/edit_participant/:id' : EditParticipant
    , '/edit_interview/:id' : EditInterview
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');

    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);