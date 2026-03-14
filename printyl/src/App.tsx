import { useState } from 'react';
import './App.css'
import Home from './Home';
import Settings from './Settings';
import ErrorView from './ErrorView';
import FormEditor from './FormEditor';
import { type Server } from './models/Server';
import { getServer } from './storage/Storage';
import type { Template } from './models/Template';

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

  const [server, setServer] = useState<Server[]>(getServer());

  const [selectedTemplate, setSelectedTemplate] = useState<Template>();

  switch (currentPage) {
    case Pages.Home:
      return <Home
        onOpenSettings={() => setCurrentPage(Pages.Settings)}
        server={server}
        setSelectedTemplate={setSelectedTemplate}
      />;
    case Pages.Settings:
      return <Settings
        setServer={setServer}
        server={server}
      />;
    case Pages.FormEditor:
      return <FormEditor
        template={selectedTemplate!}
      />;
    default:
      return <ErrorView />;
  }
}
