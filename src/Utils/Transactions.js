export const FormatTransactions = (transactions) => {
    let totalTransactions = [];
    
  for (let i = 0; i < transactions.length; i++) {
    let current = JSON.parse(transactions[i]);
    for (let j = 0; j < current.length; j++) {
      totalTransactions.push(current[j]);
    }
  }

    return totalTransactions

}


export const ExtractTransactions = (transactions) => {
  let totalTransactions = FormatTransactions(transactions);

  const TransactionsCopy = [...totalTransactions];

      const sortedTrans = TransactionsCopy.sort(
        (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
      );

      return sortedTrans.slice(0,20)
};
