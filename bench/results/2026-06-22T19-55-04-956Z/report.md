# TokenWarden Benchmark Report

Results: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-22T19-55-04-956Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | 42 | 7 | 0 | 44967 | 145175 | 30274 | 110839 | 13878 | 1009876 | 40335ms | 0 | 0 | $0.2400 | $0.7629 | $0.0000 | $0.0000 |
| tokenwarden | 42 | 8 | 0 | 50452 | 141517 | 32697 | 72764 | 23091 | 1909175 | 48721ms | -918 | 3658 | $0.2775 | $0.7490 | $-0.0051 | $0.0138 |
| openslimedit | 42 | 6 | 0 | 44946 | 168496 | 27155 | 214153 | 14451 | 1591570 | 60232ms | 8441 | -23321 | $0.2503 | $0.8865 | $0.0412 | $-0.1236 |
| dcp | 42 | 6 | 0 | 55886 | 151910 | 35447 | 195050 | 25765 | 1258375 | 52296ms | -6173 | -6735 | $0.2984 | $0.8028 | $-0.0311 | $-0.0400 |
| openrtk | 42 | 7 | 0 | 48998 | 180290 | 29983 | 103268 | 15126 | 3664407 | 51542ms | -69 | -35115 | $0.2637 | $0.9417 | $-0.0006 | $-0.1788 |

## By Task

| Task | Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| routing-read-write-ledger | baseline | 3 | 0 | 0 | 395052 | 586957 | 375498 | 702464 | 0.00% | 0.00% | $2.1395 | $3.0585 |
| routing-read-write-ledger | tokenwarden | 3 | 2 | 0 | 205956 | 204131 | 127993 | 281182 | 64.71% | 66.17% | $1.1103 | $1.1078 |
| routing-read-write-ledger | openslimedit | 3 | 0 | 0 | 256667 | 358230 | 240502 | 425177 | 36.97% | 37.74% | $1.3643 | $1.8715 |
| routing-read-write-ledger | dcp | 3 | 0 | 0 | 474094 | 477600 | 438511 | 514937 | -13.20% | -0.28% | $2.4818 | $2.5206 |
| routing-read-write-ledger | openrtk | 3 | 0 | 0 | 467591 | 439352 | 335667 | 557156 | 48.43% | 6.81% | $2.5100 | $2.3382 |
| helper-read-write-ledger | baseline | 3 | 0 | 0 | 370152 | 393765 | 237502 | 538222 | 0.00% | 0.00% | $1.9394 | $2.0625 |
| helper-read-write-ledger | tokenwarden | 3 | 0 | 0 | 357143 | 461731 | 351319 | 519849 | 6.66% | -164.96% | $1.9025 | $2.4282 |
| helper-read-write-ledger | openslimedit | 3 | 0 | 0 | 361740 | 346226 | 293426 | 406783 | 2.27% | -25.46% | $1.9118 | $1.8184 |
| helper-read-write-ledger | dcp | 3 | 0 | 0 | 244874 | 238322 | 234745 | 245176 | 39.32% | -9.82% | $1.3207 | $1.2842 |
| helper-read-write-ledger | openrtk | 3 | 0 | 0 | 326701 | 1368241 | 220158 | 1995554 | -211.58% | -187.03% | $1.7238 | $7.0250 |
| core-api-read-write-ledger | baseline | 3 | 0 | 0 | 301586 | 312154 | 202884 | 416141 | 0.00% | 0.00% | $1.5779 | $1.6382 |
| core-api-read-write-ledger | tokenwarden | 3 | 0 | 0 | 176385 | 191095 | 131473 | 243362 | 41.52% | 14.50% | $0.9766 | $1.0969 |
| core-api-read-write-ledger | openslimedit | 3 | 0 | 0 | 702742 | 882023 | 527249 | 1147156 | -32.42% | -492.25% | $3.6204 | $4.5736 |
| core-api-read-write-ledger | dcp | 3 | 0 | 0 | 302374 | 337360 | 293268 | 363960 | 5.78% | -54.88% | $1.6179 | $1.7744 |
| core-api-read-write-ledger | openrtk | 3 | 1 | 0 | 105430 | 115178 | 60278 | 165204 | 80.13% | 63.67% | $0.5877 | $0.6310 |
| react-state-bug-fix | baseline | 3 | 0 | 0 | 31691 | 39361 | 31021 | 43867 | 0.00% | 0.00% | $0.1686 | $0.2104 |
| react-state-bug-fix | tokenwarden | 3 | 0 | 0 | 33816 | 45033 | 33407 | 51051 | -8.72% | -12.43% | $0.1803 | $0.2374 |
| react-state-bug-fix | openslimedit | 3 | 0 | 0 | 34694 | 42700 | 28107 | 53290 | -14.31% | -26.51% | $0.1907 | $0.2311 |
| react-state-bug-fix | dcp | 3 | 0 | 0 | 57403 | 54010 | 52203 | 57515 | -81.84% | -51.61% | $0.3042 | $0.2860 |
| react-state-bug-fix | openrtk | 3 | 0 | 0 | 41624 | 40399 | 36259 | 45153 | -31.34% | -15.62% | $0.2185 | $0.2144 |
| next-api-route-fix | baseline | 3 | 0 | 0 | 30228 | 30221 | 30207 | 30239 | 0.00% | 0.00% | $0.1639 | $0.1646 |
| next-api-route-fix | tokenwarden | 3 | 0 | 0 | 53238 | 50106 | 43122 | 58657 | -76.37% | -65.79% | $0.2852 | $0.2687 |
| next-api-route-fix | openslimedit | 3 | 0 | 0 | 36912 | 46337 | 36537 | 51425 | -22.03% | -53.32% | $0.2055 | $0.2514 |
| next-api-route-fix | dcp | 3 | 0 | 0 | 36588 | 36514 | 36472 | 36594 | -21.00% | -20.82% | $0.1973 | $0.1967 |
| next-api-route-fix | openrtk | 3 | 0 | 0 | 49315 | 44837 | 39613 | 52301 | -63.37% | -48.36% | $0.2682 | $0.2392 |
| cli-flag-parsing-fix | baseline | 3 | 1 | 0 | 226830 | 173420 | 120354 | 253192 | 0.00% | 0.00% | $1.1864 | $0.9172 |
| cli-flag-parsing-fix | tokenwarden | 3 | 0 | 0 | 52977 | 671533 | 52712 | 981076 | -277.91% | -261.40% | $0.2873 | $3.4413 |
| cli-flag-parsing-fix | openslimedit | 3 | 0 | 0 | 183600 | 245466 | 113493 | 346506 | -82.22% | -91.93% | $0.9471 | $1.2816 |
| cli-flag-parsing-fix | dcp | 3 | 0 | 0 | 497011 | 604391 | 277399 | 877693 | -77.79% | -2990.22% | $2.6463 | $3.1694 |
| cli-flag-parsing-fix | openrtk | 3 | 0 | 0 | 30961 | 48577 | 30582 | 57764 | 62.72% | 11.34% | $0.1667 | $0.2650 |
| large-test-log-debug | baseline | 3 | 0 | 0 | 40890 | 38536 | 36660 | 41590 | 0.00% | 0.00% | $0.2168 | $0.2030 |
| large-test-log-debug | tokenwarden | 3 | 0 | 0 | 32251 | 46200 | 32172 | 53254 | 0.55% | -18.98% | $0.1708 | $0.2411 |
| large-test-log-debug | openslimedit | 3 | 0 | 0 | 82440 | 67315 | 54366 | 87827 | -127.96% | -81.45% | $0.4212 | $0.3490 |
| large-test-log-debug | dcp | 3 | 0 | 0 | 49592 | 64810 | 44038 | 77974 | -18.67% | -65.35% | $0.2578 | $0.3336 |
| large-test-log-debug | openrtk | 3 | 0 | 0 | 98665 | 106600 | 98583 | 110650 | -189.99% | -178.34% | $0.5033 | $0.5435 |
| typecheck-flood-debug | baseline | 3 | 3 | 0 | 39224 | 41626 | 39156 | 42895 | 0.00% | 0.00% | $0.2109 | $0.2219 |
| typecheck-flood-debug | tokenwarden | 3 | 3 | 0 | 42758 | 43387 | 37370 | 49090 | 8.18% | -4.98% | $0.2272 | $0.2317 |
| typecheck-flood-debug | openslimedit | 3 | 3 | 0 | 28602 | 30443 | 28500 | 31466 | 27.08% | 26.90% | $0.1531 | $0.1632 |
| typecheck-flood-debug | dcp | 3 | 3 | 0 | 47088 | 50431 | 46881 | 52311 | -20.05% | -22.49% | $0.2500 | $0.2664 |
| typecheck-flood-debug | openrtk | 3 | 3 | 0 | 48605 | 50821 | 48027 | 52508 | -23.92% | -23.38% | $0.2545 | $0.2688 |
| build-failure-debug | baseline | 3 | 0 | 0 | 28382 | 33954 | 28362 | 36761 | 0.00% | 0.00% | $0.1505 | $0.1796 |
| build-failure-debug | tokenwarden | 3 | 0 | 0 | 40417 | 40407 | 40371 | 40449 | -42.28% | -24.81% | $0.2121 | $0.2122 |
| build-failure-debug | openslimedit | 3 | 0 | 0 | 19353 | 19389 | 19346 | 19415 | 31.81% | 40.14% | $0.1050 | $0.1050 |
| build-failure-debug | dcp | 3 | 0 | 0 | 34669 | 35017 | 34601 | 35260 | -22.32% | -8.38% | $0.1822 | $0.1843 |
| build-failure-debug | openrtk | 3 | 0 | 0 | 28303 | 28737 | 24772 | 32485 | 18.77% | 14.69% | $0.1500 | $0.1538 |
| multi-file-rename-migration | baseline | 3 | 0 | 0 | 57098 | 190414 | 51565 | 262605 | 0.00% | 0.00% | $0.3044 | $0.9845 |
| multi-file-rename-migration | tokenwarden | 3 | 0 | 0 | 59450 | 57155 | 56004 | 59454 | 7.95% | 22.03% | $0.3171 | $0.3070 |
| multi-file-rename-migration | openslimedit | 3 | 0 | 0 | 31274 | 34800 | 28947 | 38890 | 32.06% | 48.31% | $0.1714 | $0.1916 |
| multi-file-rename-migration | dcp | 3 | 0 | 0 | 62880 | 63742 | 62123 | 64931 | -17.31% | 11.98% | $0.3322 | $0.3389 |
| multi-file-rename-migration | openrtk | 3 | 0 | 0 | 99849 | 99792 | 97484 | 102128 | -82.86% | -40.03% | $0.5240 | $0.5234 |
| feature-add-small | baseline | 3 | 0 | 0 | 44371 | 39658 | 37091 | 44583 | 0.00% | 0.00% | $0.2382 | $0.2126 |
| feature-add-small | tokenwarden | 3 | 0 | 0 | 31829 | 38176 | 31827 | 41352 | -6.76% | 2.51% | $0.1698 | $0.2039 |
| feature-add-small | openslimedit | 3 | 0 | 0 | 53292 | 62744 | 42055 | 78707 | -20.11% | -51.98% | $0.2848 | $0.3367 |
| feature-add-small | dcp | 3 | 0 | 0 | 35313 | 48374 | 35138 | 55080 | -18.46% | -21.73% | $0.1888 | $0.2558 |
| feature-add-small | openrtk | 3 | 0 | 0 | 46219 | 60820 | 37490 | 76850 | -3.18% | -76.18% | $0.2482 | $0.3238 |
| refactor-no-behavior-change | baseline | 3 | 0 | 0 | 28993 | 29012 | 28957 | 29058 | 0.00% | 0.00% | $0.1554 | $0.1555 |
| refactor-no-behavior-change | tokenwarden | 3 | 0 | 0 | 32170 | 34916 | 28066 | 40393 | -11.23% | -20.40% | $0.1730 | $0.1862 |
| refactor-no-behavior-change | openslimedit | 3 | 0 | 0 | 20451 | 20470 | 20233 | 20698 | 29.29% | 29.44% | $0.1133 | $0.1127 |
| refactor-no-behavior-change | dcp | 3 | 0 | 0 | 35145 | 35150 | 35076 | 35222 | -21.21% | -21.16% | $0.1856 | $0.1860 |
| refactor-no-behavior-change | openrtk | 3 | 0 | 0 | 29107 | 29053 | 29022 | 29111 | -0.06% | -0.14% | $0.1558 | $0.1560 |
| code-review-diagnosis | baseline | 3 | 3 | 0 | 88230 | 84000 | 69583 | 100533 | 0.00% | 0.00% | $0.4817 | $0.4577 |
| code-review-diagnosis | tokenwarden | 3 | 3 | 0 | 32597 | 70856 | 28069 | 94514 | 53.79% | 26.07% | $0.1875 | $0.3808 |
| code-review-diagnosis | openslimedit | 3 | 3 | 0 | 54493 | 179481 | 51909 | 244559 | 3.16% | -112.58% | $0.3027 | $0.9947 |
| code-review-diagnosis | dcp | 3 | 3 | 0 | 34913 | 45701 | 30973 | 55036 | 33.39% | 44.74% | $0.1917 | $0.2523 |
| code-review-diagnosis | openrtk | 3 | 3 | 0 | 31102 | 48998 | 26363 | 62685 | 72.44% | 20.95% | $0.1917 | $0.2737 |
| docs-from-code | baseline | 3 | 0 | 0 | 36862 | 39369 | 29066 | 48418 | 0.00% | 0.00% | $0.1998 | $0.2139 |
| docs-from-code | tokenwarden | 3 | 0 | 0 | 23274 | 26508 | 23183 | 28216 | 36.86% | 14.16% | $0.1268 | $0.1430 |
| docs-from-code | openslimedit | 3 | 0 | 0 | 26741 | 23319 | 20596 | 27753 | 55.41% | 26.99% | $0.1485 | $0.1306 |
| docs-from-code | dcp | 3 | 0 | 0 | 25821 | 35318 | 25793 | 40095 | 9.35% | 6.02% | $0.1413 | $0.1910 |
| docs-from-code | openrtk | 3 | 0 | 0 | 27817 | 42653 | 24483 | 53405 | 42.63% | -58.38% | $0.1486 | $0.2281 |

## Best By Task

| Task | Lowest Median Tokens | Lowest Median Cost |
| --- | --- | --- |
| routing-read-write-ledger | tokenwarden (205956) | tokenwarden ($1.1103) |
| helper-read-write-ledger | dcp (244874) | dcp ($1.3207) |
| core-api-read-write-ledger | openrtk (105430) | openrtk ($0.5877) |
| react-state-bug-fix | baseline (31691) | baseline ($0.1686) |
| next-api-route-fix | baseline (30228) | baseline ($0.1639) |
| cli-flag-parsing-fix | openrtk (30961) | openrtk ($0.1667) |
| large-test-log-debug | tokenwarden (32251) | tokenwarden ($0.1708) |
| typecheck-flood-debug | openslimedit (28602) | openslimedit ($0.1531) |
| build-failure-debug | openslimedit (19353) | openslimedit ($0.1050) |
| multi-file-rename-migration | openslimedit (31274) | openslimedit ($0.1714) |
| feature-add-small | tokenwarden (31829) | tokenwarden ($0.1698) |
| refactor-no-behavior-change | openslimedit (20451) | openslimedit ($0.1133) |
| code-review-diagnosis | openrtk (31102) | tokenwarden ($0.1875) |
| docs-from-code | tokenwarden (23274) | tokenwarden ($0.1268) |

CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-22T19-55-04-956Z/tokens.csv`
Averages CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-22T19-55-04-956Z/averages.csv`
