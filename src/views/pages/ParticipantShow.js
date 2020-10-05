import Utils        from './../../services/Utils.js'

let getParticipant = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/participants/` + id, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }

}

let del = async(url, id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const respponse = await fetch(url + id, options)
        const json = await response.json();
        return json
    } catch(err) {
        console.log('Error getting documents', err)
    }
}

let Participant = {

    render : async () => {
        let request = Utils.parseRequestURL()
        console.log(request)
        let participant = await getParticipant(request.id)

        return /*html*/`
            <section class="section">
               <h1> Name : ${participant.name}</h1>
                <p> Email : ${participant.email} </p>
                <p> Type : ${participant.ptype} </p> 
                <button type="button" id="delete">Delete</button>    
            </section>
        `
    }
    , after_render: async () => {
        document.getElementById("delete").addEventListener ("click", async () => {
            let request = Utils.parseRequestURL()
            let response = await Del("http://localhost:3000/participants/", request.id);
            routing.render("Participants")
        })
    }
}

export default Participant;