import 'dotenv/config'
import { LinearClient } from '@linear/sdk'

const run = async () => {
    const linearClient = new LinearClient({ apiKey: process.env.LINEAR_API_KEY })
    
    // get rate limit info
    const rateLimit = await linearClient.rateLimitStatus;
    console.log('rateLimit', {
        remaining: rateLimit.limits[0].remainingAmount,
        limit: rateLimit.limits[0].allowedAmount,
        resetAt: rateLimit.limits[0].reset,

    });
    process.exit();

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
    })));

    // get labels
    const { nodes: labels } = await team.labels();
    console.log('labels', labels.map(label => ({
        id: label.id,
        name: label.name,
    })));

    // get states
    const { nodes: states } = await team.states();
    console.log('states', states.map(state => ({
        id: state.id,
        name: state.name,
    })));
}

run();