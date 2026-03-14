import { type Template } from "../models/Template";

export default function TemplateWidget(template: Template) {
    return (
        <div>
            <h3>{template.name}</h3>
            <p>{template.description}</p>
        </div>
    )
}
