

export const buildEvent = (title, startTime, finishTime, username) => { // 540 minutes max
    const start = startTime.split(':').map(i => +i);
    const end = finishTime.split(':').map(i => +i);
    // console.log('duration: ', ((end[0] * 60 + end[1] + 480 ) - (start[0] * 60 + start[1]) - 480));
    return {
        username,
        start: (start[0] * 60 + start[1]) - 480,
        duration: ((end[0] * 60 + end[1] + 480 ) - (start[0] * 60 + start[1]) - 480),
        title
    }
}