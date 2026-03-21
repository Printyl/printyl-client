import { getTemplates } from './server_communication/ServerCommunication';
import { type Server } from './models/Server';
import { type Template } from './models/Template';
import { useEffect, useState } from 'react';
import TemplateWidget from './comps/TemplateWidget';
import './Home.css';

type HomeProps = {
    onOpenSettings: () => void;
    server: Server[];
    setSelectedTemplate: (template: Template) => void;
};

export default function Home({ onOpenSettings, server, setSelectedTemplate }: HomeProps) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await getTemplates(server[0].url, server[0].port);
                setTemplates(data);
            } catch (error) {
                console.error(`Error fetching templates: ${error}`);
                setTemplates([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTemplates();
    }, [server]);

    if (isLoading) return <div>Loading...</div>;
    return (
        <main className="home">
            <button
                type="button"
                onClick={onOpenSettings}
                aria-label="Open settings"
                className="home__settings"
            >
                <img src="settings_gear.svg" alt="Settings Gear Icon" height={25} width={25} />
            </button>
            <section className="home__hero">
                <h1 className="home__title">Printyl</h1>
                <h2 className="home__subtitle">Welcome back!</h2>
            </section>

            <section className="home__templates" aria-label="Available templates">
                {templates.map((template) => (
                    <TemplateWidget
                        key={template.id}
                        template={template}
                        onSelect={setSelectedTemplate}
                    />
                ))}
            </section>
        </main>
    );
}
