import { type Server } from '../models/Server';

export function getServer() {
    const server: Server[] = []
    const serverFromStorage = localStorage.getItem('server')
    serverFromStorage?.split(';').forEach((s) => {
        const comps = s.split(':')
        server.push({ name: comps[0], url: comps[1], port: parseInt(comps[2]) })
    })
    return server
}

export function storeServer(server: Server[]) {
    const serverString = server.map((s) => `${s.name}:${s.url}:${s.port}`).join(';')
    localStorage.setItem('server', serverString)
    localStorage.setItem('configurationState', 'configured')
}

export function clearServer() {
    localStorage.removeItem('server')
    localStorage.setItem('configurationState', 'not_configured')
}
