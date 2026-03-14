import { getTemplates } from './server_communication/ServerCommunication';
import { type Server } from './models/Server';
import { type Template } from './models/Template';

type HomeProps = {
    onOpenSettings: () => void;
    server: Server[];
    setSelectedTemplate: (template: Template) => void;
};

export default function Home({ onOpenSettings, server, setSelectedTemplate }: HomeProps) {
    const templates: Template[] = getTemplates(server[0].url, server[0].port)
    return (
        <main style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={onOpenSettings}
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
                <img src="settings_gear.svg" alt="Settings Gear Icon" height={25} width={25} />
            </button>
            <h1>Printyl</h1>
            <h2>Welcome back!</h2>
            {templates.map((t) => (
                <div key={t.id} onClick={() => setSelectedTemplate(t)}>
                    <h3>{t.name}</h3>
                    <p>{t.description}</p>
                </div>
            ))}
        </main>
    )
}
