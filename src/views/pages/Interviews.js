
let getReq = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(url, options)
        console.log("here")
        console.log(response)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Interviews = {
    render : async () => {
        let Interviews = await getReq(`http://localhost:3000/interviews`)

        let view =  /*html*/`
            <section class="section">
                <h1> All Interviews </h1>
                <a href= "#/new_interview"> Schedule new interview </a>
                <ul>
                    ${ Interviews.map(interview =>
            /*html*/`
                        
                        <li> Start time: ${interview.start_t} </l1>
                        <li> End time: ${interview.end_t} </l1>
                        <li><a href="#/p/${interview.id}"> Click for more details </a> | 
                        <a href="#/edit_interview/${interview.id}"> Edit  </a></li>`
        ).join('\n ')
        }
                </ul>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Interviews;