export function minimizeTransactions(balanceMap) {
  const balances = Object.entries(balanceMap)
    .map(([name, amount]) => ({ name, amount }))
    .filter((b) => Math.abs(b.amount) > 0.01);

  const result = [];

  const dfs = () => {
    balances.sort((a, b) => a.amount - b.amount);
    const debtor = balances[0];
    const creditor = balances[balances.length - 1];

    if (!debtor || !creditor || debtor.amount >= 0 || creditor.amount <= 0)
      return;

    const amount = Math.min(-debtor.amount, creditor.amount);
    debtor.amount += amount;
    creditor.amount -= amount;

    result.push({ from: debtor.name, to: creditor.name, amount });

    dfs();
  };

  dfs();
  return result;
}
