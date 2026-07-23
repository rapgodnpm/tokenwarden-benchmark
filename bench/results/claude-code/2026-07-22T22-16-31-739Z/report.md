# TokenWarden Benchmark Report

Results: `/workspace/bench/results/claude-code/2026-07-22T22-16-31-739Z`

Calculated costs use $5/1M input tokens and $25/1M output tokens.

## Overall

| Plugin | Status | Runs | Included | Ignored | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| baseline | OK | 42 | 42 | 0 | 6 | 0 | 60328 | 139063 | 37045 | 96306 | 26502 | 919715 | 56192ms | 0 | 0 | $0.1866 | $0.4247 | $0.0000 | $0.0000 |
| caveman | OK | 42 | 42 | 0 | 11 | 0 | 56648 | 113886 | 43386 | 152762 | 31069 | 503666 | 39525ms | -6217 | 25177 | $0.1686 | $0.3563 | $-0.0132 | $0.0684 |
| context-mode | OK | 42 | 42 | 0 | 7 | 0 | 122002 | 205425 | 95162 | 190473 | 70198 | 1018494 | 49259ms | -58413 | -66362 | $0.3379 | $0.5846 | $-0.1502 | $-0.1599 |
| tokenwarden | OK | 42 | 42 | 0 | 6 | 0 | 54473 | 92888 | 42177 | 78314 | 29544 | 701586 | 54450ms | -2951 | 46175 | $0.1701 | $0.2911 | $-0.0072 | $0.1335 |
| rtk | FAILED | 42 | 0 | 42 | 42 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |

## By Task

| Task | Plugin | Status | Runs | Included | Ignored | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| build-failure-debug | baseline | OK | 3 | 3 | 0 | 0 | 0 | 36130 | 36090 | 36052 | 36148 | 0.00% | 0.00% | $0.1105 | $0.1106 |
| build-failure-debug | caveman | OK | 3 | 3 | 0 | 0 | 0 | 42510 | 42498 | 42490 | 42513 | -17.56% | -17.76% | $0.1258 | $0.1257 |
| build-failure-debug | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 94801 | 103940 | 94720 | 108591 | -163.08% | -187.95% | $0.2632 | $0.2866 |
| build-failure-debug | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 41008 | 44847 | 40731 | 47044 | -13.39% | -24.30% | $0.1290 | $0.1368 |
| build-failure-debug | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| cli-flag-parsing-fix | baseline | OK | 3 | 3 | 0 | 0 | 0 | 64993 | 57586 | 53159 | 65717 | 0.00% | 0.00% | $0.2066 | $0.1874 |
| cli-flag-parsing-fix | caveman | OK | 3 | 3 | 0 | 0 | 0 | 114513 | 122731 | 101340 | 140013 | -113.35% | -112.89% | $0.3568 | $0.3644 |
| cli-flag-parsing-fix | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 154759 | 315652 | 125624 | 425234 | -138.12% | -406.24% | $0.4405 | $0.8637 |
| cli-flag-parsing-fix | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 72924 | 67023 | 57980 | 79017 | -30.95% | -24.06% | $0.2312 | $0.2107 |
| cli-flag-parsing-fix | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| code-review-diagnosis | baseline | FAILED | 3 | 3 | 0 | 3 | 0 | 37157 | 45860 | 33083 | 54286 | 0.00% | 0.00% | $0.1306 | $0.1588 |
| code-review-diagnosis | caveman | FAILED | 3 | 3 | 0 | 3 | 0 | 43265 | 43587 | 43196 | 43817 | -19.41% | -9.65% | $0.1339 | $0.1370 |
| code-review-diagnosis | context-mode | FAILED | 3 | 3 | 0 | 3 | 0 | 71042 | 70980 | 70620 | 71371 | -92.96% | -78.72% | $0.2094 | $0.2089 |
| code-review-diagnosis | tokenwarden | FAILED | 3 | 3 | 0 | 3 | 0 | 41766 | 42701 | 37022 | 47913 | -43.98% | -11.55% | $0.1416 | $0.1485 |
| code-review-diagnosis | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| core-api-read-write-ledger | baseline | OK | 3 | 3 | 0 | 0 | 0 | 585860 | 659485 | 529371 | 752788 | 0.00% | 0.00% | $1.7817 | $1.9634 |
| core-api-read-write-ledger | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 213963 | 481402 | 212856 | 616229 | 55.22% | 35.99% | $0.5688 | $1.3434 |
| core-api-read-write-ledger | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 116781 | 116855 | 98198 | 135476 | 86.41% | 80.37% | $0.4235 | $0.4434 |
| core-api-read-write-ledger | caveman | FAILED | 3 | 3 | 0 | 3 | 0 | 290708 | 295181 | 274592 | 313533 | 42.59% | 51.00% | $1.0171 | $1.0298 |
| core-api-read-write-ledger | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| docs-from-code | baseline | OK | 3 | 3 | 0 | 0 | 0 | 26624 | 30495 | 26563 | 32492 | 0.00% | 0.00% | $0.0886 | $0.1006 |
| docs-from-code | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 70594 | 70632 | 70594 | 70652 | -165.59% | -138.66% | $0.2041 | $0.2040 |
| docs-from-code | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 52655 | 45419 | 41100 | 53356 | -40.92% | -50.19% | $0.1591 | $0.1414 |
| docs-from-code | caveman | FAILED | 3 | 3 | 0 | 1 | 0 | 43367 | 47024 | 37218 | 55002 | -63.64% | -51.35% | $0.1340 | $0.1421 |
| docs-from-code | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| feature-add-small | baseline | OK | 3 | 3 | 0 | 0 | 0 | 36536 | 45072 | 36386 | 49491 | 0.00% | 0.00% | $0.1132 | $0.1394 |
| feature-add-small | caveman | OK | 3 | 3 | 0 | 0 | 0 | 43015 | 43124 | 43009 | 43184 | -17.70% | -1.94% | $0.1289 | $0.1297 |
| feature-add-small | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 95157 | 95114 | 95078 | 95173 | -160.01% | -125.02% | $0.2634 | $0.2641 |
| feature-add-small | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 41428 | 41446 | 41358 | 41525 | -13.01% | 1.93% | $0.1303 | $0.1295 |
| feature-add-small | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| helper-read-write-ledger | baseline | OK | 3 | 3 | 0 | 0 | 0 | 279245 | 306085 | 276987 | 321764 | 0.00% | 0.00% | $0.9120 | $0.9545 |
| helper-read-write-ledger | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 260973 | 419581 | 231515 | 528344 | 5.01% | -28.59% | $0.8430 | $1.2464 |
| helper-read-write-ledger | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 244295 | 395068 | 241810 | 472941 | 11.08% | -22.41% | $0.7862 | $1.1581 |
| helper-read-write-ledger | caveman | FAILED | 3 | 3 | 0 | 1 | 0 | 223943 | 266956 | 223408 | 288999 | 19.80% | 9.92% | $0.7577 | $0.8511 |
| helper-read-write-ledger | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| large-test-log-debug | baseline | OK | 3 | 3 | 0 | 0 | 0 | 66086 | 71292 | 59723 | 80258 | 0.00% | 0.00% | $0.2069 | $0.2154 |
| large-test-log-debug | caveman | OK | 3 | 3 | 0 | 0 | 0 | 49262 | 51944 | 47870 | 54677 | 29.67% | 24.57% | $0.1483 | $0.1582 |
| large-test-log-debug | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 128478 | 120983 | 115732 | 129983 | -93.00% | -75.55% | $0.3536 | $0.3346 |
| large-test-log-debug | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 59218 | 59193 | 57456 | 60943 | 15.73% | 12.79% | $0.1837 | $0.1840 |
| large-test-log-debug | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| multi-file-rename-migration | baseline | OK | 3 | 3 | 0 | 0 | 0 | 60825 | 60773 | 60328 | 61244 | 0.00% | 0.00% | $0.1879 | $0.1886 |
| multi-file-rename-migration | caveman | OK | 3 | 3 | 0 | 0 | 0 | 70636 | 71938 | 64032 | 79193 | -16.13% | -18.64% | $0.2079 | $0.2152 |
| multi-file-rename-migration | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 122392 | 122327 | 122007 | 122679 | -102.16% | -101.31% | $0.3455 | $0.3464 |
| multi-file-rename-migration | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 53982 | 54450 | 53787 | 54879 | 9.77% | 10.40% | $0.1705 | $0.1718 |
| multi-file-rename-migration | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| next-api-route-fix | baseline | OK | 3 | 3 | 0 | 0 | 0 | 65224 | 57292 | 52432 | 66118 | 0.00% | 0.00% | $0.2002 | $0.1812 |
| next-api-route-fix | caveman | OK | 3 | 3 | 0 | 0 | 0 | 45125 | 55224 | 45041 | 60359 | 30.82% | -8.99% | $0.1405 | $0.1692 |
| next-api-route-fix | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 152836 | 135194 | 124928 | 154281 | -134.32% | -137.15% | $0.4334 | $0.3842 |
| next-api-route-fix | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 74205 | 64112 | 58963 | 74308 | -11.04% | -21.76% | $0.2319 | $0.2040 |
| next-api-route-fix | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| react-state-bug-fix | baseline | OK | 3 | 3 | 0 | 0 | 0 | 39715 | 42222 | 38664 | 44526 | 0.00% | 0.00% | $0.1307 | $0.1340 |
| react-state-bug-fix | caveman | OK | 3 | 3 | 0 | 0 | 0 | 55868 | 57655 | 50057 | 64360 | -40.67% | -41.35% | $0.1620 | $0.1690 |
| react-state-bug-fix | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 125688 | 145342 | 111058 | 169799 | -216.47% | -235.47% | $0.3485 | $0.4056 |
| react-state-bug-fix | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 44813 | 64400 | 43755 | 75252 | -7.51% | -59.78% | $0.1494 | $0.2029 |
| react-state-bug-fix | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| refactor-no-behavior-change | baseline | OK | 3 | 3 | 0 | 0 | 0 | 36992 | 37049 | 36895 | 37175 | 0.00% | 0.00% | $0.1125 | $0.1132 |
| refactor-no-behavior-change | caveman | OK | 3 | 3 | 0 | 0 | 0 | 43451 | 86704 | 43447 | 108334 | -18.08% | -134.21% | $0.1293 | $0.2457 |
| refactor-no-behavior-change | context-mode | OK | 3 | 3 | 0 | 0 | 0 | 95400 | 95439 | 95378 | 95482 | -157.77% | -157.61% | $0.2660 | $0.2660 |
| refactor-no-behavior-change | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 41839 | 41770 | 41653 | 41922 | -12.69% | -12.74% | $0.1298 | $0.1289 |
| refactor-no-behavior-change | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| routing-read-write-ledger | baseline | OK | 3 | 3 | 0 | 0 | 0 | 389437 | 413666 | 361211 | 454007 | 0.00% | 0.00% | $1.1950 | $1.2536 |
| routing-read-write-ledger | caveman | OK | 3 | 3 | 0 | 0 | 0 | 399259 | 360972 | 289626 | 451463 | 2.88% | 15.43% | $1.2051 | $1.1037 |
| routing-read-write-ledger | tokenwarden | OK | 3 | 3 | 0 | 0 | 0 | 154530 | 206301 | 150411 | 236306 | 53.59% | 47.90% | $0.5110 | $0.6413 |
| routing-read-write-ledger | context-mode | FAILED | 3 | 3 | 0 | 1 | 0 | 615209 | 594839 | 553939 | 645925 | -57.97% | -52.06% | $1.7921 | $1.7390 |
| routing-read-write-ledger | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| typecheck-flood-debug | baseline | FAILED | 3 | 3 | 0 | 3 | 0 | 96931 | 83917 | 66969 | 107372 | 0.00% | 0.00% | $0.2827 | $0.2446 |
| typecheck-flood-debug | caveman | FAILED | 3 | 3 | 0 | 3 | 0 | 44015 | 48864 | 43559 | 51746 | 38.64% | 28.27% | $0.1372 | $0.1472 |
| typecheck-flood-debug | context-mode | FAILED | 3 | 3 | 0 | 3 | 0 | 95178 | 104529 | 95162 | 109221 | -4.63% | -53.33% | $0.2673 | $0.2913 |
| typecheck-flood-debug | tokenwarden | FAILED | 3 | 3 | 0 | 3 | 0 | 56999 | 56854 | 55943 | 57838 | 39.47% | 14.26% | $0.1722 | $0.1746 |
| typecheck-flood-debug | rtk | FAILED | 3 | 0 | 3 | 3 | 0 | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |

## Best By Task

| Task | Lowest Median Tokens | Lowest Median Cost |
| --- | --- | --- |
| routing-read-write-ledger | tokenwarden (154530) | tokenwarden ($0.5110) |
| helper-read-write-ledger | tokenwarden (244295) | tokenwarden ($0.7862) |
| core-api-read-write-ledger | tokenwarden (116781) | tokenwarden ($0.4235) |
| react-state-bug-fix | baseline (39715) | baseline ($0.1307) |
| next-api-route-fix | caveman (45125) | caveman ($0.1405) |
| cli-flag-parsing-fix | baseline (64993) | baseline ($0.2066) |
| large-test-log-debug | caveman (49262) | caveman ($0.1483) |
| typecheck-flood-debug | N/A | N/A |
| build-failure-debug | baseline (36130) | baseline ($0.1105) |
| multi-file-rename-migration | tokenwarden (53982) | tokenwarden ($0.1705) |
| feature-add-small | baseline (36536) | baseline ($0.1132) |
| refactor-no-behavior-change | baseline (36992) | baseline ($0.1125) |
| code-review-diagnosis | N/A | N/A |
| docs-from-code | baseline (26624) | baseline ($0.0886) |

CSV: `/workspace/bench/results/claude-code/2026-07-22T22-16-31-739Z/tokens.csv`
Averages CSV: `/workspace/bench/results/claude-code/2026-07-22T22-16-31-739Z/averages.csv`
