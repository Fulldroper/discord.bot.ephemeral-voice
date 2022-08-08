const countVoiceState = (o,n) => {
    if (n.channelId&&o.channelId) {
        //move
        if (n.channelId !== o.channelId) {
            return 3 // on clear move
        } else {
            // another
            if (n.selfDeaf) {
                return 5 // on self deaf
            } else if (n.selfVideo) {
                return 6 // on turn on cam
            } else if (n.selfMute) {
                return 7 // on self mute
            } else if (n.streaming) {
                return 8 // on go live
            } else if (n.serverDeaf) {
                return 9 // on server deaf
            } else if (n.serverMute) {
                return 10 // on server mute
            } else if (o.selfDeaf) {
                return 11 // on self undeaf
            } else if (o.selfVideo) {
                return 12 // on turn off cam
            } else if (o.selfMute) {
                return 13 // on self unmute
            } else if (o.streaming) {
                return 14 // on gone live
            } else if (o.serverDeaf) {
                return 15 // on server undeaf
            } else if (o.serverMute) {
                return 16 // on server unmute
            } else return 4 // clear seat (no video\ stream\ mute...)
        }
    }else if (n.channelId&&(!o.channelId)) {
        return 1 // clear join
    }else if ((!n.channelId)&&o.channelId) {
        return 2 // clear exit
    }else return 0 // undefined all
}
module.exports = { countVoiceState }