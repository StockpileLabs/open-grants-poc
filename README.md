# Stockpile Grants
[![Website](https://img.shields.io/badge/Website-orange.svg)](https://stockpile.pro) [![Docs](https://img.shields.io/badge/Docs-orange.svg)](https://docs.stockpile.pro)
  <br>
This is a proof of concept for open grants on Stockpile, powered by a modified implementation of quadratic funding on Solana.

## Spec
- Create grants and participate in funding rounds
- Funding round admins approve grant format & grant appears on UI
- Contribute to grants with SOL or USDC
- Contributions serve as votes for the larger pool distribution
- Funds are distributed based on votes on round end date
- Rudimentary auth system for identifying a user based on a public key
- Civic Pass required for valid votes for Sybil Resistance

## Milestones
- ✅ Minimally viable UI
- ✅ Grant creation and approval queueing
- ✅ Funding round creation & address whitelisting
- ❌ Admin approval
- ❌ Program implementation
- ❌ Grant contributions & vote calculation
- ❌ Funding round distribution & closing
