import Utils from './../../services/Utils.js'

let PostUsers = async (data) => {
    const options = {
        method: 'POST',
        body: data
    };
    try {
        const response = await fetch(`http://localhost:3000/participants/`,  options)
        const json = await response.json();
        console.log(response)
        console.log(json)
        if (response.status == 401) {
            var o = json;
            for (var key in o) {
                if (o.hasOwnProperty(key)) {
                    alert(key, o[key]);
                }
            }
        }
        json["status"] = response.status;
        return json
    } catch (err) {
        alert(err)
        console.log('Error getting documents', err)
    }
}

let NewParticipant = {
    render: async() => {
        return `
        <form id = "edit_participant" >
            <div>
                Name
                <input class="form-control" type="text"  name="name" id="name" >
            </div>
            <br/>
            <div>
                Email
                <input class="form-control" type="text" name="email" id="email" >
            </div>
            <br/>
            <div id = "ptype">
                Choose Participant Type
                <br/>
                <input type="radio" id="interviewee" name="ptype" value="Interviewee">
                    <label for="Interviewee">Interviewee</label><br>
                    <input type="radio" id="interviewer" name="ptype" value="Interviewer">
                        <label for="Interviewer">Interviewer</label><br>
            </div>
            <div id = "temp">
                Attach resume
                <input type = "file" name = "resume" id = "resume" accept="application/pdf,application/vnd.ms-excel">
            </div>
            <button type="button" id="edit">EDIT</button>
            </form>`
    }
    , after_render: async() => {
        let store = document.getElementById("temp").innerHTML;
        document.getElementById("interviewer").addEventListener ("click", async () => {
            document.getElementById("temp").innerHTML = ""
        })
        document.getElementById("interviewee").addEventListener ("click", async () => {
            document.getElementById("temp").innerHTML = store
        })

        document.getElementById("edit").addEventListener ("click",  async () => {
            const form = document.getElementById("edit_participant");
            const FD = new FormData(form);
            console.log(FD);
            let response = await PostUsers(FD);
            if (response["status"] != 401)
                routing.render("Participants")
        })
    }
}
export default NewParticipant