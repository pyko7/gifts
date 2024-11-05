import { fonts, globalStyle } from './globalStyle'

export const generateResetPasswordEmailTemplate = (link: string) => `
    ${fonts}
    <style>
        ${globalStyle}
    </style>

    <body>
        <h1>Réinitialisation du mot de passe</h1>
        <div class="container">
            <p>
                <strong>Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez ce mail.</strong> \n 
                Sinon cliquez sur le bouton ci-dessous:
            </p>
            <a href=${link} target="_blank" class="button">Réinitialiser le mot de passe</a>
            <span>Si le bouton ne fonctionne pas, copier-coller le lien ci-dessous:</span>
            <a href=${link} target="_blank">${link}</a>
        </div>
    </body>
`
