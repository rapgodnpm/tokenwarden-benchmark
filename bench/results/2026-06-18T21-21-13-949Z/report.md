# TokenWarden Benchmark Report

Results: `bench/results/2026-06-18T21-21-13-949Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Runs | Median Total Tokens | Average Total Tokens | Median Saved Tokens | Average Saved Tokens | Median Calculated Cost | Average Calculated Cost | Median Saved Cost | Average Saved Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | 9 | 346261 | 547728 | 0 | 0 | $1.8745 | $2.8383 | $0.0000 | $0.0000 |
| tokenwarden | 9 | 116570 | 189402 | 250047 | 358326 | $0.6559 | $1.0070 | $1.3010 | $1.8313 |
| openslimedit | 9 | 257426 | 303820 | -6288 | 243908 | $1.3720 | $1.6082 | $-0.0657 | $1.2301 |
| dcp | 9 | 241324 | 281644 | 150174 | 266084 | $1.2894 | $1.5013 | $0.8051 | $1.3370 |
| openrtk | 9 | 452249 | 530245 | -200501 | 17483 | $2.3576 | $2.7555 | $-1.0284 | $0.0828 |

## By Task

| Task | Plugin | Runs | Median Total Tokens | Average Total Tokens | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| routing-read-write-ledger | baseline | 3 | 301520 | 227509 | 0.00% | 0.00% | $1.5871 | $1.2155 |
| routing-read-write-ledger | tokenwarden | 3 | 120669 | 132446 | 67.45% | -778.93% | $0.6612 | $0.7154 |
| routing-read-write-ledger | openslimedit | 3 | 242198 | 257341 | -2.09% | -738.57% | $1.2902 | $1.3868 |
| routing-read-write-ledger | dcp | 3 | 146355 | 177985 | 5.57% | -277.85% | $0.8430 | $0.9813 |
| routing-read-write-ledger | openrtk | 3 | 396062 | 469542 | -87.73% | -1032.06% | $2.0791 | $2.4510 |
| helper-read-write-ledger | baseline | 3 | 346261 | 452383 | 0.00% | 0.00% | $1.8745 | $2.3746 |
| helper-read-write-ledger | tokenwarden | 3 | 67724 | 186143 | 71.67% | 44.76% | $0.3607 | $0.9780 |
| helper-read-write-ledger | openslimedit | 3 | 468605 | 476863 | -7.69% | -11.43% | $2.4370 | $2.4914 |
| helper-read-write-ledger | dcp | 3 | 197353 | 211588 | 43.37% | 43.18% | $1.0700 | $1.1429 |
| helper-read-write-ledger | openrtk | 3 | 525973 | 714129 | -83.88% | -97.30% | $2.7651 | $3.6930 |
| core-api-read-write-ledger | baseline | 3 | 1023497 | 963292 | 0.00% | 0.00% | $5.2212 | $4.9248 |
| core-api-read-write-ledger | tokenwarden | 3 | 116570 | 249617 | 93.54% | -214.57% | $0.6559 | $1.3275 |
| core-api-read-write-ledger | openslimedit | 3 | 165833 | 177255 | 83.80% | -95.54% | $0.9258 | $0.9465 |
| core-api-read-write-ledger | dcp | 3 | 418027 | 455358 | 31.28% | -59.79% | $2.1884 | $2.3797 |
| core-api-read-write-ledger | openrtk | 3 | 452249 | 407064 | 55.81% | -88.20% | $2.3576 | $2.1226 |

CSV: `bench/results/2026-06-18T21-21-13-949Z/tokens.csv`
Averages CSV: `bench/results/2026-06-18T21-21-13-949Z/averages.csv`
