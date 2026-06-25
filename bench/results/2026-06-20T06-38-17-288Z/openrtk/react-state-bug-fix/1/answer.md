Fixed the state mutation bug by ensuring `addItem` creates a new state object with a new items array instead of mutating the original. The test now passes.
