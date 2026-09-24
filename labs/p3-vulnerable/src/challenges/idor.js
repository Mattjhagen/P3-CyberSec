// TRAINING ONLY: deliberately broken object authorization.
// Use only inside the local P3 Cyber Range.

export function registerIdorChallenge(app, loans) {
  app.get('/challenge/idor/loans/:id', (req, res) => {
    const currentUserId = Number(req.headers['x-lab-user-id'] || 1);
    const loan = loans.find(item => item.id === Number(req.params.id));

    if (!loan) return res.status(404).json({ error: 'loan not found' });

    // Deliberate flaw: this checks authentication identity exists,
    // but does NOT verify that the requested loan belongs to that user.
    res.json({
      currentUserId,
      loan,
      flag: loan.borrowerId !== currentUserId
        ? 'FLAG{alice_can_read_bobs_loan}'
        : undefined
    });
  });
}
