import { NextResponse } from 'next/server';

type ExtractNextResponse<T> = T extends NextResponse<infer U> ? U : never;
type ArrayToSingle<T> = T extends (infer U)[] ? U : never;

type APIArrayToSingle<T> = ArrayToSingle<ExtractNextResponse<T>>;
type APISingle<T> = ExtractNextResponse<T>;

export type {
  APIArrayToSingle, APISingle
};

