/// <reference types="react-scripts" />

type ValueOf<T> = T[keyof T];
type Subset<K, T extends K> = T;