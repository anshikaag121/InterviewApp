import Utils        from '../../services/Utils.js'
let getUsers = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/participants/`,  options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let PostUsers = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/interviews/`,  options)
        const json = await response.json();
        console.log(json)
        console.log(response.status)
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
        console.log('Error getting documents', err)
    }
}

let NewInterview = {


    render: async () => {
        let allusers = await getUsers()

        return `
        <form>
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="startTime" id="startTime" >
            </div>
                <br/>
            <div>
                End Time
            <input class="form-control" type="datetime-local" name="endTime" id="endTime" >
            </div>
            
            <br/>
            <div>
                Choose Interviewee
                <select  class="form-control" id="user_id1" name="user_id1">
                    ${allusers.map(user => {
            if (user.ptype == 'Interviewee') return `<option value=${user.id}> ${user.name}</option>`
            else return ``
        } )}
                </select>
            </div>
            <div>
                Choose Interviewer
                <select  class="form-control" id="user_id2" name="user_id2">
                    ${allusers.map(user => {
            if (user.ptype == 'Interviewer') return `<option value=${user.id}> ${user.name}</option>`
            else return ``
        } )}
                </select>
            </div>
            <button type="button" id="newinterviewbutton">CREATE</button>
        <form>`
    }


    , after_render: async () => {
        document.getElementById("newinterviewbutton").addEventListener ("click",  async () => {
            let startTime     = document.getElementById("startTime").value;
            let endTime      = document.getElementById("endTime").value;
            let Interviewee  = document.getElementById("user_id1").value;
            let Interviewer = document.getElementById("user_id2").value;

            let data = {
                "st_time" : startTime,
                "en_time" : endTime,
                "id1" : Interviewee,
                "id2" : Interviewer
            };
            console.log(data);
            let response = await PostUsers(data);
            if (response["status"] != 401)
                routing.render("Interviews")

        })
    }
}

export default NewInterview