import { useState } from 'react';
import './App.css'
import Home from './Home';
import Settings from './Settings';
import ErrorView from './ErrorView';
import FormEditor from './FormEditor';
import { type Server } from './models/Server';
import { getServer } from './storage/Storage';
import type { Template } from './models/Template';
import { getTemplateForm } from './server_communication/ServerCommunication';

// This workaround is followint the --erassableSyntaxOnly flag introduction in typescript, which makes enums unusable
const Pages = {
  Home: 0,
  Settings: 1,
  FormEditor: 2,
} as const;

type Pages = (typeof Pages)[keyof typeof Pages];

export default function App() {
  const configured = localStorage.getItem('configurationState') === 'configured';

  const [currentPage, setCurrentPage] = useState<Pages>(
    configured ? Pages.Home : Pages.Settings
  );

  const serverFromLoad: Server[] = getServer();
  const [server, setServer] = useState<Server[]>(
    serverFromLoad.length > 0 ? serverFromLoad : [{ name: '', url: '', port: 8080 }]
  );

  const [selectedTemplate, setSelectedTemplate] = useState<Template>();

  const handleTemplateSelect = (template: Template) => {
    getTemplateForm(template.id, server[0].url, server[0].port).then((fields) => {
      template.fields = fields;
      setSelectedTemplate(template);
      setCurrentPage(Pages.FormEditor);
    }).catch((error) => {
      console.error(`Error fetching template form: ${error}`);
    });
  }

  switch (currentPage) {
    case Pages.Home:
      return <Home
        onOpenSettings={() => setCurrentPage(Pages.Settings)}
        server={server}
        setSelectedTemplate={handleTemplateSelect}
      />;
    case Pages.Settings:
      return <Settings
        setServer={setServer}
        server={server}
        onBack={() => setCurrentPage(Pages.Home)}
      />;
    case Pages.FormEditor:
      console.log("Selected template:")
      console.log(selectedTemplate)
      return <FormEditor
        template={selectedTemplate!}
      />;
    default:
      return <ErrorView />;
  }
}
