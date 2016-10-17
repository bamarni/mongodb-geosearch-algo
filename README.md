# mongodb-geosearch-algo

Ref : https://www.mongodb.com/blog/post/geospatial-performance-improvements-in-mongodb-3-2

```
node searchNative.js 13.4123589 52.5218068 > results/native.txt  0.36s user 0.05s system 23% cpu 1.802 total
node searchNative.js 13.4123589 52.5218068 > results/native.txt  0.36s user 0.04s system 63% cpu 0.635 total
node searchNative.js 13.4123589 52.5218068 > results/native.txt  0.36s user 0.03s system 30% cpu 1.298 total

node searchAlgo.js 13.4123589 52.5218068 > results/algo.txt  0.55s user 0.06s system 25% cpu 2.386 total
node searchAlgo.js 13.4123589 52.5218068 > results/algo.txt  0.56s user 0.04s system 67% cpu 0.883 total
node searchAlgo.js 13.4123589 52.5218068 > results/algo.txt  0.54s user 0.04s system 64% cpu 0.898 total

node searchAlgoUnsorted.js 13.4123589 52.5218068 > results/algo_unsorted.txt  0.37s user 0.04s system 23% cpu 1.744 total
node searchAlgoUnsorted.js 13.4123589 52.5218068 > results/algo_unsorted.txt  0.35s user 0.04s system 52% cpu 0.725 total
node searchAlgoUnsorted.js 13.4123589 52.5218068 > results/algo_unsorted.txt  0.36s user 0.03s system 37% cpu 1.053 total
```
