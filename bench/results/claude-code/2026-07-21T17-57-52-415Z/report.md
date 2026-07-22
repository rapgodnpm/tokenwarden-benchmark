# TokenWarden Benchmark Report

Results: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/claude-code/2026-07-21T17-57-52-415Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | 42 | 7 | 0 | 54949 | 124522 | 39018 | 86505 | 27190 | 621638 | 58464ms | 0 | 0 | $0.1744 | $0.3961 | $0.0000 | $0.0000 |
| tokenwarden | 42 | 6 | 0 | 57056 | 138913 | 42871 | 103577 | 29896 | 1372241 | 62526ms | -3691 | -14391 | $0.1798 | $0.4221 | $-0.0103 | $-0.0260 |
| context-mode | 42 | 7 | 0 | 124670 | 252140 | 96659 | 229907 | 70978 | 1253672 | 81195ms | -58940 | -127618 | $0.3511 | $0.7281 | $-0.1542 | $-0.3321 |
| rtk | 42 | 6 | 0 | 63370 | 144539 | 43137 | 119481 | 41178 | 795284 | 66445ms | -4072 | -20017 | $0.1997 | $0.4480 | $-0.0112 | $-0.0520 |
| caveman | 42 | 9 | 0 | 58682 | 140457 | 45461 | 92408 | 19884 | 950878 | 49104ms | -6665 | -15935 | $0.1800 | $0.4305 | $-0.0145 | $-0.0345 |

## By Task

| Task | Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| routing-read-write-ledger | baseline | 3 | 1 | 0 | 442719 | 431163 | 391213 | 476892 | 0.00% | 0.00% | $1.3321 | $1.3249 |
| routing-read-write-ledger | tokenwarden | 3 | 0 | 0 | 403702 | 406639 | 392660 | 419150 | 8.81% | 3.81% | $1.2012 | $1.2137 |
| routing-read-write-ledger | context-mode | 3 | 0 | 0 | 550187 | 756876 | 508478 | 901930 | -37.40% | -68.99% | $1.6149 | $2.1605 |
| routing-read-write-ledger | rtk | 3 | 0 | 0 | 405489 | 409664 | 351317 | 465923 | 20.66% | -0.47% | $1.2556 | $1.2756 |
| routing-read-write-ledger | caveman | 3 | 0 | 0 | 354555 | 319682 | 271065 | 385736 | 30.62% | 21.84% | $1.1148 | $1.0252 |
| helper-read-write-ledger | baseline | 3 | 0 | 0 | 225496 | 283326 | 223997 | 313740 | 0.00% | 0.00% | $0.7743 | $0.9201 |
| helper-read-write-ledger | tokenwarden | 3 | 0 | 0 | 412743 | 400857 | 283320 | 524338 | -58.20% | -37.32% | $1.2101 | $1.2017 |
| helper-read-write-ledger | context-mode | 3 | 0 | 0 | 431227 | 386162 | 329810 | 465047 | -24.10% | -39.33% | $1.3186 | $1.2017 |
| helper-read-write-ledger | rtk | 3 | 0 | 0 | 308337 | 284932 | 263874 | 317694 | 2.70% | -5.75% | $0.9882 | $0.9209 |
| helper-read-write-ledger | caveman | 3 | 0 | 0 | 375026 | 406126 | 353927 | 442776 | -47.60% | -47.72% | $1.1641 | $1.2294 |
| core-api-read-write-ledger | baseline | 3 | 0 | 0 | 470345 | 457617 | 375606 | 545992 | 0.00% | 0.00% | $1.4995 | $1.4782 |
| core-api-read-write-ledger | tokenwarden | 3 | 0 | 0 | 126450 | 122320 | 118994 | 127712 | 72.58% | 69.87% | $0.4763 | $0.4571 |
| core-api-read-write-ledger | context-mode | 3 | 0 | 0 | 960282 | 767558 | 595347 | 1036131 | -78.88% | -55.03% | $2.8487 | $2.2572 |
| core-api-read-write-ledger | rtk | 3 | 0 | 0 | 472087 | 577920 | 469238 | 633686 | -27.93% | -31.45% | $1.5038 | $1.7662 |
| core-api-read-write-ledger | caveman | 3 | 1 | 0 | 616992 | 617943 | 451475 | 783935 | -31.18% | -28.65% | $1.8808 | $1.8796 |
| react-state-bug-fix | baseline | 3 | 0 | 0 | 39564 | 39528 | 39463 | 39611 | 0.00% | 0.00% | $0.1267 | $0.1262 |
| react-state-bug-fix | tokenwarden | 3 | 0 | 0 | 58356 | 55056 | 51608 | 60154 | -48.25% | -39.29% | $0.1807 | $0.1764 |
| react-state-bug-fix | context-mode | 3 | 0 | 0 | 127920 | 137305 | 113024 | 156894 | -223.32% | -247.10% | $0.3564 | $0.3822 |
| react-state-bug-fix | rtk | 3 | 0 | 0 | 42805 | 42830 | 42723 | 42924 | -8.19% | -8.36% | $0.1373 | $0.1370 |
| react-state-bug-fix | caveman | 3 | 0 | 0 | 46881 | 51257 | 46738 | 53588 | -18.49% | -29.72% | $0.1462 | $0.1577 |
| next-api-route-fix | baseline | 3 | 0 | 0 | 69629 | 69853 | 68918 | 70676 | 0.00% | 0.00% | $0.2209 | $0.2236 |
| next-api-route-fix | tokenwarden | 3 | 0 | 0 | 78000 | 79104 | 61931 | 95726 | -12.02% | -12.48% | $0.2483 | $0.2515 |
| next-api-route-fix | context-mode | 3 | 0 | 0 | 219156 | 411193 | 187174 | 539195 | -221.31% | -490.57% | $0.6262 | $1.1473 |
| next-api-route-fix | rtk | 3 | 0 | 0 | 74091 | 64525 | 59290 | 74543 | -6.41% | 7.20% | $0.2270 | $0.2043 |
| next-api-route-fix | caveman | 3 | 0 | 0 | 80840 | 69700 | 63912 | 81058 | -12.71% | 0.22% | $0.2483 | $0.2150 |
| cli-flag-parsing-fix | baseline | 3 | 0 | 0 | 72860 | 76398 | 71271 | 79757 | 0.00% | 0.00% | $0.2366 | $0.2477 |
| cli-flag-parsing-fix | tokenwarden | 3 | 0 | 0 | 79695 | 499001 | 62382 | 725968 | -9.38% | -485.88% | $0.2626 | $1.3884 |
| cli-flag-parsing-fix | context-mode | 3 | 0 | 0 | 156432 | 186754 | 127420 | 230927 | -124.50% | -137.34% | $0.4397 | $0.5395 |
| cli-flag-parsing-fix | rtk | 3 | 0 | 0 | 43469 | 44143 | 43208 | 44742 | 38.37% | 41.68% | $0.1441 | $0.1500 |
| cli-flag-parsing-fix | caveman | 3 | 0 | 0 | 47029 | 62599 | 46982 | 70432 | 32.51% | 19.93% | $0.1524 | $0.1946 |
| large-test-log-debug | baseline | 3 | 0 | 0 | 66591 | 63323 | 60963 | 67317 | 0.00% | 0.00% | $0.2058 | $0.1977 |
| large-test-log-debug | tokenwarden | 3 | 0 | 0 | 62565 | 62001 | 60253 | 64032 | 1.64% | 1.14% | $0.1930 | $0.1918 |
| large-test-log-debug | context-mode | 3 | 0 | 0 | 125058 | 121839 | 117261 | 128027 | -92.52% | -92.71% | $0.3459 | $0.3435 |
| large-test-log-debug | rtk | 3 | 0 | 0 | 85384 | 159445 | 73852 | 208008 | -28.22% | -172.44% | $0.2577 | $0.4570 |
| large-test-log-debug | caveman | 3 | 0 | 0 | 48394 | 55754 | 46567 | 61261 | 27.33% | 9.20% | $0.1529 | $0.1673 |
| typecheck-flood-debug | baseline | 3 | 3 | 0 | 54563 | 55723 | 46668 | 64198 | 0.00% | 0.00% | $0.1721 | $0.1722 |
| typecheck-flood-debug | tokenwarden | 3 | 3 | 0 | 57214 | 52748 | 50057 | 57673 | 21.27% | -1.64% | $0.1741 | $0.1636 |
| typecheck-flood-debug | context-mode | 3 | 3 | 0 | 96580 | 105774 | 96521 | 110431 | -77.01% | -98.04% | $0.2738 | $0.2987 |
| typecheck-flood-debug | rtk | 3 | 3 | 0 | 57368 | 70954 | 49411 | 85704 | -47.96% | -26.13% | $0.1764 | $0.2129 |
| typecheck-flood-debug | caveman | 3 | 3 | 0 | 58712 | 55235 | 51984 | 60226 | -7.60% | -2.65% | $0.1772 | $0.1663 |
| build-failure-debug | baseline | 3 | 0 | 0 | 38250 | 42007 | 38043 | 44093 | 0.00% | 0.00% | $0.1223 | $0.1311 |
| build-failure-debug | tokenwarden | 3 | 0 | 0 | 41947 | 42058 | 41862 | 42199 | -10.42% | -1.80% | $0.1312 | $0.1308 |
| build-failure-debug | context-mode | 3 | 0 | 0 | 96291 | 105584 | 96277 | 110245 | -154.43% | -157.32% | $0.2712 | $0.2949 |
| build-failure-debug | rtk | 3 | 0 | 0 | 54589 | 75935 | 53255 | 87942 | -42.72% | -74.28% | $0.1666 | $0.2242 |
| build-failure-debug | caveman | 3 | 0 | 0 | 44568 | 44518 | 44490 | 44571 | -16.11% | -7.72% | $0.1337 | $0.1335 |
| multi-file-rename-migration | baseline | 3 | 0 | 0 | 51831 | 63104 | 51627 | 68945 | 0.00% | 0.00% | $0.1673 | $0.1953 |
| multi-file-rename-migration | tokenwarden | 3 | 0 | 0 | 56538 | 56654 | 56532 | 56718 | -9.06% | 4.96% | $0.1841 | $0.1839 |
| multi-file-rename-migration | context-mode | 3 | 0 | 0 | 155490 | 145318 | 139436 | 156286 | -138.04% | -140.98% | $0.4395 | $0.4121 |
| multi-file-rename-migration | rtk | 3 | 0 | 0 | 73059 | 69369 | 63741 | 76843 | -42.08% | -20.29% | $0.2405 | $0.2176 |
| multi-file-rename-migration | caveman | 3 | 0 | 0 | 60280 | 69262 | 59828 | 74205 | -15.47% | -18.51% | $0.1882 | $0.2102 |
| feature-add-small | baseline | 3 | 0 | 0 | 38871 | 38742 | 38611 | 38938 | 0.00% | 0.00% | $0.1248 | $0.1244 |
| feature-add-small | tokenwarden | 3 | 0 | 0 | 42311 | 42436 | 42223 | 42587 | -8.85% | -9.54% | $0.1326 | $0.1339 |
| feature-add-small | context-mode | 3 | 0 | 0 | 96620 | 96662 | 96606 | 96697 | -148.49% | -149.51% | $0.2741 | $0.2740 |
| feature-add-small | rtk | 3 | 0 | 0 | 41192 | 54098 | 41185 | 60559 | -5.94% | -39.98% | $0.1292 | $0.1641 |
| feature-add-small | caveman | 3 | 0 | 0 | 44948 | 44996 | 44924 | 45044 | -16.13% | -16.15% | $0.1369 | $0.1372 |
| refactor-no-behavior-change | baseline | 3 | 0 | 0 | 38732 | 38702 | 38526 | 38894 | 0.00% | 0.00% | $0.1209 | $0.1212 |
| refactor-no-behavior-change | tokenwarden | 3 | 0 | 0 | 42904 | 43150 | 42795 | 43383 | -11.39% | -11.49% | $0.1335 | $0.1354 |
| refactor-no-behavior-change | context-mode | 3 | 1 | 0 | 97271 | 155692 | 97126 | 185048 | -150.39% | -303.81% | $0.2767 | $0.4279 |
| refactor-no-behavior-change | rtk | 3 | 0 | 0 | 41596 | 41580 | 41549 | 41620 | -7.15% | -7.44% | $0.1308 | $0.1308 |
| refactor-no-behavior-change | caveman | 3 | 0 | 0 | 45499 | 50591 | 45474 | 53163 | -17.47% | -30.86% | $0.1407 | $0.1538 |
| code-review-diagnosis | baseline | 3 | 3 | 0 | 40501 | 52494 | 34954 | 64038 | 0.00% | 0.00% | $0.1516 | $0.1789 |
| code-review-diagnosis | tokenwarden | 3 | 3 | 0 | 45893 | 52550 | 39284 | 62487 | 9.70% | -9.02% | $0.1588 | $0.1813 |
| code-review-diagnosis | context-mode | 3 | 3 | 0 | 72995 | 72940 | 72748 | 73159 | -80.23% | -70.17% | $0.2228 | $0.2238 |
| code-review-diagnosis | rtk | 3 | 3 | 0 | 57141 | 57565 | 50280 | 64638 | -47.65% | -30.34% | $0.2039 | $0.1983 |
| code-review-diagnosis | caveman | 3 | 3 | 0 | 32478 | 37005 | 26181 | 45565 | -10.45% | 7.34% | $0.1063 | $0.1203 |
| docs-from-code | baseline | 3 | 0 | 0 | 27196 | 31327 | 27193 | 33396 | 0.00% | 0.00% | $0.0901 | $0.1033 |
| docs-from-code | tokenwarden | 3 | 0 | 0 | 30092 | 30207 | 29994 | 30363 | -10.67% | 0.39% | $0.0991 | $0.0997 |
| docs-from-code | context-mode | 3 | 0 | 0 | 71215 | 80301 | 71097 | 84962 | -161.04% | -157.40% | $0.2057 | $0.2303 |
| docs-from-code | rtk | 3 | 0 | 0 | 64420 | 70588 | 52978 | 85114 | -136.93% | -118.96% | $0.1955 | $0.2135 |
| docs-from-code | caveman | 3 | 2 | 0 | 58370 | 81730 | 52069 | 99711 | -114.63% | -182.99% | $0.1748 | $0.2375 |

## Best By Task

| Task | Lowest Median Tokens | Lowest Median Cost |
| --- | --- | --- |
| routing-read-write-ledger | caveman (354555) | caveman ($1.1148) |
| helper-read-write-ledger | baseline (225496) | baseline ($0.7743) |
| core-api-read-write-ledger | tokenwarden (126450) | tokenwarden ($0.4763) |
| react-state-bug-fix | baseline (39564) | baseline ($0.1267) |
| next-api-route-fix | baseline (69629) | baseline ($0.2209) |
| cli-flag-parsing-fix | rtk (43469) | rtk ($0.1441) |
| large-test-log-debug | caveman (48394) | caveman ($0.1529) |
| typecheck-flood-debug | baseline (54563) | baseline ($0.1721) |
| build-failure-debug | baseline (38250) | baseline ($0.1223) |
| multi-file-rename-migration | baseline (51831) | baseline ($0.1673) |
| feature-add-small | baseline (38871) | baseline ($0.1248) |
| refactor-no-behavior-change | baseline (38732) | baseline ($0.1209) |
| code-review-diagnosis | caveman (32478) | caveman ($0.1063) |
| docs-from-code | baseline (27196) | baseline ($0.0901) |

CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/claude-code/2026-07-21T17-57-52-415Z/tokens.csv`
Averages CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/claude-code/2026-07-21T17-57-52-415Z/averages.csv`
