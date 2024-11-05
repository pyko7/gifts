import { fonts, globalStyle } from './globalStyle'

export const generateSignUpEmailTemplate = (link: string) => `
    ${fonts}
    <style>
        ${globalStyle}
    </style>

    <body>
        <h1>Bienvenue</h1>
        <div class="container">
            <p>
                Plus qu'une dernière étape avant de pouvoir composer votre liste de
                cadeaux. Veuillez confirmer votre inscription en cliquant sur le bouton
                ci-dessous:
            </p>
            <a href=${link} target="_blank" class="button">Confimer l'inscription</a>
            <span>Si le bouton ne fonctionne pas, copier-coller le lien ci-dessous:</span>
            <a href=${link} target="_blank">${link}</a>
        </div>
    </body>
`
