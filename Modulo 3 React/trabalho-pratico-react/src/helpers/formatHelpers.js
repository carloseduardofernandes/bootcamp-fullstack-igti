const formatterCurrency = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

const formatterNumber = Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function formatNumber(value) {
  return formatterNumber.format(value);
}

function formatCurrency(value) {
  return formatterCurrency.format(value);
}

function formatPercentage(value) {
  return `${value.toFixed(2).replace('.', ',')}%`;
}

export { formatNumber, formatCurrency, formatPercentage };
