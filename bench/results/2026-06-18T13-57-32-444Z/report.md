# TokenWarden Benchmark Report

Results: `bench/results/2026-06-18T13-57-32-444Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Runs | Median Total Tokens | Average Total Tokens | Median Saved Tokens | Average Saved Tokens | Median Calculated Cost | Average Calculated Cost | Median Saved Cost | Average Saved Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | 3 | 439108 | 465366 | 0 | 0 | $0.7135 | $0.6959 | $0.0000 | $0.0000 |
| tokenwarden | 3 | 83104 | 77064 | 376028 | 388302 | $0.2043 | $0.1979 | $0.5320 | $0.4980 |
| openslimedit | 3 | 262551 | 239407 | 176557 | 225958 | $0.5419 | $0.6086 | $0.0608 | $0.0873 |
| dcp | 3 | 212342 | 209273 | 226766 | 256093 | $0.6818 | $0.6357 | $0.0317 | $0.0602 |
| openrtk | 3 | 404820 | 352022 | 34288 | 113344 | $0.6054 | $0.6172 | $-0.0026 | $0.0787 |

## By Task

| Task | Plugin | Runs | Median Total Tokens | Average Total Tokens | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| routing-read-write-ledger | baseline | 1 | 439108 | 439108 | 0.00% | 0.00% | $0.7715 | $0.7715 |
| routing-read-write-ledger | tokenwarden | 1 | 63080 | 63080 | 85.63% | 85.63% | $0.2079 | $0.2079 |
| routing-read-write-ledger | openslimedit | 1 | 262551 | 262551 | 40.21% | 40.21% | $0.9025 | $0.9025 |
| routing-read-write-ledger | dcp | 1 | 212342 | 212342 | 51.64% | 51.64% | $0.5221 | $0.5221 |
| routing-read-write-ledger | openrtk | 1 | 404820 | 404820 | 7.81% | 7.81% | $0.8703 | $0.8703 |
| helper-read-write-ledger | baseline | 1 | 620659 | 620659 | 0.00% | 0.00% | $0.7135 | $0.7135 |
| helper-read-write-ledger | tokenwarden | 1 | 83104 | 83104 | 86.61% | 86.61% | $0.1814 | $0.1814 |
| helper-read-write-ledger | openslimedit | 1 | 144155 | 144155 | 76.77% | 76.77% | $0.3813 | $0.3813 |
| helper-read-write-ledger | dcp | 1 | 267464 | 267464 | 56.91% | 56.91% | $0.6818 | $0.6818 |
| helper-read-write-ledger | openrtk | 1 | 156433 | 156433 | 74.80% | 74.80% | $0.3761 | $0.3761 |
| core-api-read-write-ledger | baseline | 1 | 336330 | 336330 | 0.00% | 0.00% | $0.6027 | $0.6027 |
| core-api-read-write-ledger | tokenwarden | 1 | 85007 | 85007 | 74.73% | 74.73% | $0.2043 | $0.2043 |
| core-api-read-write-ledger | openslimedit | 1 | 311516 | 311516 | 7.38% | 7.38% | $0.5419 | $0.5419 |
| core-api-read-write-ledger | dcp | 1 | 148013 | 148013 | 55.99% | 55.99% | $0.7032 | $0.7032 |
| core-api-read-write-ledger | openrtk | 1 | 494813 | 494813 | -47.12% | -47.12% | $0.6054 | $0.6054 |

CSV: `bench/results/2026-06-18T13-57-32-444Z/tokens.csv`
Averages CSV: `bench/results/2026-06-18T13-57-32-444Z/averages.csv`
