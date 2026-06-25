# TokenWarden Benchmark Report

Results: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-20T06-38-17-288Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | 42 | 8 | 1 | 55975 | 429940 | 37032 | 251127 | 28387 | 5605749 | 52784ms | 0 | 0 | $0.3020 | $2.2146 | $0.0000 | $0.0000 |
| tokenwarden | 42 | 9 | 0 | 55231 | 122258 | 34982 | 174466 | 23338 | 652577 | 53214ms | 5154 | 307682 | $0.2928 | $0.6517 | $0.0266 | $1.5628 |
| openslimedit | 42 | 6 | 0 | 35392 | 160764 | 25430 | 112595 | 19581 | 757520 | 52050ms | 9614 | 269176 | $0.1972 | $0.8417 | $0.0480 | $1.3728 |
| dcp | 42 | 6 | 0 | 79768 | 150577 | 45417 | 129481 | 34597 | 1149537 | 66202ms | -6118 | 279363 | $0.4190 | $0.7985 | $-0.0290 | $1.4160 |
| openrtk | 42 | 9 | 0 | 44673 | 160040 | 29913 | 185818 | 21588 | 1022270 | 48079ms | 226 | 269900 | $0.2387 | $0.8427 | $0.0032 | $1.3718 |

## By Task

| Task | Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| routing-read-write-ledger | baseline | 3 | 0 | 0 | 1227723 | 923290 | 745056 | 1253740 | 0.00% | 0.00% | $6.3437 | $4.7597 |
| routing-read-write-ledger | tokenwarden | 3 | 1 | 0 | 183505 | 273793 | 180137 | 322306 | 85.60% | 31.84% | $1.0137 | $1.4727 |
| routing-read-write-ledger | openslimedit | 3 | 0 | 0 | 516417 | 505596 | 400382 | 616221 | 41.68% | 30.99% | $2.6924 | $2.6227 |
| routing-read-write-ledger | dcp | 3 | 0 | 0 | 323680 | 267338 | 232043 | 330804 | 73.59% | 46.27% | $1.7121 | $1.4609 |
| routing-read-write-ledger | openrtk | 3 | 0 | 0 | 601516 | 589145 | 430787 | 753690 | 29.22% | -7.07% | $3.1542 | $3.0985 |
| helper-read-write-ledger | baseline | 3 | 1 | 1 | 1862368 | 2603674 | 1102636 | 3734059 | 0.00% | 0.00% | $9.4905 | $13.3603 |
| helper-read-write-ledger | tokenwarden | 3 | 0 | 0 | 212141 | 357837 | 210467 | 432359 | 64.96% | 66.76% | $1.1542 | $1.8938 |
| helper-read-write-ledger | openslimedit | 3 | 0 | 0 | 673961 | 624448 | 584635 | 689018 | 73.40% | 21.43% | $3.4818 | $3.2400 |
| helper-read-write-ledger | dcp | 3 | 0 | 0 | 659830 | 639047 | 383803 | 904684 | 68.57% | 65.02% | $3.4175 | $3.3383 |
| helper-read-write-ledger | openrtk | 3 | 0 | 0 | 328997 | 336670 | 317690 | 351814 | 83.55% | 60.31% | $1.7321 | $1.7796 |
| core-api-read-write-ledger | baseline | 3 | 0 | 0 | 527010 | 515646 | 498608 | 538366 | 0.00% | 0.00% | $2.7199 | $2.6755 |
| core-api-read-write-ledger | tokenwarden | 3 | 1 | 0 | 148622 | 174519 | 126151 | 209938 | 71.80% | 65.08% | $0.8262 | $0.9661 |
| core-api-read-write-ledger | openslimedit | 3 | 0 | 0 | 416711 | 495520 | 391607 | 560029 | 11.38% | 4.63% | $2.1793 | $2.5801 |
| core-api-read-write-ledger | dcp | 3 | 0 | 0 | 327544 | 435997 | 286231 | 531538 | 40.42% | 16.25% | $1.7165 | $2.3024 |
| core-api-read-write-ledger | openrtk | 3 | 1 | 0 | 559696 | 650951 | 465292 | 790983 | -6.20% | -23.68% | $2.8808 | $3.3743 |
| react-state-bug-fix | baseline | 3 | 0 | 0 | 48181 | 46321 | 39113 | 54459 | 0.00% | 0.00% | $0.2563 | $0.2470 |
| react-state-bug-fix | tokenwarden | 3 | 0 | 0 | 72746 | 63907 | 53644 | 78590 | -75.24% | -58.08% | $0.3845 | $0.3399 |
| react-state-bug-fix | openslimedit | 3 | 0 | 0 | 35612 | 36168 | 29057 | 43002 | 25.11% | 22.74% | $0.1966 | $0.1980 |
| react-state-bug-fix | dcp | 3 | 0 | 0 | 47158 | 93286 | 46805 | 116704 | -54.61% | -106.27% | $0.2486 | $0.4922 |
| react-state-bug-fix | openrtk | 3 | 0 | 0 | 40149 | 39640 | 34987 | 44548 | 0.74% | 11.01% | $0.2160 | $0.2115 |
| next-api-route-fix | baseline | 3 | 0 | 0 | 30163 | 39641 | 30138 | 44405 | 0.00% | 0.00% | $0.1650 | $0.2179 |
| next-api-route-fix | tokenwarden | 3 | 0 | 0 | 53861 | 100377 | 43470 | 134027 | -78.86% | -215.13% | $0.2915 | $0.5353 |
| next-api-route-fix | openslimedit | 3 | 0 | 0 | 27135 | 27972 | 24183 | 31344 | 29.50% | 21.79% | $0.1509 | $0.1561 |
| next-api-route-fix | dcp | 3 | 0 | 0 | 92752 | 81764 | 75892 | 93130 | -95.71% | -121.46% | $0.4916 | $0.4350 |
| next-api-route-fix | openrtk | 3 | 0 | 0 | 29975 | 30063 | 29934 | 30149 | 0.62% | 16.32% | $0.1625 | $0.1635 |
| cli-flag-parsing-fix | baseline | 3 | 1 | 0 | 82239 | 101245 | 70603 | 122385 | 0.00% | 0.00% | $0.4614 | $0.5378 |
| cli-flag-parsing-fix | tokenwarden | 3 | 0 | 0 | 86891 | 202907 | 69606 | 278200 | -5.66% | -61.09% | $0.4639 | $1.0567 |
| cli-flag-parsing-fix | openslimedit | 3 | 0 | 0 | 55746 | 282832 | 45489 | 406633 | 5.46% | -245.78% | $0.3009 | $1.4714 |
| cli-flag-parsing-fix | dcp | 3 | 0 | 0 | 120173 | 128001 | 115066 | 137022 | -46.13% | -42.43% | $0.6411 | $0.6903 |
| cli-flag-parsing-fix | openrtk | 3 | 2 | 0 | 148073 | 126802 | 91400 | 172840 | -21.58% | -20.17% | $0.8165 | $0.6748 |
| large-test-log-debug | baseline | 3 | 0 | 0 | 97737 | 76230 | 65229 | 97984 | 0.00% | 0.00% | $0.4984 | $0.3913 |
| large-test-log-debug | tokenwarden | 3 | 0 | 0 | 40981 | 44627 | 38641 | 48791 | 42.09% | 26.63% | $0.2163 | $0.2344 |
| large-test-log-debug | openslimedit | 3 | 0 | 0 | 23568 | 24406 | 23468 | 24925 | 75.89% | 57.26% | $0.1264 | $0.1321 |
| large-test-log-debug | dcp | 3 | 0 | 0 | 45815 | 66616 | 42856 | 79976 | 53.36% | -45.43% | $0.2401 | $0.3470 |
| large-test-log-debug | openrtk | 3 | 0 | 0 | 44126 | 41072 | 38208 | 45463 | 52.36% | 36.18% | $0.2323 | $0.2164 |
| typecheck-flood-debug | baseline | 3 | 3 | 0 | 39003 | 39078 | 38981 | 39138 | 0.00% | 0.00% | $0.2079 | $0.2075 |
| typecheck-flood-debug | tokenwarden | 3 | 3 | 0 | 52629 | 107743 | 47700 | 140229 | -34.94% | -174.94% | $0.2790 | $0.5713 |
| typecheck-flood-debug | openslimedit | 3 | 3 | 0 | 34395 | 37218 | 31318 | 41707 | 11.71% | 4.83% | $0.1876 | $0.2032 |
| typecheck-flood-debug | dcp | 3 | 3 | 0 | 47058 | 50017 | 46171 | 52384 | -20.79% | -27.95% | $0.2495 | $0.2648 |
| typecheck-flood-debug | openrtk | 3 | 3 | 0 | 47397 | 77843 | 43329 | 97134 | -20.69% | -99.44% | $0.2488 | $0.4155 |
| build-failure-debug | baseline | 3 | 0 | 0 | 36503 | 33867 | 32445 | 36607 | 0.00% | 0.00% | $0.1924 | $0.1787 |
| build-failure-debug | tokenwarden | 3 | 0 | 0 | 31388 | 31432 | 31350 | 31492 | 13.93% | 5.86% | $0.1651 | $0.1657 |
| build-failure-debug | openslimedit | 3 | 0 | 0 | 24738 | 23434 | 22160 | 25361 | 31.02% | 30.82% | $0.1343 | $0.1272 |
| build-failure-debug | dcp | 3 | 0 | 0 | 34670 | 67296 | 34653 | 83627 | 5.12% | -118.79% | $0.1821 | $0.3534 |
| build-failure-debug | openrtk | 3 | 0 | 0 | 28509 | 31192 | 28471 | 32573 | -0.16% | 7.27% | $0.1523 | $0.1660 |
| multi-file-rename-migration | baseline | 3 | 0 | 0 | 45714 | 43260 | 41854 | 45893 | 0.00% | 0.00% | $0.2468 | $0.2346 |
| multi-file-rename-migration | tokenwarden | 3 | 0 | 0 | 41586 | 53540 | 41501 | 59602 | -9.00% | -23.02% | $0.2251 | $0.2862 |
| multi-file-rename-migration | openslimedit | 3 | 0 | 0 | 37179 | 35783 | 34184 | 38081 | 18.67% | 16.12% | $0.2011 | $0.1953 |
| multi-file-rename-migration | dcp | 3 | 0 | 0 | 54295 | 60985 | 50158 | 68467 | -42.90% | -41.19% | $0.2876 | $0.3220 |
| multi-file-rename-migration | openrtk | 3 | 0 | 0 | 76306 | 90658 | 60763 | 113378 | -100.84% | -109.37% | $0.4080 | $0.4845 |
| feature-add-small | baseline | 3 | 0 | 0 | 53303 | 1307915 | 41103 | 1947422 | 0.00% | 0.00% | $0.2841 | $6.6492 |
| feature-add-small | tokenwarden | 3 | 0 | 0 | 77842 | 92462 | 54916 | 122699 | 39.98% | -11.23% | $0.4116 | $0.4896 |
| feature-add-small | openslimedit | 3 | 0 | 0 | 20072 | 24719 | 20052 | 27062 | 62.34% | 64.05% | $0.1133 | $0.1376 |
| feature-add-small | dcp | 3 | 0 | 0 | 76896 | 67047 | 56014 | 83004 | -44.26% | -51.16% | $0.4086 | $0.3556 |
| feature-add-small | openrtk | 3 | 0 | 0 | 29175 | 31596 | 29052 | 32930 | 45.73% | 47.94% | $0.1587 | $0.1697 |
| refactor-no-behavior-change | baseline | 3 | 0 | 0 | 29129 | 29151 | 29110 | 29182 | 0.00% | 0.00% | $0.1580 | $0.1576 |
| refactor-no-behavior-change | tokenwarden | 3 | 1 | 0 | 50368 | 53844 | 46219 | 59732 | -72.91% | -84.63% | $0.2695 | $0.2867 |
| refactor-no-behavior-change | openslimedit | 3 | 0 | 0 | 25245 | 25876 | 22968 | 28469 | 13.65% | 11.24% | $0.1373 | $0.1411 |
| refactor-no-behavior-change | dcp | 3 | 0 | 0 | 35300 | 38489 | 35300 | 40084 | -21.19% | -32.06% | $0.1873 | $0.2035 |
| refactor-no-behavior-change | openrtk | 3 | 0 | 0 | 29027 | 29046 | 29016 | 29068 | 0.22% | 0.36% | $0.1556 | $0.1559 |
| code-review-diagnosis | baseline | 3 | 3 | 0 | 65027 | 131906 | 53627 | 176746 | 0.00% | 0.00% | $0.3456 | $0.7123 |
| code-review-diagnosis | tokenwarden | 3 | 3 | 0 | 33364 | 128003 | 28710 | 179977 | 63.01% | -173.99% | $0.1911 | $0.6803 |
| code-review-diagnosis | openslimedit | 3 | 3 | 0 | 48796 | 67138 | 34935 | 90170 | -15.56% | -8.38% | $0.2612 | $0.3631 |
| code-review-diagnosis | dcp | 3 | 3 | 0 | 47628 | 60315 | 41692 | 72595 | 45.01% | 32.80% | $0.2712 | $0.3334 |
| code-review-diagnosis | openrtk | 3 | 3 | 0 | 70854 | 135787 | 69607 | 169502 | -5.12% | -21.96% | $0.3894 | $0.7192 |
| docs-from-code | baseline | 3 | 0 | 0 | 113690 | 127940 | 83240 | 165516 | 0.00% | 0.00% | $0.5971 | $0.6745 |
| docs-from-code | tokenwarden | 3 | 0 | 0 | 23638 | 26619 | 23488 | 28259 | 79.21% | 68.73% | $0.1317 | $0.1452 |
| docs-from-code | openslimedit | 3 | 0 | 0 | 37333 | 39586 | 31764 | 46283 | 76.96% | 51.72% | $0.2031 | $0.2161 |
| docs-from-code | dcp | 3 | 0 | 0 | 36036 | 51885 | 35317 | 60529 | 68.30% | 30.44% | $0.1967 | $0.2805 |
| docs-from-code | openrtk | 3 | 0 | 0 | 29672 | 30099 | 25630 | 34355 | 81.01% | 64.47% | $0.1667 | $0.1691 |

## Best By Task

| Task | Lowest Median Tokens | Lowest Median Cost |
| --- | --- | --- |
| routing-read-write-ledger | tokenwarden (183505) | tokenwarden ($1.0137) |
| helper-read-write-ledger | tokenwarden (212141) | tokenwarden ($1.1542) |
| core-api-read-write-ledger | tokenwarden (148622) | tokenwarden ($0.8262) |
| react-state-bug-fix | openslimedit (35612) | openslimedit ($0.1966) |
| next-api-route-fix | openslimedit (27135) | openslimedit ($0.1509) |
| cli-flag-parsing-fix | openslimedit (55746) | openslimedit ($0.3009) |
| large-test-log-debug | openslimedit (23568) | openslimedit ($0.1264) |
| typecheck-flood-debug | openslimedit (34395) | openslimedit ($0.1876) |
| build-failure-debug | openslimedit (24738) | openslimedit ($0.1343) |
| multi-file-rename-migration | openslimedit (37179) | openslimedit ($0.2011) |
| feature-add-small | openslimedit (20072) | openslimedit ($0.1133) |
| refactor-no-behavior-change | openslimedit (25245) | openslimedit ($0.1373) |
| code-review-diagnosis | tokenwarden (33364) | tokenwarden ($0.1911) |
| docs-from-code | tokenwarden (23638) | tokenwarden ($0.1317) |

CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-20T06-38-17-288Z/tokens.csv`
Averages CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-20T06-38-17-288Z/averages.csv`
