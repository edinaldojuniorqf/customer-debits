const langs = {
  USD: 'en',
  BRL: 'pt-BR',
}

export const moneyFormat = (value, currency = 'BRL') =>
  Intl.NumberFormat(langs[currency], { style: 'currency', currency }).format(
    value,
  )
