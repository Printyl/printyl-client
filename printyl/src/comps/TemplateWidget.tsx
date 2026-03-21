import { type Template } from "../models/Template";
import './TemplateWidget.css';

type TemplateWidgetProps = {
    template: Template;
    onSelect: (template: Template) => void;
};

export default function TemplateWidget({ template, onSelect }: TemplateWidgetProps) {
    const fieldCount = template.fields?.length;

    return (
        <button
            type="button"
            className="template-widget"
            onClick={() => onSelect(template)}
            aria-label={`Open template ${template.name}`}
        >
            <p className="template-widget__eyebrow">Template</p>
            <h3 className="template-widget__title">{template.name}</h3>
            <p className="template-widget__description">{template.description}</p>
            <div className="template-widget__meta">
                <span className="template-widget__badge">
                    {fieldCount ?? 0} fields
                </span>
                <span className="template-widget__cta">Open editor</span>
            </div>
        </button>
    );
}
