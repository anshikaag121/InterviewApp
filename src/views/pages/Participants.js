import Utils from './../../services/Utils.js'
let getParticipants = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(url, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}


let Participants = {

    render: async () => {
        let participants = await getParticipants(`http://localhost:3000/participants`)

        return /*html*/`
            <section class="section">
             <a href="#/new_participant"> New Participant </a><br>
                <h1> All participants </h1>
               <ul>
                    ${participants.map(participant =>
            `           <li>  Name :  ${participant.name} |  Participant type :  ${participant.ptype} 
                        </li>
                        <li><a href="#/q/${participant.id}">Show</a> | 
                        <a href="#/edit_participant/${participant.id}">edit</a>
                        </li>
                        `
                        ).join('\n ')
                     }
                </ul>
            </section>
        `
    }
    , after_render: async () => {

    }
}

export default Participants;


