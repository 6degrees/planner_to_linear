import 'dotenv/config'
import csv from "csvtojson";
import { LinearClient } from '@linear/sdk'



const run = async () => {
    const linearClient = new LinearClient({ apiKey: process.env.LINEAR_API_KEY })
    const { nodes: [team] } = await linearClient.teams();
    console.log('team', {
        id: team.id,
        name: team.name,
    });

    // get  members
    const { nodes: members } = await team.members();
    console.log('members', members.map(member => ({
        id: member.id,
        name: member.displayName,
    })
    ));

    // get states
    const { nodes: states } = await team.states();
    console.log('states', states.map(state => ({
        id: state.id,
        name: state.name,
    })));


}

run();