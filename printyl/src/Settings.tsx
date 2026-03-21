import { type Server } from './models/Server';
import { clearServer, storeServer } from './storage/Storage';

type SettingsProps = {
    setServer: (server: Server[]) => void;
    server: Server[];
    onBack: () => void;
};

export default function Settings({ setServer, server, onBack }: SettingsProps) {

    return (
        <main style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={onBack}
                aria-label="Open settings"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    cursor: 'pointer'
                }}
            >
                Back
            </button>

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
            <div>TODO: add divider here</div>
            <button onClick={() => {
                if (window.confirm('Are you sure you want to clear all settings?')) {
                    clearServer();
                    setServer([{ name: '', url: '', port: 8080 }]);
                    window.location.reload();
                }
            }}>Clear Settings</button>
        </main>
    )
}
