
const jsonfile = require('jsonfile')
const uniqueString = require('unique-string')
const path = require('path')

const { app } = require('electron')

const configPath = path.join(app.getPath('appData'), 'PowderWeb', 'config.json')

let map = {
//    torrentContent: false,
    peerPort: 6881,
    maxPeers: 200,
//    bufferSize: 7000,
    removeLogic: 0,
//    downloadType: 0,
//    casting: {},
//    dlnaFinder: 0,
    extPlayer: false,
    playerCmdArgs: '',
    extTorrentClient: false,
    torrentCmdArgs: '',
    speedLimit: 0,
    downloadAll: true,
    forceDownload: false,
    peerID: 'PW0700',
    maxConcurrency: 2,
    maxUsers: 0,
    webServerPort: 3000,
    webServerSSL: false,
    downloadFolder: '',
    torrentTrackers: '',

    ytdlQuality: 2,

    subLimits: ['best', 'all', 3, 4 ,5],
    subLimit: 0,

    jackettHost: 'http://localhost:9117/',
    jackettKey: '',

    verifyFiles: true,

    embedToken: uniqueString(),

    useWebPlayerAssoc: false,

    useFilenameStream: true,
    torrentNotifs: true,

    fastResume: true,

    userCommands: '',

}

jsonfile.readFile(configPath, (err, obj) => {
	if (err)
		jsonfile.atomicWriteFileSync(configPath, map)
	else {

		let changed

		for (let key in map)
			if (!obj.hasOwnProperty(key)) {
				obj[key] = map[key]
				changed = true
			}

		if (changed)
			jsonfile.atomicWriteFileSync(configPath, obj)

		map = obj
	}
})

const config = {
	getAll: () => {
		return map
	},
	get: str => {
		return map[str]
	},
	set: (str, value) => {
		map[str] = value
		jsonfile.atomicWriteFileSync(configPath, map)
	},
	has: key => {
		return map.hasOwnProperty(key)
	}
}

module.exports = config

