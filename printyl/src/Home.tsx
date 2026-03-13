import { getTemplates } from './ServerCommunication';
import { getServer } from './Storage';
import { type Server } from './models/Server';

export default function Home() {
    const server: Server[] = getServer()
    getTemplates(server[0].url, server[0].port)
    return (
        <main>
            <h1>Printyl</h1>
            <h2>Welcome back!</h2>
        </main>
    )
}
