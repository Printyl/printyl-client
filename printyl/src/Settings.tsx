import { useState } from 'react'
import { type Server } from './models/Server';
import { storeServer } from './Storage';


export default function Settings() {

    const [server, setServer] = useState<Server[]>([{ name: '', url: '', port: 8080 }])

    return (
        <main>
            <h1>Printyl</h1>
            <h2>Configure your settings</h2>
            <div>
                {server?.map((s, i) => (
                    <div>
                        <div key={i}>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Server Name"
                                    value={s.name}
                                    onChange={(e) => {
                                        const newServer = [...server];
                                        newServer[i].name = e.target.value;
                                        setServer(newServer);
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="url"
                                    placeholder="Server URL"
                                    value={s.url}
                                    onChange={(e) => {
                                        const newServer = [...server];
                                        newServer[i].url = e.target.value;
                                        setServer(newServer);
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="number"
                                    placeholder="Port"
                                    value={s.port}
                                    onChange={(e) => {
                                        const newServer = [...server];
                                        newServer[i].port = parseInt(e.target.value);
                                        setServer(newServer);
                                    }}
                                />
                            </label>
                        </div>
                        <button onClick={() => {
                            if (server.length === 1) return;
                            const newServer = [...server];
                            newServer.splice(i, 1);
                            setServer(newServer);
                        }} disabled={server.length === 1}>
                            Remove Server
                        </button>
                    </div>
                ))}
                <button onClick={() => {
                    setServer([...server, { name: '', url: '', port: 8080 }]);
                }}>
                    Add Server
                </button>
            </div>
            <button onClick={
                () => {
                    storeServer(server);
                    window.location.reload();
                }
            }>Save Settings</button>
        </main>
    )
}
