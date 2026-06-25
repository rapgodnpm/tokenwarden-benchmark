# TokenWarden Benchmark Report

Results: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-23T16-47-14-546Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | 42 | 4 | 0 | 39010 | 92305 | 29808 | 50729 | 21183 | 526654 | 58355ms | 0 | 0 | $0.2091 | $0.4911 | $0.0000 | $0.0000 |
| tokenwarden | 42 | 5 | 0 | 42127 | 60132 | 32715 | 55132 | 23541 | 217625 | 63317ms | -2763 | 32173 | $0.2288 | $0.3341 | $-0.0136 | $0.1571 |
| openslimedit | 42 | 6 | 0 | 26453 | 94802 | 21508 | 71061 | 19718 | 622984 | 69374ms | 8652 | -2497 | $0.1450 | $0.5054 | $0.0433 | $-0.0143 |
| dcp | 42 | 6 | 0 | 47730 | 96028 | 35950 | 117101 | 25912 | 442854 | 70974ms | -6362 | -3723 | $0.2556 | $0.5149 | $-0.0333 | $-0.0238 |
| openrtk | 42 | 5 | 0 | 36753 | 100542 | 29466 | 103530 | 20948 | 449236 | 61618ms | 14 | -8237 | $0.1964 | $0.5343 | $-0.0000 | $-0.0432 |

## By Task

| Task | Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| routing-read-write-ledger | baseline | 3 | 0 | 0 | 196156 | 274351 | 195973 | 313632 | 0.00% | 0.00% | $1.0599 | $1.4583 |
| routing-read-write-ledger | tokenwarden | 3 | 0 | 0 | 94535 | 96880 | 73957 | 118631 | 66.89% | 63.80% | $0.5514 | $0.5742 |
| routing-read-write-ledger | openslimedit | 3 | 0 | 0 | 299916 | 383666 | 264007 | 461450 | -44.51% | -37.99% | $1.5892 | $2.0257 |
| routing-read-write-ledger | dcp | 3 | 0 | 0 | 246902 | 259330 | 226969 | 285478 | -5.74% | -9.41% | $1.3328 | $1.3922 |
| routing-read-write-ledger | openrtk | 3 | 0 | 0 | 266621 | 283253 | 200261 | 357929 | -4.21% | -2.88% | $1.4193 | $1.5037 |
| helper-read-write-ledger | baseline | 3 | 0 | 0 | 199644 | 209768 | 198266 | 216209 | 0.00% | 0.00% | $1.0858 | $1.1342 |
| helper-read-write-ledger | tokenwarden | 3 | 0 | 0 | 214933 | 194752 | 183316 | 216279 | -7.66% | 5.55% | $1.1620 | $1.0678 |
| helper-read-write-ledger | openslimedit | 3 | 0 | 0 | 172300 | 174451 | 154695 | 193132 | 13.70% | 17.38% | $0.9365 | $0.9546 |
| helper-read-write-ledger | dcp | 3 | 0 | 0 | 271510 | 247162 | 214343 | 292156 | -16.64% | -17.72% | $1.4375 | $1.3430 |
| helper-read-write-ledger | openrtk | 3 | 0 | 0 | 287234 | 290067 | 287019 | 291699 | -43.87% | -39.17% | $1.5251 | $1.5432 |
| core-api-read-write-ledger | baseline | 3 | 0 | 0 | 393973 | 399347 | 335694 | 460314 | 0.00% | 0.00% | $2.0564 | $2.0770 |
| core-api-read-write-ledger | tokenwarden | 3 | 0 | 0 | 93827 | 105546 | 73011 | 132222 | 66.18% | 70.99% | $0.5601 | $0.6510 |
| core-api-read-write-ledger | openslimedit | 3 | 0 | 0 | 397061 | 402517 | 380769 | 421538 | -0.78% | -10.26% | $2.0641 | $2.1023 |
| core-api-read-write-ledger | dcp | 3 | 0 | 0 | 178171 | 263223 | 173408 | 310513 | 57.19% | 21.24% | $0.9868 | $1.4028 |
| core-api-read-write-ledger | openrtk | 3 | 0 | 0 | 418329 | 366957 | 329802 | 429799 | 13.03% | 7.20% | $2.1854 | $1.9215 |
| react-state-bug-fix | baseline | 3 | 0 | 0 | 40569 | 40542 | 35402 | 45696 | 0.00% | 0.00% | $0.2157 | $0.2167 |
| react-state-bug-fix | tokenwarden | 3 | 0 | 0 | 55185 | 51993 | 49303 | 56279 | -36.03% | -37.07% | $0.2934 | $0.2754 |
| react-state-bug-fix | openslimedit | 3 | 0 | 0 | 22565 | 24686 | 22476 | 25836 | 28.25% | 36.60% | $0.1243 | $0.1358 |
| react-state-bug-fix | dcp | 3 | 0 | 0 | 47340 | 47124 | 41865 | 52492 | -16.69% | -26.32% | $0.2503 | $0.2499 |
| react-state-bug-fix | openrtk | 3 | 0 | 0 | 30766 | 30646 | 30545 | 30808 | 25.26% | 20.89% | $0.1650 | $0.1647 |
| next-api-route-fix | baseline | 3 | 0 | 0 | 30609 | 36711 | 30455 | 39916 | 0.00% | 0.00% | $0.1646 | $0.1984 |
| next-api-route-fix | tokenwarden | 3 | 0 | 0 | 33847 | 40340 | 33426 | 44009 | -10.05% | -9.86% | $0.1811 | $0.2181 |
| next-api-route-fix | openslimedit | 3 | 0 | 0 | 21923 | 26693 | 21713 | 29289 | 27.65% | 27.64% | $0.1224 | $0.1489 |
| next-api-route-fix | dcp | 3 | 0 | 0 | 57432 | 54800 | 46887 | 64030 | -43.49% | -50.35% | $0.3067 | $0.2929 |
| next-api-route-fix | openrtk | 3 | 0 | 0 | 30507 | 36891 | 30467 | 40123 | -0.42% | -8.30% | $0.1666 | $0.2002 |
| cli-flag-parsing-fix | baseline | 3 | 0 | 0 | 40614 | 39487 | 35398 | 44140 | 0.00% | 0.00% | $0.2166 | $0.2123 |
| cli-flag-parsing-fix | tokenwarden | 3 | 0 | 0 | 42834 | 44190 | 37726 | 49977 | -19.83% | -14.02% | $0.2306 | $0.2364 |
| cli-flag-parsing-fix | openslimedit | 3 | 0 | 0 | 35804 | 100628 | 28663 | 140181 | 11.84% | -124.18% | $0.1922 | $0.5261 |
| cli-flag-parsing-fix | dcp | 3 | 0 | 0 | 120631 | 96493 | 78409 | 126646 | -178.32% | -131.74% | $0.6518 | $0.5155 |
| cli-flag-parsing-fix | openrtk | 3 | 0 | 0 | 51101 | 101032 | 40565 | 136534 | -25.82% | -130.33% | $0.2732 | $0.5332 |
| large-test-log-debug | baseline | 3 | 0 | 0 | 39805 | 38541 | 36737 | 40977 | 0.00% | 0.00% | $0.2123 | $0.2042 |
| large-test-log-debug | tokenwarden | 3 | 0 | 0 | 41066 | 43668 | 39081 | 46955 | -3.17% | -16.04% | $0.2153 | $0.2307 |
| large-test-log-debug | openslimedit | 3 | 0 | 0 | 27772 | 45591 | 27121 | 55151 | 17.51% | -14.93% | $0.1494 | $0.2388 |
| large-test-log-debug | dcp | 3 | 0 | 0 | 43130 | 62770 | 40900 | 74821 | -2.33% | -71.94% | $0.2263 | $0.3244 |
| large-test-log-debug | openrtk | 3 | 0 | 0 | 37544 | 42423 | 35008 | 47400 | -11.51% | -9.64% | $0.1983 | $0.2236 |
| typecheck-flood-debug | baseline | 3 | 1 | 0 | 39495 | 61044 | 38570 | 72744 | 0.00% | 0.00% | $0.2084 | $0.3211 |
| typecheck-flood-debug | tokenwarden | 3 | 2 | 0 | 44082 | 51196 | 39593 | 59243 | 11.12% | 7.94% | $0.2350 | $0.2731 |
| typecheck-flood-debug | openslimedit | 3 | 3 | 0 | 20621 | 22795 | 20503 | 24001 | 48.39% | 52.07% | $0.1146 | $0.1250 |
| typecheck-flood-debug | dcp | 3 | 3 | 0 | 45578 | 46676 | 45532 | 47272 | -15.40% | 5.86% | $0.2413 | $0.2478 |
| typecheck-flood-debug | openrtk | 3 | 2 | 0 | 29373 | 35316 | 29220 | 38442 | 25.63% | 24.00% | $0.1579 | $0.1880 |
| build-failure-debug | baseline | 3 | 0 | 0 | 28361 | 29721 | 28321 | 30442 | 0.00% | 0.00% | $0.1502 | $0.1582 |
| build-failure-debug | tokenwarden | 3 | 0 | 0 | 40159 | 37241 | 35781 | 40160 | -41.60% | -26.72% | $0.2097 | $0.1957 |
| build-failure-debug | openslimedit | 3 | 0 | 0 | 19759 | 19769 | 19739 | 19794 | 30.47% | 33.21% | $0.1088 | $0.1088 |
| build-failure-debug | dcp | 3 | 0 | 0 | 34754 | 35082 | 34682 | 35318 | -22.38% | -18.42% | $0.1832 | $0.1852 |
| build-failure-debug | openrtk | 3 | 0 | 0 | 29743 | 31688 | 29232 | 33172 | -1.56% | -7.35% | $0.1601 | $0.1697 |
| multi-file-rename-migration | baseline | 3 | 0 | 0 | 39677 | 42842 | 39101 | 45001 | 0.00% | 0.00% | $0.2197 | $0.2348 |
| multi-file-rename-migration | tokenwarden | 3 | 0 | 0 | 43496 | 47227 | 43355 | 49234 | -9.63% | -12.73% | $0.2392 | $0.2574 |
| multi-file-rename-migration | openslimedit | 3 | 0 | 0 | 33702 | 33671 | 33580 | 33778 | 15.68% | 20.31% | $0.1892 | $0.1886 |
| multi-file-rename-migration | dcp | 3 | 0 | 0 | 55338 | 64100 | 51729 | 72091 | -39.47% | -46.97% | $0.2960 | $0.3438 |
| multi-file-rename-migration | openrtk | 3 | 0 | 0 | 38716 | 65158 | 38260 | 78836 | -0.50% | -44.05% | $0.2148 | $0.3498 |
| feature-add-small | baseline | 3 | 0 | 0 | 29103 | 29258 | 29046 | 29393 | 0.00% | 0.00% | $0.1562 | $0.1558 |
| feature-add-small | tokenwarden | 3 | 0 | 0 | 31913 | 31901 | 31871 | 31937 | -9.82% | -9.05% | $0.1700 | $0.1699 |
| feature-add-small | openslimedit | 3 | 0 | 0 | 25885 | 24204 | 23089 | 26160 | 11.06% | 17.17% | $0.1424 | $0.1327 |
| feature-add-small | dcp | 3 | 0 | 0 | 35089 | 35124 | 35085 | 35146 | -20.96% | -20.06% | $0.1862 | $0.1866 |
| feature-add-small | openrtk | 3 | 0 | 0 | 28835 | 37119 | 28827 | 41269 | 0.53% | -27.03% | $0.1551 | $0.1979 |
| refactor-no-behavior-change | baseline | 3 | 0 | 0 | 29317 | 29245 | 29206 | 29321 | 0.00% | 0.00% | $0.1567 | $0.1567 |
| refactor-no-behavior-change | tokenwarden | 3 | 0 | 0 | 32077 | 35011 | 32035 | 36520 | -10.25% | -19.69% | $0.1712 | $0.1864 |
| refactor-no-behavior-change | openslimedit | 3 | 0 | 0 | 20205 | 23945 | 20186 | 25835 | 31.10% | 18.06% | $0.1112 | $0.1312 |
| refactor-no-behavior-change | dcp | 3 | 0 | 0 | 35379 | 35384 | 35335 | 35431 | -21.00% | -20.99% | $0.1886 | $0.1890 |
| refactor-no-behavior-change | openrtk | 3 | 0 | 0 | 29017 | 31619 | 28977 | 32961 | 0.54% | -8.10% | $0.1566 | $0.1688 |
| code-review-diagnosis | baseline | 3 | 3 | 0 | 31919 | 37652 | 31256 | 41182 | 0.00% | 0.00% | $0.1855 | $0.2148 |
| code-review-diagnosis | tokenwarden | 3 | 3 | 0 | 24329 | 29857 | 24076 | 32875 | 23.78% | 13.72% | $0.1388 | $0.1670 |
| code-review-diagnosis | openslimedit | 3 | 3 | 0 | 22421 | 22536 | 22317 | 22698 | 30.41% | 36.95% | $0.1323 | $0.1330 |
| code-review-diagnosis | dcp | 3 | 3 | 0 | 66217 | 61879 | 51185 | 74743 | -65.07% | -64.93% | $0.3736 | $0.3454 |
| code-review-diagnosis | openrtk | 3 | 3 | 0 | 31367 | 31662 | 27024 | 36153 | 18.84% | 15.48% | $0.1770 | $0.1843 |
| docs-from-code | baseline | 3 | 0 | 0 | 21430 | 23760 | 21307 | 25049 | 0.00% | 0.00% | $0.1220 | $0.1331 |
| docs-from-code | tokenwarden | 3 | 0 | 0 | 31476 | 32041 | 27509 | 36291 | -43.39% | -33.80% | $0.1703 | $0.1734 |
| docs-from-code | openslimedit | 3 | 0 | 0 | 20700 | 22074 | 20292 | 23169 | 2.28% | 4.43% | $0.1171 | $0.1244 |
| docs-from-code | dcp | 3 | 0 | 0 | 35404 | 35241 | 30658 | 39906 | -23.50% | -51.35% | $0.1927 | $0.1908 |
| docs-from-code | openrtk | 3 | 0 | 0 | 21169 | 23756 | 21059 | 25160 | 1.11% | -2.92% | $0.1191 | $0.1316 |

## Best By Task

| Task | Lowest Median Tokens | Lowest Median Cost |
| --- | --- | --- |
| routing-read-write-ledger | tokenwarden (94535) | tokenwarden ($0.5514) |
| helper-read-write-ledger | openslimedit (172300) | openslimedit ($0.9365) |
| core-api-read-write-ledger | tokenwarden (93827) | tokenwarden ($0.5601) |
| react-state-bug-fix | openslimedit (22565) | openslimedit ($0.1243) |
| next-api-route-fix | openslimedit (21923) | openslimedit ($0.1224) |
| cli-flag-parsing-fix | openslimedit (35804) | openslimedit ($0.1922) |
| large-test-log-debug | openslimedit (27772) | openslimedit ($0.1494) |
| typecheck-flood-debug | openslimedit (20621) | openslimedit ($0.1146) |
| build-failure-debug | openslimedit (19759) | openslimedit ($0.1088) |
| multi-file-rename-migration | openslimedit (33702) | openslimedit ($0.1892) |
| feature-add-small | openslimedit (25885) | openslimedit ($0.1424) |
| refactor-no-behavior-change | openslimedit (20205) | openslimedit ($0.1112) |
| code-review-diagnosis | openslimedit (22421) | openslimedit ($0.1323) |
| docs-from-code | openslimedit (20700) | openslimedit ($0.1171) |

CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-23T16-47-14-546Z/tokens.csv`
Averages CSV: `/Users/paulvasile/work-srl/tokenwarden-benchmark/bench/results/2026-06-23T16-47-14-546Z/averages.csv`
