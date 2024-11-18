/*
Description: Logic for language changing.
*/

import i18next from 'i18next';
import { englishDictionary, hindiDictionary, marathiDictionary } from './TranslationIndex';

i18next
    .init({
        interpolation: {
            escapeValue: false,
        },
        lng: window.sessionStorage.getItem('lang') || 'en',
        
        resources: {
            en: {
                translation: {
                    ...englishDictionary,

                }
            },
            hn: {
                translation: {
                    ...hindiDictionary,

                }
            },
            mr: {
                translation: {
                    ...marathiDictionary,
                },
            },
        },
    })

export default i18next

