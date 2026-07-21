# TokenWarden Benchmark Report

Results: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/claude-code/2026-07-20T20-12-48-884Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | 42 | 10 | 0 | 52960 | 146264 | 39477 | 134929 | 17368 | 963993 | 55889ms | 0 | 0 | $0.1697 | $0.4511 | $0.0000 | $0.0000 |
| tokenwarden | 42 | 8 | 0 | 56214 | 121932 | 42977 | 94010 | 30100 | 658394 | 60542ms | -3959 | 24332 | $0.1738 | $0.3765 | $-0.0091 | $0.0746 |
| context-mode | 42 | 7 | 0 | 113301 | 168133 | 96971 | 172987 | 71425 | 605394 | 71746ms | -57400 | -21869 | $0.3173 | $0.5010 | $-0.1457 | $-0.0498 |
| rtk | 42 | 8 | 0 | 65197 | 184203 | 43144 | 221871 | 33289 | 1062074 | 63217ms | -9372 | -37939 | $0.1959 | $0.5469 | $-0.0262 | $-0.0958 |
| caveman | 42 | 10 | 0 | 60560 | 147704 | 45159 | 130823 | 32391 | 668313 | 56067ms | -6806 | -1440 | $0.1881 | $0.4500 | $-0.0151 | $0.0011 |

## By Task

| Task | Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| routing-read-write-ledger | baseline | 3 | 1 | 0 | 311378 | 315741 | 275580 | 353722 | 0.00% | 0.00% | $1.0497 | $1.0094 |
| routing-read-write-ledger | tokenwarden | 3 | 1 | 0 | 368753 | 344099 | 323721 | 376805 | -16.23% | -10.61% | $1.1004 | $1.0527 |
| routing-read-write-ledger | context-mode | 3 | 0 | 0 | 389575 | 396008 | 354285 | 434515 | -2.45% | -33.59% | $1.2984 | $1.3169 |
| routing-read-write-ledger | rtk | 3 | 0 | 0 | 394545 | 409759 | 388241 | 423670 | -26.71% | -33.44% | $1.2341 | $1.2635 |
| routing-read-write-ledger | caveman | 3 | 0 | 0 | 445604 | 427038 | 378524 | 484836 | -32.32% | -39.39% | $1.3400 | $1.2943 |
| helper-read-write-ledger | baseline | 3 | 1 | 0 | 230265 | 315397 | 190536 | 397693 | 0.00% | 0.00% | $0.8101 | $1.0087 |
| helper-read-write-ledger | tokenwarden | 3 | 1 | 0 | 495455 | 437025 | 326340 | 576925 | 12.33% | -97.51% | $1.4468 | $1.3117 |
| helper-read-write-ledger | context-mode | 3 | 0 | 0 | 519369 | 434130 | 348498 | 562382 | 8.10% | -90.16% | $1.5893 | $1.2830 |
| helper-read-write-ledger | rtk | 3 | 1 | 0 | 558841 | 687674 | 500474 | 810458 | -193.16% | -184.43% | $1.6042 | $1.9306 |
| helper-read-write-ledger | caveman | 3 | 1 | 0 | 251167 | 264333 | 226765 | 295319 | 12.12% | -19.14% | $0.8285 | $0.8549 |
| core-api-read-write-ledger | baseline | 3 | 1 | 0 | 595576 | 677549 | 534328 | 779785 | 0.00% | 0.00% | $1.8325 | $2.0280 |
| core-api-read-write-ledger | tokenwarden | 3 | 0 | 0 | 124387 | 168982 | 102308 | 213359 | 79.11% | 76.93% | $0.4626 | $0.5880 |
| core-api-read-write-ledger | context-mode | 3 | 1 | 0 | 271907 | 278139 | 255019 | 298144 | 54.35% | 56.79% | $0.7556 | $0.8772 |
| core-api-read-write-ledger | rtk | 3 | 1 | 0 | 467516 | 530622 | 414418 | 615273 | 1.18% | 11.86% | $1.5101 | $1.6289 |
| core-api-read-write-ledger | caveman | 3 | 2 | 0 | 667587 | 645647 | 634314 | 667950 | -0.92% | -3.79% | $1.9995 | $1.9435 |
| react-state-bug-fix | baseline | 3 | 0 | 0 | 53694 | 60898 | 47700 | 70495 | 0.00% | 0.00% | $0.1649 | $0.1902 |
| react-state-bug-fix | tokenwarden | 3 | 0 | 0 | 89283 | 76599 | 67106 | 92434 | -78.02% | -47.86% | $0.2655 | $0.2357 |
| react-state-bug-fix | context-mode | 3 | 0 | 0 | 98079 | 108068 | 98012 | 113130 | -82.66% | -100.74% | $0.2814 | $0.3072 |
| react-state-bug-fix | rtk | 3 | 0 | 0 | 42793 | 47569 | 42664 | 50086 | 20.78% | 17.48% | $0.1357 | $0.1489 |
| react-state-bug-fix | caveman | 3 | 0 | 0 | 76911 | 115976 | 61685 | 150735 | -43.24% | -70.62% | $0.2271 | $0.3373 |
| next-api-route-fix | baseline | 3 | 0 | 0 | 41211 | 206796 | 40600 | 290200 | 0.00% | 0.00% | $0.1349 | $0.5887 |
| next-api-route-fix | tokenwarden | 3 | 0 | 0 | 195208 | 257757 | 137893 | 346346 | -101.51% | -155.82% | $0.5747 | $0.7370 |
| next-api-route-fix | context-mode | 3 | 0 | 0 | 159068 | 149342 | 128850 | 174697 | -146.65% | -146.00% | $0.4522 | $0.4230 |
| next-api-route-fix | rtk | 3 | 0 | 0 | 128512 | 319542 | 101537 | 442033 | -80.93% | -114.14% | $0.3851 | $0.8830 |
| next-api-route-fix | caveman | 3 | 0 | 0 | 46997 | 77420 | 46984 | 92644 | -17.46% | -53.92% | $0.1487 | $0.2364 |
| cli-flag-parsing-fix | baseline | 3 | 0 | 0 | 68928 | 60067 | 54592 | 69974 | 0.00% | 0.00% | $0.2231 | $0.1954 |
| cli-flag-parsing-fix | tokenwarden | 3 | 0 | 0 | 74607 | 64909 | 59673 | 74995 | -8.24% | -8.51% | $0.2326 | $0.2052 |
| cli-flag-parsing-fix | context-mode | 3 | 0 | 0 | 157880 | 149439 | 128071 | 175028 | -129.05% | -181.60% | $0.4514 | $0.4269 |
| cli-flag-parsing-fix | rtk | 3 | 0 | 0 | 73934 | 91379 | 65327 | 108708 | -83.66% | -56.00% | $0.2389 | $0.2828 |
| cli-flag-parsing-fix | caveman | 3 | 0 | 0 | 78428 | 78856 | 70252 | 87246 | -39.37% | -34.67% | $0.2411 | $0.2406 |
| large-test-log-debug | baseline | 3 | 0 | 0 | 60424 | 62692 | 58573 | 65677 | 0.00% | 0.00% | $0.1953 | $0.1966 |
| large-test-log-debug | tokenwarden | 3 | 0 | 0 | 56105 | 53267 | 51105 | 56848 | 18.81% | 14.53% | $0.1710 | $0.1644 |
| large-test-log-debug | context-mode | 3 | 0 | 0 | 105960 | 112694 | 105573 | 116449 | -75.36% | -82.48% | $0.3000 | $0.3158 |
| large-test-log-debug | rtk | 3 | 0 | 0 | 60139 | 57882 | 54618 | 62274 | -6.02% | 6.05% | $0.1947 | $0.1813 |
| large-test-log-debug | caveman | 3 | 0 | 0 | 48253 | 50450 | 46500 | 53302 | 21.11% | 18.84% | $0.1517 | $0.1525 |
| typecheck-flood-debug | baseline | 3 | 3 | 0 | 50900 | 51191 | 45103 | 57133 | 0.00% | 0.00% | $0.1563 | $0.1600 |
| typecheck-flood-debug | tokenwarden | 3 | 3 | 0 | 57910 | 53223 | 50384 | 58405 | -9.04% | -5.38% | $0.1750 | $0.1633 |
| typecheck-flood-debug | context-mode | 3 | 3 | 0 | 96774 | 96721 | 96666 | 96803 | -90.24% | -96.21% | $0.2760 | $0.2759 |
| typecheck-flood-debug | rtk | 3 | 3 | 0 | 57072 | 119027 | 54540 | 152537 | -45.20% | -112.92% | $0.1731 | $0.3470 |
| typecheck-flood-debug | caveman | 3 | 3 | 0 | 45131 | 45104 | 45080 | 45141 | 11.53% | 8.48% | $0.1372 | $0.1372 |
| build-failure-debug | baseline | 3 | 0 | 0 | 50129 | 46144 | 44014 | 50267 | 0.00% | 0.00% | $0.1529 | $0.1418 |
| build-failure-debug | tokenwarden | 3 | 0 | 0 | 43076 | 42714 | 42218 | 43392 | 13.29% | 6.08% | $0.1382 | $0.1349 |
| build-failure-debug | context-mode | 3 | 0 | 0 | 120641 | 112737 | 108392 | 121035 | -142.23% | -150.43% | $0.3319 | $0.3119 |
| build-failure-debug | rtk | 3 | 0 | 0 | 42426 | 50147 | 41612 | 54822 | -7.65% | -8.63% | $0.1347 | $0.1546 |
| build-failure-debug | caveman | 3 | 0 | 0 | 44385 | 44403 | 44372 | 44426 | 11.30% | 2.06% | $0.1329 | $0.1329 |
| multi-file-rename-migration | baseline | 3 | 0 | 0 | 51226 | 51190 | 50672 | 51726 | 0.00% | 0.00% | $0.1656 | $0.1667 |
| multi-file-rename-migration | tokenwarden | 3 | 0 | 0 | 56269 | 56532 | 56214 | 56718 | -9.84% | -10.48% | $0.1825 | $0.1817 |
| multi-file-rename-migration | context-mode | 3 | 0 | 0 | 125770 | 134643 | 125635 | 139215 | -150.95% | -163.09% | $0.3575 | $0.3807 |
| multi-file-rename-migration | rtk | 3 | 0 | 0 | 67922 | 67500 | 66953 | 68258 | -31.34% | -31.89% | $0.2066 | $0.2058 |
| multi-file-rename-migration | caveman | 3 | 0 | 0 | 60427 | 60188 | 59936 | 60560 | -16.04% | -17.62% | $0.1880 | $0.1877 |
| feature-add-small | baseline | 3 | 0 | 0 | 38619 | 38446 | 38228 | 38752 | 0.00% | 0.00% | $0.1239 | $0.1227 |
| feature-add-small | tokenwarden | 3 | 0 | 0 | 42780 | 42569 | 42382 | 42862 | -10.77% | -10.73% | $0.1363 | $0.1345 |
| feature-add-small | context-mode | 3 | 0 | 0 | 96633 | 96571 | 96532 | 96641 | -150.26% | -151.22% | $0.2735 | $0.2728 |
| feature-add-small | rtk | 3 | 0 | 0 | 41361 | 41416 | 41326 | 41479 | -7.71% | -7.74% | $0.1300 | $0.1305 |
| feature-add-small | caveman | 3 | 0 | 0 | 45512 | 66311 | 45257 | 76966 | -17.05% | -73.37% | $0.1423 | $0.1998 |
| refactor-no-behavior-change | baseline | 3 | 0 | 0 | 39285 | 50264 | 38984 | 56055 | 0.00% | 0.00% | $0.1257 | $0.1538 |
| refactor-no-behavior-change | tokenwarden | 3 | 0 | 0 | 43156 | 43092 | 42994 | 43223 | -10.19% | 6.48% | $0.1349 | $0.1350 |
| refactor-no-behavior-change | context-mode | 3 | 0 | 0 | 96999 | 97079 | 96981 | 97138 | -146.91% | -110.51% | $0.2707 | $0.2713 |
| refactor-no-behavior-change | rtk | 3 | 0 | 0 | 41793 | 41663 | 41591 | 41801 | -6.42% | 9.57% | $0.1301 | $0.1289 |
| refactor-no-behavior-change | caveman | 3 | 1 | 0 | 87887 | 74752 | 66569 | 89503 | -25.12% | -55.27% | $0.2611 | $0.2195 |
| code-review-diagnosis | baseline | 3 | 3 | 0 | 64191 | 80894 | 40780 | 112658 | 0.00% | 0.00% | $0.2110 | $0.2564 |
| code-review-diagnosis | tokenwarden | 3 | 3 | 0 | 32014 | 31545 | 31256 | 32068 | 50.13% | 18.20% | $0.1181 | $0.1131 |
| code-review-diagnosis | context-mode | 3 | 3 | 0 | 74825 | 82448 | 73474 | 87612 | -16.57% | -146.46% | $0.2427 | $0.2534 |
| code-review-diagnosis | rtk | 3 | 3 | 0 | 44195 | 43855 | 38742 | 49138 | 31.15% | -33.63% | $0.1514 | $0.1557 |
| code-review-diagnosis | caveman | 3 | 3 | 0 | 44883 | 57042 | 39285 | 68720 | -44.19% | -41.17% | $0.1367 | $0.1804 |
| docs-from-code | baseline | 3 | 1 | 0 | 27008 | 30424 | 27007 | 32133 | 0.00% | 0.00% | $0.0883 | $0.0977 |
| docs-from-code | tokenwarden | 3 | 0 | 0 | 30992 | 34735 | 30546 | 37053 | -14.75% | -18.39% | $0.1074 | $0.1143 |
| docs-from-code | context-mode | 3 | 0 | 0 | 97331 | 105846 | 84378 | 123057 | -260.41% | -267.67% | $0.2763 | $0.2975 |
| docs-from-code | rtk | 3 | 0 | 0 | 76233 | 70812 | 65467 | 78868 | -182.26% | -143.63% | $0.2254 | $0.2152 |
| docs-from-code | caveman | 3 | 0 | 0 | 45184 | 60337 | 38788 | 74310 | -67.30% | -112.42% | $0.1408 | $0.1830 |

## Best By Task

| Task | Lowest Median Tokens | Lowest Median Cost |
| --- | --- | --- |
| routing-read-write-ledger | baseline (311378) | baseline ($1.0497) |
| helper-read-write-ledger | baseline (230265) | baseline ($0.8101) |
| core-api-read-write-ledger | tokenwarden (124387) | tokenwarden ($0.4626) |
| react-state-bug-fix | rtk (42793) | rtk ($0.1357) |
| next-api-route-fix | baseline (41211) | baseline ($0.1349) |
| cli-flag-parsing-fix | baseline (68928) | baseline ($0.2231) |
| large-test-log-debug | caveman (48253) | caveman ($0.1517) |
| typecheck-flood-debug | caveman (45131) | caveman ($0.1372) |
| build-failure-debug | rtk (42426) | caveman ($0.1329) |
| multi-file-rename-migration | baseline (51226) | baseline ($0.1656) |
| feature-add-small | baseline (38619) | baseline ($0.1239) |
| refactor-no-behavior-change | baseline (39285) | baseline ($0.1257) |
| code-review-diagnosis | tokenwarden (32014) | tokenwarden ($0.1181) |
| docs-from-code | baseline (27008) | baseline ($0.0883) |

CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/claude-code/2026-07-20T20-12-48-884Z/tokens.csv`
Averages CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/claude-code/2026-07-20T20-12-48-884Z/averages.csv`
