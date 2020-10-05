import Utils        from './../../services/Utils.js'

let getReq = async (resource, id = "") => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/`+ resource +`/`+ id,  options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let PostUsers = async (data, id) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/interviews/` + id,  options)
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
        alert(err)
        console.log('Error getting documents', err)
    }
}

let EditInterview = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let allusers = await getReq('participants')
        let interview = await getReq('interviews', request.id)
        console.log(interview)
        let start = interview.start_t.substr(0, interview.start_t.length - 1);
        let end = interview.end_t.substr(0, interview.end_t.length - 1);
        let name1 = interview.intervieweeid
        return `
        <form >
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="startTime" id="startTime" value = ${start}>
            </div>
                <br/>
            <div>
                End Time
                <input class="form-control" type="datetime-local" name="endTime" id="endTime" value = ${end}>
            </div>
            
            <br/>
            <div>
                Choose Interviewee
                <select  selected = ${interview.intervieweeid} class="form-control" id="user_id1" name="user_id1">
                    ${allusers.map(user => {
            if (user.ptype == 'Interviewee') return `<option value=${user.id}> ${user.name}</option>`
            else return ``
        } )}
                </select>
            </div>
            <div>
                Choose Interviewer
                <select  selected = ${interview.interviewerid} class="form-control" id="user_id2" name="user_id2">
                    ${allusers.map(user => {
            if (user.ptype == 'Interviewer') return `<option value=${user.id}> ${user.name}</option>`
            else return ``
        } )}
                </select>
            </div>
            <button type="button" id="editbutton">Edit</button>
        <form>`
    }


    , after_render: async () => {
        document.getElementById("editbutton").addEventListener ("click",  async () => {
            let startTime     = document.getElementById("startTime").value;
            let endTime      = document.getElementById("endTime").value;
            let Interviewee  = document.getElementById("user_id1").value;
            let Interviewer = document.getElementById("user_id2").value;
            let request = Utils.parseRequestURL()
            let data = {
                "start_t" : startTime,
                "end_t" : endTime,
                "intervieweeid" : Interviewee,
                "interviewerid" : Interviewer,
                "id" : request.id

            };
            console.log(data);
            let response = await PostUsers(data, request.id);
            if (response["status"] != 401)
                routing.render("Interviews")

        })
    }
}

export default EditInterview