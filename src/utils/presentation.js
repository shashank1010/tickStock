export const lang = navigator.language || navigator.userLanguage
export const number = Intl.NumberFormat(lang, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
})